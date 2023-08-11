import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store, wrapper } from "../store/store";
import useAutoLogin from "@/hooks/useAutoLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import DashBoardLayout from "./admin/dashboard";
import NavbarLayout from "@/components/Navbar";

function App({ Component, pageProps }) {
  const loading = useAutoLogin();
  return loading ? (
    ""
  ) : (
    <>
      <Provider store={store}>
          <NavbarLayout>
            <ToastContainer />
            <Component {...pageProps} />
          </NavbarLayout>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);
