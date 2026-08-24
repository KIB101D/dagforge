// src/nodes/textNode.js
import { useState, useEffect, useRef } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    setVariables(matches);
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.width = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.width = `${Math.max(180, Math.min(textarea.scrollWidth, 400))}px`;
    }
  }, [currText]);

  const handles = [
    { type: "source", position: Position.Right, id: `${id}-output` },
  ];

  variables.forEach((variable, index) => {
    handles.push({
      type: "target",
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` },
    });
  });

  return (
    <BaseNode id={id} title="Text" handles={handles}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{
            fontSize: "11px",
            marginBottom: "4px",
            color: "#A1A1AA",
            fontWeight: 500,
          }}
        >
          Text:
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            resize: "none",
            overflow: "hidden",
            fontFamily: "inherit",
            padding: "8px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "#FAFAFA",
            fontSize: "12px",
            color: "#18181B",
            outline: "none",
          }}
        />
      </div>
    </BaseNode>
  );
};
