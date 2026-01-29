import React, { useCallback, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

import clsx from "clsx";
import { useApp } from "../store/app-context";

const Image = React.memo(({ col, id, addTags, reversedTags }) => {
    // const [image, setImage] = useState(null);
    const imageRef = useRef(null);
    const imageContainerRef = useRef(null);
    const { addImage, images } = useApp();
    const baseCls =
        "bg-stone-300 overflow-hidden relative disabled:bg-stone-500 disabled:opacity-30 min-h-[25vh]";
    const baseBadge =
        "text-white text-xs font-bold rounded-sm absolute top-1 left-1 px-[.3rem] py-[.2rem] z-40";

    const finalCls = clsx(baseCls, col);
    const currentInput = Math.random();

    const handleImagePick = useCallback(
        (e) => {
            const file = e.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const dImage = reader.result;
                    // setImage(dImage);
                    addImage(dImage);
                };
                reader.readAsDataURL(file);
            }
        },
        [addImage]
    );

    const [{ x, y, scale, rotate }, api] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        config: { tension: 200, friction: 25 }
    }));
    const bind = useGesture(
        {
            onDrag: ({ offset: [ox, oy] }) => {
                api.start({ x: ox, y: oy });
            },
            onPinch: ({ offset: [d, a] }) => {
                api.start({ scale: d, rotate: a });
            }
        },
        {
            drag: {
                from: () => [x.get(), y.get()]
            },
            pinch: {
                scaleBounds: { min: 0.1, max: 5 },
                from: () => [scale.get(), rotate.get()]
            }
        }
    );

    return (
        <li className={finalCls}>
            {id === 0 && addTags && !reversedTags && (
                <div className={clsx(baseBadge, "bg-red-600")}>Before</div>
            )}
            {id === 0 && addTags && reversedTags && (
                <div className={clsx(baseBadge, "bg-green-600")}>After</div>
            )}
            {id === 1 && addTags && !reversedTags && (
                <div className={clsx(baseBadge, "bg-green-600")}>After</div>
            )}
            {id === 1 && addTags && reversedTags && (
                <div className={clsx(baseBadge, "bg-red-600")}>Before</div>
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
                {images[id] && (
                    <div
                        ref={imageContainerRef}
                        id="image-container"
                        className="relative size-full overflow-visible flex justify-center items-center">
                        <animated.img
                            {...bind()}
                            src={images[id]}
                            ref={imageRef}
                            alt="preview"
                            className="img absolute h-full  w-screen  object-center object-cover select-none    max-w-none cursor-move  touch-none"
                            style={{
                                x,
                                y,
                                scale,
                                rotate
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </li>
    );
});

export default Image;
