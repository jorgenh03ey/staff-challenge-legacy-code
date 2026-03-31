import React, { useState } from "react";
import { Stack, Text } from "@fluentui/react";
import fileMappingData from "../demoData/fileMapping.json";
import diffsData from "../demoData/diffs.json";
import styles from "./Pages.module.css";

const Translate: React.FC = () => {
  const [selectedMapping, setSelectedMapping] = useState(0);

  const currentDiff = diffsData.diffs[selectedMapping];

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>🔄 Translation Workspace</h1>
      <p className={styles.pageSubtitle}>
        Side-by-side code comparison showing Java → Python transformations
      </p>

      <Stack styles={{ root: { gap: 20 } }}>
        {/* File Pairs */}
        <div style={{ background: "white", padding: "16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "12px" }}>
            File Transformations
          </Text>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
            {fileMappingData.mappings.map((mapping, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedMapping(idx)}
                style={{
                  padding: "12px",
                  background: idx === selectedMapping ? "#d4e8f7" : "#f3f2f1",
                  border: idx === selectedMapping ? "2px solid #0078d4" : "2px solid transparent",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: idx === selectedMapping ? "#0078d4" : "#333",
                  fontWeight: idx === selectedMapping ? 600 : 400,
                }}
              >
                <div>📄 {mapping.legacyFile.split("/").pop()}</div>
                <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
                  ↓ {mapping.changeType}
                </div>
                <div>📄 {mapping.migratedFile.split("/").pop()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Comparison */}
        {currentDiff && (
          <div className={styles.codeComparison}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "500px" }}>
              {/* Legacy Code */}
              <div className={styles.codeSection}>
                <div className={styles.codeLabel}>❌ Legacy Code ({currentDiff.from})</div>
                <div className={styles.codeBlock}>{currentDiff.legacyCode}</div>
              </div>

              {/* Migrated Code */}
              <div className={styles.codeSection}>
                <div className={styles.codeLabel}>✅ Migrated Code ({currentDiff.to})</div>
                <div className={styles.codeBlock}>{currentDiff.migratedCode}</div>
              </div>
            </div>

            {/* Explanation */}
            <div style={{ padding: "20px", background: "#f3f2f1", borderTop: "1px solid #e1dfdd" }}>
              <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "8px", color: "#0078d4" }}>
                💡 Transformation Details
              </Text>
              <Text variant="small" block styles={{ marginBottom: "16px" }}>
                {currentDiff.explanation}
              </Text>

              <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "8px", color: "#107c10" }}>
                ✨ Benefits
              </Text>
              <Text variant="small">{currentDiff.impact}</Text>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "12px" }}>
            📊 Migration Statistics
          </Text>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
            {[
              { label: "Files Transformed", value: fileMappingData.statistics.totalMigratedFiles },
              { label: "Lines Added", value: `+${fileMappingData.statistics.linesAdded}` },
              { label: "Lines Removed", value: `-${fileMappingData.statistics.linesRemoved}` },
              { label: "Net Reduction", value: fileMappingData.statistics.netReduction },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#f3f2f1",
                  padding: "16px",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "12px", color: "#666" }}>{stat.label}</div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0078d4",
                    marginTop: "8px",
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default Translate;
