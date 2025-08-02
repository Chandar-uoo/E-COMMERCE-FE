import React, { useEffect, useState } from 'react';
import NavBar from '../../components/user/NavBar';
import Footer from '../../components/user/Footer';
import Banner from '../../components/user/Banner';
import ProductList from '../../components/user/ProductList';
import { Add } from '../../store/Slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../../store/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { getAllProducts } from '../../api/productService';
import Loader from "../../components/Common/Loader";
import ErrorMessage from '../../components/Common/ErrorMessage';

const Home = () => {
  const [Error, setError] = useState(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);
  // checking user is login or make request
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axiosInstance.get("/user/userCheck", {
          withCredentials: true,
        });  
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("login to continue ")
          // 401 unauthorized
          nav("/login")
        }
      }
    }
    if (!user) {
      fetchuser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // product fetching 
  useEffect(() => {
    const result = async () => {
      try {
        setError(null);
        const res = await getAllProducts();
        dispatch(Add(res));
      } catch (error) {
        setError(error.messsage);
        console.log(error);
      }
    }
    result();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products < 0]);

  if (products == 0) return <Loader />;
  if (Error) return <ErrorMessage error={Error} />
  
  return (
    <>
      <Banner/>
      <ProductList products={products} />
    </>
  );
};

export default Home;
