import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
      />
    </div>
  );
}