"use client";

export default function CategoryCard({ category }: { category: Icategory }) {
  return (
    <figure key={category.id}>
      <h1>{category.text}</h1>
      <p>{category.descripton}</p>
    </figure>
  );
}
