'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMockBookings } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const bookings = getMockBookings();

  const upcomingBookings = bookings.filter((b) => new Date(b.checkInDate) > new Date());
  const pastBookings = bookings.filter((b) => new Date(b.checkInDate) <= new Date());

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">John Traveler</h1>
              <p className="text-muted-foreground mb-4">Joined in March 2024</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-primary">{bookings.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-primary">
                    ${bookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reviews Given</p>
                  <p className="text-2xl font-bold text-primary">0</p>
                </div>
              </div>
              <Button variant="outline" className="border-border">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border">
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
          <Button
            variant={activeTab === 'reviews' ? 'default' : 'ghost'}
            className={
              activeTab === 'reviews'
                ? 'bg-primary hover:bg-primary/90 text-white border-b-2 border-primary rounded-none'
                : 'border-b-2 border-transparent rounded-none'
            }
            onClick={() => setActiveTab('reviews')}
          >
            My Reviews
          </Button>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Upcoming Trips</h2>
              {upcomingBookings.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold text-foreground">
                                Italian Cooking Class
                              </h3>
                              <Badge className="bg-green-500 text-white">Confirmed</Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-semibold text-foreground">
                                  {new Date(booking.checkInDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Location</p>
                                <p className="font-semibold text-foreground">Rome, Italy</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Guests</p>
                                <p className="font-semibold text-foreground">{booking.guestCount}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Total</p>
                                <p className="font-semibold text-primary text-lg">${booking.totalPrice}</p>
                              </div>
                            </div>

                            <Button variant="outline" size="sm" className="border-border">
                              View Details
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
                    <p className="text-muted-foreground">No upcoming trips</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Past Trips</h2>
              {pastBookings.length > 0 ? (
                <div className="grid gap-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold text-foreground">
                                Mountain Hiking Adventure
                              </h3>
                              <Badge className="bg-blue-500 text-white">Completed</Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-semibold text-foreground">
                                  {new Date(booking.checkInDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Location</p>
                                <p className="font-semibold text-foreground">Interlaken, Switzerland</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Guests</p>
                                <p className="font-semibold text-foreground">{booking.guestCount}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Total</p>
                                <p className="font-semibold text-primary text-lg">${booking.totalPrice}</p>
                              </div>
                            </div>

                            <Button variant="outline" size="sm" className="border-border">
                              Write a Review
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
                    <p className="text-muted-foreground">No past trips yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">No reviews yet</h3>
                <p className="text-muted-foreground">
                  Once you complete a booking, you&apos;ll be able to leave a review for the host.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
