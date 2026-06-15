import Link from 'next/link';

export default function MyBookingsPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold text-foreground mb-4">My Bookings</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />
        <p className="text-muted-foreground mb-8">
          Your booking was confirmed successfully!
        </p>
        <Link
          href="/explore"
          className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all"
        >
          Explore More Experiences
        </Link>
      </div>
    </main>
  );
}