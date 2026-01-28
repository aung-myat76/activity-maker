import Collage from "./components/Collage";
import Actions from "./components/Actions";
import { useState } from "react";

const App = () => {
    const [showTitle, setShowTitle] = useState(false);
    const [addTags, setAddTags] = useState(false);
    const [reversedTags, setReversedTags] = useState(false);

    const toggleShowTitle = () => {
        setShowTitle((preState) => !preState);
    };

    const onAddTags = () => {
        setAddTags((preState) => !preState);
    };
    const onReversedTags = () => {
        setReversedTags((preState) => !preState);
    };

    return (
        <div>
            <Actions
                toggleShowTitle={toggleShowTitle}
                onAddTags={onAddTags}
                onReversedTags={onReversedTags}
            />
            <Collage
                showTitle={showTitle}
                addTags={addTags}
                reversedTags={reversedTags}
            />
        </div>
    );
};

export default App;
