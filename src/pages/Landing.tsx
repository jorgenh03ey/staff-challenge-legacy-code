import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, Stack, Text } from "@fluentui/react";
import styles from "./Pages.module.css";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { minHeight: "100%", padding: "48px 24px" } }}
      >
        <Stack
          horizontalAlign="center"
          className={styles.landingContainer}
          maxWidth={600}
        >
          <h1 className={styles.landingTitle}>
            🚀 Modernize Your Legacy Code
          </h1>

          <p className={styles.landingSubtitle}>
            Watch AI agents work together to orchestrate a complete migration
            from a legacy monolithic messaging app to a modern Python microservices architecture.
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔍</span>
              <h3>Code Analysis</h3>
              <p>Detect messaging patterns and anti-patterns automatically</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔄</span>
              <h3>Architecture Redesign</h3>
              <p>Transform to async WebSocket-based design with E2E encryption</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>✅</span>
              <h3>Quality Assurance</h3>
              <p>96%+ message delivery parity with original platform</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>📚</span>
              <h3>Auto Documentation</h3>
              <p>Migration guides and WebSocket integration runbooks</p>
            </div>
          </div>

          <div className={styles.ctas}>
            <PrimaryButton
              text="Start Migration ✈️"
              onClick={() => navigate("/import")}
              className={styles.ctaBtn}
            />
            <Text variant="medium" block styles={{ root: { marginTop: 24 } }}>
              Or explore the demo flow below:
            </Text>
          </div>

          <div className={styles.flowSteps}>
            <div className={styles.flowStep}>
              <span className={styles.stepNum}>1</span>
              <span className={styles.stepText}>Upload messaging codebase</span>
            </div>
            <span className={styles.stepArrow}>→</span>
            <div className={styles.flowStep}>
              <span className={styles.stepNum}>2</span>
              <span className={styles.stepText}>Run AI agent pipeline</span>
            </div>
            <span className={styles.stepArrow}>→</span>
            <div className={styles.flowStep}>
              <span className={styles.stepNum}>3</span>
              <span className={styles.stepText}>Export Python services</span>
            </div>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default Landing;
