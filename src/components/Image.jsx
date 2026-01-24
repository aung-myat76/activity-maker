import React, { useState, useEffect, useCallback, useRef } from "react";
import Draggable from "react-draggable";
import Moveable from "react-moveable";

import clsx from "clsx";

const Image = React.memo(({ col, label, showBeforeAndAfter }) => {
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);
    const baseCls =
        "bg-stone-300 relative min-h-[30vh] disabled:bg-stone-500 disabled:opacity-30";
    const baseBadge =
        "text-white text-xs font-bold rounded-sm absolute top-1 left-1 px-[.3rem] py-[.2rem] z-100";

    const finalCls = clsx(baseCls, col);
    const currentInput = Math.random();

    const handleImagePick = useCallback((e) => {
        console.log(e);
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const dImage = reader.result;
                setImage(dImage);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    return (
        <li className={finalCls}>
            {showBeforeAndAfter && label === "Before" && (
                <div className={clsx(baseBadge, "bg-red-600")}>Before</div>
            )}
            {showBeforeAndAfter && label === "After" && (
                <div className={clsx(baseBadge, "bg-green-600")}>After</div>
            )}
            {/* <ImageUploading
                value={image}
                onChange={handleImagePicker}
                dataURLKey="data_url"
            >
                {(image, onImageUpload, onImageUpdate) => (
                    <div
                        className="bg-red-700 upload__image-wrapper w-[100%] h-[100%]"
                        onClick={onImageUpload}
                    >
                        <img src={image["data_url"]} alt="image" width="" />
                    </div>
                )}
            </ImageUploading> */}
            <div className="min-w-[100%] relative size-full editor-frame">
                <label
                    htmlFor={currentInput}
                    className="absolute inset-0"></label>
                <input
                    type="file"
                    id={currentInput}
                    accept="*"
                    onChange={(e) => handleImagePick(e)}
                    className="hidden w-[100%] object-cover overflow-hidden"
                />
                {image && (
                    <div className="size-full overflow-hidden">
                        <img
                            src={image}
                            ref={imageRef}
                            alt="preview"
                            className="object-cover size-full"
                            draggable="false"
                        />
                        <Moveable
                            target={imageRef}
                            draggable={true}
                            resizable={true}
                            rotatable={true}
                            onDrag={({ target, transform }) => {
                                target.style.transform = transform;
                            }}
                            onResize={({ target, width, height, drag }) => {
                                target.style.width = width + "px";
                                target.style.height = height + "px";
                                target.style.transform = drag.transform;
                            }}
                            onRotate={(target, transform) => {
                                target.style.transform = transform;
                            }}
                        />
                    </div>
                )}
            </div>
        </li>
    );
});

export default Image;
