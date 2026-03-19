import React, { useState } from "react";
import { Stack, Text } from "@fluentui/react";
import businessRulesData from "../demoData/businessRules.json";
import type { BusinessRule } from "../types";
import styles from "./Pages.module.css";

const Docs: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<BusinessRule | null>(null);

  const getPriorityStyle = (priority: string) => {
    const priorityMap: { [key: string]: string } = {
      Critical: styles.priorityCritical,
      High: styles.priorityHigh,
      Medium: styles.priorityMedium,
      Low: styles.priorityLow,
    };
    return priorityMap[priority] || "";
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>📚 Living Documentation</h1>
      <p className={styles.pageSubtitle}>
        Business rules, workflow summaries, and links to legacy code
      </p>

      <Stack styles={{ root: { gap: 24, maxWidth: "1200px" } }}>
        {/* Business Rules Table */}
        <div style={{ background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <table className={styles.rulesTable}>
            <thead>
              <tr>
                <th>Rule</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Legacy Issue</th>
                <th>Migrated Approach</th>
              </tr>
            </thead>
            <tbody>
              {businessRulesData.map((rule) => (
                <tr
                  key={rule.id}
                  onClick={() => setSelectedRule(rule)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <strong>{rule.rule}</strong>
                  </td>
                  <td>{rule.category}</td>
                  <td>
                    <span className={`${styles.priorityBadge} ${getPriorityStyle(rule.priority)}`}>
                      {rule.priority}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "#666" }}>
                    {rule.legacyViolation}
                  </td>
                  <td style={{ fontSize: "12px", color: "#666" }}>
                    {rule.migratedApproach}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Rule Details */}
        {selectedRule && (
          <div style={{ background: "#f3f2f1", padding: "20px", borderRadius: "8px" }}>
            <Text variant="large" block styles={{ fontWeight: 600, marginBottom: "16px" }}>
              📋 {selectedRule.rule}
            </Text>
            <Stack styles={{ root: { gap: 12 } }}>
              <div>
                <Text variant="small" block styles={{ fontWeight: 600, color: "#0078d4" }}>
                  Rationale:
                </Text>
                <Text variant="small">{selectedRule.rationale}</Text>
              </div>
              <div>
                <Text variant="small" block styles={{ fontWeight: 600, color: "#d13438" }}>
                  ❌ Legacy Violation:
                </Text>
                <Text variant="small">{selectedRule.legacyViolation}</Text>
              </div>
              <div>
                <Text variant="small" block styles={{ fontWeight: 600, color: "#107c10" }}>
                  ✅ Migrated Approach:
                </Text>
                <Text variant="small">{selectedRule.migratedApproach}</Text>
              </div>
              <div>
                <Text variant="small" block styles={{ fontWeight: 600 }}>
                  Affected Modules:
                </Text>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                  {selectedRule.affectedModules.map((mod) => (
                    <span
                      key={mod}
                      style={{
                        background: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        border: "1px solid #0078d4",
                        color: "#0078d4",
                      }}
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </Stack>
          </div>
        )}

        {/* Workflow Summary */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Text variant="large" block styles={{ fontWeight: 600, marginBottom: "16px" }}>
            📖 Migration Workflow
          </Text>
          <Stack styles={{ root: { gap: 16 } }}>
            {[
              {
                phase: "Phase 1: Analysis",
                desc: "Agent scans codebase for patterns, anti-patterns, and architectural issues",
              },
              {
                phase: "Phase 2: Planning",
                desc: "Generate phased migration strategy with risk assessment",
              },
              {
                phase: "Phase 3: Transformation",
                desc: "Automatic code generation based on detected patterns",
              },
              {
                phase: "Phase 4: Validation",
                desc: "Comprehensive testing and behavioral parity verification",
              },
              {
                phase: "Phase 5: Documentation",
                desc: "Generate migration guides, architecture docs, and runbooks",
              },
            ].map((item) => (
              <div
                key={item.phase}
                style={{
                  background: "#f3f2f1",
                  padding: "12px",
                  borderRadius: "4px",
                  borderLeft: "4px solid #0078d4",
                }}
              >
                <div style={{ fontWeight: 600, color: "#0078d4" }}>{item.phase}</div>
                <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default Docs;
