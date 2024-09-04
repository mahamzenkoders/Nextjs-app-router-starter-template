import React from 'react';
import { notFound } from 'next/navigation'; // 404 error handling
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: 'no-store', // Ensures fresh data
    });

    if (!res.ok) {
      notFound(); // Trigger 404 when we won't get any data
    }

    const product: Product = await res.json();

    return (
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-4'>Product Info</h1>
        <div className='bg-white shadow-md rounded-lg p-10'>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={550}
            height={500}
            className='object-cover rounded-lg mb-4'
          />
          <h2 className='text-2xl font-semibold mb-2'>{product.title}</h2>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <p className='text-xl font-bold text-green-600'>
            Price: ${product.price}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);

    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-lg text-gray-500'>
          Error loading product information
        </p>
      </div>
    );
  }
};

export default ProductPage;
