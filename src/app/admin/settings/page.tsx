'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import {
    Settings as SettingsIcon,
    Globe,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Youtube,
    Instagram,
    Linkedin,
    Save,
    Image as ImageIcon,
    Plus,
    Trash2,
    Loader2
} from 'lucide-react';

export default function AdminSettingsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [settings, setSettings] = useState<any>({
        siteName: '',
        siteTagline: '',
        logoUrl: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        facebookUrl: '',
        youtubeUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        marqueeText: '',
        heroSliders: '[]'
    });

    const [sliders, setSliders] = useState<any[]>([]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                    if (data.heroSliders) {
                        try {
                            setSliders(JSON.parse(data.heroSliders));
                        } catch (e) {
                            setSliders([]);
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch settings', error);
                setMessage({ type: 'error', text: 'Failed to load settings' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (index: number, field: string, value: string) => {
        const updatedSliders = [...sliders];
        updatedSliders[index] = { ...updatedSliders[index], [field]: value };
        setSliders(updatedSliders);
    };

    const addSlider = () => {
        setSliders([...sliders, { title: 'New Slide', subtitle: '', image: '', link: '', color: '#a81c22', items: [] }]);
    };

    const removeSlider = (index: number) => {
        setSliders(sliders.filter((_, i) => i !== index));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const dataToSave = {
                ...settings,
                heroSliders: JSON.stringify(sliders)
            };

            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave)
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Settings updated successfully!' });
                // Force a scroll to top to see message
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const error = await res.json();
                setMessage({ type: 'error', text: error.error || 'Failed to update settings' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout allowedRoles={['ADMIN']}>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="animate-spin text-primary-600" size={48} />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout allowedRoles={['ADMIN']}>
            <form onSubmit={handleSave} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight italic uppercase leading-none">Site Configuration</h1>
                        <p className="text-gray-500 mt-2 font-bold italic text-sm">Manage academy branding, contact info, and homepage content.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="shadow-xl shadow-[#a81c22]/20 h-14 px-10 rounded-2xl bg-[#a81c22] font-black italic uppercase tracking-widest text-sm"
                        >
                            {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                            {isSaving ? 'SAVING...' : 'SAVE ALL SETTINGS'}
                        </Button>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-6 rounded-3xl font-black uppercase italic text-xs tracking-widest animate-in fade-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100 flex items-center gap-3' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                        {message.type === 'success' && <Save size={18} />}
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* General Branding */}
                    <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-8 border-b border-gray-100">
                            <CardTitle className="flex items-center gap-3 text-gray-900 italic font-black uppercase tracking-tight">
                                <SettingsIcon size={24} className="text-[#a81c22]" /> General Branding
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <Input
                                label="Site Name"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                fullWidth
                                placeholder="Namelyze Law Academy"
                            />
                            <TextArea
                                label="Site Tagline"
                                name="siteTagline"
                                value={settings.siteTagline}
                                onChange={handleChange}
                                fullWidth
                                placeholder="ব্যতিক্রমধর্মী আইন শিক্ষা প্রতিষ্ঠান"
                            />
                            <Input
                                label="Logo URL (Optional)"
                                name="logoUrl"
                                value={settings.logoUrl}
                                onChange={handleChange}
                                fullWidth
                                placeholder="https://example.com/logo.png"
                            />
                            <TextArea
                                label="Marquee Text (Announcement Scroll)"
                                name="marqueeText"
                                value={settings.marqueeText}
                                onChange={handleChange}
                                fullWidth
                                placeholder="ভর্তি চলছে! আজই যোগাযোগ করুন..."
                            />
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-8 border-b border-gray-100">
                            <CardTitle className="flex items-center gap-3 text-gray-900 italic font-black uppercase tracking-tight">
                                <Phone size={24} className="text-[#3498db]" /> Contact & Social
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Contact Email"
                                    name="contactEmail"
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <Input
                                    label="Contact Phone"
                                    name="contactPhone"
                                    value={settings.contactPhone}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                            <TextArea
                                label="Physical Address"
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                fullWidth
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                <Input
                                    label="Facebook URL"
                                    name="facebookUrl"
                                    value={settings.facebookUrl}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <Input
                                    label="Youtube URL"
                                    name="youtubeUrl"
                                    value={settings.youtubeUrl}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <Input
                                    label="Instagram URL"
                                    name="instagramUrl"
                                    value={settings.instagramUrl}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <Input
                                    label="LinkedIn URL"
                                    name="linkedinUrl"
                                    value={settings.linkedinUrl}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hero Sliders */}
                    <div className="lg:col-span-2">
                        <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden">
                            <CardHeader className="bg-gray-50/50 p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <CardTitle className="flex items-center gap-3 text-gray-900 italic font-black uppercase tracking-tight">
                                    <Globe size={24} className="text-[#e67e22]" /> Homepage Hero Sliders
                                </CardTitle>
                                <Button
                                    type="button"
                                    onClick={addSlider}
                                    variant="outline"
                                    className="border-dashed border-2 border-gray-300 text-gray-400 hover:text-[#a81c22] hover:border-[#a81c22] rounded-2xl font-black italic uppercase text-xs h-12 px-6 transition-all"
                                >
                                    <Plus size={16} className="mr-2" /> Add New Slide
                                </Button>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                {sliders.length === 0 && (
                                    <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                                        <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-400 font-bold italic">No sliders configured. Click "Add New Slide" to begin.</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 gap-8">
                                    {sliders.map((slider, index) => (
                                        <div key={index} className="p-8 bg-gray-50/50 rounded-[3rem] border border-gray-100 relative group transition-all hover:bg-white hover:shadow-2xl hover:ring-1 hover:ring-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => removeSlider(index)}
                                                className="absolute top-8 right-8 p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                                <div className="space-y-6">
                                                    <Input
                                                        label="Slide Title"
                                                        value={slider.title}
                                                        onChange={(e) => handleSliderChange(index, 'title', e.target.value)}
                                                        fullWidth
                                                    />
                                                    <TextArea
                                                        label="Subtitle or Description"
                                                        value={slider.subtitle}
                                                        onChange={(e) => handleSliderChange(index, 'subtitle', e.target.value)}
                                                        fullWidth
                                                    />
                                                    <Input
                                                        label="Destination URL (Link)"
                                                        value={slider.link}
                                                        onChange={(e) => handleSliderChange(index, 'link', e.target.value)}
                                                        fullWidth
                                                        placeholder="/courses"
                                                    />
                                                </div>
                                                <div className="space-y-6">
                                                    <Input
                                                        label="Background Image URL"
                                                        value={slider.image}
                                                        onChange={(e) => handleSliderChange(index, 'image', e.target.value)}
                                                        fullWidth
                                                        placeholder="https://images.unsplash.com/..."
                                                    />
                                                    <div className="h-56 w-full bg-gray-200 rounded-[2rem] overflow-hidden relative shadow-inner group-hover:shadow-md transition-all">
                                                        {slider.image ? (
                                                            <img src={slider.image} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center h-full text-gray-400 italic font-bold gap-2">
                                                                <ImageIcon size={32} />
                                                                <span>Image Preview</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="h-20"></div>
            </form>
        </DashboardLayout>
    );
}
