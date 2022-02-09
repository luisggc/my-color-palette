import React, { useState, useMemo } from "react";


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
 ] : null;
}

function ColorComponent({color, division_number}) {
  return <div style={{backgroundColor: color, height: '150px', width: '150px'}}>
    <div>{color}</div>
    <div>{100*division_number + "%"}</div>
    </div>;
}

export default function App() {
  const [color, setColor] = useState("ff0000");
  const [subdivision, setSubdivision] = useState(5);
  const primary_color = useMemo(() => hexToRgb(color), [color])
  
    const colors = [...Array(2*subdivision+1).keys()].map(i => {
      const division_number = i - subdivision
      //const end_color = HEXToVBColor("000000") //subdivision >= 0 ? HEXToVBColor("000000") : HEXToVBColor("ffffff")
      const diff_Color = primary_color.map((p, i) => (
        (1+division_number/subdivision) * (p)
      ))
      console.log(division_number)
      console.log(diff_Color)
      return [rgbToHex(...diff_Color), division_number/subdivision]
    })
    return (
      <div>
        <header>
        <div>My personal color generator</div>
        <div>
          <input value={color} onChange={(e) => setColor(e.target.value)}/>
          <button>Send</button>
        </div>
        </header>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {colors.map(([my_column, division_number]) =>
            <ColorComponent key={division_number} color={my_column} division_number={division_number}/>
            )}
        </div>
      </div>
    )
}



