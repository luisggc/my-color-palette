import { hexToRgb } from '../utils/ColorLogic'
import { useState } from "react";

export default function ColorComponent({ color, division_number }) {
  const sumRGB = hexToRgb(color).reduce((v, a) => v + a, 0);
  const fontColor = sumRGB > 383 ? "#000" : "#FFF";
  const [successCopyMsg, setSuccessCopyMsg] = useState("");

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        setSuccessCopyMsg("Copiado!");
        setTimeout(() => setSuccessCopyMsg(""), 1000);
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
  return (
    <div
      style={{
        color: fontColor,
        backgroundColor: color,
        height: "120px",
        minWidth: "150px",
        paddingLeft: "30px",
        cursor: "pointer",
        flexGrow: 1,
      }}
      onClick={() => copyToClipBoard(color)}
    >
      <p>{color}</p>
      <p>{100 * division_number + "%"}</p>
      <p>{successCopyMsg}</p>
    </div>
  );
}
