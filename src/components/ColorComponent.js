import { hexToRgb } from "../utils/ColorLogic";
import { useState } from "react";

export default function ColorComponent({ color, division_number }) {
  const sumRGB = hexToRgb(color).reduce((v, a) => v + a, 0);
  const fontColor = sumRGB > 383 ? "#000" : "#FFF";
  const [showSuccessMsg, setshowSuccessMsg] = useState(false);

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        setshowSuccessMsg(true);
        setTimeout(() => setshowSuccessMsg(false), 1500);
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const coppiedClass = showSuccessMsg ? "copied active" : "copied"

  return (
    <div
      className="singleColor"
      style={{
        color: fontColor,
        backgroundColor: color,
      }}
      onClick={() => copyToClipBoard(color)}
    >
      <div >
        <div>{100 * division_number + "%"}</div>
        <div style={{ marginTop: "5px" }}>{color}</div>
      </div>
      
        <div style={{ alignSelf: "center" }} className={coppiedClass} >
          Copiado!
        </div>
    </div>
    /* {{ margin: '25px'}} */
  );
}
