import React from 'react'

const Banner = () => {
  return (
    <div className='lg:px-60 px-6 my-12 '>
        <div
  className="bg-cover bg-center  h-70  text-white py-24 px-10 object-fill rounded-lg"
  style={{
    backgroundImage:
      "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)"
  }}
>
  <div className="md:w-1/2">
    <h1 className="font-bold text-yellow-300 text-sm uppercase">Sale</h1>
    <p className="text-3xl text-yellow-400 font-bold">20% OFF</p>
   
  </div>
</div>

    </div>
  )
}

export default Banner