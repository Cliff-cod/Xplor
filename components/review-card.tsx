'use client';

import { Review } from '@/lib/mock-data';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="pb-6 border-b border-border last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-foreground">{review.userName}</h4>
            <span className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < review.rating ? 'text-primary' : 'text-muted'}>
                ★
              </span>
            ))}
          </div>

          <p className="text-foreground text-sm leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
