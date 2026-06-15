import { BookingForm } from '@/components/booking-form';
import { docClient, TABLES } from '@/lib/dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ experienceId: string }>;
  searchParams: Promise<{ guests?: string; date?: string }>;
}

export default async function BookingPage({ params, searchParams }: PageProps) {
  const { experienceId } = await params;
  const { guests = '1', date = '' } = await searchParams;

  const result = await docClient.send(
    new GetCommand({
      TableName: TABLES.EXPERIENCES,
      Key: { id: experienceId },
    })
  );

  const experience = result.Item;

  if (!experience) {
    notFound();
  }

  const guestCount = parseInt(guests, 10);

  return (
    <main className="min-h-screen bg-background">
      <BookingForm
        experience={experience as any}
        guestCount={Math.min(guestCount, experience.maxGuests)}
        selectedDate={date}
      />
    </main>
  );
}