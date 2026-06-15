'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const animals = [
  {
    name: 'Majestic Elephants',
    description: 'Encounter the gentle giants of Africa in their natural habitat',
    image: '/animal-elephant.png',
    icon: '🐘',
    experiences: 'Safari tours, Sanctuary visits',
  },
  {
    name: 'Regal Lions',
    description: 'Witness the power and grace of Africa\'s king of beasts',
    image: '/animal-lion.png',
    icon: '🦁',
    experiences: 'Game drives, Photography expeditions',
  },
  {
    name: 'Graceful Giraffes',
    description: 'Marvel at the elegance of these towering, spotted creatures',
    image: '/animal-giraffe.png',
    icon: '🦒',
    experiences: 'Wilderness walks, Private tours',
  },
];

export function WildlifeSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{
      background: `linear-gradient(135deg, oklch(0.3 0.12 25) 0%, oklch(0.35 0.1 35) 100%), url('/bg-ghana-pattern.png')`,
      backgroundSize: 'auto, 300px',
      backgroundAttachment: 'scroll, scroll',
    }}>
      {/* Decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-on-rich mb-4">
            Encounter African Wildlife
          </h2>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the majesty and beauty of Africa&apos;s iconic animals in authentic, sustainable tourism experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {animals.map((animal, index) => (
            <div
              key={animal.name}
              style={{
                animation: `slideInFromLeft 0.8s ease-out ${index * 0.15}s both`,
              }}
            >
              <Card className="card-premium overflow-hidden h-full hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 group">
                <CardContent className="p-0">
                  <div className="relative h-80 w-full overflow-hidden bg-muted">
                    <Image
                      src={animal.image}
                      alt={animal.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 bg-gradient-to-b from-card/95 to-card">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{animal.icon}</span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {animal.name}
                      </h3>
                    </div>

                    <p className="text-white/80 mb-4 leading-relaxed">
                      {animal.description}
                    </p>

                    <div className="border-t border-accent/30 pt-4">
                      <p className="text-sm font-semibold text-primary mb-2">Popular Experiences:</p>
                      <p className="text-sm text-white/70">{animal.experiences}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
