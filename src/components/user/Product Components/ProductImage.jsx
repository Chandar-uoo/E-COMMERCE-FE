import React from "react";

export const ProductImage = ({ item, selectedImage, setSelectedImage }) => {
  return (
    <>
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
                  selectedImage === img ? "border-blue-500" : "border-gray-200"
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
    </>
  );
};
