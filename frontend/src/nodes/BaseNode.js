// BaseNode.js
import { useStore } from "../store";
import { useLongPress } from "../useLongPress";
import { NodeHandle } from "./NodeHandle";

export const BaseNode = ({ id, title, handles = [], children, selected }) => {
  const edges = useStore((state) => state.edges);
  const openContextMenu = useStore((state) => state.openContextMenu);

  const isHandleConnected = (handleId) =>
    edges.some(
      (edge) =>
        edge.sourceHandle === handleId || edge.targetHandle === handleId,
    );

  const handleNodeContextMenu = (event) => {
    event.preventDefault();
    openContextMenu({
      x: event.clientX,
      y: event.clientY,
      type: "node",
      nodeId: id,
    });
  };

  const nodeLongPress = useLongPress((x, y) => {
    openContextMenu({ x, y, type: "node", nodeId: id });
  });

  const cardStyle = {
    position: "relative",
    minWidth: "210px",
    borderRadius: "8px",
    border: selected ? "2px solid #007AFF" : "1px solid #BCBCBC",
    backgroundColor: "#ffffff",
    padding: "16px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxShadow: "none",
    transition: "border 0.1s ease",
  };

  return (
    <div
      style={cardStyle}
      data-nodeid={id}
      onContextMenu={handleNodeContextMenu}
      onTouchStart={nodeLongPress.onTouchStart}
      onTouchMove={nodeLongPress.onTouchMove}
      onTouchEnd={nodeLongPress.onTouchEnd}
    >
      <div style={{ marginBottom: "12px" }}>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#18181B" }}>
          {title}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {children}
      </div>

      {handles.map((handle, index) => (
        <NodeHandle
          key={handle.id || index}
          id={handle.id}
          nodeId={id}
          type={handle.type}
          position={handle.position}
          connected={isHandleConnected(handle.id)}
          style={handle.style}
        />
      ))}
    </div>
  );
};
