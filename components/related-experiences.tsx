'use client';

import { ExperienceCard } from '@/components/experience-card';
import { Experience } from '@/lib/mock-data';

interface RelatedExperiencesProps {
  experiences: Experience[];
}

export function RelatedExperiences({ experiences }: RelatedExperiencesProps) {
  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 py-12 border-t border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        You might also like
      </h2>
      <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiences.slice(0, 3).map((experience, index) => (
          <div
            key={experience.id}
            style={{
              animation: `fadeInUp 0.7s ease-out ${0.4 + index * 0.1}s both`,
            }}
          >
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
    </section>
  );
}
