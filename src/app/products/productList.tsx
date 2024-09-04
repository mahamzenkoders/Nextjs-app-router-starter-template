'use client'; //Client Component

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductsListProps {
  products: Product[];
  page: number;
  totalPages: number;
}

export const ProductsList = ({
  products,
  page,
  totalPages,
}: ProductsListProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`/products?page=${newPage}`);
    }
  };

  const handleViewDetails =
    (productId: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      router.push(`/products/${productId}`);
    };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.map(product => (
          <div
            key={product.id}
            className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center'
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              className='object-cover mb-4 rounded-lg'
            />
            <h2 className='text-xl font-semibold mb-2'>{product.title}</h2>
            <p className='text-gray-700 mb-4'>{product.description}</p>
            <span className='text-lg font-bold mb-2'>${product.price}</span>
            <Button
              onClick={handleViewDetails(product.id)}
              variant='outline'
              className='w-full mt-auto'
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
      <div className='mt-8 flex justify-between items-center'>
        <Button
          variant='outline'
          className='px-4 py-2'
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant='outline'
          className='px-4 py-2'
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
};
