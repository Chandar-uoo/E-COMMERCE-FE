import React from 'react'

export const FilterCategory = ({category,handleFilterChange}) => {
  return (
   <>
    <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home Decoration</option>
                <option value="kitchen-accessories">Kitchen Accessories</option>
                <option value="laptops">Laptops</option>
                <option value="mens-shirts">Men's Shirts</option>
                <option value="mens-shoes">Men's Shoes</option>
                <option value="mens-watches">Men's Watches</option>
                <option value="mobile-accessories">Mobile Accessories</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="skin-care">Skin Care</option>
                <option value="smartphones">Smartphones</option>
                <option value="sports-accessories">Sports Accessories</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="tablets">Tablets</option>
                <option value="tops">Tops</option>
                <option value="vehicle">Vehicle</option>
                <option value="womens-bags">Women's Bags</option>
                <option value="womens-dresses">Women's Dresses</option>
                <option value="womens-jewellery">Women's Jewellery</option>
                <option value="womens-shoes">Women's Shoes</option>
                <option value="womens-watches">Women's Watches</option>
            </select>
          </div>
   </>
  )
}
