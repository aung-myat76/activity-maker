import { useApp } from "../store/app-context";
import Button from "./Button";

const Actions = () => {
    const {
        changeLayout,
        changePosition,
        position,
        currentLayout,
        layoutDesign
    } = useApp();
    console.log(currentLayout, layoutDesign);

    return (
        <div className="flex  gap-3 flex-wrap">
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
            <Button>Title</Button>
            <Button>B & A</Button>
            <Button>Save</Button>
        </div>
    );
};

export default Actions;
