import { Inter } from "next/font/google";
import Slider from "@/components/Slider";
import Banner from "@/components/Banner";
import Offer from "@/components/Offer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Category from "@/components/Category";
import ProductPage from "./products";
import { getAllProducts } from "./api/internalApi";
import Link from "next/link";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {

  const { products } = props;

  return (
    <main>
      <Offer />
      <Slider />
      <Category />
      <Banner />
      <ProductPage products={products} />
      <div>
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl text-gray-700 mb-8">
            Recommended Products
          </h2>
        </div>
        {/* Carousel */}
        <div className="lg:px-60 px-6 my-4">
          <Carousel
            responsive={responsive}
            infinite={true}
            containerClass="carousel-container"
          >
            {products?.map((product) => {
              return (
             
                <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" key={product._id}>
                  <Link
                    className="relative mx-3 mt-3 flex justify-center h-60 overflow-hidden rounded-xl"
                    href={`products/${product._id}`}
                  >
                    <img
                      className="object-cover text-center"
                      src={product.images[0].url}
                      alt="product image"
                    />
                  </Link>
                  <div className="mt-4 px-5 pb-5">

                      <h5 className="text-lg tracking-tight text-slate-900">
                        {product.title}
                      </h5>

                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-2xl font-bold text-slate-900">
                          ${product.price}
                        </span>
                      </p>

                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div>
    </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const response = await getAllProducts();
  const products = await response.data.product;
  return {
    props: {
      products: products,
    },
  };
}
