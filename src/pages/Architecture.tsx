import React from "react";
import { Stack, Text } from "@fluentui/react";
import moduleGraphData from "../demoData/moduleGraph.json";
import styles from "./Pages.module.css";

const Architecture: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>🏗️ Architecture</h1>
      <p className={styles.pageSubtitle}>
        Visualize module dependencies and service layers
      </p>

      <Stack styles={{ root: { gap: 24 } }}>
        {/* Layers */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "16px" }}>
            📦 Service Layers
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
            {moduleGraphData.layers.map((layer) => (
              <div
                key={layer.name}
                style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ fontWeight: 600, color: "#0078d4", marginBottom: "12px" }}>
                  📦 {layer.name}
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {layer.modules.map((moduleId) => (
                    <div
                      key={moduleId}
                      style={{
                        background: "#d4e8f7",
                        color: "#0078d4",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {moduleId}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Details */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "16px" }}>
            Module Dependencies
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {moduleGraphData.modules.map((module) => (
              <div
                key={module.id}
                style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderLeft: `4px solid #0078d4`,
                }}
              >
                <div style={{ fontWeight: 600, color: "#333", marginBottom: "8px" }}>
                  {module.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Lines: {module.lines}</span>
                  <span>Complexity: {module.complexity}/10</span>
                </div>
                {module.dependencies.length > 0 && (
                  <div style={{ fontSize: "12px", marginTop: "8px" }}>
                    <div style={{ fontWeight: 600, color: "#0078d4", marginBottom: "4px" }}>
                      Dependencies:
                    </div>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {module.dependencies.map((dep) => (
                        <span
                          key={dep}
                          style={{
                            background: "#ede9e8",
                            padding: "2px 6px",
                            borderRadius: "2px",
                            fontSize: "11px",
                          }}
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Circular Dependencies */}
        {moduleGraphData.circularDependencies.length > 0 && (
          <div>
            <Text variant="large" block styles={{ fontWeight: 600, marginBottom: "16px" }}>
              ⚠️ Circular Dependencies Detected
            </Text>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
              {moduleGraphData.circularDependencies.map((circ, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#fde7e9",
                    border: "1px solid #d13438",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#d13438", marginBottom: "8px" }}>
                    Cycle: {circ.path.join(" → ")}
                  </div>
                  <div style={{ fontSize: "13px", color: "#333", marginBottom: "8px" }}>
                    Severity: <strong>{circ.severity}</strong>
                  </div>
                  <div style={{ fontSize: "12px", color: "#333" }}>
                    <strong>Resolution:</strong> {circ.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Architecture;
