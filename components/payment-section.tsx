'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle } from 'lucide-react';

interface PaymentSectionProps {
  pricePerPerson: number;
  guestCount: number;
  serviceFee?: number;
  onConfirmPayment: () => void;
  isLoading?: boolean;
}

export function PaymentSection({
  pricePerPerson,
  guestCount,
  serviceFee = 15,
  onConfirmPayment,
  isLoading = false,
}: PaymentSectionProps) {
  const subtotal = pricePerPerson * guestCount;
  const total = subtotal + serviceFee;

  return (
    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {/* Price Breakdown */}
      <Card className="card-premium border border-primary/20 sticky top-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Price per person */}
          <div className="flex justify-between items-center pb-3 border-b border-primary/10">
            <div className="text-sm text-muted-foreground">
              ${pricePerPerson.toFixed(2)} × {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
            </div>
            <div className="text-sm font-semibold text-foreground">
              ${subtotal.toFixed(2)}
            </div>
          </div>

          {/* Service fee */}
          <div className="flex justify-between items-center pb-3 border-b border-primary/10">
            <div className="text-sm text-muted-foreground">Service Fee</div>
            <div className="text-sm font-semibold text-foreground">
              ${serviceFee.toFixed(2)}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <div className="font-semibold text-foreground">Total</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Element Placeholder */}
      <Card className="card-premium border border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* INTEGRATION POINT: Stripe Payment Element */}
          {/* Replace this placeholder with actual Stripe Elements:
          
          import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
          
          const stripe = useStripe();
          const elements = useElements();
          
          <PaymentElement />
          
          Then handle the payment in onConfirmPayment by calling:
          const { error, paymentIntent } = await stripe?.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${window.location.origin}/bookings/success`,
            },
          });
          */}
          
          <div className="p-6 bg-background/50 rounded-lg border-2 border-dashed border-primary/30 text-center space-y-3">
            <Lock className="w-8 h-8 text-primary mx-auto" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Stripe Payment Element
              </p>
              <p className="text-xs text-muted-foreground">
                Card number, expiry, CVC will be entered here
              </p>
            </div>
          </div>

          {/* Confirm & Pay Button */}
          <Button
            onClick={onConfirmPayment}
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold rounded-lg transition-all text-base"
          >
            {isLoading ? 'Processing...' : 'Confirm & Pay'}
          </Button>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-primary/20">
          <Lock className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Secure Payment</p>
            <p className="text-xs text-muted-foreground">
              Your payment info is protected by industry-leading encryption
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-primary/20">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Free Cancellation</p>
            <p className="text-xs text-muted-foreground">
              Cancel free up to 24 hours before your experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
