import { useState } from "react";

import clsx from "clsx";

import Image from "./Image";

import { useApp } from "../store/app-context";

const Collage = ({ showTitle, addTags, reversedTags }) => {
    const [title, setTitle] = useState("Title");
    const { layoutDesign, position } = useApp();
    console.log(layoutDesign);
    const baseCls = ` relative grid gap-1 overflow-hidden collageSize`;

    const finalCls = clsx(
        baseCls,
        position === "P_ONE"
            ? layoutDesign.grid.pOne.parent
            : layoutDesign.grid.pTwo.parent
    );

    return (
        <div className="flex flex-col items-center justify-center gap-1 ">
            <div
                id="collage"
                className=" flex flex-col items-center justify-center mx-auto p-3 bg-white w-screen">
                <div className="w-full">
                    {showTitle ? (
                        <input
                            className="mb-3 text-center w-full border-b-2 font-bold text-sm border-stone-900 focus:outline-none"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    ) : null}
                </div>
                <ul className={finalCls}>
                    {layoutDesign.grid.pOne.children.map((cls, i) => {
                        return (
                            <Image
                                key={i}
                                col={
                                    position === "P_ONE"
                                        ? layoutDesign.grid.pOne.children[i]
                                        : layoutDesign.grid.pTwo.children[i]
                                }
                                id={i}
                                addTags={addTags}
                                reversedTags={reversedTags}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Collage;
