"use client";
import React, { useState } from "react";
import styles from "./showcase.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────
type Metric = { value: string; label: string };
type Phase  = { title: string; items: string[] };
type Project = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  color1: string;
  color2: string;
  textAccent: string;
  metrics: Metric[];
  phases: Phase[];
  stack: string[];
  outcome: string;
  svgType: string;
};

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: "auto-scaler",
    tag: "AI · Agentic Systems · Platform Engineering",
    title: "Context-Aware Infrastructure Auto Scaler",
    subtitle: "AI system that reads microservice behaviour and resource telemetry together to distinguish temporary spikes from permanent load growth — and scales every layer of the stack before pressure materialises",
    problem:
      "Conventional autoscalers are blind to intent. A Kubernetes HPA sees CPU at 78% and scales — but it cannot tell whether that CPU spike is from a nightly batch job that will finish in 20 minutes, or from a wave of newly onboarded users who will never leave. Applying the same reactive scale-out to both cases either wastes reserved compute on ephemeral jobs or permanently under-provisions organic growth. On a platform running RabbitMQ workers, MongoDB replica sets, Databricks clusters, and Kubernetes microservices, this misclassification produced queue backlogs of 540 messages, p95 API latency of 1,260ms, 48 timeouts, and 36 retries during a single Monday 9AM surge — all while holding idle reserved capacity for a nightly ETL job that had already completed an hour earlier.",
    solution:
      "Built a 15-stage agentic system that fuses two signal streams that no off-the-shelf scaler combines: infrastructure resource logs (CPU, memory, queue depth, and connection-pool saturation across all services) and microservice application logs (user action events, job submission patterns, and API call sequences). Drain3 mines structured templates from raw microservice logs; SBERT encodes each template into a 384-dimension semantic vector, allowing the system to recognise that events like 'user registered', 'account created', and 'profile initialised' are correlated load drivers from a single user journey — not three independent spikes. LSTM models the joint time-series of both signal streams, learning that a CPU surge paired with BatchJob submission events is transient, while CPU growth paired with user registration events is sustained. HDBSCAN clusters the combined signature against a historical corpus, assigning confidence-scored cluster membership. FAISS retrieves the five closest past incidents for grounding. Chronos2 forecasts the load curve 10 minutes ahead. Isolation Forest scores multi-variate anomaly severity. Llama 3.1 reasons over this complete context packet and produces a platform-specific scaling plan. NeMo Guardrails enforces LLM safety boundaries; OPA validates the plan against cost caps, change-freeze windows, and approval tiers before any infrastructure call is issued. For loads classified as permanent growth, the system raises the minimum replica floor rather than adding temporary replicas that would simply be torn down 20 minutes later.",
    color1: "#4C1D95",
    color2: "#7C3AED",
    textAccent: "#A78BFA",
    metrics: [
      { value: "↓ 61%", label: "queue depth (540 → 210) in 8 min" },
      { value: "↓ 49%", label: "p95 latency (1,260ms → 640ms)" },
      { value: "Temp vs Perm", label: "load classified before scaling fires" },
      { value: "4 platforms", label: "scaled from one decision engine" },
    ],
    phases: [
      {
        title: "Dual-Stream Ingestion & Semantic Parsing",
        items: [
          "OpenTelemetry Collector ingests resource metrics — CPU, memory, queue depth, connection-pool saturation — from Kubernetes, RabbitMQ, MongoDB, and Databricks at 1-second granularity",
          "Microservice application logs are collected in parallel: user action events, job submissions, API call chains, and error rates form the behavioural signal stream that runs alongside the resource stream",
          "Drain3 log template miner parses raw microservice logs into structured patterns — for example, 'User {id} registered' and 'BatchJob {name} submitted' — converting noisy free-text into typed, analysable event categories",
          "SBERT encodes each Drain3 template into a 384-dimension semantic vector, enabling the system to group 'user_signup', 'account_created', and 'profile_initialised' as correlated drivers of the same user-journey load rather than treating them as separate events",
          "LSTM models the joint time-series of both signal streams — learning that a CPU spike paired with BatchJob submission events is transient, whereas sustained CPU growth paired with user registration events signals a permanent shift in baseline demand",
        ],
      },
      {
        title: "Load Classification: Spike vs Sustained Growth",
        items: [
          "HDBSCAN clusters the current combined signal signature against a historical corpus held in Delta Tables — assigns a confidence-scored cluster label (e.g., C2: retry storm, confidence 0.87) and separates recurrent temporal patterns from genuine secular growth trends",
          "FAISS nearest-neighbour search retrieves the five most similar historical incidents — for example, H101 (last Monday 9AM surge, similarity distance 0.08) — providing concrete grounding data for the downstream LLM reasoning step",
          "Chronos2, Amazon's zero-shot time-series foundation model, forecasts the load trajectory across all signal dimensions for the next 10 minutes, including per-platform confidence intervals for RabbitMQ queue depth, MongoDB connection demand, and Databricks job queue",
          "Isolation Forest scores multi-variate anomaly severity across the combined resource and behavioural signal space — a score of 0.31 marks the event as anomalous but safely actionable, while a score above 0.8 triggers an emergency override path",
          "The classification output is binary: Temporary means scale out transiently with a TTL and drain back automatically; Permanent means raise the minimum replica floor, update the stored baseline, and notify capacity planning",
        ],
      },
      {
        title: "Agentic Decision & Multi-Platform Execution",
        items: [
          "Llama 3.1 Instruct reasons over the complete context packet — raw signals, HDBSCAN cluster label, FAISS-retrieved incidents, Chronos2 forecast, Isolation Forest severity score, and the temp/perm classification — and produces a platform-specific scaling plan with a written justification",
          "NeMo Guardrails intercepts the LLM output before execution and rejects any recommendation that breaches pre-defined safety boundaries, such as scaling beyond the cost envelope or scaling down a production service during business hours without an explicit approval token",
          "OPA policy engine performs a final hard-policy validation against cost caps, change-freeze calendar entries, and tier-based approval requirements — no infrastructure call is issued until OPA emits a PERMIT decision",
          "KEDA scales RabbitMQ consumer pods via queue-depth ScaledObject metrics and adjusts MongoDB connection-pool size via the custom metrics API, with the TTL on any transient scale-out set according to the load classification",
          "HPA adjusts Kubernetes pod replicas for each microservice (for example, query-service scaled from 8 to 12, dashboard-api from 6 to 8); Databricks API resizes the relevant cluster tier; KServe updates model-serving batch sizes and concurrency limits to match the new capacity",
        ],
      },
    ],
    stack: ["OpenTelemetry", "Drain3", "SBERT", "LSTM", "HDBSCAN", "FAISS", "Chronos2", "Isolation Forest", "Llama 3.1", "NeMo Guardrails", "OPA", "KServe", "KEDA", "HPA", "RabbitMQ", "MongoDB", "Kubernetes", "Databricks", "Delta Lake"],
    outcome:
      "Queue depth fell from 540 to 210 — a 61% reduction — within 8 minutes of the initial surge. p95 latency recovered from 1,260ms to 640ms, a 49% improvement. Active retries dropped from 36 to 4. HDBSCAN correctly labelled the Monday 9AM event as a recurrent temporary spike (confidence 0.87), triggering a TTL-bounded scale-out that auto-drained after 25 minutes with no wasted reserved capacity. A separate user-onboarding wave the following day was correctly classified as permanent growth, causing the system to raise the Kubernetes minimum replica floor from 6 to 8 pods and persist that as the new baseline rather than treating it as a transient event. All four platforms — RabbitMQ, MongoDB, Kubernetes, and Databricks — are now scaled from a single Llama 3.1 decision engine, with every action gated through OPA policy.",
    svgType: "ml",
  },
  {
    id: "multicloud-etl",
    tag: "Data Engineering · Event Streaming · Platform Engineering",
    title: "Universal Real-Time Data Sharing Platform",
    subtitle: "Source-agnostic event-driven platform that captures changes from any RDBMS, data warehouse, REST API, or file source and delivers them to Iceberg and Delta Lake for multi-engine analytics",
    problem:
      "Modern enterprises operate data across dozens of heterogeneous systems — transactional databases (PostgreSQL, Oracle, MySQL, SQL Server), legacy data warehouses (Teradata, Netezza), SaaS and REST APIs, and scheduled file drops (CSV, Parquet, JSON). Each source has a different change-capture mechanism, a different schema dialect, and a different latency contract. Traditional point-to-point ETL pipelines create a brittle integration mesh: N sources × M targets produces N×M independent pipelines, each failing in isolation. A schema change in an Oracle table breaks seven downstream pipelines overnight. API rate limits silently drop records. File drops arrive without ordering guarantees. Overnight batch windows mean analysts are always working on yesterday's data. The result is a fragmented landscape where no team trusts a single number, and every data request triggers a new bespoke pipeline.",
    solution:
      "Built a source-agnostic, event-driven data sharing platform that normalises all upstream heterogeneity into governed event streams before any consumer sees data.\n\nLayer 1 — Source Adapters: Debezium captures row-level CDC from PostgreSQL (WAL logical replication), MySQL (binlog), and SQL Server (CT/CDC tables) without any application-layer changes. Oracle GoldenGate extracts from Oracle RAC via redo log mining with minimal source impact. A configurable Kafka Connect HTTP Source connector polls REST and HTTP APIs on defined schedules. File source connectors monitor S3, ADLS Gen2, and GCS for CSV, Parquet, and JSON drops — emitting records with schema inference and exactly-once delivery semantics. Every source adapter serialises events as Avro or Protobuf, registered with Confluent Schema Registry under BACKWARD_TRANSITIVE compatibility — meaning upstream schema changes never break downstream consumers.\n\nLayer 2 — Kafka Connect + Apache Kafka: All source adapters run as Kafka Connect connectors, enabling declarative configuration management, automatic offset tracking per connector, and restart-on-failure without data loss. Topics are partitioned by entity key (customer_id, order_id, entity_key) to preserve strict per-entity ordering. Dead-letter queues capture schema violations and deserialisation failures with alert hooks.\n\nLayer 3 — Apache Flink Stream Processing: Flink consumes from Kafka with exactly-once semantics backed by periodic checkpoints to object storage. Flink jobs perform: event-time watermarking and late-arrival handling, stateful deduplication across source systems using RocksDB state backend, schema normalisation across heterogeneous source dialects, and fan-out routing to multiple sink topics. Flink SQL provides declarative transformation logic that is reusable across source types — reducing new source onboarding from weeks to days.\n\nLayer 4 — Open Table Format Sink: Flink's Iceberg and Delta Lake sinks write to cloud object storage (S3 / ADLS Gen2 / GCS). Both formats provide full ACID transaction guarantees, time travel and audit via snapshot history, schema evolution without rewrite, and partition pruning for scan efficiency. Apache Iceberg is the preferred format for cross-engine workloads where Databricks, Snowflake, and BigQuery all read the same table via open REST catalog. Delta Lake is used for Databricks-native workloads that leverage Change Data Feed for incremental consumers.\n\nLayer 5 — Multi-Engine Analytics: Databricks, BigQuery, and Snowflake each register the Iceberg and Delta tables as external or native tables. dbt models build Star schema and Snowflake schema dimensional models on top — fact tables with surrogate keys, SCD Type 2 slowly-changing dimensions, and pre-aggregated reporting marts. BI tools (Power BI, Looker, Tableau) connect to the semantic layer with sub-second query response through partition pruning and Z-ordering.",
    color1: "#065F46",
    color2: "#059669",
    textAccent: "#34D399",
    metrics: [
      { value: "10+ sources", label: "RDBMS, DW, API, Files — one platform" },
      { value: "Batch → <60s", label: "end-to-end streaming latency" },
      { value: "0 restarts", label: "on schema evolution via Schema Registry" },
      { value: "3 engines", label: "Databricks, BigQuery, Snowflake unified" },
    ],
    phases: [
      {
        title: "Multi-Source Ingestion via Kafka Connect",
        items: [
          "Debezium CDC for PostgreSQL (WAL), MySQL (binlog), SQL Server (CT/CDC) — row-level INSERT/UPDATE/DELETE as Avro events with no application changes",
          "Oracle GoldenGate extracts from Oracle RAC via redo log with minimal source-side overhead; feeds Kafka Connect Oracle connector",
          "Kafka Connect HTTP Source connector polls REST and HTTP APIs on configurable schedules — handles pagination, auth, and incremental watermarking",
          "File source connectors monitor S3/ADLS Gen2/GCS for CSV, Parquet, and JSON drops — schema inferred on arrival, events emitted with exactly-once semantics",
          "Confluent Schema Registry enforces BACKWARD_TRANSITIVE Avro/Protobuf compatibility across all source topics — upstream schema changes never break consumers",
        ],
      },
      {
        title: "Apache Flink Stream Processing",
        items: [
          "Flink consumes from all Kafka source topics with exactly-once semantics — checkpoints every 30 seconds to object storage using RocksDB incremental state snapshots",
          "Event-time watermarking handles late-arriving records (up to 5-minute out-of-order tolerance) without reprocessing entire partitions",
          "Stateful deduplication using RocksDB state backend eliminates duplicate events from CDC retries and connector restarts — keyed by (source_id, event_lsn)",
          "Flink SQL declarative transformations: schema normalisation across source dialects, entity key standardisation, fan-out routing to multiple downstream sink topics",
          "New source onboarding via Flink SQL config — reduces integration from weeks of custom pipeline code to days of connector configuration",
        ],
      },
      {
        title: "Open Table Formats, Multi-Engine Analytics",
        items: [
          "Flink Iceberg sink writes to S3/ADLS Gen2 with ACID commit — Databricks, Snowflake, and BigQuery read the same Iceberg table via open REST catalog without data duplication",
          "Flink Delta Lake sink for Databricks-native workloads — Delta Change Data Feed enables incremental dbt models to process only new rows since last run",
          "dbt builds Star schema fact tables with surrogate keys and SCD Type 2 slowly-changing dimensions on top of Iceberg/Delta — version-controlled, testable SQL transformations",
          "Snowflake schema marts for domain-specific reporting — pre-aggregated KPIs with Z-ordering and partition pruning for sub-second BI query response",
        ],
      },
    ],
    stack: ["Debezium", "Oracle GoldenGate", "Kafka Connect", "Apache Kafka", "Apache Flink", "Flink SQL", "Apache Iceberg", "Delta Lake", "Confluent Schema Registry", "Avro", "Protobuf", "dbt", "Databricks", "BigQuery", "Snowflake", "S3", "ADLS Gen2", "RocksDB", "PySpark", "Power BI"],
    outcome:
      "Any source system — RDBMS, data warehouse, REST API, or file drop — can be onboarded to the platform in days rather than weeks, using declarative Kafka Connect and Flink SQL configuration rather than bespoke pipeline code. Data lands in Iceberg or Delta Lake within 60 seconds of the source commit, replacing overnight batch windows. Schema evolution in any source system propagates without pipeline restarts or consumer breakage, enforced by Schema Registry BACKWARD_TRANSITIVE policy. Databricks, BigQuery, and Snowflake all read from the same physical Iceberg tables — eliminating redundant data copies across cloud warehouses. dbt Star and Snowflake schema models provide a versioned, tested semantic layer that BI tools consume directly.",
    svgType: "multicloud",
  },
  {
    id: "cost-optimisation",
    tag: "FinOps · AI · Platform Engineering",
    title: "AI-Driven Infrastructure Cost Intelligence Platform",
    subtitle: "Centralised cost observability across AKS node pools, MongoDB, Databricks, and Azure SQL — with an AI decision layer that identifies Savings Plan and Reservation opportunities, eliminates waste, and enforces spend governance autonomously",
    problem:
      "At enterprise scale — $400,000 per month on Azure — the biggest lever is not right-sizing individual VMs or tuning a handful of queries. It is commitment-based discounts: Azure Savings Plans and Reserved Instances can cut compute costs by 30–40% overnight. But identifying the right commitment level is genuinely hard, and most finance and engineering teams get it wrong.\n\nThe most complex case is AKS. Kubernetes workloads do not appear as named VMs in Azure Cost Management — they surface as node pool scale sets, each running a specific VM SKU (Standard_D8s_v3, Standard_E16ds_v4) with autoscaling behaviour that varies by time of day, day of week, and deployment cadence. A node pool that scales between 4 and 22 nodes depending on batch jobs looks identical in cost reports to one that sits at a stable 12 nodes all day. Buying a 12-node Reserved Instance for the first pool wastes the reservation during low-load periods and busts it during surges; buying a Compute Savings Plan instead covers the variable commitment at a lower discount rate. Getting that classification right — per node pool, per SKU, per autoscaling behaviour — requires analysing 90 days of Azure Monitor node count metrics, not just monthly billing totals. Beyond AKS, the same fragmentation problem exists everywhere: Databricks all-purpose clusters billed per DBU regardless of whether they are running jobs, MongoDB collection scans burning compute because an index was never created, Serverless SQL Warehouses scanning full partitions for reports that filter on a column that happens to not be the partition key, and non-production VMs running 24/7 because nobody owns the shutdown schedule. Each team sees only their slice, manual reviews happen quarterly, and by the time the bill arrives the waste has already compounded.",
    solution:
      "Built a centralised cost intelligence platform that operates across four layers — telemetry, AI analysis, optimisation execution, and governance — with Savings Plan and Reservation identification as the highest-value output.\n\nLayer 1 — Unified Cost Telemetry Collection: Azure Cost Management API streams hourly cost breakdowns by resource group, meter category, and service tag into a partitioned Delta Lake cost lakehouse. Azure Monitor metrics — specifically node pool node counts sampled every 5 minutes over 90 days — feed a separate AKS utilisation table per node pool and VM SKU. Azure Resource Graph captures VM power states, scale set configurations, and unattached Public IPs. Kubecost is deployed as a cluster add-on to attribute AKS pod-level costs to namespace, team, and workload labels — bridging the gap between Azure billing (which sees node pools) and engineering (which thinks in services). Databricks REST API exports DBU per job run, cluster uptime, and spot vs on-demand ratios. MongoDB Atlas API pulls $indexStats, slow query logs, and collection scan counts. Azure SQL Query Store captures execution plans, partition elimination flags, and logical reads per report query.\n\nLayer 2 — AI Analysis & Decision Engine: The most important model is the AKS node pool classifier. For each node pool, 90 days of 5-minute node count samples are fed through an LSTM to learn the autoscaling pattern. HDBSCAN then clusters node pools into three regimes — stable baseline (flat node count, ideal for Reserved Instances), variable-with-floor (autoscales but never drops below N nodes, floor quantity suits Reservations and surge suits Savings Plans), and fully variable (Compute Savings Plan only). Chronos2 forecasts 12-month compute baselines per regime to size the commitment purchase. Isolation Forest detects cost anomalies across all services simultaneously — a DBU spike paired with stable AKS costs flags a runaway Databricks job rather than platform growth. SBERT encodes job descriptions and collection access patterns to find duplicate computation. Llama 3.1 receives the complete context — regime classification, forecast trajectory, anomaly scores, utilisation percentiles, and raw query plans — and produces a prioritised recommendation list with estimated annual savings and risk rating for each commitment purchase or infrastructure change.\n\nLayer 3 — Optimisation Execution: Savings Plans and Reservations are the primary lever at this scale. The platform outputs a commitment purchase plan: per-node-pool Reserved Instance quantities for stable regimes, Compute Savings Plan commitment level for variable workloads, and 1-year vs 3-year term recommendation based on workload age and roadmap signals from Llama 3.1. For AKS specifically, node pool right-sizing recommendations identify over-provisioned VM SKUs — where p95 memory and CPU utilisation both sit below 40%, the model recommends dropping one SKU tier. Databricks optimisation converts all-purpose clusters to job clusters, enables Photon on transformation jobs, and migrates interruptible workloads to Spot with on-demand fallback. MongoDB remediates zero-read indexes and creates compound indexes for slow query patterns. SQL Warehouse rewrites add partition filters and tune auto-suspend policies. Non-production VM shutdown schedules are deployed via Azure Automation runbooks.\n\nLayer 4 — Governance & Automated Enforcement: OPA policies enforce cost guardrails pre-provisioning — no cluster can be created above the approved DBU tier without sign-off. Azure Logic Apps run the weekly automation loop: Llama-generated cost digest emails per team, automated execution of approved right-sizing changes, and Jira tickets for changes requiring human approval. A FinOps Power BI dashboard tracks commitment utilisation rates (reservations should run above 85% to justify purchase), actual vs forecasted spend by service, and team-level cost attribution with trend lines.",
    color1: "#0C4A6E",
    color2: "#0284C7",
    textAccent: "#38BDF8",
    metrics: [
      { value: "↓ 32%", label: "total spend ($400K → $272K/month) via Savings Plans + RIs" },
      { value: "AKS node pools", label: "classified per regime for precise RI vs Savings Plan sizing" },
      { value: "↓ 41%", label: "Databricks DBU via job clusters + Photon + Spot" },
      { value: "↓ 67%", label: "MongoDB query time via $indexStats-driven index remediation" },
    ],
    phases: [
      {
        title: "Centralised Cost Telemetry & AKS Attribution",
        items: [
          "Azure Cost Management API: hourly cost by resource group, meter category, and service tag — streamed via Kafka into Delta Lake, partitioned by service + resource_id + date for point-in-time reconstruction",
          "Azure Monitor AKS node count metrics: 5-minute samples per node pool over 90 days per VM SKU — the raw signal for autoscaling pattern classification and commitment purchase sizing",
          "Kubecost cluster add-on: attributes pod-level costs to namespace, team, and workload labels — bridges the gap between Azure billing (node pools) and engineering teams (services)",
          "MongoDB Atlas REST API: $indexStats surfaces zero-read indexes; slow query log captures collection scan counts and documents-examined vs returned ratios",
          "Databricks REST API: DBU per job run, cluster uptime, spot vs on-demand split, all-purpose vs job cluster classification",
          "Azure SQL Query Store: execution plans, logical reads, partition elimination flags, tempdb spill events — primary source for SQL warehouse and report query optimisation",
        ],
      },
      {
        title: "AI Analysis — AKS Regime Classification & Commitment Sizing",
        items: [
          "LSTM per AKS node pool: learns 90-day autoscaling behaviour from 5-minute node count samples — distinguishes stable baseline (flat), variable-with-floor (autoscales but holds a minimum), and fully variable patterns",
          "HDBSCAN node pool clustering: stable → Reserved Instances; variable-with-floor → RI for baseline nodes + Compute Savings Plan for burst; fully variable → Savings Plan only — the highest-value classification in the platform",
          "Chronos2 12-month compute baseline forecast per regime: sizes the commitment quantity and term (1-year vs 3-year) — a 3-year RI on a node pool that will be decommissioned in 18 months is a liability, not a saving",
          "Isolation Forest on multi-dimensional cost vectors: detects anomalies across DBU, AKS egress, VM cost, and storage simultaneously — isolates root cause without manual triage",
          "SBERT semantic matching: finds Databricks jobs running identical computation on different schedules and MongoDB collections sharing query shapes that could use one compound index",
          "Llama 3.1 reasoning layer: produces prioritised recommendations with estimated annual savings, risk rating, and confidence score per commitment purchase or infrastructure change",
        ],
      },
      {
        title: "Optimisation Execution & Governance",
        items: [
          "Commitment purchases: Reserved Instances for stable AKS node pools (85%+ target utilisation), Compute Savings Plan for variable workloads — primary driver of $128K/month reduction at $400K scale",
          "AKS right-sizing: node pool VM SKU downgrade where p95 CPU + memory both below 40% — modelled per node pool independently, not averaged across the cluster",
          "Databricks: all-purpose → job cluster conversion, Photon on transformation jobs, Spot migration for interruptible workloads, auto-termination via OPA-enforced cluster policies",
          "MongoDB: compound index creation from explain plan analysis, zero-read index drop via $indexStats, covered query projections to eliminate fetch stages",
          "SQL Warehouse: LLM-generated rewrites adding partition filters, auto-suspend tuning per workload schedule — scan volume reduced from 800GB to 12GB on flagged reports",
          "OPA pre-provisioning guardrails + Azure Logic Apps weekly digest + Power BI FinOps dashboard tracking RI utilisation rates, actual vs forecast, and team-level attribution",
        ],
      },
    ],
    stack: ["Azure Cost Management API", "Azure Monitor", "Azure Resource Graph", "AKS / Node Pools", "Kubecost", "MongoDB Atlas API", "Databricks REST API", "Apache Kafka", "Delta Lake", "LSTM", "HDBSCAN", "Chronos2", "Isolation Forest", "SBERT", "Llama 3.1", "OPA", "Azure Savings Plans", "Reserved Instances", "Azure Logic Apps", "Azure Automation", "Power BI", "PySpark"],
    outcome:
      "Monthly Azure spend reduced from $400,000 to $272,000 — a $128,000 per month saving sustained across six months, primarily driven by commitment-based discounts sized correctly per AKS node pool regime and Databricks compute pattern. AKS node pools were classified into three autoscaling regimes enabling precise Reserved Instance and Savings Plan purchases — the platform identified that 6 of 11 node pools were genuinely stable (RI candidates) while 5 showed variable-with-floor behaviour requiring a split commitment strategy. Databricks DBU fell 41% through job cluster migration and Photon enablement. MongoDB query latency dropped 67% after compound index remediation on 14 high-traffic collections. Non-production VM shutdown schedules eliminated 23 resources running 24/7 without active workloads. The Llama 3.1 weekly digest replaced the quarterly manual review with an actionable, prioritised queue resolved through a governed approval workflow.",
    svgType: "finops",
  },
  {
    id: "pyspark-optimisation",
    tag: "Performance Engineering · Databricks · Spark",
    title: "Optimising PySpark Jobs at Lakehouse Scale",
    subtitle: "Diagnosing 8 warning categories in the process_intelligence job — 101.9M rows, 1,985 stages, 86s straggler tasks",
    problem:
      "The `process_intelligence` Databricks job on Azure (Spark 3.5.0, ADLS Gen2) ran 7 concurrent Structured Streaming queries with Trigger.AvailableNow + Delta CDF. Each batch processed 101.9M rows across 1,985 stages with 16 peak executors. Batch duration had degraded from 51 minutes to 65.5 minutes — a 22% slowdown across successive batches pointing to executor contention. Spark UI revealed a max task of 86s against an average of 2.7s (32× ratio) — a textbook data skew signature. Additionally, JDK 8 was still in use (GC pauses under heavy shuffle), deprecated Spark 4.0 configs were active (`spark.sql.streaming.schemaInference`, `spark.sql.streaming.metricsEnabled`), and Unity Catalog scoping was misconfigured for streaming workloads.",
    solution:
      "Systematic 3-layer remediation guided by 8 warning categories from Spark UI and Databricks event logs. Layer 1 — JVM: upgraded JDK 8 → JDK 17, configured G1GC with explicit heap regions to eliminate stop-the-world GC pauses under shuffle pressure. Layer 2 — AQE: enabled Adaptive Query Execution (`spark.sql.adaptive.enabled=true`) with skew join optimisation and dynamic post-shuffle coalescing — addresses the 86s straggler directly by splitting skewed partitions at runtime. Layer 3 — Speculative Execution: enabled `spark.speculation=true` with `spark.speculation.multiplier=1.5` to detect and re-launch straggler tasks on idle executors before they become the critical path. Removed deprecated Spark 4.0 config properties and corrected Unity Catalog scope for streaming Delta CDF readers.",
    color1: "#7C1D1D",
    color2: "#DC2626",
    textAccent: "#FCA5A5",
    metrics: [
      { value: "101.9M", label: "rows per batch (7 streaming queries)" },
      { value: "86s → ~3s", label: "max straggler task (AQE + speculation)" },
      { value: "22%", label: "batch duration drift arrested" },
      { value: "1,985", label: "stages analysed across 8 warning categories" },
    ],
    phases: [
      {
        title: "Diagnosis — 8 Warning Categories",
        items: [
          "Data skew: max task 86s vs avg 2.7s (32× ratio) — skewed shuffle partition identified via Spark UI stage timeline",
          "JVM risk: JDK 8 GC pauses visible in executor task metrics under heavy shuffle (1,985 stages)",
          "Deprecated configs: `spark.sql.streaming.schemaInference` + `spark.sql.streaming.metricsEnabled` flagged for Spark 4.0 removal",
          "Unity Catalog scope: streaming Delta CDF readers misconfigured — potential missing change records at partition boundaries",
        ],
      },
      {
        title: "JVM & Runtime Fixes",
        items: [
          "JDK 8 → JDK 17 upgrade: G1GC with region-based heap for predictable GC under shuffle memory pressure",
          "Removed deprecated `spark.sql.streaming.schemaInference` — replaced with explicit schema definitions",
          "Removed deprecated `spark.sql.streaming.metricsEnabled` — metrics re-enabled via Databricks cluster config",
          "Unity Catalog streaming scope corrected: Delta CDF startingVersion aligned to checkpoint offset",
        ],
      },
      {
        title: "AQE & Speculative Execution",
        items: [
          "`spark.sql.adaptive.enabled=true` — dynamic post-shuffle coalescing reduces empty partition overhead",
          "`spark.sql.adaptive.skewJoin.enabled=true` — runtime skew detection splits hot partitions without repartition()",
          "`spark.speculation=true` with `spark.speculation.multiplier=1.5` — re-launches tasks running >1.5× median on idle executors",
          "Trigger.AvailableNow retained for all 7 queries — ensures each query processes exactly one micro-batch per trigger",
        ],
      },
    ],
    stack: ["PySpark", "Databricks", "Spark 3.5.0", "Delta Lake", "Delta CDF", "Azure ADLS Gen2", "Spark UI", "AQE", "JDK 17", "G1GC", "Unity Catalog", "Structured Streaming"],
    outcome:
      "The 86-second straggler task reduced to near-average duration through AQE skew join splitting and speculative re-launch. Batch duration drift (51min → 65.5min across batches) arrested — executor contention eliminated by G1GC under JDK 17. All 8 Spark warning categories resolved. Deprecated Spark 4.0 configs removed, preventing silent breakage on runtime upgrade. Unity Catalog CDF streaming now reads complete change sets with correct scoping.",
    svgType: "spark",
  },
];

// ─── SVG diagrams ─────────────────────────────────────────────────────────────
function MlDiagram() {
  const SI = "https://cdn.simpleicons.org";

  const chip = (name: string, icon?: string) => (
    <div key={name} style={{
      background: "#fff", borderRadius: 8, padding: "4px 10px",
      display: "flex", alignItems: "center", gap: 6,
      border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", flexShrink: 0,
    }}>
      {icon && (
        <img src={icon} alt="" width={15} height={15}
          style={{ objectFit: "contain", flexShrink: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>{name}</span>
    </div>
  );

  const step = (num: string, title: string, color: string, items: React.ReactNode) => (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: color, color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{title}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, paddingLeft: 27 }}>{items}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 11, padding: "4px 0", fontFamily: "inherit" }}>
      {step("1", "Dual-Stream Ingestion", "#6366f1", <>
        {chip("Resource Logs", `${SI}/opentelemetry`)}
        {chip("CPU · Queue · Mem", `${SI}/kubernetes`)}
        {chip("Service Logs (Drain3)", `${SI}/apachekafka`)}
        {chip("SBERT Embeddings")}
      </>)}
      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />
      {step("2", "Load Classification", "#16a34a", <>
        {chip("LSTM Time-Series")}
        {chip("HDBSCAN Clustering")}
        {chip("FAISS Retrieval")}
        {chip("Isolation Forest")}
        {chip("Spike vs Permanent Growth?")}
      </>)}
      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />
      {step("3", "Agentic Decision & Policy", "#9333ea", <>
        {chip("Chronos2 Forecast")}
        {chip("Llama 3.1", `${SI}/meta`)}
        {chip("NeMo Guardrails", `${SI}/nvidia`)}
        {chip("OPA Policy Check")}
      </>)}
      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />
      {step("4", "Multi-Platform Execution", "#0284c7", <>
        {chip("K8s / HPA", `${SI}/kubernetes`)}
        {chip("KEDA", `${SI}/kubernetes`)}
        {chip("RabbitMQ", `${SI}/rabbitmq`)}
        {chip("MongoDB", `${SI}/mongodb`)}
        {chip("Databricks", `${SI}/databricks`)}
      </>)}
      <div style={{ marginTop: 4, padding: "8px 12px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 3 }}>Outcome</div>
        <div style={{ fontSize: 9.5, color: "#166534", lineHeight: 1.5 }}>
          Queue depth ↓ 61% · p95 latency ↓ 49% · Temp vs permanent load classified before scaling fires
        </div>
      </div>
    </div>
  );
}

function MulticloudDiagram() {
  const SI = "https://cdn.simpleicons.org";

  const chip = (name: string, icon?: string) => (
    <div key={name} style={{
      background: "#fff", borderRadius: 8, padding: "4px 10px",
      display: "flex", alignItems: "center", gap: 6,
      border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", flexShrink: 0,
    }}>
      {icon && (
        <img
          src={icon}
          alt=""
          width={15}
          height={15}
          style={{ objectFit: "contain", flexShrink: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>{name}</span>
    </div>
  );

  const step = (num: string, title: string, color: string, items: React.ReactNode, sub?: string) => (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: color, color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{title}</div>
        {sub && <span style={{ fontSize: 8, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>{sub}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, paddingLeft: 27 }}>{items}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 11, padding: "4px 0", fontFamily: "inherit" }}>

      {step("1", "Sources — Any System", "#1e40af", <>
        {chip("PostgreSQL (WAL)", `${SI}/postgresql`)}
        {chip("Oracle RAC", `${SI}/oracle`)}
        {chip("MySQL / SQL Server")}
        {chip("REST / HTTP APIs")}
        {chip("Files: CSV · Parquet · JSON")}
      </>)}

      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />

      {step("2", "Producer Layer → Kafka Connect", "#065f46", <>
        {chip("Debezium CDC", `${SI}/apachekafka`)}
        {chip("Oracle GoldenGate")}
        {chip("HTTP Source Connector")}
        {chip("File / S3 Connector", `${SI}/amazons3`)}
        {chip("Schema Registry (Avro)", `${SI}/apachekafka`)}
      </>, "· BACKWARD_TRANSITIVE compatibility")}

      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />

      {step("3", "Apache Kafka + Apache Flink", "#b45309", <>
        {chip("Apache Kafka Topics", `${SI}/apachekafka`)}
        {chip("Apache Flink", `${SI}/apacheflink`)}
        {chip("Exactly-Once (RocksDB)", `${SI}/apacheflink`)}
        {chip("Flink SQL Transforms")}
        {chip("Dead-Letter Queue", `${SI}/apachekafka`)}
      </>, "· event-time watermarks · dedup · fan-out")}

      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />

      {step("4", "Open Table Format Sink", "#7c3aed", <>
        {chip("Apache Iceberg", `${SI}/apache`)}
        {chip("Delta Lake", `${SI}/databricks`)}
        {chip("AWS S3", `${SI}/amazons3`)}
        {chip("Azure ADLS Gen2", `${SI}/microsoftazure`)}
        {chip("GCS", `${SI}/googlecloud`)}
      </>, "· ACID · time travel · schema evolution")}

      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />

      {step("5", "Multi-Engine Analytics + Semantic Layer", "#0284c7", <>
        {chip("Databricks", `${SI}/databricks`)}
        {chip("BigQuery", `${SI}/googlebigquery`)}
        {chip("Snowflake", `${SI}/snowflake`)}
        {chip("dbt (Star / Snowflake Schema)", `${SI}/dbt`)}
        {chip("Power BI", `${SI}/powerbi`)}
      </>)}

      <div style={{ marginTop: 4, padding: "8px 12px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 3 }}>Outcome</div>
        <div style={{ fontSize: 9.5, color: "#166534", lineHeight: 1.5 }}>
          10+ source types → single platform · Batch replaced by &lt;60s streaming · Schema evolution with zero restarts · Databricks + BigQuery + Snowflake on same Iceberg tables
        </div>
      </div>

    </div>
  );
}

function FinOpsDiagram() {
  const SI = "https://cdn.simpleicons.org";

  const chip = (name: string, icon?: string) => (
    <div key={name} style={{
      background: "#fff", borderRadius: 8, padding: "4px 10px",
      display: "flex", alignItems: "center", gap: 6,
      border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", flexShrink: 0,
    }}>
      {icon && (
        <img src={icon} alt="" width={15} height={15}
          style={{ objectFit: "contain", flexShrink: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>{name}</span>
    </div>
  );

  const step = (num: string, title: string, color: string, items: React.ReactNode, sub?: string) => (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: color, color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{title}</div>
        {sub && <span style={{ fontSize: 8, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>{sub}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, paddingLeft: 27 }}>{items}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 11, padding: "4px 0", fontFamily: "inherit" }}>

      {step("1", "Unified Cost Telemetry & AKS Attribution", "#1e40af", <>
        {chip("Azure Cost Management API", `${SI}/microsoftazure`)}
        {chip("Azure Monitor (AKS node counts, 5-min samples)", `${SI}/microsoftazure`)}
        {chip("Kubecost (pod → namespace → team cost)", `${SI}/kubernetes`)}
        {chip("MongoDB Atlas API ($indexStats + slow query log)", `${SI}/mongodb`)}
        {chip("Databricks REST API (DBU / cluster uptime)", `${SI}/databricks`)}
        {chip("Azure SQL Query Store + Apache Kafka → Delta Lake", `${SI}/apachekafka`)}
      </>)}

      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />

      {step("2", "AI Analysis — AKS Regime Classification & Commitment Sizing", "#7c3aed", <>
        {chip("LSTM (90-day node pool autoscaling pattern)", `${SI}/python`)}
        {chip("HDBSCAN: stable → RI · variable-with-floor → RI + Savings Plan · fully variable → Savings Plan")}
        {chip("Chronos2 (12-month baseline forecast for commitment sizing)")}
        {chip("Isolation Forest (multi-dimensional cost anomaly)")}
        {chip("SBERT (duplicate job + shared index detection)")}
        {chip("Llama 3.1 (ranked recommendations + annual savings + risk rating)", `${SI}/meta`)}
      </>)}

      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />

      {step("3", "Optimisation Execution", "#0284c7", <>
        {chip("Reserved Instances (stable AKS node pools, 85%+ utilisation target)", `${SI}/microsoftazure`)}
        {chip("Compute Savings Plans (variable workloads + Databricks compute)", `${SI}/microsoftazure`)}
        {chip("AKS node pool SKU right-sizing (p95 CPU + memory < 40%)", `${SI}/kubernetes`)}
        {chip("Databricks: job clusters + Photon + Spot migration", `${SI}/databricks`)}
        {chip("MongoDB: compound index creation + zero-read index drop", `${SI}/mongodb`)}
        {chip("SQL Warehouse: LLM rewrites + suspend tuning · VM shutdown runbooks", `${SI}/microsoftazure`)}
      </>)}

      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />

      {step("4", "Governance & Automated Enforcement", "#065f46", <>
        {chip("OPA (pre-provisioning cost guardrails)")}
        {chip("Azure Logic Apps (weekly digest + right-sizing automation)", `${SI}/microsoftazure`)}
        {chip("Azure Automation (VM + node pool runbooks)", `${SI}/microsoftazure`)}
        {chip("Power BI FinOps Dashboard (RI utilisation · actual vs forecast · team attribution)", `${SI}/powerbi`)}
      </>)}

      <div style={{ marginTop: 4, padding: "8px 12px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 3 }}>Outcome</div>
        <div style={{ fontSize: 9.5, color: "#166534", lineHeight: 1.5 }}>
          $400K → $272K/month (↓32%) · $128K/month saved · 6 of 11 AKS node pools correctly classified for RI vs Savings Plan · DBU ↓41% · MongoDB query time ↓67%
        </div>
      </div>

    </div>
  );
}

function SparkDiagram() {
  const SI = "https://cdn.simpleicons.org";

  const chip = (name: string, icon?: string) => (
    <div key={name} style={{
      background: "#fff", borderRadius: 8, padding: "4px 10px",
      display: "flex", alignItems: "center", gap: 6,
      border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", flexShrink: 0,
    }}>
      {icon && (
        <img src={icon} alt="" width={15} height={15}
          style={{ objectFit: "contain", flexShrink: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>{name}</span>
    </div>
  );

  const step = (num: string, title: string, color: string, bg: string, border: string, items: React.ReactNode) => (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: color, color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{title}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, paddingLeft: 27 }}>{items}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 11, padding: "4px 0", fontFamily: "inherit" }}>
      {step("1", "Diagnose — Spark UI Analysis", "#dc2626", "#fef2f2", "#fecaca", <>
        {chip("Spark UI (86s straggler)", `${SI}/apachespark`)}
        {chip("1,985 stages profiled", `${SI}/databricks`)}
        {chip("32× skew ratio", `${SI}/apachespark`)}
        {chip("JDK 8 GC pauses", `${SI}/openjdk`)}
      </>)}
      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />
      {step("2", "JVM Fix — JDK 17 + G1GC", "#ea580c", "#fff7ed", "#fed7aa", <>
        {chip("JDK 8 → JDK 17", `${SI}/openjdk`)}
        {chip("G1GC heap regions", `${SI}/openjdk`)}
        {chip("Remove deprecated configs")}
        {chip("Unity Catalog CDF fix", `${SI}/databricks`)}
      </>)}
      <div style={{ borderLeft: "2px dashed #e2e8f0", marginLeft: 10, height: 8 }} />
      {step("3", "AQE + Speculative Execution", "#7c3aed", "#faf5ff", "#e9d5ff", <>
        {chip("AQE skew join splitting", `${SI}/apachespark`)}
        {chip("Dynamic coalescing", `${SI}/apachespark`)}
        {chip("Speculation 1.5× median", `${SI}/apachespark`)}
        {chip("Trigger.AvailableNow", `${SI}/databricks`)}
      </>)}
      <div style={{ marginTop: 4, padding: "8px 12px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 3 }}>Result</div>
        <div style={{ fontSize: 9.5, color: "#166534", lineHeight: 1.5 }}>
          86s straggler → ~3s · Batch drift 51→65 min arrested · All 8 Spark warning categories resolved · No Spark 4.0 deprecated configs
        </div>
      </div>
    </div>
  );
}

const SVG_MAP: Record<string, React.FC> = {
  ml: MlDiagram,
  multicloud: MulticloudDiagram,
  finops: FinOpsDiagram,
  spark: SparkDiagram,
};

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const [diagramOpen, setDiagramOpen] = useState(false);
  const DiagramSvg = SVG_MAP[project.svgType];

  return (
    <>
      {/* ── Architecture diagram modal ── */}
      {diagramOpen && (
        <div className={styles.modalBackdrop} onClick={() => setDiagramOpen(false)}>
          <div
            className={styles.modalContent}
            style={{ background: "#fff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{project.title} — Architecture</span>
              <button type="button" className={styles.modalClose} onClick={() => setDiagramOpen(false)}>✕</button>
            </div>
            <div className={styles.modalDiagram}>
              <DiagramSvg />
            </div>
          </div>
        </div>
      )}

      <article className={styles.card} style={{ "--c1": project.color1, "--c2": project.color2, "--accent": project.textAccent } as React.CSSProperties}>
        {/* ── Left panel ── */}
        <div className={styles.panel} style={{ background: `linear-gradient(145deg, ${project.color1} 0%, ${project.color2} 100%)` }}>
          <div className={styles.panelIndex}>0{index + 1}</div>
          <div className={styles.metrics}>
            {project.metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.diagramLink}
            onClick={() => setDiagramOpen(true)}
          >
            View Architecture ↗
          </button>
        </div>

      {/* ── Right panel ── */}
      <div className={styles.body}>
        <div className={styles.tag} style={{ color: project.textAccent, borderColor: `${project.textAccent}35`, background: `${project.textAccent}10` }}>
          {project.tag}
        </div>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.subtitle}>{project.subtitle}</p>

        <div className={styles.section}>
          <h4 className={styles.sectionLabel}>The Problem</h4>
          <p className={styles.sectionText}>{project.problem}</p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionLabel}>The Solution</h4>
          {project.solution.split("\n\n").map((para, i) => (
            <p key={i} className={styles.sectionText}>{para}</p>
          ))}
        </div>

        <div className={styles.stack}>
          {project.stack.map((t) => (
            <span key={t} className={styles.pill} style={{ borderColor: `${project.textAccent}40`, color: project.textAccent, background: `${project.textAccent}10` }}>{t}</span>
          ))}
        </div>

        <button
          type="button"
          className={styles.toggle}
          style={{ color: project.textAccent, borderColor: `${project.textAccent}40` }}
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide Technical Details ↑" : "View Technical Deep-Dive ↓"}
        </button>

        {open && (
          <div className={styles.deepdive}>
            <div className={styles.phases}>
              {project.phases.map((ph) => (
                <div key={ph.title} className={styles.phase}>
                  <h5 className={styles.phaseTitle} style={{ color: project.textAccent }}>{ph.title}</h5>
                  <ul className={styles.phaseItems}>
                    {ph.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className={styles.outcomeBox} style={{ borderColor: `${project.textAccent}50`, background: `${project.textAccent}08` }}>
              <span className={styles.outcomeLabel}>Outcome</span>
              <p className={styles.outcomeText}>{project.outcome}</p>
            </div>
          </div>
        )}
      </div>
    </article>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ShowcasePage() {
  return (
    <div className={styles.page}>
      <div className={styles.list}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}
