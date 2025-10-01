import Banner from "../../components/user/HomeComponents/Banner";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Common/Loader";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { useGetAllProductsQuery } from "../../services/user/productApi";
import { useCheckUserQuery } from "../../services/user/userApi";
import { useEffect } from "react";
import ProductCard from "../../components/user/HomeComponents/ProductCard";

const Home = () => {
  const nav = useNavigate();

  const {
    error: userError,
    isLoading: userLoading,
    isError: isUserError,
  } = useCheckUserQuery();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();

  // --- Handle auth errors (401) ---
  useEffect(() => {
    if (isUserError && userError?.status === 401) {
      if (userError?.message === "Please login again.") {
        nav("/login");
      }
    }
  }, [isUserError, userError, nav]);

  // --- Loading state ---
  if (userLoading || isLoading) return <Loader />;

  // --- Error state ---
  if (isError)
    return <ErrorMessage message={error?.message || "Something went wrong"} />;

  return (
    <>
      <Banner />
      <section className="bg-gray-100 py-10 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
