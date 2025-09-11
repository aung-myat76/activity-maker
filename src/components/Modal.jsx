import React from "react";

const Modal = ({ isShow }) => {
    return createPortal(<div></div>, document.getElementById("root"));
};
export default Modal;
