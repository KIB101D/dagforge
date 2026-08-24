// store.js
import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    const currentNodes = get().nodes;
    const updatedNodes = applyNodeChanges(changes, currentNodes);
    const hasDeletedNodes = changes.some((c) => c.type === "remove");

    if (hasDeletedNodes) {
      const activeNodeIds = new Set(updatedNodes.map((n) => n.id));
      const cleanEdges = get().edges.filter(
        (edge) =>
          activeNodeIds.has(edge.source) && activeNodeIds.has(edge.target),
      );

      set({
        nodes: updatedNodes,
        edges: cleanEdges,
      });
    } else {
      set({ nodes: updatedNodes });
    }
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    const { source, target, sourceHandle, targetHandle } = connection;

    if (!sourceHandle || !targetHandle) return;

    if (!sourceHandle.startsWith(source) || !targetHandle.startsWith(target)) {
      return;
    }

    const sourceDOM = document.querySelector(
      `[data-nodeid="${source}"][data-handleid="${sourceHandle}"]`,
    );
    const targetDOM = document.querySelector(
      `[data-nodeid="${target}"][data-handleid="${targetHandle}"]`,
    );

    if (!sourceDOM || !targetDOM) return;

    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        },
        get().edges,
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
        }
        return node;
      }),
    });
  },
  contextMenu: null, // { x, y, type: 'node' | 'handle', nodeId?, handleId? }

  openContextMenu: (menu) => set({ contextMenu: menu }),
  closeContextMenu: () => set({ contextMenu: null }),

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId,
      ),
      contextMenu: null,
    });
  },

  disconnectNodeHandlers: (nodeId) => {
    set({
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId,
      ),
      contextMenu: null,
    });
  },

  disconnectHandle: (handleId) => {
    set({
      edges: get().edges.filter(
        (e) => e.sourceHandle !== handleId && e.targetHandle !== handleId,
      ),
      contextMenu: null,
    });
  },
}));
