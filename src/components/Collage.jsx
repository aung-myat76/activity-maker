import React, { useRef, useState } from "react";

import clsx from "clsx";
import { toPng } from "html-to-image";

import Image from "./Image";
import Button from "./Button";
import Modal from "./Modal";
import { useApp } from "../store/app-context";

const Collage = () => {
    const imgRef = useRef(null);
    const [addHeader, setAddHeader] = useState(false);
    const [showBeforeAndAfter, setShowBeforeAndAfter] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [title, setTitle] = useState("Title");
    const { layoutDesign, position } = useApp();

    const baseCls = `bg-stone-100 relative grid gap-1 size-full overflow-hidden`;

    const handleImgDownload = async () => {
        if (imgRef.current === null) return;

        try {
            setIsDownloading(true);

            const dataUrl = await toPng(imgRef.current, {
                filter: (node) => {
                    if (
                        node.classList &&
                        node.classList.contains("moveable-control-box")
                    ) {
                        return false;
                    }
                    return true;
                }
            });

            const link = document.createElement("a");
            link.download = "activity.png";
            link.href = dataUrl;

            link.click();
            setIsDownloading(false);
        } catch (err) {
            console.log("Can't download the image", err);
        }
    };

    const handleAddTitle = () => {
        setAddHeader((preChange) => {
            return !preChange;
        });
    };

    const handleBeforeAndAfer = () => {
        setShowBeforeAndAfter((preState) => !preState);
    };

    const finalCls = clsx(
        baseCls,
        position === "P_ONE"
            ? layoutDesign.grid.pOne.parent
            : layoutDesign.grid.pTwo.parent
    );

    return (
        <div className="flex flex-col items-center justify-center gap-1">
            <div
                ref={imgRef}
                className=" flex items-center justify-center w-[90vw] h-[50vh] mx-auto my-20">
                <div>
                    {addHeader ? (
                        <input
                            className="my-3 text-center w-[100%] border-b-2 font-bold text-sm border-stone-900 focus:outline-none"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    ) : null}
                </div>
                <ul className={finalCls}>
                    {layoutDesign.images.map((img, i) => (
                        <Image
                            key={i}
                            col={
                                position === "P_ONE"
                                    ? layoutDesign.grid.pOne.children[i]
                                    : layoutDesign.grid.pTwo.children[i]
                            }
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Collage;
