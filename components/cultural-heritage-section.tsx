'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const culturalElements = [
  {
    title: 'Kente Cloth Weaving',
    description: 'Learn the ancient art of creating Ghana\'s iconic handwoven Kente cloth, where each pattern tells a story',
    image: '/ghanaian-kente.png',
    region: 'Ashanti Region',
  },
  {
    title: 'Adinkra Symbols',
    description: 'Explore the wisdom and philosophy behind Ghanaian Adinkra symbols through cultural immersion experiences',
    image: '/ghanaian-cultural.png',
    region: 'Central Ghana',
  },
  {
    title: 'Traditional Drumming',
    description: 'Connect with the rhythmic heartbeat of Ghana through authentic traditional drumming workshops',
    image: '/african-pattern.png',
    region: 'Multiple Locations',
  },
];

export function CulturalHeritageSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{
      background: `linear-gradient(135deg, oklch(0.4 0.09 45) 0%, oklch(0.42 0.08 40) 100%), url('/bg-ghana-pattern.png')`,
      backgroundSize: 'auto, 300px',
      backgroundAttachment: 'scroll, scroll',
    }}>
      {/* Decorative elements - static for performance */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-on-rich mb-4">
            Ghanaian Cultural Heritage
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />
          <p className="text-xl text-white/80">
            Immerse yourself in the rich traditions, art forms, and spiritual wisdom of Ghana&apos;s diverse cultural heritage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {culturalElements.map((element, index) => (
            <div
              key={element.title}
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              <Card className="card-premium overflow-hidden h-full hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 group">
                <CardContent className="p-0">
                  <div className="relative h-72 w-full overflow-hidden bg-muted">
                    <Image
                      src={element.image}
                      alt={element.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 bg-gradient-to-b from-card/95 to-card">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {element.title}
                    </h3>

                    <p className="text-white/80 mb-4 text-sm leading-relaxed">
                      {element.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-accent/30">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        📍 {element.region}
                      </span>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white rounded-full text-xs font-semibold"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* European + African Blend Section */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:border-primary/60 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-up">
              <h3 className="text-3xl font-bold text-on-rich mb-4">
                Where Africa Meets Europe
              </h3>
              <p className="text-white/85 text-lg mb-6 leading-relaxed">
                Ghana&apos;s colonial heritage sites blend European architecture with African sophistication. Experience the richness of this historical intersection through curated tours that respect both cultures.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-white/80">Historic fortress tours with cultural context</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-white/80">Colonial architecture workshops</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-white/80">Cultural fusion cuisine experiences</span>
                </li>
              </ul>
              <Button className="mt-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold rounded-full px-8 py-3 shadow-lg">
                Explore Heritage Tours
              </Button>
            </div>

            <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl group/img animate-scale-in">
              <Image
                src="/ghanaian-cultural.png"
                alt="Ghana cultural heritage blend"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
