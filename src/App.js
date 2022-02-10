import { useState, useMemo } from "react";
import ColorComponent from "./components/ColorComponent";
import { rgbToHex, hexToRgb, checkValidHex } from './utils/ColorLogic'

export default function App() {
  const [color, setColor] = useState("ff0000");
  const [subdivision, _] = useState(10);
  const primary_color = useMemo(() => hexToRgb(color), [color]);

  const validateAndSetColor = (color) => {
    if (checkValidHex(color)) {
      setColor(color)
    }
  }


  const colors = [...Array(2 * subdivision + 1).keys()].map((i) => {
    const division_number = i - subdivision;
    //const end_color = HEXToVBColor("000000") //subdivision >= 0 ? HEXToVBColor("000000") : HEXToVBColor("ffffff")
    const new_color = primary_color.map((p, i) => {
      const diff_from_reference = division_number > 0 ? 255 - p : p;
      return p + (division_number / subdivision) * diff_from_reference;
    });
    return [rgbToHex(...new_color), division_number / subdivision];
  });

  return (
    <div>
      <header>
        <div>My personal color generator</div>
        <div>
          <input value={color} onChange={(e) => validateAndSetColor(e.target.value)} />
          <button>Send</button>
        </div>
      </header>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        {colors.map(([my_column, division_number]) => (
          <ColorComponent
            key={division_number}
            color={my_column}
            division_number={division_number}
          />
        ))}
      </div>
    </div>
  );
}
