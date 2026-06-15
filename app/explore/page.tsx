'use client';

import { useState, useMemo, useEffect } from 'react';
import { FiltersSidebar, FilterState } from '@/components/filters-sidebar';
import { ExperienceCard } from '@/components/experience-card';
import { SortBar } from '@/components/sort-bar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Experience } from '@/lib/mock-data';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    city: '',
    category: 'All',
    priceRange: [0, 500],
    minRating: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experiences')
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch experiences:', err);
        setLoading(false);
      });
  }, []);

  const filteredExperiences = useMemo(() => {
    let results = experiences.filter((experience) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.location.city.toLowerCase().includes(searchQuery.toLowerCase());

      // City filter
      const matchesCity =
        filters.city === '' ||
        experience.location.city.toLowerCase().includes(filters.city.toLowerCase());

      // Category filter
      const matchesCategory = filters.category === 'All' || experience.category === filters.category;

      // Price filter
      const matchesPrice =
        experience.price >= filters.priceRange[0] && experience.price <= filters.priceRange[1];

      // Rating filter
      const matchesRating = experience.rating >= filters.minRating;

      return matchesSearch && matchesCity && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort results
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        results.sort((a, b) => Math.random() - 0.5);
        break;
      default:
        break;
    }

    return results;
  }, [experiences, filters, searchQuery, sortBy]);

  const displayedExperiences = filteredExperiences.slice(0, displayCount);
  const hasMore = displayCount < filteredExperiences.length;

  const handleClearFilters = () => {
    setFilters({
      city: '',
      category: 'All',
      priceRange: [0, 500],
      minRating: 0,
    });
    setSearchQuery('');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading experiences...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative">
      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setShowMobileFilters(false)} />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Explore</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Explore Experiences
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
          <p className="text-lg text-muted-foreground">
            Discover authentic African experiences curated just for you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex gap-2 bg-card rounded-lg p-3 border border-primary/20 hover:border-primary/40 transition-colors shadow-lg">
            <Search className="w-5 h-5 text-primary my-auto flex-shrink-0" />
            <Input
              placeholder="Search experiences by title, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-72 flex-shrink-0 animate-slide-in-left">
            <FiltersSidebar onFilterChange={setFilters} initialFilters={filters} />
          </aside>

          {/* Mobile Filters Drawer */}
          <aside
            className={`fixed left-0 top-0 h-screen w-72 bg-background border-r border-primary/20 z-40 overflow-y-auto transition-transform duration-300 md:hidden ${
              showMobileFilters ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-4 border-b border-primary/20 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm">
              <h2 className="font-bold text-foreground">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FiltersSidebar onFilterChange={setFilters} initialFilters={filters} />
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1">
            {/* Sort Bar */}
            {filteredExperiences.length > 0 && (
              <SortBar
                resultCount={filteredExperiences.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onFiltersClick={() => setShowMobileFilters(!showMobileFilters)}
                showFiltersButton={true}
              />
            )}

            {/* Experience Grid or Empty State */}
            {filteredExperiences.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedExperiences.map((experience, index) => (
                    <div
                      key={experience.id}
                      style={{
                        animation: `fadeInUp 0.7s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      <ExperienceCard experience={experience} />
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <Button
                      onClick={() => setDisplayCount(displayCount + 6)}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold rounded-full px-12 py-3 shadow-lg transition-all hover:shadow-xl"
                    >
                      Load More Experiences
                    </Button>
                  </div>
                )}

                {/* All Loaded Message */}
                {!hasMore && displayedExperiences.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Showing all {filteredExperiences.length} experiences
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    No experiences found
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    We couldn&apos;t find any experiences matching your filters. Try adjusting your search or
                    clearing some filters to see more options.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={handleClearFilters}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold rounded-full px-8 py-2"
                    >
                      Clear All Filters
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary/50 hover:bg-primary/10 text-primary font-semibold rounded-full px-8 py-2"
                      onClick={() => setSearchQuery('')}
                    >
                      Reset Search
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}