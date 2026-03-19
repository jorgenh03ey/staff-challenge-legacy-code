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
            from legacy monolithic architecture to a modern distributed system.
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔍</span>
              <h3>Intelligent Analysis</h3>
              <p>Automated detection of patterns and anti-patterns</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔄</span>
              <h3>Strategic Transformation</h3>
              <p>Phased migration planning with rollback support</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>✅</span>
              <h3>Quality Validation</h3>
              <p>96%+ behavioral parity with legacy system</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>📚</span>
              <h3>Auto-Generated Docs</h3>
              <p>Architecture guides and migration playbooks</p>
            </div>
          </div>

          <div className={styles.ctas}>
            <PrimaryButton
              text="Start Migration ✈️"
              size="large"
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
              <span className={styles.stepText}>Upload your legacy repo</span>
            </div>
            <span className={styles.stepArrow}>→</span>
            <div className={styles.flowStep}>
              <span className={styles.stepNum}>2</span>
              <span className={styles.stepText}>Run agent pipeline</span>
            </div>
            <span className={styles.stepArrow}>→</span>
            <div className={styles.flowStep}>
              <span className={styles.stepNum}>3</span>
              <span className={styles.stepText}>Export migrated code</span>
            </div>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default Landing;
