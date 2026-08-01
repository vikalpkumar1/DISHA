'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', emoji: '🏠', label: 'Home' },
  { href: '/schemes', emoji: '🏛️', label: 'Schemes' },
  { href: '/internships', emoji: '💼', label: 'Earn' },
  { href: '/homework-help', emoji: '📚', label: 'Study' },
  { href: '/timetable', emoji: '⏰', label: 'Timetable' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/70 backdrop-blur-glass">
      <ul className="mx-auto flex max-w-2xl justify-between px-2 py-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-xs transition ${
                  active ? 'text-brand-amber' : 'text-white/60 hover:text-white'
                }`}
              >
                <span className="text-xl" aria-hidden>
                  {item.emoji}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
