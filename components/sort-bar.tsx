'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface SortBarProps {
  resultCount: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFiltersClick: () => void;
  showFiltersButton?: boolean;
}

export function SortBar({
  resultCount,
  sortBy,
  onSortChange,
  onFiltersClick,
  showFiltersButton = true,
}: SortBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 p-4 md:p-6 bg-card/80 backdrop-blur-md border border-primary/20 rounded-lg">
      {/* Result Count */}
      <div className="text-sm md:text-base">
        <span className="text-muted-foreground">Showing </span>
        <span className="font-semibold text-primary">{resultCount}</span>
        <span className="text-muted-foreground"> experiences</span>
      </div>

      {/* Right side - Sort & Filters */}
      <div className="flex items-center gap-3">
        {/* Mobile Filters Button */}
        {showFiltersButton && (
          <Button
            onClick={onFiltersClick}
            variant="outline"
            size="sm"
            className="md:hidden border-primary/50 hover:bg-primary/10 text-primary font-semibold"
          >
            <Menu className="w-4 h-4 mr-2" />
            Filters
          </Button>
        )}

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground font-medium hidden sm:inline">
            Sort by:
          </label>
          <Select value={sortBy} onValueChange={(v) => onSortChange(v ?? 'relevant')}>
            <SelectTrigger className="w-40 md:w-48 border-primary/30 bg-background hover:border-primary/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/20">
              <SelectItem value="relevant">Most Relevant</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
