"use client";

import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "../../../store/ProductStore";
import Image from "next/image";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => router.back()}>← Back</button>
      <div className="product-container">
        <div className="product-image">
          <Image src={product.image} alt={product.name} width={300} height={400} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">Price: ${product.price}</p>
          <p className="description">{product.description}</p>

          {product.specs ? (
            <div className="specs">
              <h3>Specifications:</h3>
              <ul>
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-specs">No specifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
