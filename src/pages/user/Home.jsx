import React, { useEffect } from 'react';
import NavBar from '../../components/user/NavBar';
import Footer from '../../components/user/Footer';
import Banner from '../../components/user/Banner';
import ProductList from '../../components/user/ProductList';
import { Add } from '../../store/Slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/Common/Loader";
import ErrorMessage from '../../components/Common/ErrorMessage';
import { FetchProducts } from '../../store/thunk/ProductThunk';

const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
   const { error: userError, loading: userLoading } = useSelector((state) => state.user);
const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);

  
  // checking user is login or make request

  if(userError === "Session expired. Please login again."){
    nav("/login")
  }


  // product fetching 
 useEffect(() => {
  if (!products || products.length === 0) {
    dispatch(FetchProducts());
  }
}, [dispatch, products]);


  if (userLoading|| productsLoading) return <Loader />;
  if (productsError) return <ErrorMessage message={productsError} />
  
  return (
    <>
      <Banner/>
      <ProductList products={products} />
    </>
  );
};

export default Home;
