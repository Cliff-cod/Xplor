'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/explore?q=${encodeURIComponent(search)}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/african-hero.png)',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance animate-fade-in-up drop-shadow-lg">
          Discover African Experiences
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto text-balance animate-fade-in-up drop-shadow-md">
          Connect with authentic cultures, stunning landscapes, and unforgettable moments across the continent
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <div className="flex gap-2 bg-white rounded-full p-2 shadow-2xl hover:shadow-primary/20 transition-shadow">
            <Search className="w-5 h-5 text-primary my-auto ml-4" />
            <Input
              placeholder="Search by destination, activity, or experience..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 focus-visible:ring-0 text-lg"
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-semibold"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Browse Button */}
        <Link href="/explore">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold shadow-lg text-base"
          >
            Explore All Experiences
          </Button>
        </Link>
      </div>
    </div>
  );
}
