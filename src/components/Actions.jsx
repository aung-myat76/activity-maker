import { useState } from "react";
import { toPng } from "html-to-image";

import { useApp } from "../store/app-context";
import Button from "./Button";

const Actions = ({ toggleShowTitle, onAddTags, onReversedTags }) => {
    const { changeLayout, changePosition, position, currentLayout, reset } =
        useApp();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleImgDownload = async () => {
        const collage = document.querySelector("#collage");
        if (collage === null) return;

        try {
            setIsDownloading(true);

            const dataUrl = await toPng(collage, {
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

    const onReset = () => {
        if (!confirm("Are you sure to reset?")) {
            return;
        }
        reset();
    };

    return (
        <>
            <div className="flex w-screen items-center justify-center  gap-3 flex-wrap mb-5">
                <select
                    names="layouts"
                    value={currentLayout}
                    onChange={(e) => changeLayout(e.target.value)}>
                    <option value="one">1 x Grid</option>
                    <option value="two">2 x Grid</option>
                    <option value="three">3 x Grid</option>
                    <option value="four">4 x Grid</option>
                </select>
                <select
                    name="positions"
                    value={position}
                    onChange={(e) => changePosition(e.target.value)}>
                    <option value="P_ONE">Position One</option>
                    <option value="P_Two">Position Two</option>
                </select>
                <Button onClick={toggleShowTitle}>Title</Button>

                <div className="font-bold text-white">
                    <span
                        onClick={onAddTags}
                        className="p-2 px-3 rounded-tl-md rounded-bl-md bg-emerald-500 ">
                        B & A
                    </span>
                    <span
                        onClick={onReversedTags}
                        className="py-2 px-3 rounded-tr-md rounded-br-md bg-yellow-500 ">
                        ⟳
                    </span>
                </div>

                {/* <Button onClick={onReset} addCls="bg-red-500 text-white">
                    Reset
                </Button> */}
                <Button
                    addCls="bg-blue-500 text-white"
                    onClick={handleImgDownload}>
                    {isDownloading ? "Saving..." : "Save"}
                </Button>
            </div>
        </>
    );
};

export default Actions;
