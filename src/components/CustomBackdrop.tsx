import { useRecoilValue } from "recoil";
import ReactDOM from "react-dom";
import { rootContainerRefState } from "@store/rootContainerRefStore";

type CustomBackdropProps = {
  isOpen: boolean;
  zIndex?: number;
};

const CustomBackdrop = ({ isOpen, zIndex = 1000 }: CustomBackdropProps) => {
  const rootContainerRef = useRecoilValue(rootContainerRefState);

  const backdrop = (
    <div
      style={{
        display: isOpen ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex,
        maxWidth: "600px",
        margin: "auto",
      }}
    />
  );


  if (!rootContainerRef?.current) {
    return null;
  }

  return ReactDOM.createPortal(backdrop, rootContainerRef.current);
};

export default CustomBackdrop;
