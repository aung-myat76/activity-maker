import React, { useRef, useState } from "react";

import clsx from "clsx";
import { toPng } from "html-to-image";

import Image from "./Image";
import Button from "./Button";

const Collage = () => {
    const settingRef = useRef([
        {
            id: "one",
            number: 1,
            layout: "grid-cols-1",
            default: [
                {
                    col: "col-span-full",
                    label: null,
                },
            ],
            changed: [
                {
                    col: "col-span-full",
                    label: null,
                },
            ],
        },
        {
            id: "two",
            number: 2,
            layout: "grid-cols-2",
            default: [
                { col: "col-span-full", label: "Before" },
                { col: "col-span-full", label: "After" },
            ],

            changed: [
                { col: "col-span-1", label: "Before" },
                { col: "col-span-1", label: "After" },
            ],
        },
        {
            id: "three",
            number: 3,
            layout: "grid-cols-2",
            default: [
                { col: "col-span-full", label: "After" },
                { col: "col-span-1", label: "Before" },
                { col: "col-span-1", label: null },
            ],

            changed: [
                { col: "col-span-1", label: "Before" },
                { col: "col-span-1", label: null },
                { col: "col-span-full", label: "After" },
            ],
        },
        {
            id: "fourth",
            number: 4,
            layout: "grid-cols-3",
            default: [
                { col: "col-span-full", label: "After" },
                { col: "col-span-1", label: "Before" },
                { col: "col-span-1", label: null },
                { col: "col-span-1", label: null },
            ],
            changed: [
                { col: "col-span-1", label: "Before" },
                { col: "col-span-1", label: null },
                { col: "col-span-1", label: null },
                { col: "col-span-full", label: "After" },
            ],
        },
    ]);

    const imgRef = useRef(null);
    const [totalImages, setTotalImage] = useState("two");
    const [onChange, setOnChange] = useState(false);
    const [addHeader, setAddHeader] = useState(false);
    const [title, setTitle] = useState("Title");

    const baseCls = `bg-stone-900 relative grid gap-1 w-[80vw] min-h-[40vh] overflow-hidden`;
    const selectedLayout = settingRef.current.find((l) => l.id === totalImages);

    const handleImgDownload = async () => {
        if (imgRef.current === null) return;

        try {
            const dataUrl = await toPng(imgRef.current);

            const link = document.createElement("a");
            link.download = "activity.png";
            link.href = dataUrl;

            link.click();
        } catch (err) {
            console.log("Can't download the image");
        }
    };

    const changeLayout = () => {
        setOnChange((preChange) => {
            return !preChange;
        });
    };

    const handleAddTitle = () => {
        setAddHeader((preChange) => {
            return !preChange;
        });
    };

    const finalCls = clsx(baseCls, selectedLayout.layout);

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center flex-wrap">
                <Button onClick={() => setTotalImage("one")}>1</Button>
                <Button onClick={() => setTotalImage("two")}>2</Button>
                <Button onClick={() => setTotalImage("three")}>3</Button>
                <Button onClick={() => setTotalImage("fourth")}>4</Button>
                <Button onClick={() => changeLayout()}>Change</Button>
                <Button onClick={() => handleAddTitle()}>Title</Button>
                <Button
                    onClick={handleImgDownload}
                    addCls="bg-blue-700 text-white"
                >
                    Download
                </Button>
            </div>
            <div ref={imgRef} className="bg-white p-2">
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
                    {/* {addBadges && (
                    <>
                        {reverseBadges && (
                            <>
                                <div className={clsx(baseBadge, "bg-green-600  p-3 top-3 left-3")}>
                                    After
                                </div>
                                <div className={clsx(baseBadge, "bg-red-600  p-3 top-3 left-3")}>
                                    Before
                                </div>
                            </>
                        )}
                        {!reverseBadges && (
                            <>
                                <div className="bg-red-600 text-white font-bold rounded-lg absolute p-3 top-3 left-3">
                                    Before
                                </div>
                                <div className="bg-green-600 text-white font-bold rounded-lg absolute p-3 top-[53%] left-3">
                                    After
                                </div>
                            </>
                        )}
                    </>
                )} */}

                    {!onChange &&
                        selectedLayout["default"].map((cls, i) => (
                            <Image key={i} col={cls.col} label={cls.label} />
                        ))}
                    {onChange &&
                        selectedLayout["changed"].map((cls, i) => (
                            <Image key={i} col={cls.col} label={cls.label} />
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Collage;
