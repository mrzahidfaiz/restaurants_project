import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {

  const isAuth = useSelector((state) => state.user.auth);


  return (
    <main className="sm:hidden md:block">
    <header className="flex flex-row justify-around align-middle p-1 bg-slate-200 text-sm px-6 lg:px-60">
      <div>
        <a href="">HOW TO ORDER</a>
      </div>
      <div>
        <a href="">CUSTOMER CARE</a>
      </div>
      <div>
        <a href="">TRACK MY ORDER</a>
      </div>
      <div>
        <Link href="/aboutus">ABOUT US</Link>
      </div>
      {isAuth ? (
        <div className="underline">
          <button>SIGNOUT</button>
        </div>
      ) : (
        <div className="flex justify-around align-middle gap-16">
          <div className="underline">
            <Link href="/login">LOGIN</Link>
          </div>
          <div className="underline">
            <Link href="/signup">SIGNUP</Link>
          </div>
        </div>
      )}
    </header>
    </main>
  );
};

export default Header;
