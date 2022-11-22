import { useState } from "react";
import "./App.css";
import { allColors } from "./AllColor";
import { hover } from "@testing-library/user-event/dist/hover";
function App() {
    const [show, setShow] = useState(true);
    const [color, setMyColor] = useState("");
    const [colors, setColors] = useState([]);
    const [allColor, setAllColor] = useState(allColors);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (color === "") return;
        setColors([
            ...colors,
            {
                name: color,
                color: "orange",
            },
        ]);
        setMyColor("");
    };
    const deleteHandler = (delColor) => {
        const newColors = colors.filter(
            (color) => color.name.toLowerCase() !== delColor.name.toLowerCase()
        );
        setColors(newColors);
        setAllColor([
            ...allColor,
            {
                ...delColor,
            },
        ]);
    };
    const handleAddColor = (myColor) => {
        if (colors.length === 8) {
            alert("Cann't add more than 8 colors");
            return;
        }
        setColors([
            ...colors,
            {
                ...myColor,
            },
        ]);
        const newColors = allColor.filter(
            (color) => color.name !== myColor.name
        );
        setAllColor(newColors);
    };
    return (
        <div className="App w-full h-screen ">
            <div className=" h-4/6  m-auto     flex justify-between items-center">
                <div className=" mx-auto md:w-4/6 w-5/6">
                    <div className=" ring-2 ring-sky-600 flex gap-2  rounded-md relative">
                        <div className="flex  ">
                            {colors.map((color, key) => {
                                return (
                                    <div
                                        key={key}
                                        className={`${color.lightColor.slice(
                                            6
                                        )} my-2 md:ml-2 ml-1 px-2 rounded-sm items-center justify-center flex md:gap-2`}
                                    >
                                        <p className={`${color.darkColor}`}>
                                            {color.name}
                                        </p>

                                        <p
                                            className={`${color.darkColor} font-bold cursor-pointer pl-2 text-lg`}
                                            onClick={() => deleteHandler(color)}
                                        >
                                            x
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <form
                            action=""
                            onSubmit={(e) => handleSubmit(e)}
                            className="flex-1"
                        >
                            <input
                                value={color}
                                onChange={(e) => setMyColor(e.target.value)}
                                type="text"
                                className="w-full h-full outline-none border-none"
                            />
                        </form>

                        <div className="flex items-center justify-center mx-2 ">
                            <p
                                className="border-r-2 md:p-3 py-1 pr-2 my-1 text-gray-600 font-bold cursor-pointer"
                                onClick={() => {
                                    setAllColor(allColors);
                                    setColors([]);
                                }}
                            >
                                X
                            </p>

                            <p
                                className={`md:p-3 p-2 ${
                                    !show ? "rotate-90" : "-rotate-90"
                                } text-gray-600 font-bold cursor-pointer`}
                                onClick={() => setShow(!show)}
                            >
                                {">"}
                            </p>
                        </div>
                    </div>
                    {show && (
                        <div className="mt-3 border shadow-md h-2/5 overflow-y-scroll rounded-md absolute md:w-2/3 w-5/6  overflow-x-hidden transition-all ease-in-out p-1">
                            {allColor.map((colors, key) => {
                                return (
                                    <div
                                        className={`${colors.lightColor}  cursor-pointer  p-3 z-40`}
                                        key={key}
                                        onClick={() => handleAddColor(colors)}
                                    >
                                        <p
                                            className={`${colors.darkColor} font-semibold text-lg`}
                                        >
                                            {colors.name}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
