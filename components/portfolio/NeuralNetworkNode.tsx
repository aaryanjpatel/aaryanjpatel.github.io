"use client";

import React, { useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { motion } from "framer-motion";
import { getNodeWeight } from "./network-logic";

export default function NeuralNetworkNode({ data, selected }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const active: boolean = data.active ?? false;
  const lit: boolean = data.lit ?? false;
  const highlight = active || lit || hovered || selected;
  const weight = data.weight || getNodeWeight(data.id);
  const isCentral = data.id === "aaryan";
  const isCompact = Boolean(data.isCompact);
  const orbitIndex = typeof data.orbitIndex === "number" ? data.orbitIndex : 0;

  const depth = typeof data.depth === "number" ? data.depth : 1;
  const baseSize = isCentral
    ? isCompact
      ? 96
      : 108
    : weight === "strong"
    ? isCompact
      ? 42
      : 58
    : weight === "medium"
    ? isCompact
      ? 34
      : 48
    : isCompact
    ? 30
    : 38;
  const scale3d = 0.85 + 0.3 * depth;
  const opacity3d = 0.45 + 0.55 * depth;
  const zIndex3d = isCentral ? 200 : Math.round(1 + 99 * depth);
  const size = baseSize * scale3d;

  const orbitPalette = ["#7dd3fc", "#38bdf8", "#22d3ee"];
  const basePlanetColor = orbitPalette[orbitIndex] ?? orbitPalette[0];
  const ringColor = isCentral ? "#fde68a" : active ? "#e0f2fe" : lit ? "#93c5fd" : basePlanetColor;
  const glowColor = isCentral ? "#fbbf24" : active ? "#7dd3fc" : lit ? "#60a5fa" : basePlanetColor;
  const bgColor = isCentral
    ? "radial-gradient(circle at 35% 35%, rgba(254,249,195,0.98), rgba(251,191,36,0.86) 38%, rgba(180,83,9,0.72) 68%, rgba(120,53,15,0.2) 100%)"
    : active
    ? `radial-gradient(circle at 32% 28%, rgba(224,242,254,0.95), ${basePlanetColor} 44%, rgba(8,47,73,0.96) 100%)`
    : lit
    ? "radial-gradient(circle at 34% 30%, rgba(191,219,254,0.92), rgba(59,130,246,0.85) 42%, rgba(15,23,42,0.96) 100%)"
    : `radial-gradient(circle at 34% 30%, rgba(224,242,254,0.88), ${basePlanetColor} 36%, rgba(8,47,73,0.94) 100%)`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        opacity: opacity3d,
        zIndex: zIndex3d,
        transition: "opacity 0.3s, z-index 0.3s",
        minWidth: 44,
        minHeight: 44,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: "none" }} />

      {hovered && !active && !isCompact && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(2, 6, 23, 0.88)",
            color: "#dbeafe",
            border: `1px solid ${ringColor}44`,
            borderRadius: 999,
            padding: "5px 12px",
            fontSize: 11,
            whiteSpace: "nowrap",
            boxShadow: `0 2px 16px ${glowColor}44`,
            backdropFilter: "blur(10px)",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          {data.description || data.label}
        </div>
      )}

      <motion.div
        animate={{
          boxShadow: highlight
            ? isCentral
              ? "0 0 0 2px rgba(254,240,138,0.7), 0 0 28px 8px rgba(251,191,36,0.9), 0 0 72px 24px rgba(245,158,11,0.38)"
              : `0 0 0 2px ${ringColor}, 0 0 20px 6px ${glowColor}aa, 0 0 54px 18px ${glowColor}40`
            : isCentral
            ? "0 0 0 1px rgba(254,240,138,0.5), 0 0 20px 6px rgba(251,191,36,0.48), 0 0 60px 18px rgba(245,158,11,0.24)"
            : `0 0 0 1px ${ringColor}88, 0 0 12px 3px ${glowColor}24`,
          scale: (active ? 1.18 : lit ? 1.1 : hovered ? 1.08 : 1) * scale3d,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: isCentral ? "1px solid rgba(254,240,138,0.45)" : `1.5px solid ${ringColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: bgColor,
          overflow: "visible",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: active ? 0.5 : 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: isCentral ? "1.5px solid rgba(254,240,138,0.42)" : `1.5px solid ${ringColor}aa`,
            pointerEvents: "none",
          }}
        />

        {!isCentral && (
          <>
            <div
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: `1px solid ${ringColor}33`,
                opacity: 0.9,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: size * 0.16,
                borderRadius: "50%",
                background: "radial-gradient(circle at 28% 28%, rgba(255,255,255,0.32), transparent 36%)",
                mixBlendMode: "screen",
                opacity: 0.75,
                pointerEvents: "none",
              }}
            />
          </>
        )}

        {active && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `2px solid ${ringColor}`,
              pointerEvents: "none",
            }}
          />
        )}

        {isCentral && (
          <>
            <div
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: "50%",
                border: "1px solid rgba(251,191,36,0.18)",
                boxShadow: "0 0 24px rgba(251,191,36,0.18)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              animate={{
                color: highlight ? "#fff" : "#fefce8",
                textShadow: highlight ? `0 0 16px ${glowColor}` : "0 0 10px rgba(251,191,36,0.2)",
              }}
              transition={{ duration: 0.2 }}
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                lineHeight: 1.12,
                pointerEvents: "none",
              }}
            >
              <div style={{ fontSize: isCompact ? 11 : 12, fontWeight: 700, color: "#fef3c7", letterSpacing: "0.12em" }}>AARYAN</div>
              <div style={{ fontSize: isCompact ? 10 : 11, fontWeight: 600, color: "#f8fafc", letterSpacing: "0.08em" }}>PATEL</div>
            </motion.div>
          </>
        )}
      </motion.div>

      {!isCentral && (
        <motion.div
          animate={{ color: highlight ? "#e0f2fe" : "#94a3b8", textShadow: highlight ? `0 0 12px ${glowColor}` : "none" }}
          transition={{ duration: 0.2 }}
          style={{
            marginTop: isCompact ? 5 : 8,
            padding: isCompact ? "2px 6px" : "3px 8px",
            fontSize: isCompact ? 8 : 10,
            fontWeight: 600,
            whiteSpace: "nowrap",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            maxWidth: isCompact ? 72 : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            borderRadius: 999,
            background: highlight ? "rgba(2, 6, 23, 0.5)" : "transparent",
            border: highlight ? `1px solid ${ringColor}33` : "1px solid transparent",
            backdropFilter: highlight ? "blur(8px)" : "none",
          }}
        >
          {data.label}
        </motion.div>
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
    </div>
  );
}
