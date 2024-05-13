import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ToastComponent(props) {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{ zIndex: "9999" }} //setting zindex to higher to make it appear on top of everything
      {...props}
    />
  );
}
