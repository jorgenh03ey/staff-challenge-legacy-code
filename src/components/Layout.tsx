import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Nav,
  DefaultButton,
} from "@fluentui/react";
import type { INavLinkGroup } from "@fluentui/react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Landing",
          url: "/",
          icon: "Home",
          onClick: () => navigate("/"),
        },
        {
          name: "Import Repo",
          url: "/import",
          icon: "Upload",
          onClick: () => navigate("/import"),
        },
        {
          name: "Agent Orchestration",
          url: "/run",
          icon: "Running",
          onClick: () => navigate("/run"),
        },
        {
          name: "Architecture",
          url: "/architecture",
          icon: "Diagram",
          onClick: () => navigate("/architecture"),
        },
        {
          name: "Translation",
          url: "/translate",
          icon: "PageEdit",
          onClick: () => navigate("/translate"),
        },
        {
          name: "Living Docs",
          url: "/docs",
          icon: "Documentation",
          onClick: () => navigate("/docs"),
        },
        {
          name: "Validation",
          url: "/validate",
          icon: "CheckMark",
          onClick: () => navigate("/validate"),
        },
        {
          name: "Export",
          url: "/export",
          icon: "Download",
          onClick: () => navigate("/export"),
        },
      ],
    },
  ];

  const handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>🤖 Agentic AI Legacy Code Migration</h1>
          <span className={styles.badge}>Demo Mode</span>
        </div>
        <DefaultButton
          text="Reset Demo"
          onClick={handleReset}
          className={styles.resetBtn}
        />
      </header>

      <div className={styles.mainContent}>
        <nav className={styles.sidebar}>
          <Nav
            groups={navLinkGroups}
            selectedKey={window.location.pathname}
            styles={{
              root: {
                width: "100%",
              },
            }}
          />
        </nav>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
