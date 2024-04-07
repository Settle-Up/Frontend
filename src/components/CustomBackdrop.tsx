import { useContext } from "react";
import ReactDOM from "react-dom";
import RootContainerContext from "@context/RootContainerContext";

type CustomBackdropProps = { isOpen: boolean; zIndex?: number };
const CustomBackdrop = ({ isOpen, zIndex = 1000 }: CustomBackdropProps) => {
  const rootContainerRef = useContext(RootContainerContext);

  const backdrop = (
    <div
      style={{
        display: isOpen ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        // right: 0,
        // bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex,
      }}
    />
  );

  if (!rootContainerRef?.current) {
    return null;
  }

  return ReactDOM.createPortal(backdrop, rootContainerRef.current);
};

export default CustomBackdrop;
