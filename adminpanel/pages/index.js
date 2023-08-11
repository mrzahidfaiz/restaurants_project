import React from "react";
import Login from "@/components/auth/Login";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const index = () => {

  const router = useRouter();
  const isLoggedIn = useSelector(state => state.user.auth);
  return isLoggedIn ? router.push('/admin/dashboard') : (
    <Login />
  );
};

export default index;