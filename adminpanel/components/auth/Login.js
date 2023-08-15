import React, { useState } from "react";
import { useFormik } from "formik";
import { login } from "../../pages/api/internalApi";
import { setUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link"

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [error, setError] = useState();
  const { values, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await login(data);
    if (response.status === 200) {
      const user = {
        _id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        auth: response.data.auth,
        message: response.data.message,
      };

      dispatch(setUser(user));
      toast.success(response.data.message);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 3000);
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };
  return (
    <>
        <div className="flex justify-center px-6 py-20">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-xl"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80")',
              }}
            />
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-6 mb-2 text-4xl">Login Here</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address and
                  password below!
                </p>
              </div>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={loginHandler}>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter Email Address..."
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter Password..."
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    LOGIN
                  </button>
                </div>
                {/* <hr className="mb-6 border-t" /> */}
                {error != "" ? <p className="text-red-400 text-center w-full">{error}</p> : ""}
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default Login;
