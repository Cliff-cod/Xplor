'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Clock,
  Download,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface BookingConfirmationProps {
  bookingReference: string;
  experienceTitle: string;
  location: string;
  date: string;
  guestCount: number;
  duration: { value: number; unit: string };
  totalPrice: number;
  hostName: string;
}

export function BookingConfirmation({
  bookingReference,
  experienceTitle,
  location,
  date,
  guestCount,
  duration,
  totalPrice,
  hostName,
}: BookingConfirmationProps) {
  const handleAddToCalendar = () => {
    // INTEGRATION POINT: Add to calendar functionality
    // This can use services like:
    // - Google Calendar API
    // - Apple Calendar (.ics file download)
    // - Outlook Calendar API
    
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + duration.value * 60 * 60 * 1000);

    const title = `${experienceTitle} - Wanderly Africa`;
    const description = `${guestCount} guest${guestCount > 1 ? 's' : ''} • Hosted by ${hostName}`;
    const location_text = location;

    // Generate .ics file for download (works with most calendar apps)
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wanderly Africa//Wanderly//EN
BEGIN:VEVENT
UID:${bookingReference}@wanderly.local
DTSTAMP:${new Date().toISOString().replace(/[:-]/g, '').split('.')[0]}Z
DTSTART:${startDate.toISOString().replace(/[:-]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[:-]/g, '').split('.')[0]}Z
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location_text}
END:VEVENT
END:VCALENDAR`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ics));
    element.setAttribute('download', `${bookingReference}.ics`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl animate-fade-in-up">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="w-16 h-16 text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your adventure awaits. We've sent a confirmation email.
          </p>
        </div>

        {/* Booking Reference Card */}
        <Card className="card-premium border border-primary/20 mb-8">
          <CardContent className="pt-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Booking Reference</p>
              <p className="text-3xl font-bold text-foreground font-mono">
                {bookingReference}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Save this reference for your records
              </p>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              {/* Experience */}
              <div className="flex items-start gap-4 pb-4 border-b border-primary/10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{experienceTitle}</p>
                  <p className="text-sm text-muted-foreground">{location}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start gap-4 pb-4 border-b border-primary/10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {formatDate(date)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start time: {formatTime(date)}
                  </p>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-start gap-4 pb-4 border-b border-primary/10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Confirmation sent to email
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-4 pb-4 border-b border-primary/10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {duration.value} {duration.unit}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Experience duration
                  </p>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">$</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Total Paid</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={handleAddToCalendar}
            variant="outline"
            className="border-primary/50 hover:bg-primary/10 text-primary font-semibold py-3 h-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>
          <Link href="/my-bookings">
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-3 h-auto">
              View My Bookings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="space-y-3">
          <Card className="card-premium border border-primary/20">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-2">What happens next?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Confirmation email sent to your registered email</li>
                <li>• Host will contact you 24 hours before the experience</li>
                <li>• Download or screenshot your booking reference</li>
                <li>• Arrive 15 minutes early at the meeting point</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-premium border border-primary/20">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-2">Cancellation Policy</h4>
              <p className="text-sm text-muted-foreground">
                Free cancellation up to 24 hours before your experience. Cancellations within 24 hours will be charged in full.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
