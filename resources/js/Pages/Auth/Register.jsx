import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

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
                    Create New Account
                </h2>
                <p className="text-sm text-gray-500">
                    Please fill in the information below to register
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="font-semibold text-gray-700" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="e.g. John Doe"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm shadow-sm transition"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1.5 text-xs text-red-600" />
                </div>

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
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-600" />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="font-semibold text-gray-700"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="••••••••"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm shadow-sm transition"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs text-red-600"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-md transition duration-150 disabled:opacity-50" 
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : 'Register'}
                    </PrimaryButton>
                </div>

                {/* Login Link */}
                <div className="text-center pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="font-bold text-red-600 hover:text-red-700 hover:underline transition"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}