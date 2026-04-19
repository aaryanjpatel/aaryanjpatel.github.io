"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-flow-renderer/dist/style.css";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  MarkerType,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { useRouter } from "next/navigation";
import NeuralNetworkNode from "./NeuralNetworkNode";
import { nodes as NODE_CONFIG, edges as EDGE_CONFIG } from "./network-config";
import { buildAdjacency, getConnectionLevels } from "./network-logic";

const HEADER_OFFSET = 88;

function randomPos(spread = 150) {
  return {
    x: (Math.random() - 0.5) * spread,
    y: (Math.random() - 0.5) * spread,
  };
}

function makeInitialNodes() {
  return NODE_CONFIG.map((n) => ({
    id: n.id,
    position: n.id === "aaryan" ? { x: -45, y: -45 } : randomPos(),
    data: {
      ...n,
      active: false,
      lit: false,
      isCompact: false,
    },
    type: "neuralNode",
    draggable: true,
  }));
}

function makeEdges() {
  return EDGE_CONFIG.map((e) => ({
    id: `e-${e.source}-${e.target}`,
    source: e.source,
    target: e.target,
    animated: false,
    style: { stroke: "#38bdf8", strokeWidth: 1, opacity: 0.18 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#38bdf8" },
    data: { firing: false },
  }));
}

const nodeTypes = { neuralNode: NeuralNetworkNode };

const NODE_ROUTES: Record<string, string> = {
  aaryan: "/about",
  aiml: "/projects",
  mlops: "/projects",
  cloud: "/projects",
  llm: "/projects",
  proj: "/projects",
  certs: "/certifications",
  edu: "/education",
  blog: "/blog",
  devsec: "/projects",
  platform: "/projects",
  obs: "/projects",
  contact: "/contact",
  about: "/about",
};

export function NeuralNetworkHome({ onSkip }: { onSkip?: () => void }) {
  const router = useRouter();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [litNodes, setLitNodes] = useState<Set<string>>(new Set());
  const [firingEdges, setFiringEdges] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());
  const pausedRef = useRef<boolean>(false);
  const isCompact = typeof window !== "undefined" && window.innerWidth < 768;

  const [nodes, setNodes, onNodesChange] = useNodesState(makeInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(makeEdges());

  useEffect(() => {
    const nodeIds = NODE_CONFIG.map((n) => n.id);
    const totalNodes = nodeIds.filter((id) => id !== "aaryan").length;
    const speed = 0.00025;
    const breatheSpeed = 0.00013;
    const baseRadius = isCompact ? 215 : 260;

    function getDepth(angleRad: number) {
      return 0.5 * (1 + Math.cos(angleRad - Math.PI));
    }

    function tick() {
      if (pausedRef.current) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = performance.now() - startTimeRef.current;
      const radius = baseRadius + baseRadius * 0.08 * Math.sin(t * breatheSpeed);

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === "aaryan") {
            return {
              ...n,
              position: { x: -45, y: -45 },
              draggable: false,
              data: { ...n.data, depth: 1, isCompact },
            };
          }

          const idx = nodeIds.filter((id) => id !== "aaryan").indexOf(n.id);
          const angle = (2 * Math.PI * idx) / totalNodes + t * speed;
          const depth = getDepth(angle);

          return {
            ...n,
            position: {
              x: radius * Math.cos(angle),
              y: radius * Math.sin(angle),
            },
            draggable: false,
            data: {
              ...n.data,
              depth,
              isCompact,
            },
          };
        })
      );

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isCompact, setNodes]);

  useEffect(() => {
    pausedRef.current = hoveredNode !== null;
  }, [hoveredNode]);

  useEffect(() => {
    let highlightLevels: Record<string, number> = {};
    if (hoveredNode) {
      highlightLevels = getConnectionLevels(hoveredNode, 3);
    }

    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          active: activeNode === n.id,
          lit: litNodes.has(n.id),
          highlightLevel: highlightLevels[n.id] ?? null,
          isCompact,
        },
      }))
    );
  }, [activeNode, hoveredNode, isCompact, litNodes, setNodes]);

  useEffect(() => {
    let highlightLevels: Record<string, number> = {};
    if (hoveredNode) {
      highlightLevels = getConnectionLevels(hoveredNode, 3);
    }

    setEdges((eds) =>
      eds.map((e) => {
        const srcLevel = highlightLevels[e.source] ?? null;
        const tgtLevel = highlightLevels[e.target] ?? null;
        const isDirect =
          hoveredNode != null &&
          ((e.source === hoveredNode && tgtLevel === 1) ||
            (e.target === hoveredNode && srcLevel === 1));
        const isSecondary =
          hoveredNode != null &&
          !isDirect &&
          srcLevel != null &&
          tgtLevel != null &&
          Math.max(srcLevel, tgtLevel) <= 2;
        const isActive = firingEdges.has(e.id);
        const anyHover = hoveredNode != null;

        let stroke: string;
        let strokeWidth: number;
        let opacity: number;
        let animated: boolean;

        if (isActive) {
          stroke = "#00ffff";
          strokeWidth = 2.5;
          opacity = 1;
          animated = true;
        } else if (isDirect) {
          stroke = "#00ffff";
          strokeWidth = 2;
          opacity = 1;
          animated = true;
        } else if (isSecondary) {
          stroke = "#a855f7";
          strokeWidth = 1.5;
          opacity = 0.6;
          animated = false;
        } else if (anyHover) {
          stroke = "#1e4060";
          strokeWidth = 1;
          opacity = 0.12;
          animated = false;
        } else {
          stroke = "#38bdf8";
          strokeWidth = 1;
          opacity = 0.18;
          animated = false;
        }

        return {
          ...e,
          animated,
          style: { stroke, strokeWidth, opacity, transition: "stroke 0.25s, opacity 0.25s" },
          markerEnd: { type: MarkerType.ArrowClosed, color: stroke },
          data: { firing: isActive },
        };
      })
    );
  }, [firingEdges, hoveredNode, setEdges]);

  const adjacency = buildAdjacency();

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const id = node.id;
      const targets = adjacency[id] ?? [];
      const edgeIds = new Set(targets.map((t) => `e-${id}-${t}`));

      setActiveNode(id);
      setFiringEdges(edgeIds);

      setTimeout(() => {
        setLitNodes(new Set(targets));
      }, 350);

      setTimeout(() => {
        setActiveNode(null);
        setLitNodes(new Set());
        setFiringEdges(new Set());
        const route = NODE_ROUTES[id];
        if (route) router.push(route);
      }, 800);
    },
    [adjacency, router]
  );

  const handleNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    setHoveredNode(node.id);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: "neuralEdge", markerEnd: { type: MarkerType.ArrowClosed }, data: { firing: false } },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100svh",
        background:
          "radial-gradient(circle at 50% 50%, rgba(12, 28, 58, 0.82) 0%, rgba(2, 8, 23, 0.96) 36%, #020817 72%, #01030a 100%)",
        position: "relative",
        paddingTop: HEADER_OFFSET,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 22% 26%, rgba(34,197,94,0.16), transparent 14%), radial-gradient(circle at 50% 50%, rgba(125,211,252,0.14), transparent 22%), radial-gradient(circle at 76% 30%, rgba(59,130,246,0.12), transparent 18%), radial-gradient(circle at 62% 74%, rgba(168,85,247,0.1), transparent 20%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 8% 18%, rgba(255,255,255,0.98) 0 1.25px, transparent 1.9px), radial-gradient(circle at 21% 30%, rgba(255,255,255,0.92) 0 1.1px, transparent 1.7px), radial-gradient(circle at 34% 14%, rgba(255,255,255,0.95) 0 1.15px, transparent 1.75px), radial-gradient(circle at 52% 22%, rgba(255,255,255,0.86) 0 1px, transparent 1.6px), radial-gradient(circle at 68% 12%, rgba(255,255,255,0.94) 0 1.2px, transparent 1.85px), radial-gradient(circle at 82% 28%, rgba(255,255,255,0.9) 0 1.05px, transparent 1.65px), radial-gradient(circle at 92% 18%, rgba(255,255,255,0.96) 0 1.1px, transparent 1.7px), radial-gradient(circle at 15% 68%, rgba(255,255,255,0.88) 0 1px, transparent 1.55px), radial-gradient(circle at 28% 82%, rgba(255,255,255,0.94) 0 1.15px, transparent 1.75px), radial-gradient(circle at 44% 74%, rgba(255,255,255,0.84) 0 1px, transparent 1.55px), radial-gradient(circle at 62% 84%, rgba(255,255,255,0.96) 0 1.15px, transparent 1.75px), radial-gradient(circle at 76% 74%, rgba(255,255,255,0.88) 0 1px, transparent 1.55px), radial-gradient(circle at 90% 82%, rgba(255,255,255,0.92) 0 1.05px, transparent 1.65px), radial-gradient(circle at 12% 10%, rgba(255,255,255,0.9) 0 0.9px, transparent 1.45px), radial-gradient(circle at 26% 8%, rgba(255,255,255,0.84) 0 0.95px, transparent 1.5px), radial-gradient(circle at 40% 9%, rgba(255,255,255,0.82) 0 0.9px, transparent 1.45px), radial-gradient(circle at 58% 8%, rgba(255,255,255,0.9) 0 0.95px, transparent 1.5px), radial-gradient(circle at 72% 9%, rgba(255,255,255,0.82) 0 0.9px, transparent 1.45px), radial-gradient(circle at 86% 8%, rgba(255,255,255,0.88) 0 0.95px, transparent 1.5px), radial-gradient(circle at 10% 42%, rgba(255,255,255,0.82) 0 0.9px, transparent 1.45px), radial-gradient(circle at 24% 46%, rgba(255,255,255,0.9) 0 0.95px, transparent 1.5px), radial-gradient(circle at 38% 40%, rgba(255,255,255,0.84) 0 0.9px, transparent 1.45px), radial-gradient(circle at 56% 44%, rgba(255,255,255,0.88) 0 0.95px, transparent 1.5px), radial-gradient(circle at 70% 42%, rgba(255,255,255,0.84) 0 0.9px, transparent 1.45px), radial-gradient(circle at 84% 46%, rgba(255,255,255,0.9) 0 0.95px, transparent 1.5px), radial-gradient(circle at 8% 90%, rgba(255,255,255,0.84) 0 0.9px, transparent 1.45px), radial-gradient(circle at 22% 94%, rgba(255,255,255,0.9) 0 0.95px, transparent 1.5px), radial-gradient(circle at 36% 88%, rgba(255,255,255,0.82) 0 0.9px, transparent 1.45px), radial-gradient(circle at 54% 92%, rgba(255,255,255,0.88) 0 0.95px, transparent 1.5px), radial-gradient(circle at 68% 90%, rgba(255,255,255,0.84) 0 0.9px, transparent 1.45px), radial-gradient(circle at 82% 94%, rgba(255,255,255,0.9) 0 0.95px, transparent 1.5px), radial-gradient(circle at 94% 90%, rgba(255,255,255,0.82) 0 0.9px, transparent 1.45px), radial-gradient(circle, rgba(255,255,255,0.34) 0 1px, transparent 1.5px)",
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 20px 20px",
          opacity: 0.86,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(2,8,23,0.97) 0px, rgba(2,8,23,0.82) 110px, rgba(2,8,23,0.18) 240px), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 30%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {onSkip && (
        <button
          onClick={onSkip}
          style={{ position: "absolute", top: 12, right: 12, zIndex: 50 }}
          className="text-xs text-muted-foreground hover:text-primary border border-border bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md transition-colors"
        >
          Skip to Classic View
        </button>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={isCompact ? undefined : handleNodeMouseEnter}
        onNodeMouseLeave={isCompact ? undefined : handleNodeMouseLeave}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: isCompact ? 0.24 : 0.18, includeHiddenNodes: false }}
        nodesDraggable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        panOnScroll={false}
        preventScrolling={false}
        zoomOnDoubleClick={false}
        minZoom={0.72}
        maxZoom={1}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.15} color="rgba(255,255,255,0.24)" />
      </ReactFlow>
    </div>
  );
}
