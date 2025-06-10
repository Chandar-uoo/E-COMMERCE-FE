import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div>
      <div className="h-40 bg-gray-200 mb-2" />
      <h3 className="text-sm font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-xs">${product.price.toFixed(2)}</p>

    </div>
  )
}

export default ProductCard;
