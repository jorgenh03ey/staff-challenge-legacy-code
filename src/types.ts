// Mock data types

export interface RunEvent {
  id: string;
  timestamp: number;
  type: "log" | "agent-start" | "agent-complete" | "complete";
  message: string;
  agent: string;
  agentIndex?: number;
  artifacts?: string[];
}

export interface RepoSummary {
  name: string;
  description: string;
  language: string;
  framework: string;
  fileCount: number;
  linesOfCode: number;
  lastModified: string;
  mainModules: Array<{
    name: string;
    path: string;
    lines: number;
  }>;
  detectedPatterns: string[];
  suggestedStack: Record<string, string>;
  estimatedEffort: {
    phases: number;
    totalDays: number;
    teamSize: string;
  };
}

export interface BusinessRule {
  id: string;
  category: string;
  rule: string;
  rationale: string;
  legacyViolation: string;
  migratedApproach: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  affectedModules: string[];
}

export interface Module {
  id: string;
  name: string;
  type: string;
  complexity: number;
  lines: number;
  dependencies: string[];
  layer: string;
}

export interface ModuleGraph {
  modules: Module[];
  layers: Array<{
    name: string;
    modules: string[];
  }>;
  circularDependencies: Array<{
    path: string[];
    severity: string;
    resolution: string;
  }>;
}

export interface FileMapping {
  legacyFile: string;
  migratedFile: string;
  mappingType: string;
  changeType: string;
  diffSize: string;
}

export interface Diff {
  id: string;
  from: string;
  to: string;
  legacyCode: string;
  migratedCode: string;
  explanation: string;
  impact: string;
}

export interface TestSuite {
  name: string;
  passed: number;
  failed: number;
  coverage: number;
}

export interface TestResults {
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    warnings: number;
    duration: number;
    timestamp: string;
  };
  suites: TestSuite[];
  warnings: Array<{
    test: string;
    message: string;
    severity: string;
  }>;
  parity: {
    legacySystem: { totalTests: number; passed: number; coverage: number };
    migratedSystem: { totalTests: number; passed: number; coverage: number };
    behavioralMatch: number;
    performanceGain: number;
  };
}

export interface PRSummary {
  title: string;
  description: string;
  changes: {
    filesAdded: number;
    filesModified: number;
    filesDeleted: number;
    linesAdded: number;
    linesRemoved: number;
  };
  highlights: string[];
  benefits: Array<{
    title: string;
    description: string;
  }>;
  reviewers: string[];
  estimatedReviewTime: string;
  deploymentStrategy: string;
}

export interface Agent {
  id: number;
  name: string;
  description: string;
  icon: string;
  status: "pending" | "running" | "complete" | "error";
  progress: number;
  logs: string[];
}
