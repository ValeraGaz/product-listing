"use client";
import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from './../../store/ProductStore';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <button onClick={() => router.back()}>← Back</button>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}