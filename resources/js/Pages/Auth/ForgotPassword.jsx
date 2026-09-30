import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot password?" />

            {/* Header & Logo Section */}
            <div className="mb-6 text-center space-y-2">
                <Link href="/" className="inline-block">
                    <img 
                        src="/images/logo.png" 
                        alt="G4 Auto Care Logo" 
                        className="h-16 w-auto mx-auto object-contain transition-transform hover:scale-105" 
                    />
                </Link>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight pt-2">
                    Forgot your password?
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            {/* Status Alert */}
            {status && (
                <div className="mb-4 text-sm font-medium text-green-700 bg-green-50 p-3.5 rounded-xl border border-green-200">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="font-semibold text-gray-700" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="e.g. name@example.com"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm shadow-sm transition"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-600" />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-md transition duration-150 disabled:opacity-50" 
                        disabled={processing}
                    >
                        {processing ? 'Sending...' : 'Send Password Reset Link'}
                    </PrimaryButton>
                </div>

                {/* Back to Login Link */}
                <div className="text-center pt-3 border-t border-gray-100">
                    <Link
                        href={route('login')}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-red-600 transition"
                    >
                        <span>←</span> Back to Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}