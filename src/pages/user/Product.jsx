import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/thunk/CartThunk";
import { orderMaking } from "../../store/thunk/OrderThunk";
import EmptyState from "../../components/Common/EmptyState";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { Review } from "../../components/user/Review";
import Loader from "../../components/Common/Loader";
import { FetchProductById } from "../../store/thunk/ProductThunk";

const Product = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Review state

  const {
    selectedProduct: item,
    loading,
    error,
    refreshing,
  } = useSelector((state) => state.products);
  const errorResult = useSelector((state) => state.order.error);
  const cartLoading = useSelector((state) => state.cart.loading);
  const orderLoading = useSelector((state) => state.order.loading);
  const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();
  // whenever product changes, reset selectedImage to first image
  useEffect(() => {
    if (item?.images?.length > 0) {
      setSelectedImage(item.images[0]);
    }
  }, [item]);

  useEffect(() => {
    dispatch(FetchProductById(id));
  }, []);

  const process = async () => {
    const { razorPay } = await dispatch(
      orderMaking({
        itemsFromClient: [{ productId: item._id, quantity }],
      })
    ).unwrap();

    if (razorPay) {
      const options = {
        key: razorPay.key_id,
        amount: razorPay.amount,
        currency: razorPay.currency,
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: razorPay.orderId,
        handler: function () {
          alert("✅ Payment Successful!");
        },
        prefill: {
          name: razorPay.prefill.name, // from your frontend state or user object  // from your frontend state or user object
          contact: razorPay.prefill.phoneNo, // the phone number you want to auto-fill
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Order creation failed:");
      return <ErrorMessage error={errorResult} />;
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: item._id || item.id, quantity }));
  };

  const calculateAverageRating = () => {
    if (item.reviews.length === 0) return item.rating || 4.5;
    const sum = item.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / item.reviews.length).toFixed(1);
  };

  const incrementQuantity = () => {
    if (quantity < (item.stock || 99)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  if (loading || refreshing || cartLoading || orderLoading) {
    return <Loader />;
  }

  if (!item) {
    return <EmptyState message="Product not found." />;
  }

  if (errorResult || error) {
    return <ErrorMessage error={errorResult} />;
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
              {/* Image Gallery */}
              <div className="flex gap-4">
                {/* Thumbnails */}
                {item.images.length > 1 && (
                  <div className="flex flex-col gap-3 w-24">
                    {item.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${item.title} ${index + 1}`}
                        onClick={() => setSelectedImage(img)}
                        className={`w-full h-24 object-cover rounded-lg border text-black cursor-pointer transition-transform duration-300 hover:scale-105 ${
                          selectedImage === img
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="flex-1">
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={selectedImage || item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  {item.brand && (
                    <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-2">
                      {item.brand}
                    </p>
                  )}
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h1>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(calculateAverageRating())
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({calculateAverageRating()}/5)
                    </span>
                    {item.availabilityStatus && (
                      <span
                        className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                          item.availabilityStatus === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.availabilityStatus}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="border-t border-b border-gray-200 py-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-green-600">
                      ₹{item.price}
                    </span>
                    <span className="text-gray-500">per unit</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[50px] text-gray-800 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= item.stock}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.stock} items available
                    </span>
                  </div>

                  <div className="text-lg font-semibold text-gray-900">
                    Total: ₹{(item.price * quantity).toFixed(2)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {cartLoading ? "Adding to Cart..." : "Add to Cart"}
                  </button>

                  <button
                    onClick={process}
                    disabled={orderLoading || item.stock < quantity}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {orderLoading ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Product Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-800 capitalize">
                          {item.category}
                        </span>
                      </div>
                      {item.brand && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brand:</span>
                          <span className="font-medium text-gray-800">
                            {item.brand}
                          </span>
                        </div>
                      )}
                      {item.weight && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weight:</span>
                          <span className="font-medium text-gray-800">
                            {item.weight}g
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.dimensions && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Dimensions
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Width:</span>
                          <span className="font-medium text-gray-800">
                            {item.dimensions.width} cm
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Height:</span>
                          <span className="font-medium text-gray-800">
                            {item.dimensions.height} cm
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 ">Depth:</span>
                          <span className="font-medium text-gray-800">
                            {item.dimensions.depth} cm
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Policies
                    </h3>
                    <div className="space-y-2 text-gray-800">
                      {item.warrantyInformation && (
                        <div>
                          <span className="text-gray-600 block">Warranty:</span>
                          <span className="font-medium text-gray-800 text-sm">
                            {item.warrantyInformation}
                          </span>
                        </div>
                      )}
                      {item.shippingInformation && (
                        <div>
                          <span className="text-gray-600 block">Shipping:</span>
                          <span className="font-medium text-gray-800 text-sm">
                            {item.shippingInformation}
                          </span>
                        </div>
                      )}
                      {item.returnPolicy && (
                        <div>
                          <span className="text-gray-600 block">Returns:</span>
                          <span className="font-medium  text-gray-800 text-sm">
                            {item.returnPolicy}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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
