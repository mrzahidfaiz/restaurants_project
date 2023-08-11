import React, { useState } from "react";
import Link from "next/link";
import { register } from "@/pages/api/internalApi";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Radio } from "antd";

const Signup = () => {
  const [role, setRole] = useState("admin");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRole(e.target.value);
  };

  const { values, handleChange } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmpassword: values.confirmpassword,
      role: role,
    };
    const response = await register(data);
    if (response.status === 201) {
      console.log(response);
      toast.success(response.data.message);
    } else if (response.code === "ERR_BAD_REQUEST") {
      toast.error(response.response.data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/oWTW-jNGl9I/600x800")',
              }}
            />
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-4xl">Register Here</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your Details below
                </p>
              </div>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={registerHandler}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    type="name"
                    placeholder="Enter Your Name..."
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter Email Address..."
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Password..."
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="confirmpassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmpassword"
                    name="confirmpassword"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Confirm Password..."
                  />
                </div>
                <div className="mb-4">
                  <h3 className="block mb-2 text-sm font-bold text-gray-700">
                    Roles
                  </h3>
                  <>
                    <Radio.Group onChange={onChange} value={role}>
                      <Radio value={'admin'}>Admin</Radio>
                      <Radio value={'user'}>User</Radio>
                    </Radio.Group>
                  </>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
