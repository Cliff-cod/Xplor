'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WildlifeAndCulture() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/5 via-background to-accent/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Wildlife Image */}
          <div className="animate-slide-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
              <Image
                src="/african-wildlife.png"
                alt="African Wildlife Safari"
                width={600}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="animate-slide-in-right space-y-6">
            <div>
              <span className="text-primary font-bold text-sm tracking-wider uppercase">
                Wildlife & Conservation
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                Encounter Africa's Majesty
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the raw beauty and majesty of African wildlife in their natural habitat. From the iconic Big Five to countless other species, witness the intricate balance of nature and contribute to conservation efforts.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-2xl">🦁</div>
                <div>
                  <h4 className="font-semibold text-foreground">Big Five Safari</h4>
                  <p className="text-sm text-muted-foreground">Lions, elephants, buffalo, leopards, and rhinos</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="text-2xl">🦒</div>
                <div>
                  <h4 className="font-semibold text-foreground">Birdwatching Paradise</h4>
                  <p className="text-sm text-muted-foreground">Over 2,000 bird species across the continent</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-2xl">🌿</div>
                <div>
                  <h4 className="font-semibold text-foreground">Conservation Tourism</h4>
                  <p className="text-sm text-muted-foreground">Support wildlife protection and habitat restoration</p>
                </div>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg shadow-lg mt-6">
              Start Your Safari
            </Button>
          </div>
        </div>

        {/* Bottom Section - Cultural Blend */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="animate-slide-in-left space-y-6 order-2 lg:order-1">
            <div>
              <span className="text-accent font-bold text-sm tracking-wider uppercase">
                Cultural Fusion
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                Where Cultures Converge
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the harmonious blend of African heritage and European elegance. From luxury eco-lodges with traditional design elements to world-class amenities celebrating local artistry.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="text-2xl">🏛️</div>
                <div>
                  <h4 className="font-semibold text-foreground">Premium Accommodations</h4>
                  <p className="text-sm text-muted-foreground">Luxury stays with authentic African design</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-2xl">🍽️</div>
                <div>
                  <h4 className="font-semibold text-foreground">Culinary Excellence</h4>
                  <p className="text-sm text-muted-foreground">Modern cuisine with traditional African flavors</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="text-2xl">🎨</div>
                <div>
                  <h4 className="font-semibold text-foreground">Artistic Heritage</h4>
                  <p className="text-sm text-muted-foreground">Curated local art and traditional craftsmanship</p>
                </div>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg shadow-lg mt-6">
              Discover Premium Experiences
            </Button>
          </div>

          {/* Right - Image */}
          <div className="animate-slide-in-right order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
              <Image
                src="/africa-europe-blend.png"
                alt="African European Blend"
                width={600}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
