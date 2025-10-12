import { Eye, Edit, Trash2 } from "lucide-react";

export const ProductTableRow = ({
  product,
  deleteProductItem,
  handleEditClick,
  veiwProduct,
}) => {
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm font-medium text-gray-900">
          {product.title}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">₹ {product.price}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className="flex items-center gap-2">
            <button
              onClick={() => veiwProduct(product)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditClick(product)}
              className="text-green-600 hover:text-green-800"
            >
              <Edit className="w-4 h-4" />
            </button>
            {!product.isDeleted && (
              <button
                onClick={() => deleteProductItem(product)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};
