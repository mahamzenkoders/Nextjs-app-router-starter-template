//Server Component
import React from 'react';
import { ProductsList } from './productList';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = parseInt(searchParams.page || '1', 10); //Current Page URL
  const itemsPerPage = 5;

  // Fetching data from the server
  const res = await fetch('https://dummyjson.com/products', {
    cache: 'no-store', // Using this we'll get fresh data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products'); //If error
  }

  const data = await res.json();
  const products: Product[] = data.products || [];

  //Pagination Logic here
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <main className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold mb-6 text-center'>Products</h1>
      <ProductsList
        products={paginatedProducts}
        page={page}
        totalPages={totalPages}
      />
    </main>
  );
};

export default ProductsPage;
