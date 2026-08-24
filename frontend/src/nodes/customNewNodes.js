import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ImageNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Image Process"
    handles={[
      { type: "target", position: Position.Left, id: `${id}-image` },
      { type: "source", position: Position.Right, id: `${id}-out` },
    ]}
  >
    <span>Upscale or filter image</span>
  </BaseNode>
);

export const DatabaseNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Database"
    handles={[
      { type: "target", position: Position.Left, id: `${id}-query` },
      { type: "source", position: Position.Right, id: `${id}-rows` },
    ]}
  >
    <label style={{ fontSize: "12px", marginBottom: "4px" }}>Query:</label>
    <input
      type="text"
      placeholder="SELECT * FROM..."
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        border: "1px solid #BCBCBC",
        fontSize: "12px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
      }}
    />
  </BaseNode>
);

export const EmailNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Send Email"
    handles={[{ type: "target", position: Position.Left, id: `${id}-trigger` }]}
  >
    <span>Sends report to user</span>
  </BaseNode>
);

export const DelayNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Delay"
    handles={[
      { type: "target", position: Position.Left, id: `${id}-in` },
      { type: "source", position: Position.Right, id: `${id}-out` },
    ]}
  >
    <label style={{ fontSize: "12px" }}>Seconds:</label>
    <input
      type="number"
      defaultValue={5}
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        border: "1px solid #BCBCBC",
        fontSize: "12px",
        width: "60px",
        outline: "none",
      }}
    />
  </BaseNode>
);

export const JsonNode = ({ id }) => (
  <BaseNode
    id={id}
    title="JSON Parser"
    handles={[
      { type: "target", position: Position.Left, id: `${id}-raw` },
      { type: "source", position: Position.Right, id: `${id}-parsed` },
    ]}
  >
    <span>Extract objects & arrays</span>
  </BaseNode>
);
