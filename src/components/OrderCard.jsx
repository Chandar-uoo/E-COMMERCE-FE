import React from 'react'
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useSelector } from 'react-redux';
const OrderCard = ({orderedProduct}) => {

  const products = useSelector((state)=>state.product.value);
  const  productdetails = products.find((item)=>item._id === orderedProduct.productId );

  return (
    <div>
       <ul className="list bg-base-50  border-white rounded-box shadow-md">
  <li className="list-row">
    <div><img className="size-10 rounded-box" src={productdetails.img}/></div>
    <div>
      <div>{productdetails.ProductName}</div>
      <div className="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
    </div>
    <p className="list-col-wrap text-xs">
      {productdetails.description}
    </p>
    {/*<button className="btn btn-square btn-ghost">
      {/*futur 
    </button>*/}
  
   
  </li>
  
</ul>
    </div>
  )
}

export default OrderCard;

