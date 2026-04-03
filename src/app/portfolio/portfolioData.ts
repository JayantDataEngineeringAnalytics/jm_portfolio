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
    id: "hr-analytics",
    status: "live",
    category: "HR Analytics & People Intelligence",
    title: "HR Workforce Intelligence",
    subtitle: "Attrition analysis, flight risk scoring model, and compensation benchmarking on Databricks",
    description:
      "Built a full Medallion pipeline on Databricks to analyse IBM HR attrition data — Bronze ingestion, Silver enrichment with 12 derived columns, Gold reporting aggregates, and a custom weighted Flight Risk Model that assigns each of 1,470 employees a 0–100 risk score. Model is validated against actual attrition: Critical-band employees attrite at 60% vs 8% for Low band.",
    color1: "#8b5cf6",
    color2: "#6d28d9",
    accent: "#a78bfa",
    stack: ["Databricks", "Delta Lake", "SQL", "Python", "Power BI"],
    metrics: [
      { label: "Employees Analysed", value: "1,470" },
      { label: "Attrition Rate", value: "16.1%" },
      { label: "Flight Risk Factors", value: "10" },
      { label: "Critical Risk Attrition", value: "60%" },
    ],
    highlights: ["Medallion Architecture", "Flight Risk Model", "Salary Benchmarking", "People Analytics", "Unity Catalog", "IBM Dataset"],
    github: "https://github.com/JayantDataEngineeringAnalytics/portfolio-hr-analytics",
    slug: "hr-analytics",
    dataset: "IBM HR Employee Attrition",
    datasetSource: "IBM Watson Analytics — 1,470 employees · 35 columns · synthetic HR dataset",
    problem:
      "HR teams lack a systematic, data-driven way to identify which employees are at risk of leaving before they resign. Reactive exit interviews and blanket retention programs waste budget on the wrong people while missing the real flight risks.",
    solution:
      "End-to-end Databricks pipeline: Bronze ingests the IBM HR dataset, Silver derives 12 business columns (tenure bands, salary bands, satisfaction labels, attrition flag), Gold produces 8 reporting aggregates. The Flight Risk Model assigns each employee a weighted 0–100 score across 10 risk factors — overtime, low salary band, poor satisfaction, stagnation, and more. Model is validated by comparing predicted risk band against actual attrition: Critical-band employees attrited at 60%, 7.3× the Low-band rate.",
    pipeline: [
      {
        name: "Bronze",
        color: "#b45309",
        textColor: "#fde68a",
        description: "Raw ingestion — CSV loaded from Unity Catalog volume into Delta Lake with audit columns",
        steps: [
          "read_files() from /Volumes/portfolio_hr/landing_zone/raw_files/",
          "All 35 original columns preserved with original names",
          "Added _ingested_at (timestamp) and _source_file audit columns",
          "1,470 rows, 0 NULLs — confirmed clean dataset",
        ],
      },
      {
        name: "Silver",
        color: "#475569",
        textColor: "#e2e8f0",
        description: "Enriched & transformed — 12 derived business columns via SQL window functions",
        steps: [
          "Snake_case rename of all 35 columns for consistency",
          "tenure_band: 0–1yr / 1–3yr / 3–5yr / 5–10yr / 10+yr",
          "salary_band: PERCENT_RANK() within job_role → Low / Mid / High / Top",
          "Satisfaction labels: integer codes mapped to Low / Medium / High / Very High",
          "income_percentile: PERCENT_RANK() across full dataset",
          "attrition_flag: boolean cast for ML-ready target variable",
        ],
      },
      {
        name: "Gold",
        color: "#92400e",
        textColor: "#fef3c7",
        description: "Business-ready aggregates + Flight Risk Scoring Model",
        steps: [
          "agg_attrition_by_tenure — 5 tenure bands, headcount, rate per band",
          "agg_attrition_by_role — 9 job roles, attrition rate, avg income",
          "agg_salary_benchmarks — min/avg/median/max income per role",
          "agg_satisfaction_vs_attrition — satisfaction gap: attrited vs retained",
          "flight_risk_scores — per-employee weighted score (10 factors, max 116 pts, normalised 0–100)",
          "agg_flight_risk_by_dept — risk band distribution per department",
        ],
      },
    ],
    dashboardEmbed: "/reports/hr-analytics.html",
    powerbi: {
      modelTables: [
        {
          name: "fact_employees",
          type: "fact",
          columns: ["employee_id (PK)", "department (FK)", "job_role (FK)", "age", "gender", "marital_status", "monthly_income", "years_at_company", "attrition_flag", "overtime", "tenure_band", "salary_band", "income_percentile"],
        },
        {
          name: "flight_risk_scores",
          type: "fact",
          columns: ["employee_id (PK)", "flight_risk_score", "risk_band", "raw_score", "score_overtime", "score_salary", "score_new_hire", "score_job_sat", "score_env_sat", "score_wlb", "score_no_promo"],
        },
        {
          name: "dim_department",
          type: "dimension",
          columns: ["department (PK)", "headcount", "avg_income", "avg_tenure"],
        },
        {
          name: "dim_job_role",
          type: "dimension",
          columns: ["job_role (PK)", "department (FK)", "avg_income", "attrition_rate"],
        },
        {
          name: "dim_date",
          type: "dimension",
          columns: ["date_id (PK)", "year", "quarter", "month", "month_name"],
        },
      ],
      measures: [
        {
          name: "Attrition Rate",
          description: "Percentage of employees who have left, respecting all active filters (department, role, risk band).",
          dax: `Attrition Rate =\nDIVIDE(\n    CALCULATE(\n        COUNTROWS(fact_employees),\n        fact_employees[attrition_flag] = TRUE()\n    ),\n    COUNTROWS(fact_employees),\n    0\n)`,
        },
        {
          name: "Flight Risk Score (Avg)",
          description: "Average flight risk score (0–100) for the current filter context — higher is more at-risk.",
          dax: `Avg Flight Risk Score =\nAVERAGEX(\n    RELATEDTABLE(flight_risk_scores),\n    flight_risk_scores[flight_risk_score]\n)`,
        },
        {
          name: "Pct High or Critical Risk",
          description: "Share of employees in the High or Critical flight risk band — primary risk KPI for HR dashboards.",
          dax: `Pct High or Critical Risk =\nDIVIDE(\n    CALCULATE(\n        COUNTROWS(flight_risk_scores),\n        flight_risk_scores[risk_band] IN { \"High\", \"Critical\" }\n    ),\n    COUNTROWS(flight_risk_scores),\n    0\n)`,
        },
        {
          name: "Salary Equity Ratio",
          description: "Ratio of avg income for attrited vs retained employees in the same job role — values below 1 indicate compensation-driven attrition.",
          dax: `Salary Equity Ratio =\nVAR AtritedIncome =\n    CALCULATE(\n        AVERAGE(fact_employees[monthly_income]),\n        fact_employees[attrition_flag] = TRUE()\n    )\nVAR RetainedIncome =\n    CALCULATE(\n        AVERAGE(fact_employees[monthly_income]),\n        fact_employees[attrition_flag] = FALSE()\n    )\nRETURN\n    DIVIDE(AtritedIncome, RetainedIncome, BLANK())`,
        },
        {
          name: "Overtime Attrition Premium",
          description: "How much higher the attrition rate is for overtime employees vs non-overtime — quantifies the burnout-attrition link.",
          dax: `Overtime Attrition Premium =\nVAR OTRate =\n    CALCULATE([Attrition Rate], fact_employees[overtime] = \"Yes\")\nVAR NonOTRate =\n    CALCULATE([Attrition Rate], fact_employees[overtime] = \"No\")\nRETURN\n    DIVIDE(OTRate - NonOTRate, NonOTRate, BLANK())`,
        },
        {
          name: "Manager Effectiveness Index",
          description: "Inverse attrition rate for employees with 3+ years under the same manager — higher = better retention signal from manager stability.",
          dax: `Manager Effectiveness Index =\n1 - CALCULATE(\n    [Attrition Rate],\n    fact_employees[years_with_curr_manager] >= 3\n)`,
        },
        {
          name: "Attrition by Tenure Band",
          description: "Attrition rate segmented by tenure band — used in the key visual showing how first-year risk (34.9%) compares to 10+ year risk (8.1%).",
          dax: `Attrition by Tenure Band =\nCALCULATETABLE(\n    SUMMARIZE(\n        fact_employees,\n        fact_employees[tenure_band],\n        \"Headcount\", COUNTROWS(fact_employees),\n        \"Attrited\", CALCULATE(\n            COUNTROWS(fact_employees),\n            fact_employees[attrition_flag] = TRUE()\n        ),\n        \"Rate\", [Attrition Rate]\n    )\n)`,
        },
        {
          name: "Expected Attritions (High+Critical)",
          description: "Projected headcount loss if High and Critical risk employees attrite at their historical band rates — used to size retention program cost.",
          dax: `Expected Attritions =\nVAR HighCount =\n    CALCULATE(\n        COUNTROWS(flight_risk_scores),\n        flight_risk_scores[risk_band] = \"High\"\n    )\nVAR CriticalCount =\n    CALCULATE(\n        COUNTROWS(flight_risk_scores),\n        flight_risk_scores[risk_band] = \"Critical\"\n    )\nRETURN\n    INT(HighCount * 0.451) + INT(CriticalCount * 0.600)`,
        },
      ],
      reportPages: [
        {
          name: "Workforce Overview",
          icon: "👥",
          visuals: ["KPI cards: headcount, attrition rate, avg income, avg tenure", "Attrition by department bar chart", "Headcount by age band donut", "Overtime vs non-overtime attrition comparison"],
        },
        {
          name: "Attrition Deep-Dive",
          icon: "📉",
          visuals: ["Attrition rate by tenure band (key visual)", "Attrition by job role ranked bar", "Attrition by salary band scatter", "YoY attrition trend (simulated cohort)"],
        },
        {
          name: "Flight Risk Dashboard",
          icon: "⚠️",
          visuals: ["Risk band distribution donut (Low / Medium / High / Critical)", "High+Critical employees table (dept, role, score, top factor)", "Risk band vs actual attrition validation chart", "Expected attritions KPI with cost estimate"],
        },
        {
          name: "Compensation Analysis",
          icon: "💰",
          visuals: ["Salary benchmarks by role (min/avg/median/max box)", "Salary equity ratio: attrited vs retained", "Income percentile distribution", "Salary hike % vs attrition scatter"],
        },
        {
          name: "Satisfaction & Wellbeing",
          icon: "❤️",
          visuals: ["Satisfaction score comparison: attrited vs retained radar", "Work-life balance vs attrition heatmap", "Job involvement by department", "Manager effectiveness index gauge per department"],
        },
      ],
    },
  },
  {
    id: "health-analytics",
    status: "live",
    category: "Healthcare Analytics & Clinical Intelligence",
    title: "Healthcare Patient Analytics",
    subtitle: "Patient admission analysis, readmission risk scoring, and billing intelligence on Databricks",
    description:
      "Built a full Medallion pipeline on Databricks to analyse 55,500 synthetic patient admissions — Bronze ingestion, Silver enrichment with LOS bands, age bands, billing bands and abnormal flags, Gold reporting aggregates, and a custom weighted Readmission Risk Model that scores each patient 0–100. Model validated against actual abnormal test results: Critical-band patients have 100% abnormal rate vs 0% for Low band.",
    color1: "#0d9488",
    color2: "#0f766e",
    accent: "#2dd4bf",
    stack: ["Databricks", "Delta Lake", "PySpark", "SQL", "Python", "Power BI"],
    metrics: [
      { label: "Admissions Analysed", value: "55,500" },
      { label: "Avg Billing", value: "$25,539" },
      { label: "Avg Length of Stay", value: "15.5 days" },
      { label: "Critical Risk Abnormal Rate", value: "100%" },
    ],
    highlights: ["Medallion Architecture", "Readmission Risk Model", "Billing Benchmarking", "Clinical Intelligence", "Unity Catalog", "Synthetic Dataset"],
    github: "https://github.com/JayantDataEngineeringAnalytics/portfolio-health",
    slug: "health-analytics",
    dataset: "Healthcare Patient Records",
    datasetSource: "Kaggle — 55,500 admissions · 15 columns · synthetic patient dataset",
    problem:
      "Healthcare providers struggle to proactively identify high-risk patients before discharge, leading to costly readmissions. Without a data-driven scoring model, clinical teams rely on intuition rather than evidence when allocating post-discharge follow-up resources.",
    solution:
      "End-to-end Databricks pipeline: Bronze ingests the patient records CSV, Silver derives 8 business columns (LOS days, LOS bands, age bands, billing bands, billing percentile, abnormal flag, admission year/month), Gold produces 9 reporting aggregates. The Readmission Risk Model assigns each patient a weighted 0–100 score across 7 clinical risk factors — long stay, abnormal results, emergency admission, high billing, senior age, and more. Model is validated by comparing predicted risk band against actual abnormal test results: Critical-band patients had 100% abnormal rate vs 0% for Low band.",
    pipeline: [
      {
        name: "Bronze",
        color: "#b45309",
        textColor: "#fde68a",
        description: "Raw ingestion — CSV loaded from Unity Catalog volume into Delta Lake with audit columns",
        steps: [
          "read_files() from /Volumes/portfolio_health/landing_zone/raw_files/",
          "All 15 original columns preserved with original names",
          "Added _ingested_at (timestamp) and _source_file audit columns",
          "55,500 rows, 0 NULLs — confirmed clean synthetic dataset",
        ],
      },
      {
        name: "Silver",
        color: "#475569",
        textColor: "#e2e8f0",
        description: "Enriched & transformed — 8 derived business columns via PySpark window functions",
        steps: [
          "Snake_case rename of all 15 columns for consistency",
          "los_days: DATEDIFF(discharge_date, admission_date)",
          "los_band: 1-3d / 4-7d / 8-14d / 15-21d / 22+d",
          "age_band: Under 20 / 20s / 30s / 40s / 50s / 60s / 70s+",
          "billing_band: PERCENT_RANK() within medical_condition → Low / Mid / High / Top",
          "billing_percentile: PERCENT_RANK() across full dataset",
          "abnormal_result_flag: boolean (test_results = 'Abnormal')",
        ],
      },
      {
        name: "Gold",
        color: "#92400e",
        textColor: "#fef3c7",
        description: "Business-ready aggregates + Readmission Risk Scoring Model",
        steps: [
          "agg_by_los_band — 5 LOS bands, admissions, avg billing, avg LOS",
          "agg_by_condition — 6 conditions, avg billing, abnormal rate",
          "agg_by_insurance — 5 providers, avg & total billing",
          "agg_by_admission_type — Emergency / Elective / Urgent breakdown",
          "agg_billing_benchmarks — min/avg/median/max billing per condition",
          "readmission_risk_scores — per-patient weighted score (7 factors, max 113 pts, normalised 0–100)",
          "agg_risk_by_condition — risk band distribution per condition",
        ],
      },
    ],
    dashboardEmbed: "/reports/health-analytics.html",
    powerbi: {
      modelTables: [
        {
          name: "fact_patients",
          type: "fact",
          columns: ["patient_name (PK)", "age", "gender", "medical_condition (FK)", "insurance_provider (FK)", "admission_type", "medication", "los_days", "billing_amount", "los_band", "age_band", "billing_band", "billing_percentile", "abnormal_result_flag"],
        },
        {
          name: "readmission_risk_scores",
          type: "fact",
          columns: ["patient_name (PK)", "readmission_risk_score", "risk_band", "raw_score", "score_long_stay", "score_abnormal", "score_emergency", "score_high_billing", "score_senior", "score_mid_stay", "score_inconclusive"],
        },
        {
          name: "dim_condition",
          type: "dimension",
          columns: ["medical_condition (PK)", "admissions", "avg_billing", "avg_los", "abnormal_rate"],
        },
        {
          name: "dim_insurance",
          type: "dimension",
          columns: ["insurance_provider (PK)", "admissions", "avg_billing", "total_billing"],
        },
        {
          name: "dim_date",
          type: "dimension",
          columns: ["date_id (PK)", "year", "quarter", "month", "month_name"],
        },
      ],
      measures: [
        {
          name: "Avg Readmission Risk Score",
          description: "Average readmission risk score (0–100) for the current filter context — higher indicates greater clinical risk.",
          dax: `Avg Readmission Risk Score =\nAVERAGEX(\n    RELATEDTABLE(readmission_risk_scores),\n    readmission_risk_scores[readmission_risk_score]\n)`,
        },
        {
          name: "Pct High or Critical Risk",
          description: "Share of patients in the High or Critical readmission risk band — primary risk KPI for clinical dashboards.",
          dax: `Pct High or Critical Risk =\nDIVIDE(\n    CALCULATE(\n        COUNTROWS(readmission_risk_scores),\n        readmission_risk_scores[risk_band] IN { \"High\", \"Critical\" }\n    ),\n    COUNTROWS(readmission_risk_scores),\n    0\n)`,
        },
        {
          name: "Abnormal Result Rate",
          description: "Percentage of admissions with an Abnormal test result — used to validate the risk model and identify high-acuity cohorts.",
          dax: `Abnormal Result Rate =\nDIVIDE(\n    CALCULATE(\n        COUNTROWS(fact_patients),\n        fact_patients[abnormal_result_flag] = TRUE()\n    ),\n    COUNTROWS(fact_patients),\n    0\n)`,
        },
        {
          name: "Avg Billing by Condition",
          description: "Average billing amount segmented by medical condition — used to benchmark payer mix and identify cost drivers.",
          dax: `Avg Billing by Condition =\nCALCULATETABLE(\n    SUMMARIZE(\n        fact_patients,\n        fact_patients[medical_condition],\n        \"Avg Billing\", AVERAGE(fact_patients[billing_amount]),\n        \"Admissions\", COUNTROWS(fact_patients)\n    )\n)`,
        },
        {
          name: "LOS Variance from Avg",
          description: "Difference between a patient's actual LOS and the overall average — flags extended stays for care coordination review.",
          dax: `LOS Variance from Avg =\nAVERAGE(fact_patients[los_days]) -\nCALCULATE(\n    AVERAGE(fact_patients[los_days]),\n    ALL(fact_patients)\n)`,
        },
        {
          name: "Emergency Admission Rate",
          description: "Share of admissions classified as Emergency — correlates with higher billing, longer LOS, and elevated risk scores.",
          dax: `Emergency Admission Rate =\nDIVIDE(\n    CALCULATE(\n        COUNTROWS(fact_patients),\n        fact_patients[admission_type] = \"Emergency\"\n    ),\n    COUNTROWS(fact_patients),\n    0\n)`,
        },
        {
          name: "Billing Efficiency Index",
          description: "Ratio of avg billing to avg LOS — higher values indicate more billing revenue generated per day of care.",
          dax: `Billing Efficiency Index =\nDIVIDE(\n    AVERAGE(fact_patients[billing_amount]),\n    AVERAGE(fact_patients[los_days]),\n    BLANK()\n)`,
        },
        {
          name: "Expected High-Risk Count",
          description: "Projected number of patients in High and Critical bands — used to size post-discharge follow-up programmes.",
          dax: `Expected High Risk Count =\nCALCULATE(\n    COUNTROWS(readmission_risk_scores),\n    readmission_risk_scores[risk_band] IN { \"High\", \"Critical\" }\n)`,
        },
      ],
      reportPages: [
        {
          name: "Patient Overview",
          icon: "🏥",
          visuals: ["KPI cards: total admissions, avg billing, avg LOS, abnormal rate", "Admissions by medical condition bar chart", "Admission type breakdown donut", "Age band distribution"],
        },
        {
          name: "Length of Stay Analysis",
          icon: "📅",
          visuals: ["LOS band distribution (key visual)", "Avg LOS by medical condition", "LOS vs billing scatter by condition", "Extended stay (22+d) proportion by insurance provider"],
        },
        {
          name: "Readmission Risk Dashboard",
          icon: "⚠️",
          visuals: ["Risk band distribution donut (Low / Medium / High / Critical)", "High+Critical patients table (condition, risk score, top factor)", "Risk band vs abnormal rate validation chart", "Expected high-risk count KPI"],
        },
        {
          name: "Billing Intelligence",
          icon: "💰",
          visuals: ["Billing benchmarks by condition (min/avg/median/max)", "Billing efficiency index by provider", "Billing percentile distribution", "High billing band patients by condition"],
        },
        {
          name: "Clinical Outcomes",
          icon: "🔬",
          visuals: ["Abnormal result rate by condition heatmap", "Test result distribution: Normal / Abnormal / Inconclusive", "Medication prescription frequency", "Abnormal rate by admission type"],
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
