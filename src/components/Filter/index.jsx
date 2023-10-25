import React from "react";

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ["All", "Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
  return (
    <form className="mx-auto w-full max-w-screen-xl hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      <ul role="list" className="flex flex-wrap flex-row gap-3 text-lg font-medium text-gray-900 pt-6">
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <a
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer ${selectedCategory === category ? "bg-gray-300" : ""}`}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default CategoryFilter;
