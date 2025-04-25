import React from "react";
import ProductCard, { Product } from "./ProductCard";

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
  viewAllLink,
}) => {
  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2d4a29]">{title}</h2>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-[#4B6F44] hover:text-[#3d5a37] font-medium text-sm transition-colors"
            >
              View All →
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
