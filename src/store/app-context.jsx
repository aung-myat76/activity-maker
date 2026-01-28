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
        case "RESET": {
            return { ...state, layouts };
        }
        default:
            return state;
    }
};

// const initialState = [{
//             id: "one",
//             number: 1,
//             layout: "grid-cols-1",
//             images: [null],
//             default: [
//                 {
//                     col: "col-span-full h-[40vh]",
//                     label: null
//                 }
//             ],
//             changed: [
//                 {
//                     col: "col-span-full h-[40vh]",
//                     label: null
//                 }
//             ]
//         },
//         {
//             id: "two",
//             number: 2,
//             layout: "grid-cols-2",
//             images: [null, null],
//             default: [
//                 { col: "col-span-full max-h-[30vh]", label: "Before" },
//                 { col: "col-span-full max-h-[30vh]", label: "After" }
//             ],

//             changed: [
//                 { col: "col-span-1 h-[45vh]", label: "Before" },
//                 { col: "col-span-1 h-[45vh]", label: "After" }
//             ]
//         },
//         {
//             id: "three",
//             number: 3,
//             layout: "grid-cols-2",
//             images:[null, null, null],
//             default: [
//                 { col: "col-span-full max-h-[30vh]", label: "After" },
//                 { col: "col-span-1", label: "Before" },
//                 { col: "col-span-1", label: null }
//             ],

//             changed: [
//                 { col: "col-span-1", label: "Before" },
//                 { col: "col-span-1", label: null },
//                 { col: "col-span-full max-h-[30vh]", label: "After" }
//             ]
//         },
//         {
//             id: "fourth",
//             number: 4,
//             layout: "grid-cols-2",
//             images: [null, null, null, null],
//             default: [
//                 { col: "col-span-1", label: "After" },
//                 { col: "col-span-1", label: null },
//                 { col: "col-span-1", label: "Before" },
//                 { col: "col-span-1", label: null }
//             ],
//             changed: [
//                 { col: "col-span-1", label: "Before" },
//                 { col: "col-span-1", label: null },
//                 { col: "col-span-1", label: "After" },
//                 { col: "col-span-1", label: null }
//             ]
//         }]

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
