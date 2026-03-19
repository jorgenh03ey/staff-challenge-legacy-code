import React, { useState, useEffect } from "react";
import { Stack, PrimaryButton, DefaultButton, ProgressIndicator, Text } from "@fluentui/react";
import runEventsData from "../demoData/runEvents.json";
import type { Agent } from "../types";
import styles from "./Pages.module.css";

const Run: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 0, name: "Analyzer", description: "Pattern Detection", icon: "🔍", status: "pending", progress: 0, logs: [] },
    { id: 1, name: "Dependency Resolver", description: "Graph Building", icon: "🔗", status: "pending", progress: 0, logs: [] },
    { id: 2, name: "Planner", description: "Strategy Generation", icon: "📋", status: "pending", progress: 0, logs: [] },
    { id: 3, name: "Code Generator", description: "Translation", icon: "⚙️", status: "pending", progress: 0, logs: [] },
    { id: 4, name: "Validator", description: "Quality Check", icon: "✅", status: "pending", progress: 0, logs: [] },
    { id: 5, name: "Doc Generator", description: "Auto Docs", icon: "📚", status: "pending", progress: 0, logs: [] },
  ]);

  const [pipelineStatus, setPipelineStatus] = useState<"idle" | "running" | "paused" | "complete">("idle");
  const [progressPercent, setProgressPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (pipelineStatus === "running" && !isPaused) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prev) => {
          if (prev >= runEventsData.length - 1) {
            setPipelineStatus("complete");
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [pipelineStatus, isPaused]);

  // Process events and update UI
  useEffect(() => {
    if (currentEventIndex < runEventsData.length) {
      const event = runEventsData[currentEventIndex];
      
      // Update progress
      setProgressPercent(Math.round((currentEventIndex / runEventsData.length) * 100));

      // Log message
      const timeStr = new Date(event.timestamp).toLocaleTimeString("en-US", {
        minute: "2-digit",
        second: "2-digit",
      });
      setLogs((prev) => [...prev, `[${timeStr}] ${event.message}`]);

      // Update agent status based on event
      if (event.type === "agent-start" && event.agentIndex !== undefined) {
        setAgents((prev) => {
          const updated = [...prev];
          updated[event.agentIndex!].status = "running";
          return updated;
        });
      } else if (event.type === "agent-complete" && event.agentIndex !== undefined) {
        setAgents((prev) => {
          const updated = [...prev];
          updated[event.agentIndex!].status = "complete";
          updated[event.agentIndex!].progress = 100;
          return updated;
        });
      }
    }
  }, [currentEventIndex]);

  const handleStart = () => {
    setPipelineStatus("running");
    setCurrentEventIndex(0);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setPipelineStatus("idle");
    setCurrentEventIndex(0);
    setProgressPercent(0);
    setLogs([]);
    setAgents((prev) =>
      prev.map((a) => ({ ...a, status: "pending", progress: 0, logs: [] }))
    );
  };

  const handleFastForward = () => {
    setCurrentEventIndex(runEventsData.length - 1);
    setPipelineStatus("complete");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>⚙️ Agent Orchestration</h1>
      <p className={styles.pageSubtitle}>
        Watch 6 specialized AI agents work together to migrate your codebase
      </p>

      <Stack styles={{ root: { gap: 24 } }}>
        {/* Overall Progress */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Text variant="large" block styles={{ fontWeight: 600, marginBottom: "12px" }}>
            Pipeline Progress
          </Text>
          <ProgressIndicator
            percentComplete={progressPercent / 100}
            ariaValueText={`${progressPercent}% complete`}
          />
          <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between" }}>
            <Text variant="small">{pipelineStatus.toUpperCase()}</Text>
            <Text variant="small" styles={{ root: { fontWeight: 600 } }}>
              {progressPercent}%
            </Text>
          </div>
        </div>

        {/* Stage Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderLeft: `4px solid ${agent.status === "complete" ? "#107c10" : agent.status === "running" ? "#0078d4" : "#e1dfdd"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span style={{ fontSize: "24px" }}>{agent.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#333" }}>Agent {agent.id + 1}: {agent.name}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>{agent.description}</div>
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: agent.status === "complete" ? "#107c10" : agent.status === "running" ? "#0078d4" : "#999",
                    textTransform: "uppercase",
                  }}
                >
                  {agent.status === "pending" && "⏳ Pending"}
                  {agent.status === "running" && "▶️ Running"}
                  {agent.status === "complete" && "✅ Complete"}
                  {agent.status === "error" && "❌ Error"}
                </div>
                <ProgressIndicator
                  percentComplete={agent.progress / 100}
                  styles={{ root: { marginTop: "8px" } }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Streaming Logs */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Text variant="large" block styles={{ fontWeight: 600, marginBottom: "12px" }}>
            Pipeline Logs
          </Text>
          <div
            style={{
              background: "#1e1e1e",
              color: "#00ff00",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "12px",
              maxHeight: "300px",
              overflowY: "auto",
              lineHeight: "1.6",
            }}
          >
            {logs.length === 0 ? (
              <div style={{ color: "#666" }}>Pipeline logs will appear here...</div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {pipelineStatus === "idle" && (
            <PrimaryButton text="Start Pipeline" onClick={handleStart} />
          )}
          {pipelineStatus === "running" && (
            <>
              <DefaultButton
                text={isPaused ? "Resume" : "Pause"}
                onClick={handlePause}
              />
              <DefaultButton text="Fast Forward ⏩" onClick={handleFastForward} />
              <DefaultButton text="Reset" onClick={handleReset} />
            </>
          )}
          {pipelineStatus === "paused" && (
            <>
              <PrimaryButton text="Resume" onClick={handlePause} />
              <DefaultButton text="Reset" onClick={handleReset} />
            </>
          )}
          {pipelineStatus === "complete" && (
            <>
              <PrimaryButton
                text="View Results"
                onClick={() => window.location.href = "/validate"}
              />
              <DefaultButton text="Reset" onClick={handleReset} />
            </>
          )}
        </div>
      </Stack>
    </div>
  );
};

export default Run;
