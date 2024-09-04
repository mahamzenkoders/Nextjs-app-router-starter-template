'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated for Next.js 13+
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { setCookieClientSideFn } from '@/utils/storage.util';

const LoginPage = () => {
  // State to manage form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic validation
    if (!username || !password) {
      setError('Both username and password are required.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // API call
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      console.log(data);

      // Handle successful login by setting a cookie
      setCookieClientSideFn('accessToken', data.token, { maxAge: 3600 }); // Cookie expires in 1 hour

      // Redirect to home page or desired route
      router.push('/'); // Use router.push for client-side navigation
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='bg-slate-800 h-screen flex items-center justify-center p-10'>
      <div className='grid w-full h-full grid-cols-1 bg-white md:grid-cols-2'>
        <div className='bg-[#021735] text-white flex items-center justify-center flex-col'>
          <div className='my-4'>
            <h1 className='text-7xl mb-6 font-semibold font-serif'>
              Login Form
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Label
              className='text-2xl'
              htmlFor='username'
            >
              Username
            </Label>
            <Input
              className='my-4 h-10 w-96 mb-4'
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Enter Your Username'
            />
            <Label
              className='text-2xl'
              htmlFor='password'
            >
              Password
            </Label>
            <Input
              className='my-4 h-10 w-96 mb-10 text-black'
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Your Password'
            />
            <Button
              type='submit'
              className='flex items-center w-full gap-4 px-12 bg-transparent rounded-full hover:bg-[#516fb644]'
              variant='outline'
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login Now'}
            </Button>
            {error && <p className='text-red-500 mt-4'>{error}</p>}
          </form>
        </div>
        <div className='relative hidden md:block'>
          <Image
            className='h-full w-full object-cover'
            src='https://img.freepik.com/free-vector/futuristic-background-design_23-2148503793.jpg'
            alt='Login Image'
            fill={true}
          />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
