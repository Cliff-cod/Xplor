import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  const resolvedParams = await params;
  const dimensions = resolvedParams.dimensions || [];
  
  const width = dimensions[0] || '800';
  
  if (width === '64' || width === '48') {
    return NextResponse.redirect(new URL('/placeholder-user.jpg', request.url));
  }
  
  return NextResponse.redirect('https://images.unsplash.com/photo-1504280390467-339e1455d35d?auto=format&fit=crop&w=' + width + '&q=80');
}
