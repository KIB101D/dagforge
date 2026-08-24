// NodeHandle.js
import { Handle } from "reactflow";
import { useStore } from "../store";
import { useLongPress } from "../useLongPress";

export const NodeHandle = ({
  id,
  nodeId,
  type,
  position,
  connected,
  style,
}) => {
  const openContextMenu = useStore((state) => state.openContextMenu);

  const handleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openContextMenu({
      x: event.clientX,
      y: event.clientY,
      type: "handle",
      handleId: id,
    });
  };

  const longPress = useLongPress((x, y) => {
    openContextMenu({ x, y, type: "handle", handleId: id });
  });

  return (
    <Handle
      type={type}
      position={position}
      id={id}
      data-nodeid={nodeId}
      data-handleid={id}
      className={connected ? "handle-connected" : undefined}
      style={{ width: "10px", height: "10px", ...style }}
      onContextMenu={handleContextMenu}
      onTouchStart={(event) => {
        event.stopPropagation();
        longPress.onTouchStart(event);
      }}
      onTouchMove={(event) => {
        event.stopPropagation();
        longPress.onTouchMove(event);
      }}
      onTouchEnd={(event) => {
        event.stopPropagation();
        longPress.onTouchEnd(event);
      }}
    />
  );
};
