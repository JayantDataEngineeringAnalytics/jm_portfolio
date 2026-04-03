export type ProjectMetric = {
  label: string;
  value: string;
};

export type PipelineLayer = {
  name: "Bronze" | "Silver" | "Gold";
  color: string;
  textColor: string;
  description: string;
  steps: string[];
};

export type DAXMeasure = {
  name: string;
  description: string;
  dax: string;
};

export type ModelTable = {
  name: string;
  type: "fact" | "dimension" | "bridge";
  columns: string[];
};

export type PowerBILayer = {
  modelTables: ModelTable[];
  measures: DAXMeasure[];
  reportPages: { name: string; icon: string; visuals: string[] }[];
};

export type PortfolioProject = {
  id: string;
  status: "live" | "wip" | "soon";
  category: string;
  title: string;
  subtitle: string;
  description: string;
  color1: string;
  color2: string;
  accent: string;
  stack: string[];
  metrics: ProjectMetric[];
  highlights: string[];
  github: string;
  slug: string;
  dataset: string;
  datasetSource: string;
  powerbi?: PowerBILayer;
  problem: string;
  solution: string;
  pipeline: PipelineLayer[];
  dashboardEmbed?: string;
};

export const PROJECTS: PortfolioProject[] = [
  {
    id: "e-commerce-analytics",
    status: "live",
    category: "Data Engineering & Analytics",
    title: "E-Commerce Sales Analytics",
    subtitle: "End-to-end Medallion pipeline on Databricks with interactive Power BI dashboard",
    description:
      "Ingested raw transactional data through Bronze → Silver → Gold Delta Lake layers on Databricks. Implemented SCD Type 2 for customer dimensions, built aggregate Gold tables, and surfaced insights in an embedded interactive report with cross-filters and AI-generated narratives.",
    color1: "#0ea5e9",
    color2: "#0369a1",
    accent: "#38bdf8",
    stack: ["Databricks", "Delta Lake", "PySpark", "SQL", "Power BI", "Python"],
    metrics: [
      { label: "Total GMV", value: "R$13.6M" },
      { label: "Orders Processed", value: "98,666" },
      { label: "Avg Review Score", value: "4.03 ★" },
      { label: "Avg Delivery Time", value: "12.4 days" },
    ],
    highlights: ["Medallion Architecture", "SCD Type 2", "Cross-filter Dashboard", "AI Insights", "Unity Catalog", "Delta Live Tables"],
    github: "https://github.com/JayantDataEngineeringAnalytics/portfolio-de-ecommerce",
    slug: "e-commerce-analytics",
    dataset: "Brazilian E-Commerce (Olist)",
    datasetSource: "Kaggle — 98,666 orders · 9 CSVs · Sep 2016 – Aug 2018",
    problem:
      "Raw e-commerce order data scattered across 9 CSV files with no unified view of customer behaviour, seller performance, or product trends. Business questions about revenue drivers, delivery delays, and repeat purchase rates were impossible to answer without a structured pipeline.",
    solution:
      "Built a full Medallion Architecture on Databricks: Bronze ingests raw CSVs into Delta Lake with schema enforcement, Silver joins and cleanses all 9 datasets with SCD Type 2 customer tracking, and Gold produces aggregate fact tables optimised for BI queries. An interactive Power BI dashboard surfaces the insights with cross-filtering, drill-through, and AI-generated commentary.",
    pipeline: [
      {
        name: "Bronze",
        color: "#b45309",
        textColor: "#fde68a",
        description: "Raw ingestion — CSVs loaded into Delta Lake with schema enforcement and audit columns",
        steps: [
          "Auto Loader reads 9 CSV files from cloud storage",
          "Schema inference with explicit overrides for data types",
          "Added ingestion_ts, source_file audit columns",
          "Stored as Delta tables in bronze schema",
        ],
      },
      {
        name: "Silver",
        color: "#475569",
        textColor: "#e2e8f0",
        description: "Cleansed & conformed — joins, deduplication, SCD Type 2 for customers",
        steps: [
          "Joined orders, items, payments, reviews, sellers, products, customers",
          "Null handling and standardised date formats",
          "SCD Type 2 on dim_customers (valid_from / valid_to / is_current)",
          "Removed duplicate order events with ROW_NUMBER()",
        ],
      },
      {
        name: "Gold",
        color: "#92400e",
        textColor: "#fef3c7",
        description: "Business-ready aggregates — fact tables and KPIs optimised for BI",
        steps: [
          "fact_orders — one row per order with all joined attributes",
          "agg_monthly_revenue — monthly GMV, order count, AOV",
          "agg_seller_performance — fulfilment rate, avg delivery days, revenue",
          "agg_product_category — category-level sales, returns, ratings",
        ],
      },
    ],
    dashboardEmbed: "/reports/e-commerce-analytics.html",
    powerbi: {
      modelTables: [
        {
          name: "fact_orders",
          type: "fact",
          columns: ["order_id (PK)", "customer_id (FK)", "product_id (FK)", "seller_id (FK)", "date_id (FK)", "payment_value", "freight_value", "review_score", "delivery_days", "order_status"],
        },
        {
          name: "dim_customers",
          type: "dimension",
          columns: ["customer_id (PK)", "customer_unique_id", "city", "state", "zip_prefix", "valid_from", "valid_to", "is_current"],
        },
        {
          name: "dim_products",
          type: "dimension",
          columns: ["product_id (PK)", "category_name", "category_english", "name_length", "desc_length", "photos_qty", "weight_g", "volume_cm3"],
        },
        {
          name: "dim_sellers",
          type: "dimension",
          columns: ["seller_id (PK)", "city", "state", "zip_prefix"],
        },
        {
          name: "dim_date",
          type: "dimension",
          columns: ["date_id (PK)", "date", "year", "quarter", "month", "month_name", "week", "day", "is_weekend", "is_holiday"],
        },
      ],
      measures: [
        {
          name: "Total Revenue",
          description: "Sum of payment values across all orders, respecting all active filters.",
          dax: `Total Revenue =\nSUMX(\n    fact_orders,\n    fact_orders[payment_value]\n)`,
        },
        {
          name: "Revenue YoY %",
          description: "Year-over-year revenue growth using the date dimension for same-period comparison.",
          dax: `Revenue YoY % =\nVAR CurrentRevenue  = [Total Revenue]\nVAR PriorYearRevenue = CALCULATE(\n    [Total Revenue],\n    SAMEPERIODLASTYEAR(dim_date[date])\n)\nRETURN\n    DIVIDE(\n        CurrentRevenue - PriorYearRevenue,\n        PriorYearRevenue,\n        BLANK()\n    )`,
        },
        {
          name: "Avg Order Value",
          description: "Average payment value per distinct order — useful for pricing and basket analysis.",
          dax: `Avg Order Value =\nDIVIDE(\n    [Total Revenue],\n    DISTINCTCOUNT(fact_orders[order_id]),\n    0\n)`,
        },
        {
          name: "On-Time Delivery %",
          description: "Percentage of delivered orders where actual delivery was on or before estimated date.",
          dax: `On-Time Delivery % =\nVAR DeliveredOrders =\n    CALCULATE(\n        COUNTROWS(fact_orders),\n        fact_orders[order_status] = \"delivered\"\n    )\nVAR OnTimeOrders =\n    CALCULATE(\n        COUNTROWS(fact_orders),\n        fact_orders[order_status] = \"delivered\",\n        fact_orders[delivery_days] <= fact_orders[estimated_days]\n    )\nRETURN\n    DIVIDE(OnTimeOrders, DeliveredOrders, 0)`,
        },
        {
          name: "Repeat Customer Rate",
          description: "Share of customers with more than one lifetime order — a key retention KPI.",
          dax: `Repeat Customer Rate =\nVAR AllCustomers =\n    DISTINCTCOUNT(fact_orders[customer_unique_id])\nVAR RepeatCustomers =\n    COUNTROWS(\n        FILTER(\n            SUMMARIZE(\n                fact_orders,\n                fact_orders[customer_unique_id],\n                \"OrderCount\",\n                DISTINCTCOUNT(fact_orders[order_id])\n            ),\n            [OrderCount] > 1\n        )\n    )\nRETURN\n    DIVIDE(RepeatCustomers, AllCustomers, 0)`,
        },
        {
          name: "Revenue Running Total",
          description: "Year-to-date cumulative revenue — used in trend line charts with a daily date axis.",
          dax: `Revenue Running Total =\nCALCULATE(\n    [Total Revenue],\n    DATESYTD(dim_date[date])\n)`,
        },
      ],
      reportPages: [
        {
          name: "Executive Summary",
          icon: "📊",
          visuals: ["KPI cards: GMV, Orders, AOV, Review Score", "Revenue trend line (MoM)", "Orders by status donut", "Top 5 categories bar chart"],
        },
        {
          name: "Sales Deep-Dive",
          icon: "📈",
          visuals: ["Revenue YoY% waterfall chart", "GMV by category & sub-category matrix", "AOV distribution histogram", "Revenue running total vs target line"],
        },
        {
          name: "Customer Analytics",
          icon: "👥",
          visuals: ["New vs returning customers trend", "Repeat purchase rate KPI", "Customer geographic heat map (state level)", "Cohort retention matrix"],
        },
        {
          name: "Seller Performance",
          icon: "🏪",
          visuals: ["Top sellers scatter (revenue vs rating)", "Seller fulfilment rate gauge", "Seller city/state breakdown bar", "Revenue concentration Pareto chart"],
        },
        {
          name: "Logistics & Quality",
          icon: "🚚",
          visuals: ["Delivery speed distribution bar", "On-time delivery % trend", "Review score vs delivery days scatter", "Late delivery root-cause breakdown"],
        },
      ],
    },
  },
  {
    id: "real-time-streaming",
    status: "wip",
    category: "Data Engineering",
    title: "Real-Time Sales Streaming Pipeline",
    subtitle: "Event-driven ingestion with Apache Kafka, Spark Structured Streaming, and live BI",
    description:
      "Streaming pipeline that ingests point-of-sale events via Kafka topics, processes them with Spark Structured Streaming on Databricks, and writes micro-batch aggregates to a live dashboard — sub-minute latency end to end.",
    color1: "#7c3aed",
    color2: "#4c1d95",
    accent: "#a78bfa",
    stack: ["Kafka", "Databricks", "Delta Lake", "PySpark", "Python"],
    metrics: [
      { label: "Latency Target", value: "<60s" },
      { label: "Events / sec", value: "10K+" },
      { label: "Pipeline Layers", value: "3" },
      { label: "Status", value: "WIP" },
    ],
    highlights: ["Spark Structured Streaming", "Kafka Topics", "Watermarking", "Trigger Once"],
    github: "https://github.com",
    slug: "real-time-streaming",
    dataset: "Synthetic POS Events",
    datasetSource: "Custom generator — simulated retail transactions",
    problem:
      "Batch pipelines introduce 4–8 hour delays between a sale occurring and it appearing in reporting. Operational teams cannot react to stock issues, fraud signals, or promotional performance in real time.",
    solution:
      "Event-driven pipeline using Kafka as the message broker and Spark Structured Streaming on Databricks for stateful aggregations. Delta Lake handles exactly-once writes; a live dashboard updates every 60 seconds.",
    pipeline: [
      {
        name: "Bronze",
        color: "#b45309",
        textColor: "#fde68a",
        description: "Kafka consumer reads raw POS events into Delta Bronze with full event payload",
        steps: [
          "Kafka topic: pos.transactions (partitioned by store_id)",
          "Spark readStream with maxOffsetsPerTrigger = 10,000",
          "Written to Delta Bronze with kafka_offset, topic, partition audit columns",
          "Schema enforcement via from_json with explicit struct type",
        ],
      },
      {
        name: "Silver",
        color: "#475569",
        textColor: "#e2e8f0",
        description: "Cleanse, deduplicate, and enrich events with product/store dimensions",
        steps: [
          "Watermarking on event_ts (2 min late-arrival tolerance)",
          "Deduplication on transaction_id using dropDuplicatesWithinWatermark",
          "Lookup join with static product & store dimension tables",
          "Null handling and currency normalisation",
        ],
      },
      {
        name: "Gold",
        color: "#92400e",
        textColor: "#fef3c7",
        description: "Tumbling window aggregates for live BI consumption",
        steps: [
          "5-minute tumbling windows: revenue, units, unique customers per store",
          "Session windows: basket size and session duration per customer",
          "MERGE INTO Delta Gold (upsert to avoid duplicates on retrigger)",
          "Power BI DirectQuery connects to Gold for sub-minute refresh",
        ],
      },
    ],
    dashboardEmbed: undefined,
  },
  {
    id: "ml-churn-prediction",
    status: "soon",
    category: "Machine Learning",
    title: "Customer Churn Prediction",
    subtitle: "Feature engineering on Databricks Feature Store with MLflow model serving",
    description:
      "End-to-end ML project — feature engineering on transactional history, model training with XGBoost and hyperparameter tuning via Hyperopt, registered in MLflow, and served via Databricks Model Serving with a BI explainability dashboard.",
    color1: "#065f46",
    color2: "#022c22",
    accent: "#34d399",
    stack: ["Databricks", "MLflow", "PySpark", "Python", "XGBoost", "Power BI"],
    metrics: [
      { label: "Target AUC", value: ">0.85" },
      { label: "Features", value: "40+" },
      { label: "Model", value: "XGBoost" },
      { label: "Status", value: "Planned" },
    ],
    highlights: ["Feature Store", "MLflow Tracking", "Hyperopt Tuning", "SHAP Explainability"],
    github: "https://github.com",
    slug: "ml-churn-prediction",
    dataset: "E-Commerce Customer History",
    datasetSource: "Derived from Olist dataset — customer RFM features",
    problem:
      "No systematic way to identify customers at risk of churning before they lapse. Reactive retention campaigns fire too late, after the customer has already stopped purchasing.",
    solution:
      "Train a binary classifier on RFM features, purchase recency, review sentiment, and delivery experience. Serve predictions via Databricks Model Serving, and surface top churn drivers per customer segment in an explainability dashboard.",
    pipeline: [
      {
        name: "Bronze",
        color: "#b45309",
        textColor: "#fde68a",
        description: "Raw customer transaction history from Gold layer of the e-commerce pipeline",
        steps: [
          "Reads from agg_customer_history Gold table",
          "Adds labelling window: churned = no order in 90 days post last purchase",
          "Stored as feature engineering input table in Bronze ML schema",
        ],
      },
      {
        name: "Silver",
        color: "#475569",
        textColor: "#e2e8f0",
        description: "Feature engineering — RFM, behavioural, and sentiment features",
        steps: [
          "Recency, Frequency, Monetary (RFM) features per customer",
          "Avg delivery delay, avg review score, complaint flag",
          "Category diversity score (Shannon entropy of category purchases)",
          "Registered to Databricks Feature Store for reuse",
        ],
      },
      {
        name: "Gold",
        color: "#92400e",
        textColor: "#fef3c7",
        description: "Model training, evaluation, and serving",
        steps: [
          "XGBoost classifier with Hyperopt hyperparameter search",
          "MLflow experiment tracking — params, metrics, artefacts",
          "Champion/challenger model registry workflow",
          "Batch scoring writes churn_score to Gold for BI consumption",
        ],
      },
    ],
    dashboardEmbed: undefined,
  },
];
