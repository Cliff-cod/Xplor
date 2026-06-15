'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Experience } from '@/lib/mock-data';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const averageRating = experience.reviews.length > 0
    ? (experience.reviews.reduce((sum, r) => sum + r.rating, 0) / experience.reviews.length).toFixed(1)
    : experience.rating.toFixed(1);

  return (
    <Link href={`/experiences/${experience.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group border-accent/20 animate-scale-in">
        <CardContent className="p-0">
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={experience.images[0]}
              alt={experience.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <Badge className="absolute top-3 right-3 bg-primary text-white font-semibold shadow-lg">
              {experience.category}
            </Badge>
            {/* Decorative African pattern overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-4 bg-gradient-to-b from-card to-card/95">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {experience.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-3">
              {experience.location.city}, {experience.location.country}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">⭐ {averageRating}</span>
                <span className="text-xs text-muted-foreground">
                  ({experience.reviewCount})
                </span>
              </div>
              <span className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                ${experience.price}
              </span>
            </div>

            <p className="text-xs text-muted-foreground border-t border-accent/10 pt-2">
              {experience.duration.value} {experience.duration.unit}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
