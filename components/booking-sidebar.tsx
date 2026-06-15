'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Users, Star } from 'lucide-react';

interface BookingSidebarProps {
  experienceId: string;
  pricePerPerson: number;
  rating: number;
  reviewCount: number;
}

export function BookingSidebar({ experienceId, pricePerPerson, rating, reviewCount }: BookingSidebarProps) {
  const router = useRouter();
  const [guestCount, setGuestCount] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalPrice = pricePerPerson * guestCount;

  const handleGuestChange = (change: number) => {
    const newCount = Math.max(1, guestCount + change);
    setGuestCount(newCount);
  };

  const handleBookNow = () => {
    router.push(`/bookings/${experienceId}?guests=${guestCount}&date=${startDate}`);
  };

  return (
    <Card className="card-premium border border-primary/20 sticky top-24 h-fit animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <CardHeader className="pb-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              ${pricePerPerson}
              <span className="text-lg text-muted-foreground">/person</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Range */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground block">Dates</label>
          <div className="space-y-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-primary/30 rounded-lg bg-background/50 text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                placeholder="Start date"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-primary/30 rounded-lg bg-background/50 text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                placeholder="End date"
              />
            </div>
          </div>
        </div>

        {/* Guest Count */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground block">Guests</label>
          <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border border-primary/30">
            <button
              onClick={() => handleGuestChange(-1)}
              className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold transition-colors"
              disabled={guestCount === 1}
            >
              −
            </button>
            <span className="flex-1 text-center font-semibold text-foreground">{guestCount}</span>
            <button
              onClick={() => handleGuestChange(1)}
              className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 py-4 border-t border-primary/20">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">${pricePerPerson} × {guestCount}</span>
            <span className="text-foreground font-medium">${totalPrice}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Total</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ${totalPrice}
            </span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          onClick={handleBookNow}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-3 rounded-lg shadow-lg transition-all hover:shadow-xl"
          disabled={!startDate}
        >
          Book Now
        </Button>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center">
          You won&apos;t be charged yet
        </p>

        {/* Quick Info */}
        <div className="space-y-2 pt-2 border-t border-primary/20">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <span className="text-lg">✓</span>
            <span>Free cancellation for 48 hours</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <span className="text-lg">✓</span>
            <span>Response time: Usually within 1 hour</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}