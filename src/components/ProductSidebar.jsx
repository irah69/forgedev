export default function ProductsSidebar() {
  return (
    <aside className="w-[280px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        <button className="text-sm text-gray-500 hover:text-black">
          Reset
        </button>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Sort */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Sort by</label>
        <select className="w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-black">
          <option>Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
        <input type="range" className="w-full accent-black" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>₹0</span>
          <span>₹5000</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Categories</h3>
        {["Casual", "Evening", "Party", "Office", "Maxi"].map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-black"
          >
            <input type="checkbox" className="accent-black" />
            {cat}
          </label>
        ))}
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              className="rounded-lg border border-gray-300 py-2 text-sm hover:bg-black hover:text-white transition"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Stock */}
      <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" className="accent-black" />
        In stock only
      </label>
    </aside>
  );
}