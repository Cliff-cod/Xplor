'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Experience } from '@/lib/mock-data';
import { BookingSummary } from '@/components/booking-summary';
import { GuestDetailsForm, GuestDetails } from '@/components/guest-details-form';
import { PaymentSection } from '@/components/payment-section';
import { BookingConfirmation } from '@/components/booking-confirmation';

interface BookingFormProps {
  experience: Experience;
  guestCount: number;
  selectedDate: string;
}

export function BookingForm({ experience, guestCount: initialGuests, selectedDate: initialDate }: BookingFormProps) {
  const [guestCount, setGuestCount] = useState(initialGuests);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const serviceFee = 15;
  const totalPrice = guestCount * experience.price + serviceFee;

  const generateBookingReference = (): string => {
    return `WA${Date.now().toString().slice(-8)}`;
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    try {
      const reference = generateBookingReference();

      const bookingData = {
        experienceId: experience.id,
        userId: 'user_current',
        checkInDate: selectedDate,
        checkOutDate: selectedDate,
        guestCount,
        totalPrice,
        bookingReference: reference,
        travelerDetails: {
          name: `${guestDetails.firstName} ${guestDetails.lastName}`,
          email: guestDetails.email,
          phone: guestDetails.phone,
        },
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      setBookingReference(reference);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to process booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Success State
  if (bookingSuccess) {
    return (
      <BookingConfirmation
        bookingReference={bookingReference}
        experienceTitle={experience.title}
        location={`${experience.location.city}, ${experience.location.country}`}
        date={selectedDate}
        guestCount={guestCount}
        duration={experience.duration}
        totalPrice={totalPrice}
        hostName={experience.host.name}
      />
    );
  }

  // Booking Form State
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm animate-fade-in-up">
        <a href="/" className="text-primary hover:text-primary/80 transition-colors">
          Home
        </a>
        <span className="text-muted-foreground">/</span>
        <a href="/explore" className="text-primary hover:text-primary/80 transition-colors">
          Explore
        </a>
        <span className="text-muted-foreground">/</span>
        <a
          href={`/experiences/${experience.id}`}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          {experience.title}
        </a>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">Booking</span>
      </nav>

      {/* Page Header */}
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground mb-3">Confirm Your Booking</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Booking Summary */}
          <BookingSummary
            experienceTitle={experience.title}
            experienceImage={experience.images[0]}
            location={`${experience.location.city}, ${experience.location.country}`}
            duration={experience.duration}
            selectedDate={selectedDate}
            guestCount={guestCount}
            onDateChange={setSelectedDate}
            onGuestCountChange={setGuestCount}
            maxGuests={experience.maxGuests}
          />

          {/* Guest Details Form */}
          <GuestDetailsForm
            onDetailsChange={setGuestDetails}
            initialDetails={guestDetails}
          />

          {/* Terms & Conditions */}
          <Card className="card-premium border border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm text-foreground">
                <h3 className="font-semibold text-foreground">Before you continue</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Review the experience details and pricing above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Ensure your guest details are accurate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>
                      By booking, you agree to our Terms of Service and cancellation policy
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment Section */}
        <div className="lg:col-span-1">
          <PaymentSection
            pricePerPerson={experience.price}
            guestCount={guestCount}
            serviceFee={serviceFee}
            onConfirmPayment={handleConfirmPayment}
            isLoading={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}