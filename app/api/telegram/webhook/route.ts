import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || 'default-secret';

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-telegram-bot-api-secret-token');
    
    if (secret !== TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();

    // Handle different Telegram updates
    if (body.message) {
      const text = body.message.text || '';
      const chatId = body.message.chat.id;

      if (text === '/start') {
        await prisma.user.upsert({
          where: { telegramId: chatId.toString() },
          update: { username: body.message.from.username || null },
          create: {
            telegramId: chatId.toString(),
            username: body.message.from.username || null
          }
        });

        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: 'Selamat datang! Kirim /order untuk memesan service.'
          })
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[telegram/webhook] failed:', err.message);
    return NextResponse.json({ ok: false, error: 'Webhook failed' }, { status: 500 });
  }
}
