import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: 'default' }
        });

        if (!settings) {
            // Create default settings if not exists
            settings = await prisma.siteSettings.create({
                data: {
                    id: 'default',
                    siteName: 'Namelyze Law Academy',
                    siteTagline: 'ব্যতিক্রমধর্মী আইন শিক্ষা প্রতিষ্ঠান',
                    contactEmail: 'namelyzelaw@gmail.com',
                    contactPhone: '০১৬২২-২৪১০০৪',
                    address: 'ফার্মগেট শাখাঃ ৬৮/১, কনকর্ড টাওয়ার (৪র্থ তলা), গ্রিন রোড, ফার্মগেট, ঢাকা-১২১৫',
                    facebookUrl: 'https://facebook.com/namelyzelaw',
                    youtubeUrl: 'https://youtube.com/@namelyzelaw',
                    heroSliders: JSON.stringify([
                        {
                            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
                            title: 'আইন শিক্ষায় নতুন দিগন্ত',
                            subtitle: 'Namelyze Law Academy provides premium legal education.',
                            link: '/courses'
                        }
                    ])
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, updatedAt, ...updateData } = body;

        const settings = await prisma.siteSettings.upsert({
            where: { id: 'default' },
            create: {
                id: 'default',
                ...updateData
            },
            update: updateData
        });

        return NextResponse.json({ success: true, data: settings });
    } catch (error) {
        console.error('Settings update error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
    }
}
