import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-5xl font-bold mb-8'>Welcome to Our Store</h1>
      <p className='text-lg mb-4'>Explore our amazing products.</p>
      <Link href='/products'>
        <Button
          className='px-6 py-3 text-2xl my-10 bg-neutral-600 w-96 h-20'
          variant='outline'
        >
          All Products
        </Button>
      </Link>
    </main>
  );
}
