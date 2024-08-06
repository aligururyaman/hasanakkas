"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import FilterCategory from "@/components/productsComp/FilterCategory";
import ProductsByCategory from "@/components/productsComp/ProductsByCategory";


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
