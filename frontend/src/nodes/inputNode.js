// inputNode.js
import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handles = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  const fieldStyle = {
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid #BCBCBC",
    backgroundColor: "#ffffff",
    fontSize: "12px",
    color: "#18181B",
    outline: "none",
    width: "120px",
  };

  const labelStyle = {
    fontSize: "12px",
    color: "#18181B",
    marginRight: "10px",
  };

  return (
    <BaseNode id={id} title="Input" handles={handles}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            style={fieldStyle}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label style={labelStyle}>Type:</label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            style={{ ...fieldStyle, cursor: "pointer" }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
