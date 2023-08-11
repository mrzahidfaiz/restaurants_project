import Link from "next/link";
import { getAllProducts } from "../../api/internalApi";
import { deleteById } from "../../api/internalApi";
import { toast } from "react-toastify";
import { Image } from 'antd';
import { useRouter } from "next/navigation";


const index = (props) => {
  
  const { products } = props;

  const router = useRouter();

  const deleteHanlder = async (id) => {
    const response = await deleteById(id);
    if (response.status === 200) {
      toast.success(response.data.message);
      router.push("/admin/products")
    } else if (response.code === "ERR_BAD_REQUEST") {
      toast.error(response.response.data.message);
    }
  };

  return (
      <div
        id="main-content"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2 mt-8 mx-6">
          All Products
        </h3>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  state
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Desc
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                />
              </tr>
            </thead>

            {products.map((product) => {
              return (
                <tbody
                  className="divide-y divide-gray-100 border-t border-gray-100 "
                  key={product._id}
                >
                  <tr className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-14 w-14">
                        <Image
                          className="h-full w-full rounded object-cover object-center"
                          src={product.images[0].url}
                          alt=""
                        />
                      </div>
                      <div className="text-lg">
                        <div className="font-medium text-gray-700">
                          {product.title}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {product.description}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                        {product.available}
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button
                          x-data="{ tooltip: 'Delete' }"
                          onClick={() => deleteHanlder(product._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                        <Link
                          x-data="{ tooltip: 'Edite' }"
                          href={`/admin/products/update/${product._id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div> 
  );
};

export default index;

export async function getStaticProps() {
  const response = await getAllProducts();
  const products = await response.data.product;
  return {
    props: {
      products: products,
    },
    revalidate: 5,
  };
}
