'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="text-2xl font-bold text-foreground mb-2">
        Reviews ({reviews.length})
      </h3>
      <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            className="card-premium border border-primary/20 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            style={{
              animation: `fadeInUp 0.5s ease-out ${0.3 + index * 0.1}s both`,
            }}
          >
            <CardContent className="p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{review.author}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-foreground leading-relaxed line-clamp-4">
                {review.comment}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
    </div>
  );
}
