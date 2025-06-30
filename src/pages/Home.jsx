import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import { Add } from '../Store/Slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../Store/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';


const Home = () => {
 
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.product.value);



  // checking user is login or make request
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axiosInstance.get("/user/userCheck", {
          withCredentials: true,
        });

        dispatch(adduser(res.data.result))
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
        const res = await axiosInstance.get("/products/", { withCredentials: true });
        dispatch(Add(res.data.result));
      } catch (err) {
        console.log(err.message);
      }
    }
    result();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products<0]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className='fixed top-0 left-0 w-full z-50  shadow'>
        <NavBar />
      </header>

      <main className="flex-grow min-h-[2000px] bg-white">
        <Banner />
        <ProductList products={products} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
