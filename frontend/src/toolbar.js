// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "16px 24px",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "rgba(255, 255, 255, 0.72)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "rgba(60, 60, 67, 0.6)",
          marginBottom: "12px",
        }}
      >
        Pipeline Nodes
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="imageNode" label="Image Process" />
        <DraggableNode type="databaseNode" label="Database" />
        <DraggableNode type="emailNode" label="Send Email" />
        <DraggableNode type="delayNode" label="Delay" />
        <DraggableNode type="jsonNode" label="JSON Parser" />
      </div>
    </div>
  );
};
