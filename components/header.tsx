'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-background to-background/95 border-b border-primary/20 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-4xl font-black tracking-tighter text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-all duration-300" style={{ lineHeight: 1 }}>
              X
            </span>
            <span className="text-xl font-bold text-foreground tracking-tight hidden sm:inline -ml-0.5">
              plore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/explore">
              <Button variant="ghost" className="text-foreground hover:text-primary font-semibold">
                Explore
              </Button>
            </Link>
            <Link href="/host/dashboard">
              <Button variant="ghost" className="text-foreground hover:text-primary font-semibold">
                Host
              </Button>
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/profile">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                My Bookings
              </Button>
            </Link>
            <Link href="/host/dashboard">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold shadow-lg">
                Create Listing
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-primary/20 pt-4 flex flex-col gap-2 animate-slide-in-left">
            <Link href="/explore">
              <Button variant="ghost" className="w-full justify-start text-foreground font-semibold">
                Explore
              </Button>
            </Link>
            <Link href="/host/dashboard">
              <Button variant="ghost" className="w-full justify-start text-foreground font-semibold">
                Host
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="w-full justify-start border-primary/50">
                My Bookings
              </Button>
            </Link>
            <Link href="/host/dashboard">
              <Button className="w-full bg-gradient-to-r from-primary to-accent text-white justify-start font-semibold">
                Create Listing
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
