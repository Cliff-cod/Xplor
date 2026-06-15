'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';

export function CulturalHighlights() {
  const highlights = [
    {
      id: 1,
      title: 'Ghanaian Kente Heritage',
      description: 'Experience authentic Kente cloth weaving, a UNESCO-recognized cultural treasure with centuries of history.',
      image: '/ghana-cultural.png',
      cultural_elements: ['Traditional Weaving', 'Royal Heritage', 'Symbolic Patterns'],
    },
    {
      id: 2,
      title: 'African Wildlife Safari',
      description: 'Encounter majestic creatures in their natural habitat - lions, elephants, giraffes, and more.',
      image: '/african-wildlife.png',
      cultural_elements: ['Big Five', 'Conservation', 'Nature Photography'],
    },
    {
      id: 3,
      title: 'Ghanaian Village Life',
      description: 'Connect with vibrant communities and experience authentic African hospitality and traditions.',
      image: '/ghana-village.png',
      cultural_elements: ['Community Tourism', 'Local Culture', 'Culinary Arts'],
    },
    {
      id: 4,
      title: 'African-European Fusion',
      description: 'Discover luxury experiences blending African cultural richness with European sophistication.',
      image: '/africa-europe-blend.png',
      cultural_elements: ['Luxury Travel', 'Cultural Blend', 'Modern Africa'],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-accent/3 to-background relative overflow-hidden">
      {/* Decorative Ghanaian patterns */}
      <div className="absolute top-10 right-10 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(/ghana-cultural.png)',
          backgroundSize: 'cover',
          borderRadius: '50%',
        }}
      />
      <div className="absolute bottom-10 left-10 w-80 h-80 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(/ghana-cultural.png)',
          backgroundSize: 'cover',
          borderRadius: '50%',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience Rich African Heritage
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-accent to-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From Ghanaian cultural treasures to breathtaking African wildlife, discover the beauty and diversity of a magnificent continent.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={highlight.id}
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
              }}
            >
              <Card className="overflow-hidden h-full border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group bg-card/50 backdrop-blur-sm">
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {highlight.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {highlight.description}
                  </p>

                  {/* Cultural tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {highlight.cultural_elements.map((element) => (
                      <span
                        key={element}
                        className="text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 rounded-full"
                      >
                        {element}
                      </span>
                    ))}
                  </div>

                  {/* Learn more link */}
                  <div className="pt-2">
                    <a href="/explore" className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-2 group">
                      Explore Experiences
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
