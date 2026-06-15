'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ListingsTab } from '@/components/listings-tab';
import { BookingsTab } from '@/components/bookings-tab';
import { getMockHostListings } from '@/lib/mock-data';
import Link from 'next/link';

const CURRENT_HOST_ID = 'host1';

export default function HostDashboard() {
  const [activeTab, setActiveTab] = useState('listings');

  const listings = getMockHostListings(CURRENT_HOST_ID);
  const bookings = [
    {
      id: 'booking1',
      experienceId: 'exp1',
      userId: 'user1',
      checkInDate: '2024-07-20',
      checkOutDate: '2024-07-20',
      guestCount: 2,
      status: 'confirmed' as const,
      totalPrice: 178,
      travelerDetails: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1 (555) 111-2222',
      },
      createdAt: '2024-06-01',
    },
    {
      id: 'booking2',
      experienceId: 'exp6',
      userId: 'user2',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-15',
      guestCount: 4,
      status: 'completed' as const,
      totalPrice: 380,
      travelerDetails: {
        name: 'Bob Smith',
        email: 'bob@example.com',
        phone: '+1 (555) 222-3333',
      },
      createdAt: '2024-05-20',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-foreground">Host Dashboard</h1>
            <Link href="/host/create-listing">
              <Button className="bg-primary hover:bg-primary/90 text-white hidden sm:inline-block">
                + New Listing
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Listings</p>
                <p className="text-3xl font-bold text-primary">{listings.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Bookings</p>
                <p className="text-3xl font-bold text-primary">
                  {bookings.reduce((sum, b) => sum + (b.status === 'confirmed' ? 1 : 0), 0)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Views</p>
                <p className="text-3xl font-bold text-primary">
                  {listings.reduce((sum, l) => sum + l.views, 0)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-primary">
                  $
                  {bookings
                    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
                    .reduce((sum, b) => sum + b.totalPrice, 0)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border">
          <Button
            variant={activeTab === 'listings' ? 'default' : 'ghost'}
            className={
              activeTab === 'listings'
                ? 'bg-primary hover:bg-primary/90 text-white border-b-2 border-primary rounded-none'
                : 'border-b-2 border-transparent rounded-none'
            }
            onClick={() => setActiveTab('listings')}
          >
            My Listings
          </Button>
          <Button
            variant={activeTab === 'bookings' ? 'default' : 'ghost'}
            className={
              activeTab === 'bookings'
                ? 'bg-primary hover:bg-primary/90 text-white border-b-2 border-primary rounded-none'
                : 'border-b-2 border-transparent rounded-none'
            }
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' && <ListingsTab listings={listings} />}
        {activeTab === 'bookings' && <BookingsTab bookings={bookings} />}
      </div>
    </main>
  );
}
