import { docClient, TABLES } from '@/lib/dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { notFound } from 'next/navigation';
import { ExperienceDetail } from '@/components/experience-detail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;

  const result = await docClient.send(
    new GetCommand({
      TableName: TABLES.EXPERIENCES,
      Key: { id },
    })
  );

  const experience = result.Item;

  if (!experience) {
    notFound();
  }

  return <ExperienceDetail experience={experience as any} />;
}