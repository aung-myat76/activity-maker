import { useState } from "react";
import { toPng } from "html-to-image";

import { useApp } from "../store/app-context";
import Button from "./Button";
import Moveable from "react-moveable";

const Actions = ({ toggleShowTitle, onAddTags, onReversedTags }) => {
    const { changeLayout, changePosition, position, currentLayout } = useApp();
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
                <Button
                    addCls="bg-yellow-500 text-white"
                    onClick={toggleShowTitle}>
                    Title
                </Button>

                <Button addCls="bg-red-500 text-white" onClick={onAddTags}>
                    B & A
                </Button>
                <Button
                    onClick={onReversedTags}
                    addCls="bg-emerald-500 text-white">
                    Change
                </Button>
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
