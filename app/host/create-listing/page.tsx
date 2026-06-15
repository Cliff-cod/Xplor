'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { categories, cities } from '@/lib/mock-data';
import Link from 'next/link';

export default function CreateListingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    city: '',
    country: '',
    price: '',
    maxGuests: '',
    durationValue: '',
    durationUnit: 'hours',
    amenities: '',
    included: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] New listing created:', formData);
    alert('Listing created successfully! (Demo mode)');
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.category !== '';
      case 2:
        return formData.city !== '' && formData.country !== '';
      case 3:
        return formData.title !== '';
      case 4:
        return formData.price !== '' && formData.maxGuests !== '';
      default:
        return true;
    }
  };

  const amenitiesList = formData.amenities.split(',').filter((a) => a.trim());
  const includedList = formData.included.split(',').filter((i) => i.trim());

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create a New Listing</h1>
          <p className="text-muted-foreground mb-8">
            Step {step} of 4 - Share details about your experience
          </p>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Category */}
            {step === 1 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">What type of experience?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(1).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleSelectChange('category', cat)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.category === cat
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="font-semibold text-foreground">{cat}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Where is your experience?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      City
                    </label>
                    <Select value={formData.city} onValueChange={(v) => handleSelectChange('city', v ?? '')}
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Country
                    </label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g., Italy"
                      className="bg-background border-border"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Title & Description */}
            {step === 3 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Tell us about your experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Title
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Italian Cooking Class"
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your experience in detail..."
                      className="bg-background border-border min-h-32"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      What&apos;s Included (comma-separated)
                    </label>
                    <Textarea
                      name="included"
                      value={formData.included}
                      onChange={handleInputChange}
                      placeholder="e.g., All ingredients, Wine pairing, Recipe cards"
                      className="bg-background border-border min-h-24"
                    />
                    {includedList.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {includedList.map((item, idx) => (
                          <Badge key={idx} variant="outline">
                            {item.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Amenities (comma-separated)
                    </label>
                    <Textarea
                      name="amenities"
                      value={formData.amenities}
                      onChange={handleInputChange}
                      placeholder="e.g., Kitchen provided, WiFi, Parking"
                      className="bg-background border-border min-h-20"
                    />
                    {amenitiesList.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {amenitiesList.map((item, idx) => (
                          <Badge key={idx} variant="secondary">
                            {item.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Pricing */}
            {step === 4 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Pricing & Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Price per Person ($)
                      </label>
                      <Input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="bg-background border-border"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Max Guests
                      </label>
                      <Input
                        name="maxGuests"
                        type="number"
                        value={formData.maxGuests}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Duration
                      </label>
                      <Input
                        name="durationValue"
                        type="number"
                        value={formData.durationValue}
                        onChange={handleInputChange}
                        placeholder="3"
                        className="bg-background border-border"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Unit
                      </label>
                      <Select value={formData.durationUnit} onValueChange={(v) => handleSelectChange('durationUnit', v)}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-border"
                >
                  Previous
                </Button>
              )}

              {step < 4 && (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto bg-primary hover:bg-primary/90 text-white"
                  disabled={!isStepValid()}
                >
                  Next
                </Button>
              )}

              {step === 4 && (
                <Button
                  type="submit"
                  className="ml-auto bg-primary hover:bg-primary/90 text-white"
                  disabled={!isStepValid()}
                >
                  Create Listing
                </Button>
              )}
            </div>
          </form>

          {/* Back Link */}
          <Link href="/host/dashboard" className="block mt-6 text-center text-primary hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
