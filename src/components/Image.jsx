import React, { useState, useCallback, useRef } from "react";
import Moveable from "react-moveable";

import clsx from "clsx";

const Image = React.memo(({ col, label, showBeforeAndAfter }) => {
    const [image, setImage] = useState(null);
    const [selectedTarget, setSelectedTarget] = useState(null);
    const imageRef = useRef(null);
    const imageContainerRef = useRef(null);
    const baseCls =
        "bg-stone-300 overflow-hidden  relative disabled:bg-stone-500 disabled:opacity-30 min-h-[25vh]";
    const baseBadge =
        "text-white text-xs font-bold rounded-sm absolute top-1 left-1 px-[.3rem] py-[.2rem] z-40";

    const finalCls = clsx(baseCls, col);
    const currentInput = Math.random();

    const handleImagePick = useCallback((e) => {
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

            <div className="size-full">
                <label
                    htmlFor={currentInput}
                    className="absolute inset-0"></label>
                <input
                    type="file"
                    id={currentInput}
                    accept="*"
                    onChange={(e) => handleImagePick(e)}
                    className="hidden object-cover"
                />
                {image && (
                    <div
                        ref={imageContainerRef}
                        id="image-container"
                        className="relative size-full">
                        <img
                            src={image}
                            ref={imageRef}
                            alt="preview"
                            className="absolute top-0 left-0 size-full max-w-none cursor-move z-0 touch-none"
                            onClick={() => setSelectedTarget(imageRef.current)}
                        />
                        <Moveable
                            target={imageRef}
                            portalContainer={document.body}
                            origin={false}
                            scrollable={true}
                            pinchOutside={true}
                            pinchable={true}
                            draggable={true}
                            resizable={true}
                            rotatable={true}
                            snappable={true}
                            onDrag={({ target, transform }) => {
                                target.style.transform = transform;
                            }}
                            onResize={({ target, width, height, drag }) => {
                                target.style.width = width + "px";
                                target.style.height = height + "px";
                                target.style.transform = drag.transform;
                            }}
                            onRotate={({ target, transform }) => {
                                target.style.transform = transform;
                            }}
                            onPinch={({ target, transform }) => {
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
