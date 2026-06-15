'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Listing } from '@/lib/mock-data';
import { Eye, BookOpen, Star, Trash2, Edit2 } from 'lucide-react';

interface ListingsTabProps {
  listings: Listing[];
}

export function ListingsTab({ listings }: ListingsTabProps) {
  const [selectedListings, setSelectedListings] = useState<Set<string>>(new Set());

  const toggleSelectListing = (id: string) => {
    const newSelected = new Set(selectedListings);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedListings(newSelected);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Listings</h2>
        <Link href="/host/create-listing">
          <Button className="bg-primary hover:bg-primary/90 text-white">+ Create New Listing</Button>
        </Link>
      </div>

      {listings.length > 0 ? (
        <div className="grid gap-4">
          {listings.map((listing) => (
            <Card key={listing.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Listing Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{listing.title}</h3>
                      <Badge
                        className={
                          listing.status === 'active'
                            ? 'bg-green-500 text-white'
                            : listing.status === 'inactive'
                              ? 'bg-gray-500 text-white'
                              : 'bg-yellow-500 text-white'
                        }
                      >
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {listing.location.city}, {listing.location.country}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{listing.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{listing.bookings} bookings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary">${listing.price}/person</span>
                      </div>
                    </div>

                    {/* Category & Duration */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-border">
                        {listing.category}
                      </Badge>
                      <Badge variant="outline" className="border-border">
                        {listing.duration.value} {listing.duration.unit}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link href={`/experiences/${listing.id}`}>
                      <Button variant="outline" size="sm" className="w-full border-border">
                        <Eye size={16} className="mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full border-border">
                      <Edit2 size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-border hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">No listings yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first experience listing to start hosting!
            </p>
            <Link href="/host/create-listing">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Create Your First Listing
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
