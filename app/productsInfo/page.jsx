"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const productsDetails = {
  kahve: {
    title: "Kahve",
    description: "Kahve hakkında bilgiler...",
  },
  biber: {
    title: "Biber",
    description: "Biber hakkında bilgiler...",
  },
  corek: {
    title: "Çörek",
    description: "Çörek hakkında bilgiler...",
  },
  kimyon: {
    title: "Kimyon",
    description: "Kimyon hakkında bilgiler...",
  },
  sumak: {
    title: "Sumak",
    description: "Sumak hakkında bilgiler...",
  },
  tahin: {
    title: "Tahin",
    description: "Tahin hakkında bilgiler...",
  },
};

const Page = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const product = productsDetails[name];

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default Page;
