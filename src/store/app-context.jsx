import { createContext, useCallback, useContext, useReducer } from "react";

const appContext = createContext({});

const appReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_LAYOUT":
            return {
                ...state,
                currentLayout: action.payload.layout,
                layoutDesign: {
                    ...layouts.find((l) => l.id === action.payload.layout),
                    images: [...state.layoutDesign.images]
                }
            };
        case "CHANGE_POSITION":
            return { ...state, position: action.payload.position };
        case "ADD_IMAGE":
            return {
                ...state,
                layoutDesign: {
                    ...state.layoutDesign,
                    images: [...state.layoutDesign.images, action.payload.image]
                }
            };
        case "REPLACE_IMAGE": {
            const images = [...state.layoutDesign.images];
            images[action.payload.id] = action.payload.image;

            return {
                ...state,
                layoutDesign: {
                    ...state.layoutDesign,
                    images: images
                }
            };
        }
        case "RESET":
            return {
                ...state,
                layoutDesign: {
                    ...state.layoutDesign,
                    images: []
                }
            };
        default:
            return state;
    }
};

const layouts = [
    {
        id: "one",
        grid: {
            pOne: {
                parent: "grid-cols-1",
                children: ["col-span-full"]
            },
            pTwo: {
                parent: "grid-cols-1",
                children: ["col-span-full"]
            }
        },

        images: []
    },
    {
        id: "two",
        grid: {
            pOne: {
                parent: "grid-cols-1",
                children: ["col-span-full", "col-span-full"]
            },
            pTwo: {
                parent: "grid-cols-2",
                children: ["col-span-1", "col-span-1"]
            }
        },
        images: []
    },
    {
        id: "three",
        grid: {
            pOne: {
                parent: "grid-cols-2",
                children: ["col-span-full", "col-span-1", "col-span-1"]
            },
            pTwo: {
                parent: "grid-cols-2",
                children: ["col-span-1", "col-span-1", "col-span-full"]
            }
        },
        images: []
    },
    {
        id: "four",
        grid: {
            pOne: {
                parent: "grid-cols-3",
                children: [
                    "col-span-full",
                    "col-span-1",
                    "col-span-1",
                    "col-span-1"
                ]
            },
            pTwo: {
                parent: "grid-cols-3",
                children: [
                    "col-span-1",
                    "col-span-1",
                    "col-span-1",
                    "col-span-full"
                ]
            }
        },
        images: []
    }
];

const initialLayout = "two";

const initialState = {
    currentLayout: initialLayout,
    position: "P_ONE",
    layoutDesign: layouts.find((l) => l.id === initialLayout)
};

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const changeLayout = (layoutName) => {
        dispatch({ type: "CHANGE_LAYOUT", payload: { layout: layoutName } });
    };

    const changePosition = (position) => {
        dispatch({ type: "CHANGE_POSITION", payload: { position: position } });
    };

    const addImage = useCallback((image) => {
        dispatch({ type: "ADD_IMAGE", payload: { image: image } });
    }, []);

    const replaceImage = useCallback((id, image) => {
        dispatch({ type: "REPLACE_IMAGE", payload: { id: id, image: image } });
    }, []);

    const reset = () => {
        dispatch({ type: "RESET" });
    };

    const ctxValue = {
        changeLayout,
        changePosition,
        addImage,
        replaceImage,
        reset,
        images: state.layoutDesign.images,
        currentLayout: state.currentLayout,
        layoutDesign: state.layoutDesign,
        position: state.position
    };

    return (
        <appContext.Provider value={ctxValue}>{children}</appContext.Provider>
    );
};

export const useApp = () => {
    return useContext(appContext);
};
