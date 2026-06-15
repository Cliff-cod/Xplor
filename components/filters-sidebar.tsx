'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/lib/mock-data';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  city: string;
  category: string;
  priceRange: [number, number];
  minRating: number;
}

const DEFAULT_FILTERS: FilterState = {
  city: '',
  category: 'All',
  priceRange: [0, 500],
  minRating: 0,
};

export function FiltersSidebar({ onFilterChange, initialFilters }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters || DEFAULT_FILTERS);

  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      onFilterChange(newFilters);
    },
    [onFilterChange]
  );

  const handleCityChange = (value: string) => {
    handleFilterChange({ ...filters, city: value });
  };

  const handleCategoryChange = (category: string) => {
    handleFilterChange({ ...filters, category });
  };

  const handlePriceChange = (value: number | readonly number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      handleFilterChange({ ...filters, priceRange: [value[0], value[1]] });
    }
  };

  const handleRatingChange = (rating: number) => {
    handleFilterChange({ ...filters, minRating: rating });
  };

  const handleReset = () => {
    handleFilterChange(DEFAULT_FILTERS);
  };

  return (
    <div className="space-y-4">
      {/* Filters Header */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-foreground mb-2">Filters</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
      </div>

      {/* City Filter */}
      <Card className="card-premium border border-primary/20 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground">City</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Search city..."
            value={filters.city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="border-primary/30 bg-background/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
          />
          {filters.city && (
            <div className="text-xs text-primary font-medium">
              Filtering: {filters.city}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="card-premium border border-primary/20 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filters.category === cat
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'bg-muted text-foreground hover:bg-primary/20 border border-transparent hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card className="card-premium border border-primary/20 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            min={0}
            max={500}
            step={10}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between items-center bg-background/50 p-3 rounded-lg border border-primary/20">
            <div className="text-sm">
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground font-semibold ml-1">{filters.priceRange[0]}</span>
            </div>
            <div className="text-muted-foreground text-xs">to</div>
            <div className="text-sm">
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground font-semibold ml-1">{filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card className="card-premium border border-primary/20 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {[0, 3, 4, 4.5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filters.minRating === rating
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'bg-muted text-foreground hover:bg-primary/20 border border-transparent hover:border-primary/30'
                }`}
              >
                {rating === 0 ? 'All' : `${rating}★`}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <Button
        onClick={handleReset}
        variant="outline"
        className="w-full border-primary/50 hover:bg-primary/10 text-primary font-semibold mt-6 transition-all duration-200"
      >
        Reset All Filters
      </Button>
    </div>
  );
}
