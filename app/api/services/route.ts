import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: { category: true }
    });

    return NextResponse.json({ services });
  } catch (err: any) {
    console.error('[services] failed:', err.message);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
