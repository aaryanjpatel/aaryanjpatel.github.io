"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
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

  const depth = typeof data.depth === "number" ? data.depth : 1;
  const baseSize = isCentral
    ? isCompact
      ? 76
      : 90
    : weight === "strong"
    ? isCompact
      ? 40
      : 54
    : weight === "medium"
    ? isCompact
      ? 34
      : 44
    : isCompact
    ? 28
    : 34;
  const scale3d = 0.85 + 0.3 * depth;
  const opacity3d = 0.45 + 0.55 * depth;
  const zIndex3d = isCentral ? 200 : Math.round(1 + 99 * depth);
  const size = baseSize * scale3d;
  const ringColor = isCentral ? "#38bdf8" : active ? "#0ff" : lit ? "#a855f7" : "#0ff";
  const glowColor = isCentral ? "#38bdf8" : active ? "#0ff" : lit ? "#a855f7" : "#0ff";
  const bgColor = active ? (isCentral ? "#38bdf833" : "#0ff3") : lit ? "#a855f720" : "transparent";

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
            background: "#0f172a",
            color: "#a5f3fc",
            border: `1px solid ${ringColor}44`,
            borderRadius: 8,
            padding: "4px 12px",
            fontSize: 11,
            whiteSpace: "nowrap",
            boxShadow: `0 2px 16px ${glowColor}44`,
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
            ? `0 0 0 3px ${ringColor}, 0 0 48px 16px ${glowColor}cc`
            : `0 0 0 1.5px ${ringColor}88, 0 0 16px 4px ${glowColor}22`,
          scale: (active ? 1.18 : lit ? 1.1 : hovered ? 1.08 : 1) * scale3d,
          backgroundColor: bgColor,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `2px solid ${ringColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
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
            border: `2px solid ${ringColor}`,
            pointerEvents: "none",
          }}
        />

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
              border: `2.5px solid ${ringColor}`,
              pointerEvents: "none",
            }}
          />
        )}

        {isCentral && (
          <motion.div
            animate={{ color: highlight ? "#38bdf8" : "#ffffff", textShadow: highlight ? `0 0 16px ${glowColor}` : "none" }}
            transition={{ duration: 0.2 }}
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              lineHeight: 1.2,
              pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: isCompact ? 10 : 11, fontWeight: 700, color: highlight ? ringColor : "#ffffff", letterSpacing: "0.04em" }}>AARYAN</div>
            <div style={{ fontSize: isCompact ? 9 : 10, fontWeight: 500, color: highlight ? "#bfdbfe" : "#ffffff", letterSpacing: "0.02em" }}>PATEL</div>
          </motion.div>
        )}
      </motion.div>

      {!isCentral && (
        <motion.div
          animate={{ color: highlight ? ringColor : "#94a3b8", textShadow: highlight ? `0 0 10px ${glowColor}` : "none" }}
          transition={{ duration: 0.2 }}
          style={{
            marginTop: isCompact ? 4 : 5,
            fontSize: isCompact ? 8 : 10,
            fontWeight: 600,
            whiteSpace: "nowrap",
            letterSpacing: "0.03em",
            maxWidth: isCompact ? 64 : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
          }}
        >
          {data.label}
        </motion.div>
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
    </div>
  );
}
