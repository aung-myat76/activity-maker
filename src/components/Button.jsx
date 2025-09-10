import React from "react";

const Button = ({ children, ...othersProps }) => {
    const primaryCls =
        "p-3 m-2 w-[100px] rounded bg-stone-500 font-bold cursor-pointer";
    return (
        <button {...othersProps} className={primaryCls}>
            {children}
        </button>
    );
};

export default Button;
