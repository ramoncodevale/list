"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
            {product.image && (
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="object-contain mx-auto"
              />
            )}
            <p className="text-gray-700 mt-2">R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
