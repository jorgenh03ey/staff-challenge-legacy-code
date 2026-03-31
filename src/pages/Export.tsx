import React from "react";
import { Stack, Text, PrimaryButton, DefaultButton } from "@fluentui/react";
import JSZip from "jszip";
import prSummaryData from "../demoData/prSummary.json";
import styles from "./Pages.module.css";

const Export: React.FC = () => {
  const generateZip = async () => {
    const zip = new JSZip();

    // Add migrated code structure
    const codeFolder = zip.folder("migrated-code");
    codeFolder?.file("package.json", JSON.stringify({
      name: "migrated-order-system",
      version: "1.0.0",
      description: "Migrated microservices architecture",
      main: "dist/index.js",
      dependencies: {
        "nestjs": "^10.0.0",
        "typeorm": "^0.3.0",
        "express": "^4.18.0",
      },
    }, null, 2));

    codeFolder?.file("README.md", `# Migrated Order System\n\n## Overview\nThis is the result of automated migration from legacy monolithic system.\n\n## Services\n- Order Service\n- User Service\n- Payment Service\n- Inventory Service\n\n## Getting Started\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`);

    // Add services structure
    const servicesFolder = codeFolder?.folder("services");
    ["order", "user", "payment", "inventory"].forEach((service) => {
      const serviceFolder = servicesFolder?.folder(service);
      serviceFolder?.file(`.controller.ts`, `export class ${service.charAt(0).toUpperCase() + service.slice(1)}Controller {}`);
      serviceFolder?.file(`.service.ts`, `export class ${service.charAt(0).toUpperCase() + service.slice(1)}Service {}`);
    });

    // Add PR summary
    zip.file("PR_SUMMARY.md", `# Migration PR\n\n## ${prSummaryData.title}\n\n${prSummaryData.description}\n\n## Changes\n- Files Added: ${prSummaryData.changes.filesAdded}\n- Files Modified: ${prSummaryData.changes.filesModified}\n- Lines Added: +${prSummaryData.changes.linesAdded}\n- Lines Removed: -${prSummaryData.changes.linesRemoved}\n\n## Highlights\n${prSummaryData.highlights.map((h) => `- ${h}`).join("\n")}\n`);

    // Add test results
    zip.file("TEST_RESULTS.json", JSON.stringify({
      summary: {
        totalTests: 234,
        passed: 234,
        failed: 0,
        coverage: "86%",
      },
    }, null, 2));

    // Generate and download
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "migrated-codebase.zip";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadDocs = async () => {
    const content = `# Migration Documentation\n\n## Executive Summary\nSuccessfully migrated legacy monolithic system to modern microservices architecture.\n\n## Architecture\n- Service Layer: NestJS/Express\n- Database: PostgreSQL with TypeORM\n- API Style: REST/GraphQL\n- Deployment: Docker/Kubernetes\n\n## Test Results\n- Total Tests: 234\n- Pass Rate: 100%\n- Code Coverage: 86%\n- Performance Improvement: 3.2x faster\n\n## Deployment Guide\n1. Build Docker images\n2. Push to registry\n3. Deploy with Kubernetes manifests\n4. Blue-green deployment for zero-downtime\n`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "MIGRATION_GUIDE.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadTestReport = async () => {
    const reportHTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; margin: 20px; background: #f3f2f1; }
    .container { background: white; padding: 20px; border-radius: 8px; max-width: 800px; margin: 0 auto; }
    h1 { color: #0078d4; }
    .metric { display: inline-block; background: #f3f2f1; padding: 20px; margin: 10px; border-radius: 8px; }
    .pass { color: #107c10; font-weight: bold; }
    .fail { color: #d13438; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; border: 1px solid #e1dfdd; text-align: left; }
    th { background: #0078d4; color: white; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧪 Test Results Report</h1>
    <div class="metric">
      <div>Total Tests</div>
      <div class="pass">234</div>
    </div>
    <div class="metric">
      <div>Passed</div>
      <div class="pass">234</div>
    </div>
    <div class="metric">
      <div>Failed</div>
      <div class="pass">0</div>
    </div>
    <div class="metric">
      <div>Coverage</div>
      <div class="pass">86%</div>
    </div>
    <table>
      <tr>
        <th>Test Suite</th>
        <th>Status</th>
        <th>Coverage</th>
      </tr>
      <tr>
        <td>Order Service</td>
        <td class="pass">✅ PASS (62/62)</td>
        <td>87%</td>
      </tr>
      <tr>
        <td>User Service</td>
        <td class="pass">✅ PASS (54/54)</td>
        <td>84%</td>
      </tr>
      <tr>
        <td>Payment Service</td>
        <td class="pass">✅ PASS (48/48)</td>
        <td>91%</td>
      </tr>
      <tr>
        <td>Inventory Service</td>
        <td class="pass">✅ PASS (42/42)</td>
        <td>79%</td>
      </tr>
      <tr>
        <td>Integration Tests</td>
        <td class="pass">✅ PASS (28/28)</td>
        <td>92%</td>
      </tr>
    </table>
  </div>
</body>
</html>`;

    const blob = new Blob([reportHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "test_report.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>📦 Export Results</h1>
      <p className={styles.pageSubtitle}>
        Download your Python microservices, documentation, and deployment artifacts
      </p>

      <Stack styles={{ root: { gap: 24, maxWidth: "1000px" } }}>
        {/* PR Summary */}
        <div className={styles.exportContainer}>
          <div className={styles.prHeader}>
            <div className={styles.prTitle}>{prSummaryData.title}</div>
            <div className={styles.prDescription}>{prSummaryData.description}</div>
          </div>

          <div className={styles.prContent}>
            {/* Changes */}
            <div>
              <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "12px", color: "#0078d4" }}>
                📊 Changes Summary
              </Text>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px", marginBottom: "24px" }}>
                {[
                  { label: "Files Added", value: prSummaryData.changes.filesAdded, color: "#107c10" },
                  { label: "Files Modified", value: prSummaryData.changes.filesModified, color: "#0078d4" },
                  { label: "Files Deleted", value: prSummaryData.changes.filesDeleted, color: "#d13438" },
                  { label: "Lines Added", value: `+${prSummaryData.changes.linesAdded}`, color: "#107c10" },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: "#f3f2f1", padding: "12px", borderRadius: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#666" }}>{item.label}</div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: item.color, marginTop: "4px" }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "12px", color: "#0078d4" }}>
                ✨ Key Highlights
              </Text>
              <ul className={styles.highlightList}>
                {prSummaryData.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div style={{ marginTop: "24px" }}>
              <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "12px", color: "#0078d4" }}>
                🎯 Business Benefits
              </Text>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
                {prSummaryData.benefits.map((benefit, idx) => (
                  <div key={idx} style={{ background: "#f3f2f1", padding: "12px", borderRadius: "4px" }}>
                    <div style={{ fontWeight: 600, color: "#0078d4", fontSize: "13px" }}>
                      {benefit.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                      {benefit.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Info */}
            <div style={{ marginTop: "24px", background: "#d4e8f7", padding: "16px", borderRadius: "4px", borderLeft: "4px solid #0078d4" }}>
              <Text variant="small" block styles={{ fontWeight: 600, color: "#0078d4", marginBottom: "8px" }}>
                🚀 Deployment Strategy
              </Text>
              <Text variant="small">{prSummaryData.deploymentStrategy}</Text>
            </div>
          </div>
        </div>

        {/* Download Options */}
        <div style={{ background: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Text variant="large" block styles={{ fontWeight: 600, marginBottom: "16px" }}>
            📥 Download Artifacts
          </Text>

          <Stack styles={{ root: { gap: 12 } }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
              <div style={{ background: "#f3f2f1", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #0078d4" }}>
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>📦 Migrated Codebase</div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
                  Complete source code with services, configs, and test stubs
                </div>
                <PrimaryButton text="Download ZIP" onClick={generateZip} />
              </div>

              <div style={{ background: "#f3f2f1", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #107c10" }}>
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>📚 Migration Guide</div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
                  Step-by-step guide with architecture and deployment instructions
                </div>
                <DefaultButton text="Download MD" onClick={downloadDocs} />
              </div>

              <div style={{ background: "#f3f2f1", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #d13438" }}>
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>🧪 Test Report</div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
                  Comprehensive HTML test results with coverage metrics
                </div>
                <DefaultButton text="Download HTML" onClick={downloadTestReport} />
              </div>
            </div>
          </Stack>
        </div>

        {/* Next Steps */}
        <div style={{ background: "#f3f2f1", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #0078d4" }}>
          <Text variant="medium" block styles={{ fontWeight: 600, marginBottom: "8px", color: "#0078d4" }}>
            📋 Next Steps
          </Text>
          <ol style={{ margin: "8px 0", paddingLeft: "20px", fontSize: "13px", lineHeight: "1.8" }}>
            <li>Download all artifacts above</li>
            <li>Review migration guide and architecture</li>
            <li>Set up CI/CD pipeline with provided Docker configs</li>
            <li>Run test suite: <code>npm test</code></li>
            <li>Deploy to staging environment</li>
            <li>Plan blue-green production deployment</li>
          </ol>
        </div>
      </Stack>
    </div>
  );
};

export default Export;
