import React, { useState } from 'react'

const CartCard = () => {
  const [quantity, setquantity] = useState(0);
  const addQuntity = ()=>(
    setquantity(()=>quantity+1)
  );
  const lessQuntity = ()=>(
    setquantity(()=>quantity-1)
  );
  return (
    <div className="card flex-row border-2 h-52 bg-base-100 w-fit shadow-sm mt-3 ml-32 mr-10 mb-3">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" className='w-60 ml-2 rounded-2xl ' />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
        Card Title
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      <div className="card-actions justify-end items-center space-x-4">
  <div className="badge badge-outline cursor-pointer text-[15px] hover:bg-red-100 transition">Cancel</div>

  <div className="flex items-center space-x-2 border-2 rounded-2xl">
    <button
      className=" text-black rounded-4xl bg-gray-200 px-2 py-1  hover:bg-gray-300 transition"
      onClick={addQuntity}
    >
      +
    </button>

    <div className="badge badge-outline text-base">{quantity}</div>

    <button
      className="rounded-4xl text-black bg-gray-200 px-2 py-1  hover:bg-gray-300 transition"
      onClick={lessQuntity}
    >
      -
    </button>
  </div>
</div>

    </div>
  </div>
  )
}

export default CartCard;
