import React from "react";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Button = ({ children, addCls = "", ...othersProps }) => {
    const baseCls =
        "py-2 px-3 m-2 bg-stone-900 text-white rounded-md font-bold cursor-pointer";

    const finalCls = twMerge(clsx(baseCls, addCls));
    return (
        <button {...othersProps} className={finalCls}>
            {children}
        </button>
    );
};

export default Button;
