// ContextMenu.js
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "./store";

export const ContextMenu = () => {
  const contextMenu = useStore((state) => state.contextMenu);
  const closeContextMenu = useStore((state) => state.closeContextMenu);
  const deleteNode = useStore((state) => state.deleteNode);
  const disconnectNodeHandlers = useStore(
    (state) => state.disconnectNodeHandlers,
  );
  const disconnectHandle = useStore((state) => state.disconnectHandle);

  const menuRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!contextMenu) return;

    const handleOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeContextMenu();
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") closeContextMenu();
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu, closeContextMenu]);

  useLayoutEffect(() => {
    if (!contextMenu || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 8;
    const maxY = window.innerHeight - rect.height - 8;
    setPos({
      x: Math.min(contextMenu.x, maxX),
      y: Math.min(contextMenu.y, maxY),
    });
  }, [contextMenu]);

  if (!contextMenu) return null;

  const { type, nodeId, handleId } = contextMenu;

  const items =
    type === "node"
      ? [
          {
            label: "Clear Connections",
            onClick: () => disconnectNodeHandlers(nodeId),
          },
          {
            label: "Delete Node",
            danger: true,
            onClick: () => deleteNode(nodeId),
          },
        ]
      : [
          {
            label: "Remove Connection",
            danger: true,
            onClick: () => disconnectHandle(handleId),
          },
        ];

  return (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        zIndex: 1000,
        minWidth: "190px",
        padding: "6px",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 12px 28px rgba(0, 0, 0, 0.18)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "8px 10px",
            fontSize: "13px",
            fontWeight: 500,
            color: item.danger ? "#FF3B30" : "#1D1D1F",
            background: "transparent",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = item.danger
              ? "rgba(255, 59, 48, 0.1)"
              : "rgba(0, 0, 0, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
