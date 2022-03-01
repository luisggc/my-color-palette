import { useState } from "react";
import ColorComponent from "./components/ColorComponent";
import { rgbToHex, hexToRgb, checkValidHex } from "./utils/ColorLogic";

export default function App() {
  const [color, setColor] = useState("ff0000");
  const [subdivision, setSubdivision] = useState(10);
  const primary_color = hexToRgb(color);

  const validateAndSetColor = (color) => {
    if (checkValidHex(color)) {
      setColor(color);
    }
  };

  const colors = [...Array(2 * subdivision + 1).keys()].map((i) => {
    const division_number = subdivision - i;
    const new_color = primary_color.map((p, i) => {
      const diff_from_reference = division_number > 0 ? 255 - p : p;
      return p + (division_number / subdivision) * diff_from_reference;
    });
    return [rgbToHex(...new_color), division_number / subdivision];
  });

  return (
    <>
      <header>
        <div>
          <h1>My Color Palette Generator :)</h1>
          <p>Click the color and It will be copied</p>
        </div>
        <div className="inputGroup">
          <div>
            <input
              placeholder="Main color. Default: #FF0000"
              onChange={(e) => validateAndSetColor(e.target.value)}
              style={{ width: "170px" }}
            />
          </div>
          <div>
            <input
              placeholder="Subdivisions. Default: 10"
              type="number"
              min="1"
              max="30"
              step="1"
              onChange={(e) =>
                e.target.value>0 && setSubdivision(Math.round(e.target.value))
              }
              style={{ width: "170px" }}
            />
          </div>
        </div>
        <div className="github">
          <a href="https://github.com/luisggc/my-color-palette">
            <i className="fa fa-github" style={{ fontSize: 36 }}></i>
          </a>
        </div>
      </header>
      <div className="palleteList">
        {colors.map(([my_column, division_number]) => (
          <ColorComponent
            key={division_number}
            color={my_column}
            division_number={division_number}
          />
        ))}
      </div>
    </>
  );
}
