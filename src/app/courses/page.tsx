"use client";

import React, { useState } from "react";
import styles from "./courses.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────
type DeliveryFormat = "Corporate" | "Online";
type Track = "Databricks" | "Power BI" | "Microsoft Fabric";

type CourseModule = { title: string; hours: number; topics: string[] };

type Course = {
  id: string;
  track: Track;
  title: string;
  subtitle: string;
  tagline: string;
  level: string;
  duration: string;
  labHours: number;
  audience: string;
  prerequisites: string[];
  outcomes: string[];
  delivery: DeliveryFormat[];
  color1: string;
  color2: string;
  accent: string;
  logoType: string;
  modules: CourseModule[];
};

// ─── Course data ──────────────────────────────────────────────────────────────
const COURSES: Course[] = [
  // ── DATABRICKS TRACK ──────────────────────────────────────────────────────
  {
    id: "databricks-data-engineer",
    track: "Databricks",
    title: "Databricks Data Engineering",
    subtitle: "Enterprise-grade pipelines on the Lakehouse",
    tagline: "Master the complete Databricks stack — from raw ingestion to production-grade Delta Lake pipelines, Unity Catalog governance, and CI/CD deployment.",
    level: "Intermediate – Advanced",
    duration: "48 hours",
    labHours: 20,
    audience: "Data Engineers, Platform Architects, Senior Developers",
    prerequisites: ["Python or Scala basics", "SQL proficiency", "Cloud fundamentals (Azure / AWS / GCP)"],
    outcomes: [
      "Design and implement production Medallion Architecture pipelines on Delta Lake",
      "Orchestrate complex multi-task Databricks Workflows with error handling and SLA monitoring",
      "Implement Unity Catalog governance with row/column-level security and full data lineage",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#1a0a00",
    color2: "#c0290f",
    accent: "#FF3621",
    logoType: "databricks",
    modules: [
      {
        title: "Databricks Platform & Lakehouse Architecture",
        hours: 5,
        topics: [
          "Databricks architecture: control plane vs data plane, DBFS and Unity Catalog storage",
          "Cluster types: all-purpose, job, SQL warehouse, single-node — sizing guidelines",
          "Databricks Runtime (DBR) and ML Runtime — version selection criteria",
          "Workspace navigation: notebooks, repos, files, libraries",
          "Cloud storage integration: ADLS Gen2, S3, GCS — mounting vs credential passthrough",
          "Lakehouse vs traditional data warehouse: capability comparison and migration decision framework",
          "Lab: provision cluster, configure auto-scaling, run first PySpark transformation",
        ],
      },
      {
        title: "Delta Lake Deep Dive",
        hours: 6,
        topics: [
          "Delta log internals: transaction log, checkpoints, metadata files, compaction",
          "ACID transactions: isolation levels, concurrent write handling, optimistic concurrency",
          "Schema enforcement vs schema evolution: mergeSchema, overwriteSchema strategies",
          "Time travel: VERSION AS OF, TIMESTAMP AS OF, RESTORE TABLE — audit and rollback patterns",
          "Change Data Feed (CDF): enabling CDF, reading incremental changes for downstream consumers",
          "OPTIMIZE, VACUUM, Z-ORDER, liquid clustering — when and how to apply each",
          "Delta table properties: auto-optimize, auto-compact, target file size tuning",
          "Lab: build a CDC pipeline with time travel audit trail and automated compaction",
        ],
      },
      {
        title: "Medallion Architecture — Design & Implementation",
        hours: 5,
        topics: [
          "Bronze layer design: raw ingestion, audit columns (_ingested_at, _source_file), schema preservation",
          "Auto Loader internals: cloudFiles source, checkpoint management, schema inference and hints",
          "COPY INTO: batch ingestion, idempotency, file tracking, format options",
          "Silver layer: data cleaning, type casting, business key derivation, SCD Type 2 with MERGE",
          "Gold layer: aggregate patterns, wide tables, pre-computed KPIs, reporting marts",
          "Streaming vs batch within each medallion layer — hybrid architectures",
          "Lab: implement an end-to-end 3-layer pipeline with streaming Silver and batch Gold",
        ],
      },
      {
        title: "Spark SQL & DataFrame API",
        hours: 6,
        topics: [
          "Catalyst optimizer: logical plan → optimized plan → physical plan → code generation",
          "Reading EXPLAIN output: broadcast joins, shuffle, sort merge join decisions",
          "Join strategies: broadcast hash join, shuffle hash join, sort merge join — forcing with hints",
          "Window functions: LAG, LEAD, RANK, DENSE_RANK, ROW_NUMBER, NTILE, frame specs",
          "Partitioning strategies: static vs dynamic, partition pruning, partition skew detection",
          "Complex types: arrays, maps, structs — EXPLODE, LATERAL VIEW, higher-order functions",
          "Aggregation patterns: groupBy, rollup, cube, pivot, approximate aggregations (approx_count_distinct)",
          "Lab: optimize three slow queries using EXPLAIN and join hints — measure improvement with EXPLAIN COST",
        ],
      },
      {
        title: "PySpark for Data Engineering",
        hours: 6,
        topics: [
          "Execution model: lazy evaluation, action vs transformation, DAG visualization",
          "Broadcast variables and accumulators: use cases and pitfalls",
          "UDFs: Python UDFs (serialization overhead), Pandas UDFs (vectorized, scalar, grouped map)",
          "Arrow optimization: enabling Apache Arrow, memory layout benefits",
          "Handling data skew: salting technique, Adaptive Query Execution (AQE) coalescing",
          "Structured Streaming: triggers (micro-batch, continuous), output modes (complete, append, update)",
          "Watermarks and late data: handling out-of-order events, state store management",
          "Lab: build a stateful streaming pipeline with watermarks and aggregation checkpointing",
        ],
      },
      {
        title: "Databricks Workflows & Orchestration",
        hours: 5,
        topics: [
          "Job types: notebook, Python script, JAR, SQL, Delta Live Tables, dbt — selection criteria",
          "Task dependency patterns: linear, branching, if/else conditional execution",
          "Cluster reuse policies: job clusters vs existing clusters — cost/latency trade-offs",
          "Error handling: retry policies, error messages, on-failure email/webhook alerts",
          "Parameterization: job parameters, widgets, environment variables, secrets injection",
          "Integration: trigger Databricks Jobs from Azure Data Factory, Apache Airflow, dbt Cloud",
          "Workflow monitoring: run history, SLA alerts, cluster utilization metrics",
          "Lab: build a multi-task workflow with conditional branching and failure notification",
        ],
      },
      {
        title: "Unity Catalog & Data Governance",
        hours: 5,
        topics: [
          "Three-level namespace: catalog.schema.table — design patterns for org structure",
          "Metastore setup and workspace binding across multiple workspaces",
          "Storage credentials (managed identities, IAM roles) and external locations",
          "Managed vs external tables: lifecycle management differences",
          "Privilege model: GRANT/REVOKE hierarchy, privilege inheritance, ownership",
          "Row-level security (RLS) with dynamic views — multi-tenant patterns",
          "Column-level security (CLS): column masks for PII, GDPR compliance",
          "Data lineage: column-level lineage tracking, cross-workspace lineage",
          "Lab: implement RLS + CLS for a multi-tenant dataset, verify with audit logs",
        ],
      },
      {
        title: "Performance Tuning & Cost Optimization",
        hours: 6,
        topics: [
          "Adaptive Query Execution (AQE): dynamic partition coalescing, skew join optimization",
          "Photon engine: query types that benefit most, TPCh benchmark interpretation",
          "File sizing: small file problem diagnosis, OPTIMIZE scheduling, target file size",
          "Broadcast threshold tuning: spark.sql.autoBroadcastJoinThreshold, memory implications",
          "Spill to disk: diagnosis via Spark UI, executor memory tuning, off-heap memory",
          "Cost-based optimization (CBO): ANALYZE TABLE COMPUTE STATISTICS, column stats",
          "Cluster right-sizing: driver vs executor memory, cores, storage-optimized nodes",
          "Lab: performance tuning challenge — reduce a 15-minute job to under 3 minutes",
        ],
      },
      {
        title: "CI/CD for Databricks",
        hours: 4,
        topics: [
          "Databricks Repos: Git provider integration, branch strategies, PR workflows",
          "Databricks Asset Bundles (DABs): project structure, configuration, targets",
          "Testing notebooks: pytest with dbutils, nutter test framework, test isolation",
          "Environment configuration: dev/staging/prod separation using bundle targets",
          "GitHub Actions / Azure DevOps pipelines for Databricks deployment",
          "Secret rotation and environment-specific credential management",
          "Lab: implement a full CI/CD pipeline with automated tests and environment promotion",
        ],
      },
    ],
  },

  {
    id: "databricks-sql-analytics",
    track: "Databricks",
    title: "Databricks SQL & Analytics",
    subtitle: "Analytical querying, dashboards, and BI connectivity",
    tagline: "Turn Databricks into a high-performance SQL analytics engine — connect Power BI and Tableau, build executive dashboards, and secure multi-tenant data access.",
    level: "Beginner – Intermediate",
    duration: "24 hours",
    labHours: 10,
    audience: "Data Analysts, BI Developers, SQL-proficient Business Users",
    prerequisites: ["SQL fundamentals", "Familiarity with any BI tool"],
    outcomes: [
      "Write advanced SQL on Delta tables including MERGE, time travel, and window functions",
      "Build parameterized executive dashboards with scheduled refresh and subscriptions",
      "Connect Power BI, Tableau, and Looker to Databricks SQL warehouses via JDBC/ODBC",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#1a0800",
    color2: "#b04510",
    accent: "#F97316",
    logoType: "databricks-sql",
    modules: [
      {
        title: "Databricks SQL Fundamentals",
        hours: 4,
        topics: [
          "SQL Warehouse types: classic, pro, serverless — performance and cost comparison",
          "Query editor: shortcuts, formatting, visual query builder",
          "Query history: performance profiling, slow query identification",
          "Result caching: client-side cache, local disk cache, remote cache — TTL management",
          "Connection endpoints: JDBC, ODBC, Databricks SQL CLI, REST API",
          "Cluster vs SQL Warehouse: when each is appropriate",
          "Lab: configure SQL warehouse, profile query performance, compare warehouse sizes",
        ],
      },
      {
        title: "Advanced SQL on Delta Lake",
        hours: 5,
        topics: [
          "Delta-specific SQL: DESCRIBE DETAIL, DESCRIBE HISTORY, SHOW TBLPROPERTIES",
          "Time travel in SQL: SELECT * FROM table VERSION AS OF N, audit queries",
          "MERGE statement: upsert patterns, delete-with-condition, SCD Type 1 and Type 2",
          "Generated columns: deterministic expressions, indexing generated columns",
          "Materialized views vs regular views: freshness, cost, use cases",
          "Window functions for analytics: running totals, period-over-period, cohort analysis",
          "Lateral column aliases and QUALIFY clause for windowed filtering",
          "Lab: implement a full SCD Type 2 dimension using MERGE and history tracking",
        ],
      },
      {
        title: "Data Visualization & Dashboards",
        hours: 4,
        topics: [
          "Chart types: bar, line, scatter, area, pie, funnel, heatmap, pivot table",
          "Dashboard builder: layout grid, widget configuration, filters",
          "Query parameters: text, number, date, dropdown — linking to dashboard filters",
          "Counter widgets with conditional formatting and thresholds",
          "Refresh schedules: manual, cron-based, webhook triggers",
          "Subscriptions: email reports, snapshot vs live link delivery",
          "Sharing: publish to workspace, embed via iFrame",
          "Lab: build a real-time sales executive dashboard with cross-filter parameters",
        ],
      },
      {
        title: "Performance Optimization for Analysts",
        hours: 4,
        topics: [
          "Query profiles: understanding execution stages, bottleneck identification",
          "Partitioning for analytical workloads: choosing partition keys, pruning verification",
          "Photon engine: query patterns that benefit, plans with Photon indicators",
          "Materialized views and pre-aggregations for reporting",
          "SQL warehouse auto-suspend and scaling policy tuning",
          "Query result caching for repeated dashboard queries",
          "Lab: optimize a complex reporting query from 45 seconds to under 5 seconds",
        ],
      },
      {
        title: "Connecting BI Tools to Databricks SQL",
        hours: 4,
        topics: [
          "Power BI DirectQuery on Databricks: JDBC vs Databricks connector, query folding",
          "Tableau Desktop and Server: JDBC setup, extract vs live connection",
          "Looker: LookML PDT on Databricks, incremental PDTs",
          "Partner Connect: one-click BI tool integration, service principal provisioning",
          "Semantic layer design: recommended aggregations, measure definitions",
          "Connection pooling and concurrency: sizing warehouses for BI workloads",
          "Lab: connect Power BI to Databricks SQL in DirectQuery mode, measure latency",
        ],
      },
      {
        title: "Data Security in Databricks SQL",
        hours: 3,
        topics: [
          "Row-level security with dynamic views: current_user() and IS_MEMBER() patterns",
          "Column masking: hashing PII, nulling sensitive columns per group",
          "IP access lists for SQL warehouses: CIDR ranges, audit bypass",
          "Audit logging: SQL query audit, download and export events",
          "Data lineage for SQL objects: views, derived tables",
          "Lab: implement multi-tenant RLS — verify isolation with different test users",
        ],
      },
    ],
  },

  {
    id: "databricks-admin",
    track: "Databricks",
    title: "Databricks Platform Administration",
    subtitle: "Secure, scalable workspace governance at enterprise scale",
    tagline: "Everything a Databricks admin needs — identity management, Unity Catalog setup, cost governance, network security, and incident troubleshooting.",
    level: "Intermediate",
    duration: "28 hours",
    labHours: 10,
    audience: "Platform Admins, Cloud Architects, DevOps Engineers",
    prerequisites: ["Cloud fundamentals (Azure / AWS / GCP)", "Basic Databricks familiarity", "Networking basics (VNets, subnets, NSGs)"],
    outcomes: [
      "Configure Unity Catalog with external locations, storage credentials, and privilege inheritance",
      "Implement enterprise security: SSO, SCIM, service principals, VNet injection, and private endpoints",
      "Build cost attribution dashboards and optimization playbooks reducing DBU spend by 30%+",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#0d0b20",
    color2: "#2e2a5e",
    accent: "#7C6AF7",
    logoType: "databricks-admin",
    modules: [
      {
        title: "Workspace Administration Essentials",
        hours: 5,
        topics: [
          "Workspace architecture: control plane, data plane, DBFS, Unity Catalog storage",
          "Admin console deep-dive: feature flags, workspace settings, audit log export",
          "User and group management: Databricks-native vs Azure AD / Okta groups",
          "SSO configuration: SAML 2.0 setup with Azure AD, Okta, OneLogin",
          "SCIM provisioning: auto-provisioning users and groups from identity providers",
          "Workspace-level network settings: IP access lists, private link requirements",
          "Lab: configure SCIM with Azure AD, verify group sync and permission inheritance",
        ],
      },
      {
        title: "Cluster Policies & Compute Governance",
        hours: 5,
        topics: [
          "Cluster policies: policy definition, ACL assignment, policy families",
          "Instance pools: setup, idle instance management, pre-warming for cold starts",
          "Spot/preemptible instance strategies: fallback to on-demand, retry policies",
          "GPU clusters: instance type selection for deep learning vs inference",
          "Auto-termination: idle detection, configuring per team, exception handling",
          "Cluster tagging: naming conventions for cost attribution, enforcement via policy",
          "Custom init scripts: library installation, system configuration, security hardening",
          "Lab: create tiered cluster policies for data engineering, analysts, and ML teams",
        ],
      },
      {
        title: "Unity Catalog Administration",
        hours: 5,
        topics: [
          "Metastore setup: cloud storage requirements, workspace binding strategies",
          "Storage credentials: Azure managed identity, AWS IAM role, GCS service account",
          "External locations: path definitions, credential binding, validation",
          "Workspace-catalog binding: single vs multi-workspace catalog sharing",
          "Cross-workspace data sharing: Delta Sharing for internal and external partners",
          "Privilege model: ownership, GRANT/REVOKE hierarchy, role escalation prevention",
          "Row and column security at the catalog level: dynamic view patterns",
          "Lab: configure external location, bind two workspaces to shared catalog",
        ],
      },
      {
        title: "Identity & Secrets Management",
        hours: 5,
        topics: [
          "PAT tokens vs OAuth 2.0 M2M: token lifecycle management, rotation policies",
          "Service principals: creation, role assignment, Azure AD app registration",
          "Secret scopes: Databricks-backed vs Azure Key Vault-backed scopes",
          "Secret ACLs: per-user and per-group permissions on secret scopes",
          "Network security: VNet injection setup, NSG rules, UDR requirements",
          "Private Link / PrivateEndpoint: control plane and data plane private connectivity",
          "Encryption: Databricks-managed keys vs customer-managed keys (CMK) for DBFS",
          "Lab: implement Key Vault-backed secrets, rotate a service principal credential",
        ],
      },
      {
        title: "Cost Management & FinOps",
        hours: 4,
        topics: [
          "DBU pricing model: all-purpose, jobs, SQL, ML — tier comparison",
          "Usage dashboards: workspace usage report, DBU burn-down by cluster/user",
          "Chargeback strategies: tagging standards, cost center mapping, showback reports",
          "Reserved capacity vs on-demand: break-even analysis, commitment sizing",
          "Optimization playbook: spot usage, cluster right-sizing, idle termination",
          "Budget alerts: Azure Cost Management / AWS Budgets integration with Databricks tags",
          "Lab: build a FinOps dashboard showing DBU consumption by team and cluster type",
        ],
      },
      {
        title: "Monitoring, Alerting & Troubleshooting",
        hours: 4,
        topics: [
          "Cluster event logs: event types, driver vs executor failures, OOM diagnosis",
          "Spark UI deep-dive: stages, tasks, DAG, shuffle read/write, storage tab",
          "Ganglia metrics: CPU, memory, network I/O — custom metric dashboards",
          "Cloud-native integration: Azure Monitor, AWS CloudWatch, GCP Cloud Logging",
          "Common failure patterns: driver OOM, executor loss, shuffle service failures",
          "Incident response runbooks: cluster restart, job re-run, data recovery",
          "Lab: diagnose a deliberately broken pipeline using Spark UI and event logs",
        ],
      },
    ],
  },

  {
    id: "databricks-ai-ml",
    track: "Databricks",
    title: "Databricks AI, ML & GenAI Engineering",
    subtitle: "From ML experimentation to production GenAI deployment",
    tagline: "Build, track, and deploy machine learning and GenAI applications on Databricks — MLflow, Feature Store, LLMs, RAG pipelines, and model serving at scale.",
    level: "Advanced",
    duration: "40 hours",
    labHours: 18,
    audience: "Data Scientists, ML Engineers, AI/GenAI Practitioners",
    prerequisites: ["Python proficiency", "ML fundamentals (scikit-learn level)", "PySpark basics"],
    outcomes: [
      "Build end-to-end ML pipelines with MLflow tracking, model registry, and automated promotion",
      "Implement RAG pipelines with Databricks Vector Search, embedding models, and LLM evaluation",
      "Deploy models to serverless endpoints with canary releases, A/B testing, and drift monitoring",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#1a0a30",
    color2: "#5b21b6",
    accent: "#A78BFA",
    logoType: "databricks-ai",
    modules: [
      {
        title: "ML Platform Architecture on Databricks",
        hours: 4,
        topics: [
          "Databricks ML platform components: MLflow, Feature Store, AutoML, Model Serving",
          "Managed MLflow: experiment tracking, model registry, artifact storage in Unity Catalog",
          "AutoML: supported algorithms, feature selection, imbalanced datasets, limitations",
          "Workspace ML setup: cluster config for ML, library management, GPU nodes",
          "ML governance: Unity Catalog for ML assets, model lineage, compliance tagging",
          "Lab: configure ML workspace, run AutoML baseline, analyze generated code",
        ],
      },
      {
        title: "Feature Engineering & Feature Store",
        hours: 5,
        topics: [
          "Feature Store architecture: feature tables, metadata, discovery, reuse",
          "Creating feature tables: batch ingestion, streaming feature pipelines",
          "Point-in-time lookups: avoiding training-serving skew, timestamp keys",
          "Sharing features across teams: catalog-backed feature tables",
          "Offline vs online serving: Cosmos DB / DynamoDB / Redis backends",
          "Feature monitoring: drift detection, freshness alerts",
          "Lab: build shared feature table for a churn model, verify point-in-time correctness",
        ],
      },
      {
        title: "MLflow Experiment Tracking & Model Registry",
        hours: 5,
        topics: [
          "MLflow Tracking: runs, experiments, nested runs, tags, metrics, artifacts",
          "Model logging: sklearn, XGBoost, PyTorch, TensorFlow, custom pyfunc models",
          "Model versioning: staging → production → archived lifecycle management",
          "Model comparison: parallel coordinates plot, metric comparison across runs",
          "Model signatures: input/output schema enforcement for deployment safety",
          "Webhooks: automated Slack/Teams alerts on model stage transitions",
          "Lab: build automated model comparison and promotion pipeline with webhook notification",
        ],
      },
      {
        title: "Distributed Model Training & Hyperparameter Tuning",
        hours: 6,
        topics: [
          "SparkTrials vs Trials: distributed vs single-machine Hyperopt",
          "Hyperopt: TPE algorithm, search space definitions (hp.uniform, hp.choice, hp.loguniform)",
          "XGBoost distributed training: spark_xgboost, HistTreeMethod",
          "LightGBM on Spark: SynapseML LightGBM, distributed training strategies",
          "Horovod: deep learning distribution, timeline profiling",
          "Cross-validation at scale: CrossValidatorModel, TrainValidationSplit with Spark",
          "Resource allocation: driver memory for Hyperopt, executor configuration for Horovod",
          "Lab: tune a gradient boosting classifier on 10M rows — compare SparkTrials vs sequential",
        ],
      },
      {
        title: "LLM Integration & Databricks AI Gateway",
        hours: 5,
        topics: [
          "Foundation Models API: DBRX Instruct, Llama 3, Mistral — endpoint types",
          "External model endpoints: OpenAI GPT-4, Anthropic Claude, Azure OpenAI configuration",
          "AI Gateway: rate limiting, cost guardrails, PII filtering, logging",
          "Prompt engineering patterns: zero-shot, few-shot, chain-of-thought, ReAct",
          "Structured output: JSON mode, function calling, output parsers",
          "LLM evaluation with MLflow: perplexity, BLEU, ROUGE, LLM-as-a-judge",
          "Lab: build a document classification system with structured output and gateway guardrails",
        ],
      },
      {
        title: "Vector Search & RAG Pipelines",
        hours: 5,
        topics: [
          "Databricks Vector Search: direct access index vs delta sync index",
          "Embedding models: BGE-M3, E5-large, Instructor — selection criteria and benchmarks",
          "Chunking strategies: fixed-size, sentence, recursive, semantic — trade-offs",
          "RAG pipeline architecture: retrieval → re-ranking → augmentation → generation",
          "Hybrid search: dense vector + BM25 sparse retrieval, score fusion",
          "RAGAS evaluation: faithfulness, answer relevance, context precision",
          "Lab: build a production-ready RAG system over a 100k-document corpus, evaluate with RAGAS",
        ],
      },
      {
        title: "Model Serving & MLOps",
        hours: 5,
        topics: [
          "Serverless model serving: endpoint configuration, CPU vs GPU, concurrency",
          "Custom Python models with MLflow Pyfunc: preprocessing + model + postprocessing",
          "Canary deployments: traffic splitting configuration, rollback triggers",
          "A/B testing: experiment definition, statistical significance tracking",
          "Inference latency optimization: batching, quantization, ONNX export",
          "Model monitoring: prediction drift (KS test, PSI), feature drift, ground truth logging",
          "Lab: deploy a model with canary release and implement automated rollback on drift",
        ],
      },
      {
        title: "Responsible AI & Governance",
        hours: 5,
        topics: [
          "AI System Cards: model documentation standards, intended use, limitations",
          "Bias detection: demographic parity, equalized odds, disparate impact analysis",
          "Explainability: SHAP values with Databricks, feature importance visualization",
          "Model governance in Unity Catalog: tagging, descriptions, lineage for ML assets",
          "Regulatory considerations: GDPR right to explanation, EU AI Act classification",
          "Audit trails: MLflow experiment logging for compliance, model decision traceability",
          "Lab: audit a deployed classification model for bias across demographic groups",
        ],
      },
    ],
  },

  // ── POWER BI TRACK ────────────────────────────────────────────────────────
  {
    id: "power-bi-analyst",
    track: "Power BI",
    title: "Power BI Data Analyst",
    subtitle: "End-to-end analytics from raw data to boardroom insights",
    tagline: "Build production-grade Power BI reports — master Power Query, DAX, star schema modeling, and secure deployment with row-level security and deployment pipelines.",
    level: "Beginner – Intermediate",
    duration: "36 hours",
    labHours: 14,
    audience: "Business Analysts, BI Developers, SQL-proficient Professionals",
    prerequisites: ["Excel proficiency", "Basic SQL knowledge", "No coding experience required"],
    outcomes: [
      "Model complex datasets using star schema with role-playing dimensions and bridging tables",
      "Write advanced DAX including time intelligence, semi-additive measures, and calculation groups",
      "Deploy secure, production-ready reports with dynamic RLS, deployment pipelines, and sensitivity labels",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#1a1200",
    color2: "#a07200",
    accent: "#F2C811",
    logoType: "powerbi",
    modules: [
      {
        title: "Power BI Ecosystem & Desktop Fundamentals",
        hours: 4,
        topics: [
          "Power BI product family: Desktop, Service, Mobile, Embedded, Report Server, Paginated",
          "Power BI licensing: Free, Pro, Premium Per User (PPU), Premium Capacity — feature matrix",
          "Data source connectors: 150+ connectors, DirectQuery vs Import vs Dual mode",
          "Report canvas: visualizations panel, fields pane, filters pane, format options",
          "Publish and share: workspace publishing, sharing permissions, export options",
          "Power BI development workflow: Desktop → Service → App → Embed",
          "Lab: connect to multiple sources, build and publish a first multi-page report",
        ],
      },
      {
        title: "Power Query — Data Transformation Mastery",
        hours: 6,
        topics: [
          "M language fundamentals: let expressions, record types, lists, tables",
          "Query folding: definition, verification (right-click → View native query), anti-patterns",
          "Applied steps: transformation order, step dependencies, optimization principles",
          "Merges: left outer, right outer, inner, full outer, anti joins — use cases",
          "Appends: combining same-schema sources, dynamic append functions",
          "Custom functions: parameterized queries, function.from-table, reusable transformations",
          "Error handling: try/otherwise patterns, error column management",
          "Web API and JSON/XML sources: pagination, auth headers, nested record expansion",
          "Lab: build a parameterized, foldable ETL pipeline combining REST API + SQL source",
        ],
      },
      {
        title: "Data Modeling & Star Schema Design",
        hours: 5,
        topics: [
          "Fact vs dimension tables: classification criteria, grain definition",
          "Star schema vs snowflake: Power BI performance implications, recommendation",
          "Relationships: cardinality (1:1, 1:M, M:M), cross-filter direction, active vs inactive",
          "Role-playing dimensions: date dimension reused as OrderDate, ShipDate, DueDate",
          "Bidirectional relationships: when safe, circular dependency detection",
          "Composite models: Import + DirectQuery in a single model",
          "Bridge tables for M:M relationships: advantages vs direct M:M relationship",
          "Lab: model a complex sales dataset with 3 role-playing date dimensions",
        ],
      },
      {
        title: "DAX Fundamentals",
        hours: 6,
        topics: [
          "Evaluation contexts: row context, filter context, query context — visual explanation",
          "CALCULATE: filter arguments, REMOVEFILTERS vs ALL, KEEPFILTERS modifier",
          "Context transition: when row context becomes filter context, CALCULATE implications",
          "Iterator functions: SUMX, AVERAGEX, MAXX, MINX, RANKX — when to use vs aggregators",
          "ALL, ALLEXCEPT, ALLSELECTED, ALLCROSSFILTERED — filter manipulation patterns",
          "RELATED and RELATEDTABLE: cross-table lookups in calculated columns vs measures",
          "Variables: VAR / RETURN — performance benefits, debugging simplification",
          "DAX Studio: query execution, server timings, debugging measures",
          "Lab: build 12 business KPIs from scratch — revenue, margin, rank, running total",
        ],
      },
      {
        title: "Advanced DAX & Time Intelligence",
        hours: 5,
        topics: [
          "Date table requirements: contiguous calendar, mark as date table",
          "DATESINPERIOD, DATESBETWEEN, DATESYTD, DATESMTD, DATESQTD",
          "SAMEPERIODLASTYEAR, PREVIOUSYEAR, PREVIOUSMONTH, PREVIOUSQUARTER",
          "Running totals and moving averages: 3MA, 7MA with DATESINPERIOD",
          "Semi-additive measures: LASTNONBLANK for inventory, account balances",
          "Calculation groups: time intelligence automation, currency conversion, KPI variants",
          "Dynamic calculations: SWITCH, SELECTEDVALUE, ISINSCOPE for conditional logic",
          "Lab: build a full P&L report with YoY%, QoQ%, MTD, YTD, and rolling 12-month average",
        ],
      },
      {
        title: "Report Design, UX & Storytelling",
        hours: 4,
        topics: [
          "Layout principles: F-pattern, Z-pattern reading, hierarchy of information",
          "Color theory for data: categorical, sequential, diverging palettes, accessibility",
          "Custom visuals from AppSource: evaluation criteria, performance, licensing",
          "Bookmarks: navigation buttons, report state capture, storytelling sequences",
          "Drill-through and cross-report drill-through: configuration and security",
          "Report page tooltips: design patterns, performance considerations",
          "Accessibility: alt-text, tab order, high-contrast mode, screen reader compatibility",
          "Lab: redesign a poorly designed dashboard into an award-worthy executive report",
        ],
      },
      {
        title: "Power BI Service, Security & Deployment",
        hours: 6,
        topics: [
          "Workspace types: My Workspace vs app workspaces — governance implications",
          "Workspace roles: Admin, Member, Contributor, Viewer — assignment best practices",
          "Deployment pipelines: dev → test → prod promotion, selective deploy, diff view",
          "Row-Level Security: static RLS vs dynamic RLS (USERNAME(), USERPRINCIPALNAME())",
          "Object-Level Security (OLS): hiding tables and columns from specific roles",
          "Scheduled refresh: configuration, gateway requirements, failure alerting",
          "Power BI Premium workloads: capacity management, autoscale, paginated reports",
          "Sensitivity labels, DLP policies, certified/promoted datasets",
          "Lab: implement dynamic multi-tenant RLS with deployment pipeline promotion",
        ],
      },
    ],
  },

  // ── MICROSOFT FABRIC TRACK ────────────────────────────────────────────────
  {
    id: "azure-data-factory",
    track: "Microsoft Fabric",
    title: "Azure Data Factory & Pipeline Engineering",
    subtitle: "Enterprise ETL/ELT orchestration on Azure",
    tagline: "Build enterprise-grade data integration pipelines on Azure Data Factory — data flows, triggers, monitoring, CI/CD, and seamless integration with Azure SQL, Synapse, and Fabric.",
    level: "Intermediate",
    duration: "32 hours",
    labHours: 14,
    audience: "Data Engineers, ETL Developers, Solution Architects",
    prerequisites: ["Azure fundamentals (AZ-900 level)", "SQL proficiency", "Basic Python or PowerShell knowledge"],
    outcomes: [
      "Design and build production-grade ADF pipelines with parameterisation, error handling, and SLA monitoring",
      "Implement Mapping Data Flows for code-free complex transformations at scale",
      "Deploy CI/CD pipelines for ADF using Azure DevOps, ARM templates, and Git integration",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#001020",
    color2: "#004080",
    accent: "#0EA5E9",
    logoType: "fabric",
    modules: [
      {
        title: "ADF Architecture & Core Concepts",
        hours: 4,
        topics: [
          "ADF components: linked services, datasets, pipelines, triggers, integration runtimes",
          "Azure Integration Runtime vs Self-Hosted IR: when and how to choose",
          "Linked service types: ADLS Gen2, Azure SQL, Synapse, Snowflake, REST, HTTP, SAP",
          "Dataset modes: binary, delimited text, Parquet, JSON, Avro — format selection guide",
          "Pipeline canvas: activities palette, dependencies (success, failure, completion, skip)",
          "Managed Virtual Network and private endpoints for secure connectivity",
          "Lab: create ADF workspace, configure ADLS linked service, run first copy activity",
        ],
      },
      {
        title: "Copy Activity & Data Movement",
        hours: 4,
        topics: [
          "Copy activity deep dive: source/sink configuration, mapping, column transformations",
          "Parallel copy: degree of parallelism, data integration units (DIU) tuning",
          "Incremental copy patterns: watermark-based, last-modified-date, change data capture",
          "Fault tolerance: skip incompatible rows, redirect error rows to error file",
          "Staged copy: using Blob staging for bulk load into Synapse / SQL DW",
          "Connector-specific optimisations: bulk insert for SQL, partition copy for Oracle/SAP",
          "Lab: build an incremental copy pipeline with watermark — migrate 10M rows from SQL to ADLS",
        ],
      },
      {
        title: "Mapping Data Flows",
        hours: 6,
        topics: [
          "Data flow canvas: sources, transformations, sinks — execution on Spark clusters",
          "Core transformations: select, filter, derived column, aggregate, join, lookup",
          "Conditional split, union, pivot, unpivot, flatten for nested JSON",
          "Surrogate key, window functions, rank, row number in data flows",
          "Schema drift: allowing and handling schema changes without breaking flows",
          "Data flow debug mode: row counts, data preview, breakpoints",
          "Performance tuning: partition strategy, broadcast joins, cache sink",
          "Lab: build a full SCD Type 2 dimension update using data flow transformations",
        ],
      },
      {
        title: "Pipeline Orchestration & Control Flow",
        hours: 5,
        topics: [
          "ForEach activity: iterating over arrays, sequential vs parallel execution",
          "If Condition and Switch activities: branching logic based on pipeline expressions",
          "Until activity: polling patterns for async jobs",
          "Execute Pipeline: modular design, parent-child pipeline patterns",
          "Set Variable and Append Variable: managing state within a pipeline run",
          "Pipeline expressions: dynamic content, system variables, functions library",
          "Error handling: on-failure paths, failure notifications, retry policies per activity",
          "Lab: build a metadata-driven pipeline that processes a dynamic list of source tables",
        ],
      },
      {
        title: "Triggers, Scheduling & Event-Based Execution",
        hours: 4,
        topics: [
          "Schedule trigger: recurrence patterns, time zones, start/end windows",
          "Tumbling window trigger: catchup runs, dependency chaining between windows",
          "Storage event trigger: blob created/deleted events via Event Grid",
          "Custom event trigger: Azure Event Grid topic for application-driven execution",
          "Trigger parameterization: passing trigger metadata into pipeline parameters",
          "Monitoring triggers: run history, re-trigger failed runs, alert rules",
          "Lab: implement an event-driven pipeline that triggers on new file arrival in ADLS",
        ],
      },
      {
        title: "Integration with Azure Ecosystem",
        hours: 4,
        topics: [
          "ADF + Azure Synapse Analytics: running Synapse notebooks and SQL pools from ADF",
          "ADF + Databricks: notebook activity, job cluster vs existing cluster, output handling",
          "ADF + Microsoft Fabric: invoking Fabric pipelines, lakehouse write patterns",
          "ADF + Azure Functions: serverless pre/post-processing, webhook patterns",
          "ADF + Azure SQL / Synapse: stored procedure activity, bulk copy, PolyBase",
          "Key Vault integration: secrets for linked service credentials, certificate auth",
          "Lab: orchestrate a cross-service pipeline — ADF triggers Databricks notebook → writes to Synapse",
        ],
      },
      {
        title: "Monitoring, Alerting & Observability",
        hours: 3,
        topics: [
          "Monitor hub: pipeline runs, activity runs, trigger runs — filtering and search",
          "Azure Monitor: diagnostic settings, Log Analytics workspace, ADF metrics",
          "Alert rules: pipeline failure alerts, SLA breach notifications via email/webhook",
          "Custom logging: writing pipeline metadata to SQL or ADLS for audit trail",
          "Data Factory alerts with Azure Logic Apps for custom notification workflows",
          "Lab: build an audit logging pipeline and configure Azure Monitor alert for failures",
        ],
      },
      {
        title: "CI/CD & DevOps for ADF",
        hours: 2,
        topics: [
          "Git integration: GitHub and Azure DevOps repos, collaboration mode vs live mode",
          "Branching strategy: feature branches, PR review, protected main branch",
          "ARM template export: linked vs single template, parameter files per environment",
          "Azure DevOps release pipeline: deploy ADF ARM template to dev → test → prod",
          "Parameterizing linked services for environment promotion",
          "Lab: set up end-to-end CI/CD pipeline with automated deployment to three environments",
        ],
      },
    ],
  },

  {
    id: "azure-synapse-analytics",
    track: "Microsoft Fabric",
    title: "Azure Synapse Analytics",
    subtitle: "Unified analytics — SQL pools, Spark, pipelines, and Power BI",
    tagline: "Master Azure Synapse Analytics end to end — dedicated SQL pools, serverless SQL, Apache Spark, Synapse Link, and the full integration with Power BI and Microsoft Fabric.",
    level: "Intermediate – Advanced",
    duration: "36 hours",
    labHours: 16,
    audience: "Data Engineers, Data Architects, Analytics Engineers, BI Developers",
    prerequisites: ["SQL proficiency", "Azure fundamentals", "Python or Scala basics for Spark modules"],
    outcomes: [
      "Design and implement a Synapse Analytics workspace for enterprise data warehousing and big data processing",
      "Optimise dedicated SQL pool performance using distributions, indexes, and workload management",
      "Build end-to-end analytics pipelines connecting Synapse Spark, SQL pools, ADLS Gen2, and Power BI",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#0a0020",
    color2: "#4b0082",
    accent: "#8B5CF6",
    logoType: "fabric-bi",
    modules: [
      {
        title: "Synapse Workspace Architecture",
        hours: 4,
        topics: [
          "Synapse workspace components: SQL pools, Spark pools, pipelines, Link, Studio",
          "ADLS Gen2 as primary storage: workspace account, managed identity, ACL setup",
          "Synapse Studio overview: develop, data, integrate, monitor, manage hubs",
          "Managed private endpoints: securing connectivity to data sources",
          "Workspace authentication: Azure AD, service principals, Synapse RBAC roles",
          "Synapse vs traditional data warehouse vs Databricks — decision framework",
          "Lab: provision Synapse workspace, configure ADLS Gen2, set up managed private endpoints",
        ],
      },
      {
        title: "Dedicated SQL Pool (formerly SQL DW)",
        hours: 7,
        topics: [
          "MPP architecture: control node, compute nodes, distributions, DMS",
          "Distribution strategies: ROUND_ROBIN, HASH, REPLICATE — selection criteria",
          "Table types: heap, clustered columnstore index (CCI), clustered rowstore — when to use each",
          "Partition design: partition pruning, partition switching for incremental load",
          "Statistics: auto-create, manual update, multi-column statistics",
          "Result-set caching and materialized views — query acceleration techniques",
          "Workload management: workload groups, classifiers, importance, isolation",
          "Lab: build a Star Schema in Synapse, optimise with HASH distribution and CCI, validate with EXPLAIN",
        ],
      },
      {
        title: "Serverless SQL Pool",
        hours: 5,
        topics: [
          "Serverless SQL architecture: pay-per-query, external tables, no data loading required",
          "OPENROWSET: querying Parquet, Delta, CSV, JSON directly from ADLS",
          "External tables and views: abstraction layer over ADLS for BI tools",
          "Delta format support: time travel queries, schema evolution with serverless SQL",
          "Performance: partitioned reads, column pruning, predicate pushdown",
          "Security: column-level security, row-level security, managed identities",
          "Lab: build a serverless SQL analytics layer over a Delta Lake — connect Power BI via serverless endpoint",
        ],
      },
      {
        title: "Apache Spark in Synapse",
        hours: 6,
        topics: [
          "Synapse Spark pools: node sizes, autoscale, auto-pause, library management",
          "Spark notebooks: cell types, widgets, display(), mssparkutils utilities",
          "Reading/writing Delta Lake from Synapse Spark: shared metadata tables",
          "Synapse Spark vs Databricks: feature comparison and migration considerations",
          "Spark structured streaming in Synapse: Event Hub source, ADLS sink",
          "Synapse Analytics connector: reading/writing dedicated SQL pool from Spark",
          "Lab: build a Medallion Architecture pipeline using Synapse Spark — Bronze, Silver, Gold with Delta",
        ],
      },
      {
        title: "Synapse Pipelines & Orchestration",
        hours: 5,
        topics: [
          "Synapse Pipelines vs ADF: feature parity, when to use each, unified monitoring",
          "Copy activity, data flows, notebook activities, SQL pool activities",
          "Trigger types: schedule, tumbling window, storage event, custom event",
          "Metadata-driven pipelines: ForEach over table lists, dynamic parameterization",
          "Pipeline monitoring: run history, activity-level diagnostics, re-run from failure",
          "Integration with ADF: when to orchestrate from ADF vs Synapse Pipelines",
          "Lab: build a metadata-driven ETL pipeline in Synapse — load 20 tables with a single parameterized pipeline",
        ],
      },
      {
        title: "Synapse Link & Real-Time Analytics",
        hours: 4,
        topics: [
          "Synapse Link for Cosmos DB: analytical store, near-real-time sync, no ETL",
          "Synapse Link for SQL (SQL Server / Azure SQL): change feed to ADLS",
          "Synapse Link for Dataverse: Power Platform → Synapse analytics",
          "Azure Data Explorer pool in Synapse: time-series and log analytics use cases",
          "Querying Synapse Link from Spark and serverless SQL",
          "Lab: set up Synapse Link for Cosmos DB — query operational data analytically with zero ETL",
        ],
      },
      {
        title: "Security & Governance",
        hours: 3,
        topics: [
          "Synapse RBAC: built-in roles (Synapse Administrator, Contributor, Artifact User)",
          "Column-level security and row-level security in dedicated SQL pools",
          "Dynamic data masking: masking rules for PII columns",
          "Microsoft Purview integration: workspace scanning, lineage, data classification",
          "Audit logging: SQL Auditing to ADLS, Synapse diagnostic logs to Log Analytics",
          "Lab: configure RLS + dynamic data masking in dedicated SQL pool, integrate with Purview",
        ],
      },
      {
        title: "Power BI & Fabric Integration",
        hours: 2,
        topics: [
          "Connecting Power BI to Synapse: dedicated SQL endpoint, serverless SQL endpoint",
          "DirectQuery vs Import from Synapse: performance and refresh considerations",
          "Synapse workspace as Fabric OneLake source: Delta shortcut patterns",
          "Migrating from Synapse to Microsoft Fabric: assessment, Delta Lake alignment, tooling",
          "Lab: connect Power BI Desktop to serverless SQL pool, build a live-connection dashboard",
        ],
      },
    ],
  },

  {
    id: "ms-fabric-data-engineer",
    track: "Microsoft Fabric",
    title: "Microsoft Fabric Data Engineering",
    subtitle: "Unified data engineering on Microsoft's end-to-end platform",
    tagline: "Build scalable data pipelines natively on Microsoft Fabric — Lakehouse, Warehouse, Spark, Data Factory, Real-Time Intelligence, and CI/CD with Git integration.",
    level: "Intermediate – Advanced",
    duration: "40 hours",
    labHours: 16,
    audience: "Data Engineers, Azure Data Engineers, Platform Architects",
    prerequisites: ["Azure fundamentals", "SQL proficiency", "Python or PySpark basics"],
    outcomes: [
      "Architect and implement end-to-end Medallion pipelines on Fabric Lakehouse and Warehouse",
      "Build real-time streaming pipelines with Eventstream, Eventhouse, and KQL analytics",
      "Implement Fabric CI/CD with Git integration, deployment pipelines, and REST API automation",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#001533",
    color2: "#004c99",
    accent: "#50E6FF",
    logoType: "fabric",
    modules: [
      {
        title: "Microsoft Fabric Architecture & OneLake",
        hours: 5,
        topics: [
          "Fabric capacity model: F SKUs, workspace creation, domain management",
          "OneLake: unified storage, physical architecture, ADLS Gen2 compatibility",
          "OneLake shortcuts: connecting to ADLS Gen2, S3, GCS, Databricks without copying data",
          "Lakehouse vs Warehouse vs KQL database: decision matrix",
          "Delta-Parquet in OneLake: V-ORDER optimization, Z-ORDER, compaction",
          "Managed vs external tables: lifecycle and governance implications",
          "Lab: create workspace, lakehouse, configure cross-cloud shortcut, verify data access",
        ],
      },
      {
        title: "Data Factory in Fabric — Pipelines & Dataflows",
        hours: 5,
        topics: [
          "Pipeline canvas: activities, parameters, expressions (dynamic content)",
          "Copy activity: source/sink configuration, column mapping, type conversion",
          "Dataflows Gen2: Power Query transformations at scale, Fabric native mode",
          "Staged copy for large datasets: staging warehouse, copy optimization",
          "Error handling: fault tolerance settings, skip incompatible rows, logging",
          "Integration runtime: Fabric IR vs self-hosted IR for on-premises sources",
          "Pipeline monitoring: run history, gantt view, activity duration analysis",
          "Lab: build an incremental load pipeline with watermark and error logging",
        ],
      },
      {
        title: "Spark Engineering in Fabric",
        hours: 6,
        topics: [
          "Spark notebooks in Fabric: environments, pinned libraries, Spark configuration",
          "Fabric Spark job definitions: parameterized jobs, scheduling, monitoring",
          "Native Delta Lake support: reads, writes, MERGE, time travel on Lakehouse tables",
          "Lakehouse API: programmatic table creation, file management, metadata operations",
          "VS Code integration: Fabric extension, local development, tunnel debugging",
          "Environment management: custom library environments, Spark version pinning",
          "Cross-lakehouse queries: reading from multiple lakehouses in one notebook",
          "Lab: migrate a Databricks medallion notebook to Fabric Spark — compare behavior",
        ],
      },
      {
        title: "Fabric Data Warehouse",
        hours: 5,
        topics: [
          "Fabric Warehouse: T-SQL engine, VORDER file format optimization",
          "Warehouse vs Lakehouse SQL analytics endpoint: read patterns, write patterns",
          "Cross-database queries: JOIN across warehouse + lakehouse in one query",
          "Table statistics: manual ANALYZE, auto-statistics collection triggers",
          "Query monitoring: Dynamic Management Views (DMVs), Query Insights dashboard",
          "Warehouse concurrency and workload management",
          "Warehouse in pipelines: SQL script activity, stored procedures",
          "Lab: build a Star Schema warehouse, optimize with statistics, validate query plans",
        ],
      },
      {
        title: "Real-Time Intelligence — Eventhouse & KQL",
        hours: 5,
        topics: [
          "Eventstream: ingestion from Azure Event Hub, IoT Hub, Kafka, sample data",
          "Eventstream transformations: filter, aggregate, union before landing to Eventhouse",
          "Eventhouse and KQL database: design, policies, table schemas",
          "KQL fundamentals: project, where, summarize, bin, join, union, let statements",
          "Time series analytics: make-series, series_decompose, anomaly detection",
          "Real-time dashboards: auto-refresh intervals, parameter cards",
          "Activator: triggers on streaming data, alert rules, action targets",
          "Lab: build an IoT telemetry pipeline — ingest, analyze, alert on anomalies in real time",
        ],
      },
      {
        title: "Pipeline Orchestration in Fabric",
        hours: 4,
        topics: [
          "Notebook activities: parameters, return values, session management",
          "Spark job definition activities: parallelism, retry policies",
          "Dataflow Gen2 activities: scheduling, dependency chaining",
          "Dynamic parameterization: ForEach, If Condition, Until loops",
          "Error handling: on-failure paths, pipeline-level error notifications",
          "Schedule triggers and event-based triggers in Fabric",
          "Lab: orchestrate a full Medallion pipeline — Bronze to Gold with error handling",
        ],
      },
      {
        title: "Fabric Administration & Governance",
        hours: 5,
        topics: [
          "Capacity admin portal: metrics, pause/resume, SKU scaling strategies",
          "Workspace governance: roles, sensitivity, item sharing, domain assignment",
          "Microsoft Purview in Fabric: catalog scanning, data lineage, sensitivity labeling",
          "Information protection: label policies, external share restrictions",
          "Audit logs: Fabric audit events, Log Analytics integration",
          "Compliance reporting: GDPR, HIPAA mapping to Fabric governance controls",
          "Lab: set up Purview integration, scan workspace, generate compliance report",
        ],
      },
      {
        title: "Fabric CI/CD & Deployment Automation",
        hours: 5,
        topics: [
          "Fabric Git integration: connecting workspaces to GitHub/Azure DevOps repos",
          "Branch strategies for Fabric: feature branches, PR reviews, protected branches",
          "Deployment pipelines: dev → test → prod promotion, selective item deploy",
          "Fabric REST APIs: workspace operations, item CRUD, deployment automation",
          "Semantic model deployment via XMLA endpoint in Fabric",
          "Automated testing: notebook test suites, data quality assertions in pipelines",
          "Lab: implement a complete CI/CD pipeline — PR check, test environment deploy, prod promote",
        ],
      },
    ],
  },

  {
    id: "ms-fabric-analytics-bi",
    track: "Microsoft Fabric",
    title: "Microsoft Fabric Analytics & Business Intelligence",
    subtitle: "DirectLake, semantic models, and AI-powered analytics on Fabric",
    tagline: "Unlock the full BI and analytics power of Microsoft Fabric — DirectLake semantic models, Fabric Data Science, real-time dashboards, and governed self-service BI.",
    level: "Intermediate",
    duration: "28 hours",
    labHours: 11,
    audience: "BI Developers, Data Analysts, Analytics Engineers",
    prerequisites: ["Power BI experience (6+ months)", "SQL proficiency", "Basic data modeling knowledge"],
    outcomes: [
      "Build DirectLake semantic models directly on Fabric Lakehouse with sub-second query performance",
      "Implement Fabric Data Science workflows with MLflow, Semantic Link, and Power BI integration",
      "Govern and certify shared semantic models across teams with Purview and endorsement workflows",
    ],
    delivery: ["Corporate", "Online"],
    color1: "#001020",
    color2: "#003366",
    accent: "#0078D4",
    logoType: "fabric-bi",
    modules: [
      {
        title: "Fabric Analytics Landscape for BI Teams",
        hours: 4,
        topics: [
          "Fabric experiences for analysts: Power BI, Data Warehouse, Data Science overview",
          "OneLake for BI: reading Lakehouse Delta tables directly from Power BI",
          "Workspace setup for analytics teams: roles, sharing, endorsement",
          "DirectLake mode fundamentals: what changes compared to Import and DirectQuery",
          "Semantic model types in Fabric: default vs custom semantic models",
          "Lab: explore a pre-built Fabric Lakehouse and connect Power BI in DirectLake mode",
        ],
      },
      {
        title: "DirectLake Semantic Models Deep Dive",
        hours: 5,
        topics: [
          "DirectLake vs Import vs DirectQuery: performance, freshness, feature comparison",
          "V-ORDER optimization: how Fabric pre-sorts Parquet for rapid column reads",
          "DirectLake limitations: calculated columns, specific DAX patterns, row limits",
          "Fallback behavior: when DirectLake falls back to DirectQuery, how to monitor",
          "Refreshing DirectLake models: no import refresh needed, framing updates correctly",
          "Composite DirectLake + Import models: bridging real-time and historical data",
          "Lab: build a DirectLake semantic model, measure latency vs Import, observe fallback",
        ],
      },
      {
        title: "Semantic Models & Shared Datasets in Fabric",
        hours: 5,
        topics: [
          "Creating semantic models from Lakehouse and Warehouse sources",
          "Live connection vs DirectLake from Power BI Desktop",
          "Relationships, hierarchies, and metadata in Fabric semantic models",
          "DAX measures in Fabric models: creation, management, documentation",
          "Sharing semantic models: workspace access, cross-workspace live connect",
          "Certified vs promoted datasets: endorsement workflow, impact analysis",
          "Lab: build one shared semantic model consumed by three departmental reports",
        ],
      },
      {
        title: "Data Science in Fabric for Analysts",
        hours: 5,
        topics: [
          "Fabric Data Science workspace: notebooks, environments, experiments",
          "MLflow in Fabric: experiment tracking, model logging, artifact storage",
          "Semantic Link: reading Power BI semantic models from Python (sempy library)",
          "Semantic Link: writing ML results back as Lakehouse tables for Power BI",
          "AI Insights integration: pre-built cognitive functions in Dataflows Gen2",
          "Prediction-to-report pipeline: train in notebook → surface prediction in Power BI visual",
          "Lab: build a churn prediction model and surface predictions as a Power BI report visual",
        ],
      },
      {
        title: "KQL Analytics & Real-Time BI",
        hours: 4,
        topics: [
          "KQL database basics for BI analysts: tables, policies, materialized views",
          "Core KQL patterns for dashboards: filter, summarize, render, top, sort",
          "Time series KQL: bin, make-series, moving averages, trend lines",
          "Connecting Power BI to KQL database: DirectQuery mode",
          "Real-time Power BI reports from Eventhouse with auto-refresh",
          "Lab: build a real-time operational dashboard combining KQL and Power BI",
        ],
      },
      {
        title: "Fabric Governance & Self-Service BI at Scale",
        hours: 5,
        topics: [
          "Microsoft Purview Data Catalog in Fabric: item scanning, metadata, classification",
          "Sensitivity labels: classification schema, mandatory labeling, inheritance",
          "Data hub: dataset discovery, endorsement, impact analysis",
          "Certified dataset program: process, criteria, re-certification cadence",
          "Workspace governance: naming conventions, lifecycle, archiving policies",
          "Usage metrics: dataset, report, and dashboard adoption reporting",
          "Lab: catalog and govern a Fabric workspace — label, certify, and publish to data hub",
        ],
      },
    ],
  },
];

// ─── Delivery format colors ───────────────────────────────────────────────────
const DELIVERY_STYLES: Record<DeliveryFormat, { bg: string; color: string }> = {
  Corporate: { bg: "rgba(99,102,241,0.15)", color: "#818cf8" },
  Online:    { bg: "rgba(16,185,129,0.15)", color: "#34d399" },
};

// ─── SVG Logos ────────────────────────────────────────────────────────────────
function DatabricksLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="white" fillOpacity="0.15" />
      <polygon points="50,15 85,33 85,67 50,85 15,67 15,33" fill="white" fillOpacity="0.2" />
      <path d="M50 28 L72 40 L72 62 L50 74 L28 62 L28 40 Z" fill="white" fillOpacity="0.9" />
      <path d="M50 35 L65 43 L65 57 L50 65 L35 57 L35 43 Z" fill="#FF3621" fillOpacity="0.8" />
    </svg>
  );
}

function DatabricksSQLLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="white" fillOpacity="0.12" />
      <path d="M50 28 L72 40 L72 62 L50 74 L28 62 L28 40 Z" fill="white" fillOpacity="0.85" />
      <text x="50" y="56" textAnchor="middle" fill="#F97316" fontSize="16" fontWeight="900" fontFamily="monospace">SQL</text>
    </svg>
  );
}

function PowerBILogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 80 96" fill="none">
      <rect x="0"  y="48" width="20" height="48" rx="4" fill="white" fillOpacity="0.5" />
      <rect x="24" y="28" width="20" height="68" rx="4" fill="white" fillOpacity="0.7" />
      <rect x="48" y="8"  width="20" height="88" rx="4" fill="white" fillOpacity="0.95" />
      <rect x="72" y="0"  width="8"  height="96" rx="4" fill="#F2C811" />
    </svg>
  );
}

function PowerBIAdvLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="4"  y="55" width="16" height="40" rx="4" fill="white" fillOpacity="0.45" />
      <rect x="24" y="38" width="16" height="57" rx="4" fill="white" fillOpacity="0.6" />
      <rect x="44" y="20" width="16" height="75" rx="4" fill="white" fillOpacity="0.8" />
      <rect x="64" y="5"  width="16" height="90" rx="4" fill="white" fillOpacity="0.95" />
      <path d="M12,52 L32,35 L52,17 L72,3" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="72" cy="3" r="5" fill="#F59E0B"/>
    </svg>
  );
}

function PowerBIAdminLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="38" r="20" fill="white" fillOpacity="0.85"/>
      <path d="M18,82 Q18,60 50,60 Q82,60 82,82Z" fill="white" fillOpacity="0.65"/>
      <rect x="62" y="55" width="28" height="32" rx="6" fill="#EF4444" fillOpacity="0.9"/>
      <path d="M68,71 L72,76 L82,64" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function FabricLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="10" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.9" />
      <rect x="55" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.6" />
      <rect x="10" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.6" />
      <rect x="55" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.9" />
      <rect x="32" y="32" width="36" height="36" rx="6" fill="#50E6FF" fillOpacity="0.85" />
    </svg>
  );
}

function FabricBILogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="10" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.7" />
      <rect x="55" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.5" />
      <rect x="10" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.5" />
      <rect x="55" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.7" />
      <rect x="32" y="32" width="36" height="36" rx="6" fill="#0078D4" fillOpacity="0.9" />
      <rect x="38" y="52" width="8" height="12" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="49" y="46" width="8" height="18" rx="2" fill="white" fillOpacity="0.9"/>
    </svg>
  );
}

function AdminLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="38" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
      <circle cx="50" cy="50" r="22" fill="white" fillOpacity="0.2" />
      <circle cx="50" cy="50" r="10" fill="white" fillOpacity="0.9" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = deg * Math.PI / 180;
        const x1 = 50 + 24 * Math.cos(r), y1 = 50 + 24 * Math.sin(r);
        const x2 = 50 + 36 * Math.cos(r), y2 = 50 + 36 * Math.sin(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" strokeOpacity="0.85" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function AILogo({ size = 48 }: { size?: number }) {
  const nodes = [[50,20],[20,55],[80,55],[35,85],[65,85]];
  const edges = [[0,1],[0,2],[1,2],[1,3],[2,4],[3,4]];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {edges.map(([a,b],i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="white" strokeWidth="2" strokeOpacity="0.5" />
      ))}
      {nodes.map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={i===0?9:6} fill="white" fillOpacity={i===0?0.95:0.75} />
      ))}
      <circle cx="50" cy="20" r="4" fill="#A78BFA" fillOpacity="0.9" />
    </svg>
  );
}

const LOGO_MAP: Record<string, React.FC<{ size?: number }>> = {
  "databricks":       DatabricksLogo,
  "databricks-sql":   DatabricksSQLLogo,
  "databricks-admin": AdminLogo,
  "databricks-ai":    AILogo,
  "powerbi":          PowerBILogo,
  "powerbi-adv":      PowerBIAdvLogo,
  "powerbi-admin":    PowerBIAdminLogo,
  "fabric":           FabricLogo,
  "fabric-bi":        FabricBILogo,
};

// ─── Course Cover ─────────────────────────────────────────────────────────────
function CourseCover({ course }: { course: Course }) {
  const Logo = LOGO_MAP[course.logoType] || DatabricksLogo;
  return (
    <div className={styles.cover} style={{ background: `linear-gradient(135deg, ${course.color1} 0%, ${course.color2} 100%)` }}>
      <div className={styles.coverCircle1} style={{ borderColor: `${course.accent}40` }} />
      <div className={styles.coverCircle2} style={{ borderColor: `${course.accent}25` }} />
      <div className={styles.coverLogoWrap}>
        <Logo size={52} />
      </div>
      <div className={styles.coverText}>
        <span className={styles.coverDuration}>{course.duration}</span>
        <span className={styles.coverLevel}>{course.level}</span>
      </div>
      <div className={styles.coverLabBadge}>
        <span className={styles.labDot} />
        {course.labHours}h hands-on labs
      </div>
    </div>
  );
}

// ─── PDF Generator ───────────────────────────────────────────────────────────
function generateOutlinePDF(course: Course) {
  const totalHours = course.modules.reduce((s, m) => s + m.hours, 0);

  const modulesHTML = course.modules.map((mod, i) => `
    <div class="module">
      <div class="module-header">
        <span class="module-num">${i + 1}</span>
        <span class="module-title">${mod.title}</span>
        <span class="module-hours">${mod.hours}h</span>
      </div>
      <ul class="topic-list">
        ${mod.topics.map(t => `<li>${t}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${course.title} — Training Outline</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:10pt;color:#1a1a1a;background:#fff;line-height:1.5}
    .page{width:210mm;min-height:297mm;margin:0 auto;background:#fff}
    @media print{body{margin:0}.page{margin:0;width:100%}.page-break{page-break-before:always}.no-break{page-break-inside:avoid}}
    .accent-bar{height:6px;background:linear-gradient(90deg,${course.accent} 0%,${course.color2} 100%)}
    .header{padding:20px 32px 16px;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #e5e7eb}
    .header-brand{font-size:13pt;font-weight:800;color:#111;letter-spacing:-0.02em}
    .header-brand span{color:${course.accent}}
    .header-label{font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#6b7280;margin-top:3px}
    .header-contact{text-align:right;font-size:8pt;color:#6b7280;line-height:1.7}
    .header-contact a{color:${course.accent};text-decoration:none}
    .cover{padding:28px 32px 24px;background:linear-gradient(135deg,${course.color1} 0%,${course.color2} 100%);color:#fff}
    .cover-tag{display:inline-block;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.7);background:rgba(255,255,255,0.12);border-radius:20px;padding:3px 10px;margin-bottom:12px}
    .cover-title{font-size:22pt;font-weight:800;letter-spacing:-0.03em;line-height:1.1;margin-bottom:5px}
    .cover-subtitle{font-size:10pt;color:rgba(255,255,255,0.7);margin-bottom:18px}
    .cover-stats{display:flex;background:rgba(255,255,255,0.1);border-radius:10px;overflow:hidden}
    .cover-stat{flex:1;padding:10px 14px;border-right:1px solid rgba(255,255,255,0.15)}
    .cover-stat:last-child{border-right:none}
    .cover-stat-value{font-size:13pt;font-weight:800;color:#fff;display:block;line-height:1;margin-bottom:2px}
    .cover-stat-label{font-size:7pt;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.6)}
    .body{padding:24px 32px}
    .section{margin-bottom:20px}
    .section-title{font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${course.accent};margin-bottom:8px;padding-bottom:5px;border-bottom:1.5px solid ${course.accent}30}
    .outcomes{display:flex;flex-direction:column;gap:6px}
    .outcome{display:flex;gap:8px;align-items:flex-start;font-size:9.5pt;color:#374151;line-height:1.5}
    .outcome-check{color:${course.accent};font-weight:700;font-size:10pt;flex-shrink:0;margin-top:1px}
    .prereq-chips{display:flex;flex-wrap:wrap;gap:6px}
    .prereq-chip{font-size:8pt;color:#374151;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:20px;padding:3px 10px}
    .delivery-badges{display:flex;gap:8px}
    .delivery-badge{font-size:8pt;font-weight:600;border-radius:20px;padding:3px 12px}
    .corporate{background:rgba(99,102,241,0.1);color:#4338ca}
    .online{background:rgba(16,185,129,0.1);color:#065f46}
    .divider{height:1px;background:#e5e7eb;margin:0 32px}
    .footer{padding:14px 32px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center}
    .footer-cta{font-size:8.5pt;color:#111;font-weight:600}
    .footer-cta a{color:${course.accent};text-decoration:none}
    .footer-right{font-size:8pt;color:#9ca3af}
    .page-break{page-break-before:always}
    .outline-header{padding:18px 32px 12px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center}
    .outline-header-title{font-size:10pt;font-weight:700;color:#111}
    .outline-header-sub{font-size:8pt;color:#6b7280}
    .modules{padding:18px 32px;display:flex;flex-direction:column;gap:14px}
    .module{display:flex;flex-direction:column;gap:5px;page-break-inside:avoid}
    .module-header{display:flex;align-items:center;gap:10px}
    .module-num{width:22px;height:22px;border-radius:50%;background:${course.color2};color:#fff;font-size:7.5pt;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
    .module-title{font-size:9.5pt;font-weight:700;color:#111;flex:1}
    .module-hours{font-size:8pt;font-weight:600;color:#6b7280;background:#f3f4f6;padding:2px 8px;border-radius:20px;white-space:nowrap}
    .topic-list{margin:0;padding-left:32px;list-style:disc;display:flex;flex-direction:column;gap:2px}
    .topic-list li{font-size:8.5pt;color:#4b5563;line-height:1.5}
    .total-row{margin:8px 32px 0;display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;font-size:9pt;color:#6b7280}
    .total-row strong{font-size:9.5pt;color:${course.accent};font-weight:700}
  </style>
</head>
<body>
<div class="page">
  <div class="accent-bar"></div>
  <div class="header">
    <div>
      <div class="header-brand">JM <span>Analytics</span></div>
      <div class="header-label">Training Outline</div>
    </div>
    <div class="header-contact">hello@jayantmohite.com<br/><a href="https://jayantmohite.com">jayantmohite.com</a></div>
  </div>
  <div class="cover">
    <div class="cover-tag">${course.track} · ${course.level}</div>
    <div class="cover-title">${course.title}</div>
    <div class="cover-subtitle">${course.subtitle}</div>
    <div class="cover-stats">
      <div class="cover-stat"><span class="cover-stat-value">${totalHours}h</span><span class="cover-stat-label">Duration</span></div>
      <div class="cover-stat"><span class="cover-stat-value">${course.modules.length}</span><span class="cover-stat-label">Modules</span></div>
      <div class="cover-stat"><span class="cover-stat-value">${course.labHours}h</span><span class="cover-stat-label">Labs</span></div>
      <div class="cover-stat"><span class="cover-stat-value">30d</span><span class="cover-stat-label">Support</span></div>
    </div>
  </div>
  <div class="body">
    <div class="section">
      <div class="section-title">What You'll Achieve</div>
      <div class="outcomes">${course.outcomes.map(o => `<div class="outcome"><span class="outcome-check">✓</span><span>${o}</span></div>`).join("")}</div>
    </div>
    <div class="section">
      <div class="section-title">Target Audience</div>
      <p style="font-size:9.5pt;color:#374151">${course.audience}</p>
    </div>
    <div class="section">
      <div class="section-title">Prerequisites</div>
      <div class="prereq-chips">${course.prerequisites.map(p => `<span class="prereq-chip">${p}</span>`).join("")}</div>
    </div>
    <div class="section">
      <div class="section-title">Delivery Formats</div>
      <div class="delivery-badges">${course.delivery.map(d => `<span class="delivery-badge ${d === "Corporate" ? "corporate" : "online"}">${d === "Corporate" ? "🏢 Corporate Training" : "💻 Live Online"}</span>`).join("")}</div>
    </div>
    <div class="section">
      <div class="section-title">What's Included</div>
      <div class="outcomes">
        <div class="outcome"><span class="outcome-check">✓</span><span>Hands-on lab exercise on live datasets for every module</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>Comprehensive slide decks, code notebooks, and reference guides</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>30-day post-training support via email and async Slack</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>Private GitHub repository access — all lab solutions, sample pipelines, and templates</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>Lifetime access to course material updates as the platform evolves</span></div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="footer">
    <div class="footer-cta">Enquire: <a href="mailto:hello@jayantmohite.com?subject=${encodeURIComponent(course.title + " Training Enquiry")}">hello@jayantmohite.com</a></div>
    <div class="footer-right">Page 1 of 2</div>
  </div>
</div>

<div class="page page-break">
  <div class="accent-bar"></div>
  <div class="header">
    <div>
      <div class="header-brand">JM <span>Analytics</span></div>
      <div class="header-label">Training Outline</div>
    </div>
    <div class="header-contact">hello@jayantmohite.com<br/><a href="https://jayantmohite.com">jayantmohite.com</a></div>
  </div>
  <div class="outline-header">
    <div class="outline-header-title">${course.title} — Full Course Outline</div>
    <div class="outline-header-sub">${course.modules.length} modules · ${totalHours} hours · ${course.labHours}h labs</div>
  </div>
  <div class="modules">${modulesHTML}</div>
  <div class="total-row"><span>Total course duration</span><strong>${totalHours} hours · ${course.labHours}h hands-on labs · ${course.modules.length} modules</strong></div>
  <div style="height:20px"></div>
  <div class="divider"></div>
  <div class="footer">
    <div class="footer-cta">Enquire: <a href="mailto:hello@jayantmohite.com?subject=${encodeURIComponent(course.title + " Training Enquiry")}">hello@jayantmohite.com</a></div>
    <div class="footer-right">Page 2 of 2 · jayantmohite.com</div>
  </div>
</div>
<script>window.onload=()=>{window.print()}</script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course, open, onToggle }: { course: Course; open: boolean; onToggle: () => void }) {
  const totalHours = course.modules.reduce((s, m) => s + m.hours, 0);

  return (
    <div className={styles.card} style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <CourseCover course={course} />

      <div className={styles.cardBody}>
        {/* Meta row */}
        <div className={styles.cardMeta}>
          <span className={styles.trackBadge} style={{ background: `${course.accent}18`, color: course.accent, borderColor: `${course.accent}35` }}>
            {course.track}
          </span>
          <span className={styles.levelBadge}>{course.level}</span>
        </div>

        {/* Delivery formats */}
        <div className={styles.deliveryRow}>
          {course.delivery.map(d => (
            <span key={d} className={styles.deliveryBadge} style={{ background: DELIVERY_STYLES[d].bg, color: DELIVERY_STYLES[d].color }}>
              {d === "Corporate" ? "🏢 Corporate" : "💻 Online"}
            </span>
          ))}
        </div>

        <h3 className={styles.cardTitle}>{course.title}</h3>
        <p className={styles.cardTagline}>{course.tagline}</p>

        {/* Outcomes */}
        <div className={styles.outcomes}>
          <span className={styles.outcomesLabel}>What you'll achieve</span>
          <ul className={styles.outcomeList}>
            {course.outcomes.map((o, i) => (
              <li key={i} className={styles.outcomeItem}>
                <span className={styles.outcomeCheck} style={{ color: course.accent }}>✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        <div className={styles.prereqs}>
          <span className={styles.prereqsLabel}>Prerequisites</span>
          <div className={styles.prereqChips}>
            {course.prerequisites.map((p, i) => (
              <span key={i} className={styles.prereqChip}>{p}</span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.courseStats}>
          <div className={styles.courseStat}>
            <strong>{course.modules.length}</strong>
            <span>modules</span>
          </div>
          <div className={styles.courseStatDivider} />
          <div className={styles.courseStat}>
            <strong>{totalHours}h</strong>
            <span>total</span>
          </div>
          <div className={styles.courseStatDivider} />
          <div className={styles.courseStat}>
            <strong>{course.labHours}h</strong>
            <span>labs</span>
          </div>
          <div className={styles.courseStatDivider} />
          <div className={styles.courseStat}>
            <strong>30d</strong>
            <span>support</span>
          </div>
        </div>

        {/* Outline toggle + PDF download */}
        <div className={styles.outlineActions}>
          <button
            type="button"
            className={styles.outlineToggle}
            style={{ color: course.accent, borderColor: `${course.accent}40` }}
            onClick={onToggle}
          >
            {open ? "Hide Course Outline ↑" : "View Full Course Outline ↓"}
          </button>
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={() => generateOutlinePDF(course)}
            title="Download training outline as PDF"
          >
            ⬇ PDF
          </button>
        </div>

        {/* Expandable outline */}
        {open && (
          <div className={styles.outline}>
            {course.modules.map((mod, i) => (
              <div key={i} className={styles.module}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleNum} style={{ background: course.color2, color: "#fff" }}>{i + 1}</span>
                  <span className={styles.moduleTitle}>{mod.title}</span>
                  <span className={styles.moduleHours}>{mod.hours}h</span>
                </div>
                <ul className={styles.topicList}>
                  {mod.topics.map((t, ti) => (
                    <li key={ti} className={styles.topic}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={styles.totalRow}>
              <span>Total course duration</span>
              <strong style={{ color: course.accent }}>{totalHours} hours · {course.labHours}h labs</strong>
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href="mailto:hello@jayantmohite.com?subject=Course Enquiry"
          className={styles.enquireBtn}
          style={{ background: course.accent, color: "#000" }}
        >
          Enquire Now →
        </a>
      </div>
    </div>
  );
}

// ─── What's Included ──────────────────────────────────────────────────────────
const INCLUDED_ITEMS = [
  { icon: "🧪", title: "Hands-On Labs", desc: "Every module includes a real-world lab exercise on live datasets — not toy examples." },
  { icon: "📚", title: "Course Materials", desc: "Comprehensive slide decks, code notebooks, and reference guides for every module." },
  { icon: "💬", title: "30-Day Post-Training Support", desc: "Email and async Slack access to ask follow-up questions after the training ends." },
  { icon: "🗃️", title: "Private Code Repository", desc: "Access to all lab solutions, sample pipelines, and templates via a private GitHub repo." },
  { icon: "🔄", title: "Lifetime Access to Updates", desc: "Courses are updated as platforms evolve — enrolments include all future revisions." },
];

const DELIVERY_DETAILS = [
  {
    type: "Corporate Training",
    icon: "🏢",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    features: [
      "Onsite at your office or remote via Teams/Zoom",
      "Customised curriculum aligned to your tech stack",
      "Dedicated trainer for your team (up to 20 participants)",
      "Custom labs using your own data and infrastructure",
      "Pre-training skill assessment and post-training evaluation",
      "Private Slack channel for the duration of training",
      "30-day post-training support for all participants",
    ],
  },
  {
    type: "Live Online Training",
    icon: "💻",
    color: "#34d399",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    features: [
      "Live instructor-led sessions via Zoom/Teams",
      "Small cohorts (max 15 participants) for personal attention",
      "Scheduled cohort calendar — join a fixed batch",
      "Session recordings available for 90 days post-training",
      "Shared lab environment provisioned for all participants",
      "Community Slack with access to all alumni",
      "30-day post-training support and Q&A access",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [activeTrack, setActiveTrack] = useState<"All" | Track>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const tracks: ("All" | Track)[] = ["All", "Databricks", "Power BI", "Microsoft Fabric"];

  const filtered = activeTrack === "All"
    ? COURSES
    : COURSES.filter(c => c.track === activeTrack);

  const totalHours = COURSES.reduce((s, c) => s + c.modules.reduce((ss, m) => ss + m.hours, 0), 0);

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroPill}>Corporate & Online Training</div>
        <h1 className={styles.heroTitle}>Expert-Led Data Engineering<br />& Analytics Courses</h1>
        <p className={styles.heroSub}>
          Real-world, hands-on training for Databricks, Microsoft Fabric, and Power BI —
          delivered as corporate on-site workshops or live online cohorts.
          Every course built from production experience, not textbooks.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{COURSES.length}</span>
            <span className={styles.heroStatLabel}>Courses</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{totalHours}h+</span>
            <span className={styles.heroStatLabel}>Total Content</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>3</span>
            <span className={styles.heroStatLabel}>Technologies</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>2</span>
            <span className={styles.heroStatLabel}>Delivery Formats</span>
          </div>
        </div>
      </div>

      {/* ── Track filter ── */}
      <div className={styles.trackFilters}>
        {tracks.map(t => (
          <button
            key={t}
            type="button"
            className={styles.trackFilter}
            data-active={activeTrack === t}
            onClick={() => setActiveTrack(t)}
          >
            {t === "All" ? `All Courses (${COURSES.length})`
              : t === "Databricks" ? `🧱 Databricks (${COURSES.filter(c => c.track === "Databricks").length})`
              : t === "Power BI" ? `📊 Power BI (${COURSES.filter(c => c.track === "Power BI").length})`
              : `🔷 Microsoft Fabric (${COURSES.filter(c => c.track === "Microsoft Fabric").length})`}
          </button>
        ))}
      </div>

      {/* ── Course grid ── */}
      <div className={styles.grid}>
        {filtered.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            open={openId === course.id}
            onToggle={() => setOpenId(openId === course.id ? null : course.id)}
          />
        ))}
      </div>

      {/* ── What's Included ── */}
      <div className={styles.whatsIncluded}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPill}>Every Course Includes</div>
          <h2 className={styles.sectionTitle}>No extras, no upsells — everything is included</h2>
          <p className={styles.sectionSub}>All courses are complete packages. The price you see is the price you pay.</p>
        </div>
        <div className={styles.includedGrid}>
          {INCLUDED_ITEMS.map((item, i) => (
            <div key={i} className={styles.includedCard}>
              <span className={styles.includedIcon}>{item.icon}</span>
              <div>
                <h4 className={styles.includedTitle}>{item.title}</h4>
                <p className={styles.includedDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery formats ── */}
      <div className={styles.deliverySection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPill}>Delivery Options</div>
          <h2 className={styles.sectionTitle}>Training that fits your schedule and budget</h2>
          <p className={styles.sectionSub}>All formats include the same comprehensive curriculum and hands-on labs.</p>
        </div>
        <div className={styles.deliveryCards}>
          {DELIVERY_DETAILS.map((d, i) => (
            <div key={i} className={styles.deliveryCard} style={{ background: d.bg, borderColor: d.border }}>
              <div className={styles.deliveryCardHeader}>
                <span className={styles.deliveryCardIcon}>{d.icon}</span>
                <h3 className={styles.deliveryCardTitle} style={{ color: d.color }}>{d.type}</h3>
              </div>
              <ul className={styles.deliveryFeatures}>
                {d.features.map((f, fi) => (
                  <li key={fi} className={styles.deliveryFeature}>
                    <span style={{ color: d.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaPill}>Ready to Upskill?</div>
          <h2 className={styles.ctaTitle}>Let's build your team's data capability</h2>
          <p className={styles.ctaSub}>
            Whether you're training a team of 5 or 50, looking for a focused workshop or a multi-week programme —
            get in touch and I'll put together a custom training plan with timeline and pricing.
          </p>
          <div className={styles.ctaActions}>
            <a href="mailto:hello@jayantmohite.com?subject=Corporate Training Enquiry" className={styles.ctaBtnPrimary}>
              Request Corporate Quote →
            </a>
            <a href="mailto:hello@jayantmohite.com?subject=Online Training Enquiry" className={styles.ctaBtnSecondary}>
              Book Online Training
            </a>
          </div>
          <p className={styles.ctaNote}>Typically responds within 24 hours · All enquiries are confidential</p>
        </div>
      </div>
    </div>
  );
}
