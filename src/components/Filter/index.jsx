import React from "react";

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ["All", "Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
  return (
    <div role="group" aria-label="Filter cars by category" className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <button
          key={`${category}_${index}`}
          type="button"
          onClick={() => onCategoryChange(category)}
          aria-pressed={selectedCategory === category}
          className={`inline-flex min-h-11 items-center rounded-md border px-4 text-sm transition-colors duration-200 ${
            selectedCategory === category
              ? "border-ink bg-ink font-semibold text-white"
              : "border-paper-line bg-white font-medium text-ink-soft hover:border-ink hover:text-ink"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
