import React from "react";

export default function ProductFilters({
  sort,
  setSort,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStock,
  setInStock,
  size,
  setSize,
  page,
  setPage,
  totalPages,
  categoryId,
  setCategoryId,
  categories,
  onClear,
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-3 items-end flex-wrap">
        <div className="min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(0);
            }}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="">All categories</option>
            {categories && categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Sort</label>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(0);
            }}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="createdAt,desc">Newest</option>
            <option value="createdAt,asc">Oldest</option>
            <option value="price,asc">Price: Low → High</option>
            <option value="price,desc">Price: High → Low</option>
            <option value="name,asc">Name: A → Z</option>
            <option value="name,desc">Name: Z → A</option>
          </select>
        </div>
        <div className="min-w-[120px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Min price</label>
          <input
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(0);
            }}
            inputMode="decimal"
            placeholder="0"
            className="w-full px-3 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="min-w-[120px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Max price</label>
          <input
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(0);
            }}
            inputMode="decimal"
            placeholder="9999"
            className="w-full px-3 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2 py-3">
          <input
            id="inStock"
            type="checkbox"
            checked={inStock}
            onChange={(e) => {
              setInStock(e.target.checked);
              setPage(0);
            }}
          />
          <label htmlFor="inStock" className="text-sm text-gray-700">
            In stock only
          </label>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(0);
            }}
            className="px-3 py-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value={12}>12 / page</option>
            <option value={24}>24 / page</option>
            <option value={48}>48 / page</option>
          </select>
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
