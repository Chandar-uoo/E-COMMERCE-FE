import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmptyState from "../../components/Common/EmptyState";
import { Review } from "../../components/user/ProductComponents/Review";
import Loader from "../../components/Common/Loader";
import { toast } from "react-toastify";
import { useGetProductQuery } from "../../services/user/productApi";
import { ProductImage } from "../../components/user/ProductComponents/ProductImage";
import { ProductDetails } from "../../components/user/ProductComponents/ProductDetails";
import { ProductSpecifcation } from "../../components/user/ProductComponents/ProductSpecifcation";
import useProductHook from "../../hooks/ProductHooks/useProductHook";
import usePaymentHooks from "../../hooks/paymentHook/usePaymentHook";
const Product = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const {
    data: item,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useGetProductQuery(id);
  // Review state
  const [selectedImage, setSelectedImage] = useState("");
  const {
    incrementQuantity,
    decrementQuantity,
    calculateAverageRating,
    quantity,
    isCartLoading,
    handleAddToCart,
  } = useProductHook({ item });
  // whenever product changes, reset selectedImage to first image
  useEffect(() => {
    if (item?.images?.length > 0) {
      setSelectedImage(item.images[0]);
    }
  }, [item]);

  

const {process,isOrderLoading} = usePaymentHooks();
const orderProduct = (id) => {
    process([{ productId: id, quantity}]);
  };
  

  if (isCartLoading || isOrderLoading || isProductLoading) {
    return <Loader />;
  }

  if (!item) {
    return <EmptyState message="Product not found." />;
  }

  if (isProductError) {
    return toast.error(productError.message);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm">
            <button
              onClick={() => nav(-1)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Products
            </button>
          </nav>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <ProductImage
                item={item}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />

              {/* Product Details */}
              <ProductDetails
                item={item}
                calculateAverageRating={calculateAverageRating}
                quantity={quantity}
                incrementQuantity={incrementQuantity}
                handleAddToCart={handleAddToCart}
                isCartLoading={isCartLoading}
                isOrderLoading={isOrderLoading}
                orderProduct={orderProduct}
                decrementQuantity={decrementQuantity}
              />
            </div>

            {/* Product Information Tabs */}
            <div className="border-t border-gray-200">
              <div className="p-8 space-y-8">
                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Specifications */}
                <ProductSpecifcation item={item} />

                {/* Reviews Section */}
                <Review
                  item={item}
                  calculateAverageRating={calculateAverageRating}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
