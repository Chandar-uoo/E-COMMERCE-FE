import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import { Add } from '../Store/Slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.value);
  useEffect(() => {
    const result = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product");
        dispatch(Add(res.data.result));
      } catch (err) {
        console.log(err.message);
      }

    }
    result();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length < 0]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className='fixed top-0 left-0 w-full z-50  shadow'>
        <NavBar />
      </header>

      <main className="flex-grow min-h-[2000px] bg-white">
        <Banner />
        <ProductList products = {products}/>
        {/*
          home fetch all
          nav icon cart userFeature search
          search searchproduct
          userFeature all 
          Cart all 
          my order page
          solo product
          order
        */}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
