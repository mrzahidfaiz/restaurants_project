import { Button } from 'antd'
import Link from 'next/link'

const index = () => {
  return (
    <div
      id="main-content"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2 mt-8 mx-6">
        All Orders
      </h3>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Payment
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Order Method
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Order Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            <tr className="hover:bg-gray-50">
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full rounded-lg object-cover object-center"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="text-md">
                  <div className="font-medium text-gray-700">Name</div>
                  <div className="text-gray-400">Email</div>
                </div>
              </th>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-md text-green-500">
                  Paid
                </span>
              </td>
              <td className="px-6 py-4">Roles</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <select
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-400 text-sm text-black rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-40 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="Pending" className='text-red-500'>Pending</option>
                    <option value="Delivered" className='text-green-500'>Delivered</option>
                  </select>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                  <Button x-data="{ tooltip: 'Save' }"> Save </Button>
                  <Link x-data="{ tooltip: 'Edite' }" href="/admin/orders" className="hover:text-green-600">
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
        </table>
      </div>
    </div>
  )
}

export default index;