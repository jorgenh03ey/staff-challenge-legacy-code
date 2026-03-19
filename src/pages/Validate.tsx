import React, { useState } from "react";
import { Stack, Text } from "@fluentui/react";
import testResultsData from "../demoData/testResults.json";
import styles from "./Pages.module.css";

const Validate: React.FC = () => {
  const [expandedSuite, setExpandedSuite] = useState(0);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>✅ Validation Dashboard</h1>
      <p className={styles.pageSubtitle}>
        Test results, parity metrics, and quality assurance
      </p>

      <Stack styles={{ root: { gap: 24 } }}>
        {/* Summary Metrics */}
        <div className={styles.metricsGrid}>
          {[
            {
              icon: "✅",
              label: "Tests Passed",
              value: testResultsData.summary.passed,
              total: testResultsData.summary.totalTests,
            },
            {
              icon: "📊",
              label: "Average Coverage",
              value: "86%",
              color: "#107c10",
            },
            {
              icon: "⚡",
              label: "Performance Gain",
              value: `${testResultsData.parity.performanceGain}x`,
              unit: "faster",
            },
            {
              icon: "🎯",
              label: "Behavioral Parity",
              value: `${testResultsData.parity.behavioralMatch}%`,
              unit: "match",
            },
          ].map((metric, idx) => (
            <div key={idx} className={styles.metricCard}>
              <div style={{ fontSize: "32px" }}>{metric.icon}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
              <div className={styles.metricValue}>{metric.value}</div>
              {metric.total && (
                <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  out of {metric.total}
                </div>
              )}
              {metric.unit && (
                <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  {metric.unit}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Test Suites */}
        <div style={{ background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid #e1dfdd" }}>
            <Text variant="medium" block styles={{ fontWeight: 600 }}>
              Test Suite Results
            </Text>
          </div>
          <div>
            {testResultsData.suites.map((suite, idx) => (
              <div key={idx}>
                <div
                  onClick={() => setExpandedSuite(expandedSuite === idx ? -1 : idx)}
                  style={{
                    padding: "16px 20px",
                    background: idx % 2 === 0 ? "#f3f2f1" : "white",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #e1dfdd",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "#333" }}>
                      {suite.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                      {suite.passed}/{suite.passed + suite.failed} tests passed • {suite.coverage}% coverage
                    </div>
                  </div>
                  <div
                    style={{
                      background: suite.failed === 0 ? "#107c10" : "#d13438",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      fontWeight: 600,
                      fontSize: "12px",
                    }}
                  >
                    {suite.failed === 0 ? "✅ PASS" : `⚠️ ${suite.failed} FAIL`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warnings */}
        {testResultsData.warnings.length > 0 && (
          <div style={{ background: "#fef3cd", border: "1px solid #ffb81f", borderRadius: "8px", padding: "16px" }}>
            <Text variant="medium" block styles={{ fontWeight: 600, color: "#dd5900", marginBottom: "12px" }}>
              ⚠️ Warnings
            </Text>
            <Stack styles={{ root: { gap: 12 } }}>
              {testResultsData.warnings.map((warning, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    padding: "12px",
                    borderRadius: "4px",
                    borderLeft: "4px solid #dd5900",
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#333", fontSize: "12px" }}>
                    {warning.test}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                    {warning.message}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      marginTop: "4px",
                      background: "white",
                      padding: "2px 6px",
                      borderRadius: "2px",
                      display: "inline-block",
                      color: "#dd5900",
                      fontWeight: 600,
                    }}
                  >
                    {warning.severity}
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        )}

        {/* Parity Comparison */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "16px", color: "#0078d4" }}>
            📈 Legacy vs. Migrated Comparison
          </Text>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              {
                label: "Legacy System",
                tests: testResultsData.parity.legacySystem.totalTests,
                passed: testResultsData.parity.legacySystem.passed,
                coverage: testResultsData.parity.legacySystem.coverage,
              },
              {
                label: "Migrated System",
                tests: testResultsData.parity.migratedSystem.totalTests,
                passed: testResultsData.parity.migratedSystem.passed,
                coverage: testResultsData.parity.migratedSystem.coverage,
              },
            ].map((system, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f3f2f1",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "12px" }}>
                  {system.label}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#666" }}>Tests</span>
                  <span style={{ fontWeight: 600 }}>{system.tests}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#666" }}>Passed</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: system.passed > 150 ? "#107c10" : "#dd5900",
                    }}
                  >
                    {system.passed}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#666" }}>Coverage</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: system.coverage > 50 ? "#107c10" : "#dd5900",
                    }}
                  >
                    {system.coverage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default Validate;
