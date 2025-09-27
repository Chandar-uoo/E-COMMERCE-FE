import Banner from "../../components/user/Banner";
import ProductList from "../../components/user/ProductList";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Common/Loader";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { useGetAllProductsQuery } from "../../services/user/productApi";

const Home = () => {
  const nav = useNavigate();
  const { error: userError, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: products, isLoading, error } = useGetAllProductsQuery();



  // checking user is login or make request

  if (userError == "Please login again.") {
    nav("/login");
  }

  if (userLoading || isLoading) return <Loader />;

  if (error) {
    console.log(error);
    return <ErrorMessage message={error.this.state.first} />;
  }
console.log(products);

  return (
    <>
      <Banner />
      <ProductList products={products} />
    </>
  );
};

export default Home;
