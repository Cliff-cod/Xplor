'use client';

import { ExperienceCard } from '@/components/experience-card';
import { Experience } from '@/lib/mock-data';

interface FeaturedExperiencesProps {
  experiences: Experience[];
}

export function FeaturedExperiences({ experiences }: FeaturedExperiencesProps) {
  return (
    <section className="py-20 relative overflow-hidden" style={{
      background: `linear-gradient(135deg, oklch(0.35 0.08 45) 0%, oklch(0.38 0.08 40) 100%), url('/bg-ghana-pattern.png')`,
      backgroundSize: 'auto, 300px',
      backgroundAttachment: 'scroll, scroll',
      backgroundPosition: '0 0, 0 0',
    }}>
      {/* Decorative elements - remove pulse animations for performance */}
      <div className="absolute top-20 left-5 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" style={{ opacity: 0.7 }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="animate-fade-in-up mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-on-rich mb-3">
            Featured Experiences
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
          <p className="text-white/80 mt-4 text-lg">
            Handpicked African adventures and cultural immersions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.slice(0, 6).map((experience, index) => (
            <div
              key={experience.id}
              style={{
                animation: `fadeInUp 0.7s ease-out ${index * 0.15}s both`,
              }}
            >
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
