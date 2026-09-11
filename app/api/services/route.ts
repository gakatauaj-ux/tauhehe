import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST() {
  try {
    // Sync services - in production, this would pull from a real provider
    const services = [
      {
        providerServiceId: 'svc_1',
        name: 'Instagram Followers',
        type: 'service',
        rate: 0.5,
        min: 10,
        max: 1000,
        refill: false,
        cancel: true,
        description: 'Get Instagram followers',
        category: 'Social Media'
      },
      {
        providerServiceId: 'svc_2',
        name: 'YouTube Views',
        type: 'service',
        rate: 0.3,
        min: 100,
        max: 5000,
        refill: false,
        cancel: true,
        description: 'Get YouTube views',
        category: 'Social Media'
      }
    ];

    let created = 0;
    let updated = 0;

    for (const svc of services) {
      const category = await prisma.category.upsert({
        where: { name: svc.category },
        update: {},
        create: { name: svc.category },
      });

      const existing = await prisma.service.findUnique({
        where: { providerServiceId: svc.providerServiceId },
      });

      await prisma.service.upsert({
        where: { providerServiceId: svc.providerServiceId },
        update: {
          name: svc.name,
          type: svc.type,
          supplierRate: svc.rate,
          min: svc.min,
          max: svc.max,
          refillSupported: svc.refill,
          cancelSupported: svc.cancel,
          description: svc.description,
          categoryId: category.id,
          lastSyncedAt: new Date(),
        },
        create: {
          providerServiceId: svc.providerServiceId,
          name: svc.name,
          type: svc.type,
          supplierRate: svc.rate,
          min: svc.min,
          max: svc.max,
          refillSupported: svc.refill,
          cancelSupported: svc.cancel,
          description: svc.description,
          categoryId: category.id,
          requiredParams: ['link', 'quantity'],
        },
      });

      existing ? updated++ : created++;
    }

    return NextResponse.json({ ok: true, created, updated, total: services.length });
  } catch (err: any) {
    console.error('[services/sync] failed:', err.message);
    return NextResponse.json({ ok: false, error: 'Sync failed' }, { status: 500 });
  }
}
