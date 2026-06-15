import { HeroSection } from '@/components/hero-section';
import { CategoriesSection } from '@/components/categories-section';
import { FeaturedExperiences } from '@/components/featured-experiences';
import { WildlifeSection } from '@/components/wildlife-section';
import { CulturalHeritageSection } from '@/components/cultural-heritage-section';
import { mockExperiences } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CategoriesSection />
      <FeaturedExperiences experiences={mockExperiences} />
      <WildlifeSection />
      <CulturalHeritageSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Share Your African Story
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become a host and showcase your heritage, expertise, and unique African experiences to travelers worldwide.
          </p>
          <a href="/host/create-listing">
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-primary/30">
              Start Hosting
            </button>
          </a>
        </div>
      </section>
    </main>
  );
}
