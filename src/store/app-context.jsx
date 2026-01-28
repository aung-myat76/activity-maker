import { createContext, useContext, useReducer } from "react";

const appContext = createContext({});

const appReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_LAYOUT":
            return {
                ...state,
                currentLayout: action.payload.layout,
                layoutDesign: layouts.find(
                    (l) => l.id === action.payload.layout
                )
            };
        case "CHANGE_POSITION":
            return { ...state, position: action.payload.position };

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

        images: [null]
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
        images: [null, null]
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
        images: [null, null, null]
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
        images: [null, null, null, null]
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

    const ctxValue = {
        changeLayout,
        changePosition,
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
