'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { GlobalHeader } from '@/components/layout/GlobalHeader';

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'STUDENT',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            // Store token
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));

            // Redirect based on role
            const role = data.data.user.role;
            if (role === 'ADMIN') {
                router.push('/admin/dashboard');
            } else if (role === 'TEACHER') {
                router.push('/teacher/dashboard');
            } else {
                router.push('/student/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const quickLogin = (role: string, email: string) => {
        setFormData({
            ...formData,
            email,
            password: 'password123',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <GlobalHeader />

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Card className="border-none shadow-2xl rounded-none">
                        <CardHeader className="text-center pb-0">
                            <CardTitle className="text-2xl font-black text-gray-900 uppercase italic">
                                {isLogin ? 'Login' : 'Registration'}
                            </CardTitle>
                            <div className="w-12 h-1.5 bg-[#ee1d23] mx-auto mt-2 rounded-full"></div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {!isLogin && (
                                    <Input
                                        type="text"
                                        label="Full Name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        fullWidth
                                        required={!isLogin}
                                    />
                                )}

                                <Input
                                    type="email"
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    fullWidth
                                    required
                                />

                                <Input
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    fullWidth
                                    required
                                />

                                {/* Registration is student-only */}

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase italic rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" fullWidth loading={loading} className="py-6 rounded-md bg-black hover:bg-[#a81c22] font-black italic uppercase tracking-widest text-sm">
                                    {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
                                </Button>
                            </form>

                            <div className="mt-8 text-center pt-6 border-t border-gray-50">
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                    }}
                                    className="text-xs font-black text-gray-400 hover:text-[#a81c22] uppercase tracking-widest transition-colors"
                                >
                                    {isLogin
                                        ? "New to Academy? Sign Up"
                                        : 'Already have an account? Login'}
                                </button>
                            </div>

                            {isLogin && (
                                <div className="mt-8 p-6 bg-gray-50/50 rounded-md border border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 mb-4 text-center uppercase tracking-widest italic">Rapid Demo Access</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { role: 'ADMIN', email: 'admin@examtracker.com', color: 'hover:bg-gray-900 hover:text-white' },
                                            { role: 'TEACHER', email: 'teacher@examtracker.com', color: 'hover:bg-[#a81c22] hover:text-white' },
                                            { role: 'STUDENT', email: 'student1@examtracker.com', color: 'hover:bg-[#a81c22] hover:text-white' }
                                        ].map((item) => (
                                            <button
                                                key={item.role}
                                                type="button"
                                                onClick={() => quickLogin(item.role, item.email)}
                                                className={`w-full py-3 px-4 rounded border border-gray-200 bg-white text-[10px] font-black italic uppercase tracking-widest text-gray-400 transition-all ${item.color} hover:border-transparent hover:shadow-lg`}
                                            >
                                                Login as {item.role}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
