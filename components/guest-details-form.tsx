'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

interface GuestDetailsFormProps {
  onDetailsChange: (details: GuestDetails) => void;
  initialDetails?: GuestDetails;
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function GuestDetailsForm({
  onDetailsChange,
  initialDetails,
}: GuestDetailsFormProps) {
  const [details, setDetails] = useState<GuestDetails>(
    initialDetails || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  );

  const [errors, setErrors] = useState<Partial<GuestDetails>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleChange = (field: keyof GuestDetails, value: string) => {
    const newDetails = { ...details, [field]: value };
    setDetails(newDetails);
    onDetailsChange(newDetails);

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<GuestDetails> = {};

    if (!details.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!details.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!details.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(details.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!details.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(details.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Card className="card-premium border border-primary/20 animate-fade-in-up">
      <CardHeader>
        <CardTitle>Guest Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          We&apos;ll use these details to confirm your booking with the host.
        </p>

        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="text-sm font-semibold text-foreground mb-2 block">
            First Name *
          </label>
          <Input
            id="firstName"
            type="text"
            value={details.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
            className={`border-primary/30 bg-background/50 ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="text-sm font-semibold text-foreground mb-2 block">
            Last Name *
          </label>
          <Input
            id="lastName"
            type="text"
            value={details.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Smith"
            className={`border-primary/30 bg-background/50 ${
              errors.lastName ? 'border-red-500' : ''
            }`}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-foreground mb-2 block">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            value={details.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className={`border-primary/30 bg-background/50 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-foreground mb-2 block">
            Phone Number *
          </label>
          <Input
            id="phone"
            type="tel"
            value={details.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={`border-primary/30 bg-background/50 ${
              errors.phone ? 'border-red-500' : ''
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phone}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Include country code and area code
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
