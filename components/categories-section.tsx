'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/mock-data';

export function CategoriesSection() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, oklch(0.35 0.08 45) 0%, oklch(0.38 0.08 40) 100%), url('/ghanaian-kente.png')`,
        backgroundSize: 'auto, 250px',
        backgroundAttachment: 'scroll, scroll',
        backgroundBlendMode: 'overlay, overlay',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-on-rich mb-3">
            Explore by Category
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category, index) => (
            <Link key={category} href={`/explore?category=${category}`}>
              <Button
                className="w-full border-2 border-primary bg-white/60 hover:bg-primary text-foreground hover:text-white font-semibold transition-all duration-300 rounded-lg backdrop-blur-md hover:shadow-lg"
                style={{
                  animation: `slideInFromLeft 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {category}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
