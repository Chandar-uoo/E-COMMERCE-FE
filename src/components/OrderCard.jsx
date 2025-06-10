import React from 'react'
import { MdOutlineCancelPresentation } from "react-icons/md";
const OrderCard = ({product}) => {
  return (
    <div>
       <ul className="list bg-base-50  border-white rounded-box shadow-md">
  <li className="list-row">
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
    <div>
      <div>Ellie Beilish</div>
      <div className="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
    </div>
    <p className="list-col-wrap text-xs">
      "Bears of a Fever" captivated audiences with its intense energy and mysterious lyrics. Its popularity skyrocketed after fans shared it widely online, earning Ellie critical acclaim.
    </p>
    {/*<button className="btn btn-square btn-ghost">
      {/*futur 
    </button>*/}
    <button className="btn mt-5 text-2xl hover:text-black border-black border-2 hover:bg-white  btn-ghost">
    <h6 className=''>cancel</h6>
      
    </button>
   
  </li>
  
</ul>
    </div>
  )
}

export default OrderCard;

