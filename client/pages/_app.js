import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import {store, wrapper} from "../store/store";
import useAutoLogin from "@/hooks/useAutoLogin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }) {
  const loading = useAutoLogin();
  return loading ? "" : (
    <>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      <Header />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App)
