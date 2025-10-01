
import {
  X,
  Filter,
  Search,
} from "lucide-react";
import { FilterSearch } from "./FilterComponents/FilterSearch";
import { FilterCategory } from "./FilterComponents/FilterCategory";
import { FilterBrand } from "./FilterComponents/FilterBrand";
import { FilterTags } from "./FilterComponents/FilterTags";
import { FilterPriceRange } from "./FilterComponents/FilterPriceRange";
import { FilterStock } from "./FilterComponents/FilterStock";
import { FilterSort } from "./FilterComponents/FilterSort";
import { FilterActions } from "./FilterComponents/FilterActions";
import useFilterHooks from "../../../hooks/SearchHooks/useFilterHooks";

const ProductFilter = ({ isOpen, onClose }) => {
  
const { resetFilters,
    applyFilters,
    filters,
    setFilters,}  = useFilterHooks(onClose);
  // Handle input changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-base-200 shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-base-300">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Product Filters
          </h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
         <FilterSearch search={filters?.search} handleFilterChange={handleFilterChange} />
          <FilterCategory category={filters?.category} handleFilterChange={handleFilterChange} />
          <FilterBrand brand={filters?.brand} handleFilterChange={handleFilterChange} />
          <FilterTags tags={filters?.tags} handleFilterChange={handleFilterChange} />
          <FilterPriceRange
            min={filters?.minPrice}
            max={filters?.maxPrice}
            onChange={handleFilterChange}
          />
          <FilterStock stock={filters?.stock} handleFilterChange={handleFilterChange} />
          <FilterSort sortBy={filters?.sortBy} handleFilterChange={handleFilterChange} />
          <FilterActions applyFilters={applyFilters} resetFilters={resetFilters} />
          
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
