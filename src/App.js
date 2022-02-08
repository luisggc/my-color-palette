import React, { useState } from "react";

function ColorComponent({color}) {
  return <div>{color}</div>;
}

export default function App() {
    const [color, setColor] = useState("ff0000");
    const colors = [color, color, color, color]
    return (
      <div>
        <header>
        <div>My personal color generator</div>
        <div>
          <input value={color} onChange={(e) => setColor(e.target.value)}/>
          <button>Send</button>
        </div>
        </header>
        <div>
          {colors.map((my_column, i) => 
            <ColorComponent key={i} color={my_column} />
            )}
        </div>
      </div>
    )
}



