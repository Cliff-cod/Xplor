'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/lib/mock-data';

interface BookingsTabProps {
  bookings: Booking[];
}

export function BookingsTab({ bookings }: BookingsTabProps) {
  const upcomingBookings = bookings.filter((b) => new Date(b.checkInDate) > new Date());
  const pastBookings = bookings.filter((b) => new Date(b.checkInDate) <= new Date());

  const BookingsList = ({ bookingsList }: { bookingsList: Booking[] }) => (
    <>
      {bookingsList.length > 0 ? (
        <div className="grid gap-4">
          {bookingsList.map((booking) => (
            <Card key={booking.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        Booking #{booking.id.slice(-6)}
                      </h3>
                      <Badge
                        className={
                          booking.status === 'confirmed'
                            ? 'bg-green-500 text-white'
                            : booking.status === 'pending'
                              ? 'bg-yellow-500 text-white'
                              : booking.status === 'completed'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-500 text-white'
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Guest</p>
                        <p className="font-semibold text-foreground">
                          {booking.travelerDetails?.name || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-semibold text-foreground">
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Guests</p>
                        <p className="font-semibold text-foreground">{booking.guestCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-semibold text-primary text-lg">${booking.totalPrice}</p>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="mt-4 bg-muted rounded p-3 text-sm">
                        <p className="font-semibold text-foreground mb-1">Special Requests:</p>
                        <p className="text-muted-foreground">{booking.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No bookings yet</p>
          </CardContent>
        </Card>
      )}
    </>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Upcoming Bookings</h2>
        <BookingsList bookingsList={upcomingBookings} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Past Bookings</h2>
        <BookingsList bookingsList={pastBookings} />
      </div>
    </div>
  );
}
