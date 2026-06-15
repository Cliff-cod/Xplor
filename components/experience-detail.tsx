'use client';

import Link from 'next/link';
import { Experience } from '@/lib/mock-data';
import { ImageGallery } from '@/components/image-gallery';
import { BookingSidebar } from '@/components/booking-sidebar';
import { HostProfile } from '@/components/host-profile';
import { Reviews } from '@/components/reviews';
import { RelatedExperiences } from '@/components/related-experiences';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExperienceDetailProps {
  experience: Experience;
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const [relatedExperiences, setRelatedExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/experiences')
      .then((res) => res.json())
      .then((data: Experience[]) => {
        const related = data.filter(
          (exp) => exp.category === experience.category && exp.id !== experience.id
        );
        setRelatedExperiences(related);
      })
      .catch((err) => console.error('Failed to fetch related experiences:', err));
  }, [experience.category, experience.id]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm animate-fade-in-up">
          <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/explore" className="text-primary hover:text-primary/80 transition-colors">
            Explore
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium line-clamp-1">{experience.title}</span>
        </nav>

        {/* Gallery */}
        <ImageGallery images={experience.images} title={experience.title} />

        {/* Title and Info */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {experience.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{experience.location.city}, {experience.location.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>{experience.duration.value} {experience.duration.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Up to {experience.maxGuests} guests</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg">⭐</span>
              <span className="font-semibold">{experience.rating}</span>
              <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <h2 className="text-2xl font-bold text-foreground mb-2">About This Experience</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
              <p className="text-lg text-foreground leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* What's Included */}
            <Card
              className="card-premium border border-primary/20 mb-10 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-foreground mb-4">What&apos;s Included</h3>
                <ul className="space-y-3">
                  {experience.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Host Profile */}
            <HostProfile
              name={experience.host.name}
              bio={`${experience.host.name} is a verified host with ${experience.host.responseRate}% response rate and extensive knowledge of the local area.`}
              avatar={experience.host.avatar}
              responseRate={experience.host.responseRate}
              joinDate={new Date(experience.host.joinedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
              totalListings={(experience.host.id.length * 3) % 10 + 3}
            />

            {/* Reviews */}
            <Reviews
              reviews={experience.reviews.map((review) => ({
                id: review.id,
                author: review.userName,
                avatar: review.userAvatar,
                rating: review.rating,
                date: new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }),
                comment: review.comment,
              }))}
            />
          </div>

          {/* Sidebar - Right */}
          <div className="lg:col-span-1">
            <BookingSidebar
              experienceId={experience.id}
              pricePerPerson={experience.price}
              rating={experience.rating}
              reviewCount={experience.reviewCount}
            />
          </div>
        </div>

        {/* Related Experiences */}
        {relatedExperiences.length > 0 && (
          <RelatedExperiences experiences={relatedExperiences} />
        )}
      </div>
    </main>
  );
}