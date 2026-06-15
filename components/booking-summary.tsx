'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Calendar, Users, Clock, Edit2, X, Check } from 'lucide-react';

interface BookingSummaryProps {
  experienceTitle: string;
  experienceImage: string;
  location: string;
  duration: { value: number; unit: string };
  selectedDate: string;
  guestCount: number;
  onDateChange: (date: string) => void;
  onGuestCountChange: (count: number) => void;
  maxGuests: number;
}

export function BookingSummary({
  experienceTitle,
  experienceImage,
  location,
  duration,
  selectedDate,
  guestCount,
  onDateChange,
  onGuestCountChange,
  maxGuests,
}: BookingSummaryProps) {
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [tempDate, setTempDate] = useState(selectedDate);
  const [tempGuests, setTempGuests] = useState(guestCount);

  const handleSaveDate = () => {
    onDateChange(tempDate);
    setIsEditingDate(false);
  };

  const handleSaveGuests = () => {
    onGuestCountChange(tempGuests);
    setIsEditingGuests(false);
  };

  const handleCancelDate = () => {
    setTempDate(selectedDate);
    setIsEditingDate(false);
  };

  const handleCancelGuests = () => {
    setTempGuests(guestCount);
    setIsEditingGuests(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="card-premium border border-primary/20 overflow-hidden animate-fade-in-up">
      {/* Experience Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={experienceImage}
          alt={experienceTitle}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">{experienceTitle}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg flex-1">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">
              {duration.value} {duration.unit}
            </span>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">Date</label>
            <button
              onClick={() => setIsEditingDate(!isEditingDate)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {isEditingDate ? (
            <div className="space-y-3">
              <Input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="border-primary/30 bg-background/50"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveDate}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelDate}
                  className="flex-1 border-primary/50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                {formatDate(selectedDate)}
              </span>
            </div>
          )}
        </div>

        {/* Guest Count Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">Guests</label>
            <button
              onClick={() => setIsEditingGuests(!isEditingGuests)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {isEditingGuests ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTempGuests(Math.max(1, tempGuests - 1))}
                  className="border-primary/50"
                >
                  −
                </Button>
                <span className="text-lg font-bold text-foreground min-w-[40px] text-center">
                  {tempGuests}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTempGuests(Math.min(maxGuests, tempGuests + 1))}
                  className="border-primary/50"
                >
                  +
                </Button>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Max {maxGuests} guests
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveGuests}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelGuests}
                  className="flex-1 border-primary/50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
