"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { edges as EDGE_CONFIG, nodes as NODE_CONFIG } from "./network-config";
import { buildAdjacency, getConnectionLevels } from "./network-logic";

const HEADER_OFFSET = 88;
const MOBILE_BREAKPOINT = 768;
const ORBIT_GROUPS = [
  ["aiml", "mlops", "cloud", "llm"],
  ["proj", "platform", "devsec", "obs"],
  ["blog", "certs", "edu", "about", "contact"],
] as const;

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
  const [viewport, setViewport] = useState({ width: 1280, height: 800 });
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());
  const pausedRef = useRef<boolean>(false);

  const isCompact = viewport.width < MOBILE_BREAKPOINT;
  const orbitConfig = useMemo(() => {
    const safeWidth = Math.max(viewport.width - (isCompact ? 96 : 240), 320);
    const safeHeight = Math.max(viewport.height - HEADER_OFFSET - (isCompact ? 140 : 150), 340);
    const centerY = isCompact ? 72 : 28;

    const baseRings = isCompact
      ? [
          { radiusX: Math.min(safeWidth * 0.2, 104), radiusY: Math.min(safeHeight * 0.15, 82), speed: 0.00028, tilt: -0.72 },
          { radiusX: Math.min(safeWidth * 0.29, 152), radiusY: Math.min(safeHeight * 0.22, 120), speed: -0.00018, tilt: 0.92 },
          { radiusX: Math.min(safeWidth * 0.39, 210), radiusY: Math.min(safeHeight * 0.29, 176), speed: 0.00012, tilt: -1.24 },
        ]
      : [
          { radiusX: Math.min(safeWidth * 0.14, 170), radiusY: Math.min(safeHeight * 0.18, 110), speed: 0.0002, tilt: -0.6 },
          { radiusX: Math.min(safeWidth * 0.24, 292), radiusY: Math.min(safeHeight * 0.28, 182), speed: -0.00013, tilt: 0.78 },
          { radiusX: Math.min(safeWidth * 0.34, 418), radiusY: Math.min(safeHeight * 0.38, 250), speed: 0.00009, tilt: -1.05 },
        ];

    return {
      centerY,
      rings: baseRings,
    };
  }, [isCompact, viewport.height, viewport.width]);

  const [nodes, setNodes, onNodesChange] = useNodesState(makeInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(makeEdges());

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport, { passive: true });
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const orbitLookup = new Map<string, { orbitIndex: number; slot: number; total: number }>();
    ORBIT_GROUPS.forEach((group, orbitIndex) => {
      group.forEach((id, slot) => {
        orbitLookup.set(id, { orbitIndex, slot, total: group.length });
      });
    });

    const breatheSpeed = 0.00012;

    function getDepth(angleRad: number) {
      return 0.5 * (1 + Math.cos(angleRad - Math.PI));
    }

    function tick() {
      if (pausedRef.current) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = performance.now() - startTimeRef.current;
      const breathe = 1 + 0.03 * Math.sin(t * breatheSpeed);

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === "aaryan") {
            return {
              ...n,
              position: { x: -54, y: orbitConfig.centerY - 54 },
              draggable: false,
              data: { ...n.data, depth: 1, isCompact },
            };
          }

          const orbitInfo = orbitLookup.get(n.id);
          if (!orbitInfo) {
            return n;
          }

          const ring = orbitConfig.rings[orbitInfo.orbitIndex];
          const angle =
            (2 * Math.PI * orbitInfo.slot) / orbitInfo.total +
            t * ring.speed +
            ring.tilt;
          const depth = getDepth(angle);
          const ringBreath = breathe * (1 + orbitInfo.orbitIndex * 0.025);
          const drift = 1 + 0.06 * Math.sin(t * (0.00018 + orbitInfo.orbitIndex * 0.00004) + orbitInfo.slot);

          return {
            ...n,
            position: {
              x: ring.radiusX * ringBreath * drift * Math.cos(angle),
              y: orbitConfig.centerY + ring.radiusY * ringBreath * Math.sin(angle),
            },
            draggable: false,
            data: {
              ...n.data,
              depth,
              isCompact,
              orbitIndex: orbitInfo.orbitIndex,
            },
          };
        })
      );

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isCompact, orbitConfig, setNodes]);

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
  }, [activeNode, isCompact, litNodes, hoveredNode, setNodes]);

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
          stroke = "#7dd3fc";
          strokeWidth = 2.5;
          opacity = 1;
          animated = true;
        } else if (isDirect) {
          stroke = "#93c5fd";
          strokeWidth = 2;
          opacity = 1;
          animated = true;
        } else if (isSecondary) {
          stroke = "#67e8f9";
          strokeWidth = 1.3;
          opacity = 0.4;
          animated = false;
        } else if (anyHover) {
          stroke = "#173257";
          strokeWidth = 1;
          opacity = 0.08;
          animated = false;
        } else {
          stroke = "#3b82f6";
          strokeWidth = 1;
          opacity = isCompact ? 0.16 : 0.22;
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
  }, [firingEdges, hoveredNode, isCompact, setEdges]);

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
          "radial-gradient(circle at 50% 46%, rgba(59,130,246,0.22) 0%, rgba(8,15,38,0.9) 24%, #020617 58%, #01030a 100%)",
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
            "radial-gradient(circle at 50% 45%, rgba(125,211,252,0.18) 0 10%, rgba(103,232,249,0.08) 16%, transparent 34%), radial-gradient(circle at 22% 28%, rgba(14,165,233,0.14), transparent 24%), radial-gradient(circle at 80% 22%, rgba(56,189,248,0.1), transparent 20%), radial-gradient(circle at 74% 72%, rgba(34,211,238,0.08), transparent 26%)",
          filter: "blur(8px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 18%, rgba(255,255,255,0.85) 0 1.1px, transparent 1.8px), radial-gradient(circle at 66% 72%, rgba(186,230,253,0.6) 0 1px, transparent 1.6px), radial-gradient(circle, rgba(148,163,184,0.45) 0 1px, transparent 1.4px)",
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 24px 24px",
          opacity: 0.46,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {orbitConfig.rings.map((ring, index) => (
        <div
          key={`orbit-${index}`}
          style={{
            position: "absolute",
            left: "50%",
            top: `calc(50% + ${orbitConfig.centerY / 2}px)`,
            width: ring.radiusX * 2,
            height: ring.radiusY * 2,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: index === 0 ? "1px solid rgba(125,211,252,0.24)" : "1px solid rgba(59,130,246,0.16)",
            boxShadow: index === 0 ? "0 0 40px rgba(125,211,252,0.08)" : "none",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}
      {onSkip && (
        <button
          onClick={onSkip}
          style={{ position: "absolute", top: isCompact ? 72 : 18, right: isCompact ? 14 : 16, zIndex: 50 }}
          className="text-xs text-muted-foreground hover:text-primary border border-border bg-background/85 backdrop-blur-sm rounded-full px-4 py-2 shadow-md transition-colors"
        >
          Skip to Classic View
        </button>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(1,4,16,0.96) 0px, rgba(2,8,23,0.84) 104px, rgba(2,8,23,0.18) 250px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

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
        fitViewOptions={{ padding: isCompact ? 0.32 : 0.2, includeHiddenNodes: false }}
        nodesDraggable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        panOnScroll={false}
        preventScrolling={false}
        zoomOnDoubleClick={false}
        minZoom={0.6}
        maxZoom={1.15}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={26} size={1.1} color="#15314d" />
      </ReactFlow>
    </div>
  );
}
