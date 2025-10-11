import React from "react";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Button = ({ children, addCls = "", ...othersProps }) => {
    const baseCls =
        "p-2 m-2 min-w-[4.5rem] bg-stone-300 rounded font-bold cursor-pointer";

    const finalCls = twMerge(clsx(baseCls, addCls));
    return (
        <button {...othersProps} className={finalCls}>
            {children}
        </button>
    );
};

export default Button;
