'use client';

import { useEffect, useState } from 'react';

interface Entry {
  id: string;
  subject: string;
  day: number; // 0 = Sunday ... 6 = Saturday
  time: string; // "HH:MM", 24-hour
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const STORAGE_KEY = 'disha-timetable-v1';

function loadEntries(): Entry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Entry[]) : [];
  } catch {
    return [];
  }
}

export default function TimetablePage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState(1);
  const [time, setTime] = useState('09:00');
  const [notifStatus, setNotifStatus] = useState<NotificationPermission | 'unsupported'>('default');

  useEffect(() => {
    setEntries(loadEntries());
    setNotifStatus(typeof Notification !== 'undefined' ? Notification.permission : 'unsupported');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Reminder loop: checks every 30s whether any entry starts in this minute,
  // and fires a Notification if permission was granted. This only works
  // while the app/tab is open — true background reminders need a push
  // server, which is noted as future scope.
  useEffect(() => {
    if (notifStatus !== 'granted') return;
    const firedThisMinute = new Set<string>();
    const interval = setInterval(() => {
      const now = new Date();
      const nowKey = `${now.getDay()}-${now.getHours()}-${now.getMinutes()}`;
      entries.forEach((e) => {
        const [h, m] = e.time.split(':').map(Number);
        const key = `${e.day}-${h}-${m}`;
        if (key === nowKey && !firedThisMinute.has(e.id)) {
          firedThisMinute.add(e.id);
          new Notification('⏰ Timetable reminder', { body: `${e.subject} — starting now` });
        }
      });
    }, 30_000);
    return () => clearInterval(interval);
  }, [entries, notifStatus]);

  function addEntry() {
    if (!subject.trim()) return;
    setEntries((prev) =>
      [...prev, { id: crypto.randomUUID(), subject: subject.trim(), day, time }].sort((a, b) =>
        a.day === b.day ? a.time.localeCompare(b.time) : a.day - b.day
      )
    );
    setSubject('');
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  async function enableNotifications() {
    if (typeof Notification === 'undefined') {
      setNotifStatus('unsupported');
      return;
    }
    const perm = await Notification.requestPermission();
    setNotifStatus(perm);
  }

  return (
    <div>
      <h1 className="text-xl font-bold">⏰ Timetable</h1>
      <p className="mb-4 mt-1 text-sm text-white/60">
        Stored only on this device — nothing is uploaded. Works fully offline once loaded.
      </p>

      {notifStatus !== 'granted' && notifStatus !== 'unsupported' && (
        <button onClick={enableNotifications} className="gradient-btn mb-4 w-full rounded-2xl py-3 text-sm font-medium text-white">
          🔔 Turn on reminders
        </button>
      )}
      {notifStatus === 'unsupported' && (
        <p className="mb-4 text-xs text-white/40">Notifications aren&apos;t supported in this browser/app view.</p>
      )}
      {notifStatus === 'granted' && (
        <p className="mb-4 text-xs text-brand-emerald">
          🔔 Reminders on — keep the app open in the background for these to fire (see README for the background-push roadmap).
        </p>
      )}

      <div className="glass mb-5 rounded-card p-4">
        <p className="mb-2 text-sm font-semibold">Add a class / study slot</p>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Physics revision"
          className="mb-2 w-full rounded-xl bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
        />
        <div className="flex gap-2">
          <select
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="flex-1 rounded-xl bg-black/30 px-3 py-2 text-sm text-white"
          >
            {days.map((d, i) => (
              <option key={d} value={i} className="bg-bg-dark">
                {d}
              </option>
            ))}
          </select>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-xl bg-black/30 px-3 py-2 text-sm text-white"
          />
        </div>
        <button onClick={addEntry} className="gradient-btn mt-3 w-full rounded-2xl py-2.5 text-sm font-medium text-white">
          + Add to timetable
        </button>
      </div>

      {entries.length === 0 && <p className="text-sm text-white/50">No entries yet — add your first class above.</p>}

      {days.map((d, dayIdx) => {
        const dayEntries = entries.filter((e) => e.day === dayIdx);
        if (dayEntries.length === 0) return null;
        return (
          <div key={d} className="mb-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">{d}</p>
            {dayEntries.map((e) => (
              <div key={e.id} className="glass mb-1.5 flex items-center justify-between rounded-xl px-3 py-2">
                <span className="text-sm">
                  <span className="text-brand-amber">{e.time}</span> · {e.subject}
                </span>
                <button onClick={() => removeEntry(e.id)} className="text-xs text-white/40">
                  ✕
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
