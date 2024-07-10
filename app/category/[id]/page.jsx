"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ProductsByCategory from "@/components/ProductsByCategory";
import FilterCategory from "@/components/FilterCategory";

function CategoryPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  return (
    <div className="flex flex-col gap-10">
      <div>
        <FilterCategory />
      </div>
      <div className="">
        <ProductsByCategory categoryId={categoryId} />
      </div>

    </div>
  );
}

export default CategoryPage;
