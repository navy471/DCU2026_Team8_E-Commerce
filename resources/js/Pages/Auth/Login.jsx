import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {/* Logo & Header Section */}
            <div className="mb-6 text-center space-y-2">
                <Link href="/" className="inline-block">
                    <img 
                        src="/images/logo.png" 
                        alt="G4 Auto Care Logo" 
                        className="h-16 w-auto mx-auto object-contain transition-transform hover:scale-105" 
                    />
                </Link>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight pt-2">
                    Login to Your Account
                </h2>
                <p className="text-sm text-gray-500">
                    Please enter your email and password to continue
                </p>
            </div>

            {/* Status Alert */}
            {status && (
                <div className="mb-4 text-sm font-medium text-green-700 bg-green-50 p-3 rounded-xl border border-green-200">
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
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-600" />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel htmlFor="password" value="Password" className="font-semibold text-gray-700" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm shadow-sm transition"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-600" />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm pt-1">
                    <label className="flex items-center cursor-pointer select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="ms-2 text-sm text-gray-600 hover:text-gray-900">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-md transition duration-150 disabled:opacity-50" 
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : 'Login'}
                    </PrimaryButton>
                </div>

                {/* Register Link */}
                <div className="text-center pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="font-bold text-red-600 hover:text-red-700 hover:underline transition"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}