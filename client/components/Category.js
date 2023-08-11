const Category = () => {
  return (
   
    <div className="lg:px-60 px-6 my-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl text-gray-700 mb-8">
            Categories
          </h2>
        </div>
      <div className="flex flex-wrap justify-around align-middle gap-4 mx-auto">
      <h2 className="bg-blue-300 px-6 font-serif text-2xl text-center font-bold sm:text-3xl text-gray-700 rounded-tl-3xl rounded-ee-3xl btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all rounded cursor-pointer">
            Beef
          </h2>
          <h2 className="bg-blue-300 px-6 font-serif text-2xl text-center font-bold sm:text-3xl text-gray-700 rounded-tl-3xl rounded-ee-3xl btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all rounded cursor-pointer">
            Chicken
          </h2>
          <h2 className="bg-blue-300 px-6 font-serif text-2xl text-center font-bold sm:text-3xl text-gray-700 rounded-tl-3xl rounded-ee-3xl btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all rounded cursor-pointer">
            Fast Food
          </h2>
          <h2 className="bg-blue-300 px-6 font-serif text-2xl text-center font-bold sm:text-3xl text-gray-700 rounded-tl-3xl rounded-ee-3xl btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all rounded cursor-pointer">
            Drink
          </h2>
          <h2 className="bg-blue-300 px-6 font-serif text-2xl text-center font-bold sm:text-3xl text-gray-700 rounded-tl-3xl rounded-ee-3xl btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all rounded cursor-pointer">
            Fruits
          </h2>
      </div>
    </div>
  );
};

export default Category;
