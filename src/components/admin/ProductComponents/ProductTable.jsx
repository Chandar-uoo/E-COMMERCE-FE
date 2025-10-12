import { useRef, useState } from "react";
import useAdminSingleProduct from "../../../hooks/AdminProductHooks/useAdminSingleProduct";
import EmptyState from "../../Common/EmptyState";
import { CustomToast } from "../../../utils/CustomToast";
import { ProductTableRow } from "./ProductTableRow";
const ProductTable = ({ products }) => {
  const { handleDeleteProduct, handleEditClick, veiwProduct } =
    useAdminSingleProduct();
  const [showCustomToast, setshowCustomToast] = useState(false);
  const productRef = useRef();

  const deleteProductItem = (product) => {
    productRef.current = product;
    setshowCustomToast(true);
  };
  const confirmDeleteProduct = async () => {
    const product = productRef.current;
    await handleDeleteProduct(product._id);
    setshowCustomToast(false);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductTableRow
                  key={product._id}
                  product={product}
                  deleteProductItem={deleteProductItem}
                  handleEditClick={handleEditClick}
                  veiwProduct={veiwProduct}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <EmptyState message="No result found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomToast
        show={showCustomToast}
        message="Do you want to delete this product?"
        onOk={() => confirmDeleteProduct()}
        onCancel={() => setshowCustomToast(false)}
      />
    </>
  );
};

export default ProductTable;
