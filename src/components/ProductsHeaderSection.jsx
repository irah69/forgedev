import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import FilterButton from "@/components/FilterButton";

export default function ProductsHeaderSection({ searchValue, setSearchValue, setIsFilterOpen }) {
  return (
    <div className="w-full flex flex-col gap-4 mb-6 px-2 sm:px-0">
      {/* Mobile: Heading on top, then controls below */}
      <div className="block sm:hidden w-full mb-2">
        <Heading title="Products" subtitle={null} />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        {/* Heading for desktop */}
        <div className="hidden sm:block w-full sm:w-auto">
          <Heading title="Products" subtitle={null} />
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:items-center sm:justify-end">
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full sm:w-56"
          />
          <FilterButton
            onClick={() => setIsFilterOpen(true)}
            className="w-full sm:w-auto bg-black text-white rounded-md px-4 py-2 pr-6"
          />
        </div>
      </div>
    </div>
  );
}
