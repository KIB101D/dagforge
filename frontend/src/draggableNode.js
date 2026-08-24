// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";

    const preview = event.target.cloneNode(true);
    preview.style.position = "absolute";
    preview.style.top = "-1000px";
    preview.style.transform = "scale(1.08) rotate(-2deg)";
    document.body.appendChild(preview);
    event.dataTransfer.setDragImage(
      preview,
      preview.offsetWidth / 2,
      preview.offsetHeight / 2,
    );
    setTimeout(() => document.body.removeChild(preview), 0);

    event.target.style.cursor = "grabbing";
    event.target.style.opacity = "0.4";
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = "grab";
    event.target.style.opacity = "1";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
      style={{
        cursor: "grab",
        height: "36px",
        padding: "0 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "999px",
        backgroundColor: "#F5F5F7",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition:
          "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, opacity 0.15s ease",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.08)";
        e.currentTarget.style.borderColor = "rgba(0, 113, 227, 0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
      }}
    >
      <span
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#1D1D1F",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
};
