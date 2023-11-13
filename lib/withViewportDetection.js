import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMobile } from "../store/slices/viewportSlice";

export default function withViewportDetection(Component) {
  return function WithViewportDetection(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      function handleResize() {
        const isMobile = window.innerWidth < 800;
        dispatch(setMobile(isMobile));
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);

    return <Component {...props} />;
  };
}
