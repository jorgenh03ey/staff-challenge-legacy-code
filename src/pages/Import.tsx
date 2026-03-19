import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PrimaryButton,
  DefaultButton,
  Stack,
} from "@fluentui/react";
import repoData from "../demoData/repoSummary.json";
import styles from "./Pages.module.css";

const Import: React.FC = () => {
  const [repoSummary] = useState(repoData);
  const [selectedModules, setSelectedModules] = useState<string[]>(
    repoData.mainModules.map((m) => m.name)
  );
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Mock: just show the repo summary
    const files = event.target.files;
    if (files) {
      setTimeout(() => {
        // Simulate processing
      }, 500);
    }
  };

  const toggleModule = (moduleName: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  const handleContinue = () => {
    // Store selection and proceed
    localStorage.setItem(
      "selectedModules",
      JSON.stringify(selectedModules)
    );
    navigate("/run");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>📁 Import Your Repository</h1>
      <p className={styles.pageSubtitle}>
        Upload a legacy codebase for analysis and migration planning
      </p>

      {repoSummary && (
        <div className={styles.importContainer}>
          <Stack>
            {/* Already showing repo data as if uploaded */}
            <div className={styles.uploadZone}>
              <div className={styles.uploadIcon}>📦</div>
              <Text variant="large" block>
                Repository Already Loaded
              </Text>
              <Text variant="small" block styles={{ marginTop: 8 }}>
                Demo repository is ready for analysis
              </Text>
            </div>

            {/* Repository Summary */}
            <Stack styles={{ root: { marginTop: 24 } }}>
              <Text variant="large" block styles={{ fontWeight: 600 }}>
                Repository Summary
              </Text>

              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Name</span>
                  <span className={styles.summaryValue}>{repoSummary.name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Language</span>
                  <span className={styles.summaryValue}>
                    {repoSummary.language} / {repoSummary.framework}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Files</span>
                  <span className={styles.summaryValue}>
                    {repoSummary.fileCount}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Lines of Code</span>
                  <span className={styles.summaryValue}>
                    {repoSummary.linesOfCode.toLocaleString()}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Last Modified</span>
                  <span className={styles.summaryValue}>
                    {repoSummary.lastModified}
                  </span>
                </div>
              </div>
            </Stack>

            {/* Module Selection */}
            <Stack styles={{ root: { marginTop: 24 } }}>
              <Text variant="large" block styles={{ fontWeight: 600 }}>
                Select Modules to Migrate
              </Text>
              <div style={{ marginTop: 12 }}>
                {repoSummary.mainModules.map((module) => (
                  <div
                    key={module.name}
                    style={{
                      padding: "12px",
                      marginBottom: "8px",
                      background: selectedModules.includes(module.name)
                        ? "#d4e8f7"
                        : "#f3f2f1",
                      borderRadius: "4px",
                      cursor: "pointer",
                      border: selectedModules.includes(module.name)
                        ? "2px solid #0078d4"
                        : "2px solid transparent",
                    }}
                    onClick={() => toggleModule(module.name)}
                  >
                    <div style={{ fontWeight: 600, color: "#333" }}>
                      ☑️ {module.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {module.path} ({module.lines} lines)
                    </div>
                  </div>
                ))}
              </div>
            </Stack>

            {/* Detected Patterns */}
            <Stack styles={{ root: { marginTop: 24 } }}>
              <Text variant="large" block styles={{ fontWeight: 600 }}>
                Detected Patterns
              </Text>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {repoSummary.detectedPatterns.map((pattern) => (
                  <div
                    key={pattern}
                    style={{
                      background: "#fde7e9",
                      color: "#d13438",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    ⚠️ {pattern}
                  </div>
                ))}
              </div>
            </Stack>

            {/* Actions */}
            <Stack
              horizontal
              styles={{ root: { marginTop: 32, gap: 12 } }}
            >
              <PrimaryButton text="Proceed to Run Pipeline" onClick={handleContinue} />
              <DefaultButton
                text="Upload Different Repo"
                onClick={() => {
                  const input = document.getElementById(
                    "fileInput"
                  ) as HTMLInputElement;
                  input?.click();
                }}
              />
              <input
                id="fileInput"
                type="file"
                accept=".zip"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </Stack>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Import;
