// ...existing code...

import { About, Blog, Home, Newsletter, Person, Social } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
// ...existing code...
const person: Person = {
  firstName: "Jayant",
  lastName: "Mohite",
  name: `Jayant Mohite`,
  role: "Principal Solutions Architect - Data & AI",
  avatar: "/images/avatar.jpg",
  email: "hello@jayantmohite.com",
  location: "Asia/Kolkata", // India/Pune uses Asia/Kolkata IANA time zone
  languages: [
    "Microsoft Certified: Agentic AI Business Solutions Architect",
    "Microsoft Certified: Azure AI Engineer Associate",
    "Microsoft Certified: Azure Solutions Architect Expert",
    "Databricks Certified Data Engineer Professional",
    "Microsoft Certified: Power BI Data Analyst Associate",
    "Microsoft Certified: Azure Administrator Associate",
  ], // Certifications instead of languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/JayantDataEngineeringAnalytics",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jayant-m-4117665b/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:hello@jayantmohite.com",
  },
  {
    name: "Upworks",
    icon: "upwork",
    link: "https://www.upwork.com/freelancers/~01f0a7ec45cdb4d083",
  },
];

const home: Home = {
  path: "/",
  image: "/api/og/generate?title=Certified Solutions Architect",
  label: "Home",
  title: "Jayant Mohite - Certified Solutions Architect",
  description: "Certified Big Data Engineer with 13+ years of experience building scalable data platforms and analytics solutions. Specialized in Databricks, Azure, Power BI, and modern data architecture.",
  headline: <>Turning Data into Actionable Insights</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Databricks Certified</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Data Engineer Professional
        </Text>
      </Row>
    ),
  href: "", // Remove hyperlink by setting to empty string
  },
  subline: (
    <>
      I'm <b>Jayant</b>, a Certified Solutions Architect. <br /> I design and build data
      solutions that drive business growth and efficiency.
    </>
  ),
};

const about: About = {
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <p key="intro-1"><b>Solution Architect</b> with <b>13+ years</b> of experience designing, building, and scaling <b>enterprise-grade data and analytics platforms</b> across <b>on-prem</b> and <b>cloud</b> environments. Proven expertise in <b>data platform architecture</b>, <b>distributed systems</b>, and <b>cloud-native analytics</b>, with hands-on depth spanning the <b>Apache Hadoop</b> ecosystem, <b>Spark</b>-based processing, modern <b>Lakehouse architectures</b>, and <b>cloud data warehouses</b>.</p>
        <p key="intro-2">Extensive experience leading end-to-end data platform initiatives on <b>Microsoft Azure</b> with strong multi-cloud exposure across <b>AWS</b> and <b>GCP</b>, delivering solutions using <b>Azure Databricks</b>, <b>Delta Lake</b>, <b>Microsoft Fabric</b>, <b>Azure Data Factory</b>, <b>Azure Synapse</b>, <b>Apache Spark</b>, <b>Kafka</b>, <b>Flink</b>, <b>Iceberg</b>, <b>MongoDB</b>, <b>PostgreSQL</b>, <b>Snowflake</b>, and <b>Amazon Redshift</b>. Deep understanding of <b>streaming</b>, <b>batch</b>, and <b>hybrid data processing</b> patterns, <b>data governance</b>, and analytics enablement using <b>Power BI</b> and enterprise BI platforms.</p>
        <p key="intro-3">Recognized for blending <b>solution architecture</b> thinking with <b>hands-on data engineering</b>, contributing to cloud foundation reviews, <b>network and security-aware designs</b>, <b>DevOps-enabled data platforms</b>, and <b>FinOps-driven cost optimization</b>. Experienced in product-scale ownership, customer and vendor collaboration, and leading high-performing engineering teams in <b>Agile</b> environments, while enabling <b>AI/ML</b> and <b>LLM-driven</b> use cases on modern data platforms.</p>
      </>
    ),
  },
  studies: {
    display: false,
    title: "",
    institutions: [],
  },
  technical: {
    display: false,
    title: "Technical Skills",
    skills: [
      {
        title: "Data Engineering",
        description: "ETL, Data Pipelines, Data Lakes, Data Warehousing, Delta Lake, Databricks",
        tags: [
          { name: "Apache Kafka", icon: "apacheKafka" },
          { name: "RabbitMQ", icon: "rabbitmq" },
          { name: "Rest API", icon: "postman" },
          { name: "Databricks", icon: "databricks" },
          { name: "Apache Hadoop", icon: "apacheHadoop" },
          { name: "Azure Synapse", icon: "azureDevops" },
          { name: "Azure Data Factory", icon: "azure" },
          { name: "Snowflake", icon: "snowflake" },
          { name: "Hive", icon: "apacheHive" },
          { name: "Spark", icon: "apacheSpark" },
          { name: "Python", icon: "python" },
          { name: "Airflow", icon: "apacheAirflow" },
          { name: "Apache Nifi", icon: "apacheNifi" },
          { name: "Apache Pig", icon: "code" },
          { name: "Apache Sqoop", icon: "database" },
          { name: "Apache Flink", icon: "apacheFlink" },
          { name: "Apache Flume", icon: "server" },
          { name: "Cloudera Hadoop", icon: "apacheHadoop" },
          { name: "MS Fabric", icon: "cloud" },
          { name: "One Lake", icon: "data" },
          { name: "StarRocks", icon: "database" },
          { name: "Unity Catalog", icon: "database" },
          { name: "Event Hub", icon: "server" },
        ],
      },
      {
        title: "Data Visualization",
        description: "DAX, Data Modeling, Executive Dashboards, Self-Service Analytics",
        tags: [
          { name: "Power BI", icon: "googleAnalytics" },
          { name: "Superset", icon: "apacheSuperset" },
          { name: "Tableau", icon: "tableau" },
          { name: "Chart.js", icon: "chartjs" },
        ],
      },
      {
        title: "Databases",
        description: "Data Modeling, Query Optimization, Indexing, Data Migration",
        tags: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MySQL", icon: "mysql" },
          { name: "MongoDB", icon: "mongodb" },
          { name: "Cassandra", icon: "apacheCassandra" },
          { name: "Neo4j", icon: "neo4j" },
        ],
      },
      {
        title: "Cloud Platforms",
        description: "Cloud Architecture, DevOps, CI/CD, Cost Optimization",
        tags: [
          { name: "Azure", icon: "azureBrand" },
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "Kubernetes", icon: "kubernetes" },
          { name: "Terraform", icon: "terraform" },
          { name: "Azure DevOps", icon: "azureDevops" },
          { name: "Azure Monitor", icon: "azure" },
          { name: "Log Analytics", icon: "azure" },
          { name: "FinOps", icon: "cloud" },
        ],
      },
      {
        title: "Salesforce",
        description: "Admin, Advanced Admin, Sales Cloud Consultant, Data Integration",
        tags: [
          { name: "Salesforce", icon: "salesforce" },
        ],
      },
      {
        title: "Monitoring & Observability",
        description: "System Monitoring, Logging, Alerting, and Performance Analytics",
        tags: [
          { name: "Elastic Search", icon: "elasticsearch" },
          { name: "Grafana", icon: "grafana" },
          { name: "Kibana", icon: "kibana" },
          { name: "Prometheus", icon: "prometheus" },
        ],
      },
    ],
  },
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from India/Pune`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  work: {
    display: true,
    title: "Core Expertise & Capabilities",
    experiences: [
      {
        company: "Data Platform Architecture & Lakehouse Design",
        role: "13+ Years of Enterprise-Grade Platform Architecture",
        timeframe: "2012 — Present",
        summary: (
          <>
            Architected and governed large-scale data platforms using <b>Azure Databricks</b>, <b>Delta Lake</b>, <b>Microsoft Fabric</b>, <b>Azure Synapse Analytics</b>, <b>Snowflake</b>, and <b>Amazon Redshift</b>, supporting batch, streaming, and CDC workloads.
          </>
        ),
        tags: [
          { name: "Databricks", icon: "databricks" },
          { name: "MS Fabric", icon: "cloud" },
          { name: "Azure Synapse", icon: "azureDevops" },
          { name: "Delta Lake", icon: "data" },
          { name: "Snowflake", icon: "snowflake" },
          { name: "One Lake", icon: "data" },
          { name: "Azure Data Factory", icon: "azure" },
          { name: "Unity Catalog", icon: "database" },
          { name: "StarRocks", icon: "database" },
        ],
        achievements: [
          <span key="arch-1">Designed and owned enterprise-grade data platforms across on-premise and cloud environments, with deep specialization in modern <b>Lakehouse architectures</b>.</span>,
          <span key="arch-2">Defined target-state architectures, platform roadmaps, reference architectures, and non-functional requirements spanning ingestion, storage, processing, analytics, governance, and AI/ML enablement.</span>,
          <span key="arch-3">Translated complex business, analytical, and regulatory requirements into scalable, secure, and cost-efficient platform designs, balancing delivery speed with long-term maintainability.</span>,
          <span key="arch-4">Authored and maintained <b>HLDs</b>, <b>LLDs</b>, dependency diagrams, capacity models, and <b>Architecture Decision Records (ADRs)</b> that actively guided release planning and architectural governance.</span>,
          <span key="arch-5">Architected data platforms integrating <b>Apache Iceberg</b>, <b>Azure Data Factory</b>, and cloud-native storage for unified analytics and governance.</span>
        ],
      },
      {
        company: "Data Engineering & Performance Optimization",
        role: "High-Performance ELT/ETL & Streaming Pipelines",
        timeframe: "2012 — Present",
        summary: (
          <>
            Designed and guided implementation of high-performance pipelines using <b>Apache Spark</b> (<b>PySpark</b>, <b>Spark SQL</b>, <b>Scala</b>), <b>Python</b>, and <b>SQL</b>, optimized for concurrency, parallelism, and predictable latency.
          </>
        ),
        tags: [
          { name: "Spark", icon: "apacheSpark" },
          { name: "Python", icon: "python" },
          { name: "Apache Hadoop", icon: "apacheHadoop" },
          { name: "Hive", icon: "apacheHive" },
          { name: "Apache Pig", icon: "code" },
          { name: "Apache Sqoop", icon: "database" },
          { name: "Apache Nifi", icon: "apacheNifi" },
          { name: "Apache Flume", icon: "server" },
          { name: "Cloudera Hadoop", icon: "apacheHadoop" },
          { name: "Rest API", icon: "postman" },
        ],
        achievements: [
          <span key="de-1">Built robust ingestion frameworks integrating product telemetry, event data, ERP/CRM systems, SaaS platforms, third-party APIs, streaming sources, and CDC pipelines.</span>,
          <span key="de-2">Deep hands-on experience in partitioning strategies, caching, workload isolation, query optimization, and horizontal scalability, supporting peak-load scenarios and low-latency analytics.</span>,
          <span key="de-3">Partnered with engineering and QA teams to define performance benchmarks, validated through load testing and stress testing, ensuring platforms scale reliably with business growth.</span>,
          <span key="de-4">Implemented <b>Delta Lake</b> infrastructure using <b>Delta Engine</b>, <b>Z-Ordering</b>, and <b>Data Skipping</b>, improving query and storage performance.</span>,
          <span key="de-5">Engineered optimized <b>Structured Streaming</b> pipelines via <b>Databricks Workflows</b>, <b>Auto Loader</b>, achieving 40% increase in throughput and reduced latency.</span>
        ],
      },
      {
        company: "Database Architecture & Storage Systems",
        role: "OLTP, Analytical & Hybrid Workload Expertise",
        timeframe: "2012 — Present",
        summary: (
          <>
            Owned and evolved database architectures across <b>MongoDB</b>, <b>PostgreSQL</b>, <b>Snowflake</b>, <b>Amazon Redshift</b>, <b>Cassandra</b>, <b>Neo4j</b>, and <b>SQL Server</b>, supporting large-scale production workloads.
          </>
        ),
        tags: [
          { name: "MongoDB", icon: "mongodb" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MySQL", icon: "mysql" },
          { name: "Cassandra", icon: "apacheCassandra" },
          { name: "Neo4j", icon: "neo4j" },
          { name: "Snowflake", icon: "snowflake" },
        ],
        achievements: [
          <span key="db-1"><b>MongoDB</b> (on-prem & Atlas): schema design, indexing strategies, performance tuning, migrations, operational best practices, and large-scale production workloads with <b>Global Clusters</b> and <b>Multi-Region Writes</b>.</span>,
          <span key="db-2"><b>PostgreSQL</b> (standalone & distributed): analytical workloads, concurrency handling, query optimization, and Lakehouse integration.</span>,
          <span key="db-3"><b>Snowflake</b>: database and schema design, RBAC, warehouse sizing, workload isolation, auto-scaling, cost-aware tuning, and secure data sharing.</span>,
          <span key="db-4"><b>Amazon Redshift</b>: MPP architecture design, distribution styles, sort keys, WLM queues, concurrency scaling, and performance tuning.</span>,
          <span key="db-5">Evaluated emerging storage and analytics engines including <b>StarRocks</b>, <b>CelerData</b>, and <b>MinIO</b> for next-generation platform capabilities.</span>
        ],
      },
      {
        company: "Streaming & Real-Time Architectures",
        role: "Event-Driven & Near-Real-Time Processing",
        timeframe: "2014 — Present",
        summary: (
          <>
            Designed real-time and near-real-time data processing systems using <b>Apache Kafka</b>, <b>Azure Event Hubs</b>, <b>Spark Structured Streaming</b>, and <b>Apache Flink</b>.
          </>
        ),
        tags: [
          { name: "Apache Kafka", icon: "apacheKafka" },
          { name: "RabbitMQ", icon: "rabbitmq" },
          { name: "Apache Flink", icon: "apacheFlink" },
          { name: "Event Hub", icon: "server" },
          { name: "Airflow", icon: "apacheAirflow" },
          { name: "Spark", icon: "apacheSpark" },
        ],
        achievements: [
          <span key="rt-1">Implemented event-driven architectures with replayability, fault tolerance, and at-least-once / exactly-once semantics where applicable.</span>,
          <span key="rt-2">Experience with workflow orchestration and automation using <b>Apache Airflow</b>, <b>Oozie</b>, and cloud-native schedulers, defining DAGs with retries, SLAs, alerting, and failure handling.</span>,
          <span key="rt-3">Built self-healing pipelines with automated validation, anomaly detection, alerting, and recovery mechanisms to ensure data reliability.</span>,
          <span key="rt-4">Implemented <b>Kafka</b> + <b>Spark Streaming</b> pipelines for financial and ecommerce clients, delivering low-latency, high-throughput event-driven analytics.</span>,
          <span key="rt-5">Designed <b>Event Hub</b> and <b>Structured Streaming</b> architectures for unified batch and streaming workloads with predictable latency.</span>
        ],
      },
      {
        company: "Cloud Platforms & Migration Programs",
        role: "Multi-Cloud Architecture & Data Modernization",
        timeframe: "2014 — Present",
        summary: (
          <>
            Led large-scale data modernization and cloud migration initiatives, moving legacy <b>Hadoop</b> ecosystems (<b>Cloudera</b>, <b>Hortonworks</b>) to cloud-native platforms across <b>Azure</b>, <b>AWS</b>, and <b>GCP</b>.
          </>
        ),
        tags: [
          { name: "Azure", icon: "azureBrand" },
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "Kubernetes", icon: "kubernetes" },
          { name: "Terraform", icon: "terraform" },
          { name: "Azure DevOps", icon: "azureDevops" },
        ],
        achievements: [
          <span key="cloud-1"><b>Microsoft Azure</b> (primary): Databricks, Fabric, ADLS, Synapse, Data Factory, Event Hubs, Key Vault, Monitor, Log Analytics, DevOps.</span>,
          <span key="cloud-2"><b>AWS</b>: S3, EMR, Glue, Redshift, Lambda, Step Functions, Aurora/RDS.</span>,
          <span key="cloud-3"><b>GCP</b> (working knowledge & PoCs): BigQuery, Dataflow, Cloud Storage.</span>,
          <span key="cloud-4">Designed multi-cloud architectures, ensuring portability, operational consistency, and secure cross-cloud integration.</span>,
          <span key="cloud-5">Led architectural assessments for external client engagements, recommending <b>Hadoop-to-Databricks</b>, <b>SQL-to-Fabric</b>, and on-prem to cloud landing zone migration strategies.</span>,
          <span key="cloud-6">Reduced platform infrastructure spend from ~$300K/month to &lt;$180K/month (≈45%), improving unit economics from ~$35/license to &lt;$20/license while workloads and customers continued to scale.</span>,
          <span key="cloud-7">Designed and operationalized <b>DaaS / RaaS</b> data-sharing architecture, now the primary custom reporting model, enabling repeatable enterprise onboarding for 10+ customers.</span>,
          <span key="cloud-8">Led <b>Azure → GCP migration</b> of the data & analytics platform for ~30 enterprise customers across the US, UK, and Germany, defining the coexistence strategy where required and owning migration strategy, phased cutovers, and risk controls.</span>,
          <span key="cloud-9">Negotiated a strategic <b>$10M GCP agreement</b> securing <b>$3.5M in credits</b> plus ~25% list-price discounts, materially improving migration economics and long-term cloud runway.</span>,
          <span key="cloud-10">Acted as the primary SME for all customer data & analytics discussions, leading architecture, security, and scalability reviews and resolving escalations, reducing customer issues by &gt;50%.</span>
        ],
      },
      {
        company: "Cloud Foundations & Security Architecture",
        role: "Network, Security & Compliance-Aware Design",
        timeframe: "2014 — Present",
        summary: (
          <>
            Participated in cloud foundation and landing zone design, ensuring data platforms align with enterprise standards for environment separation, networking, IAM, security, and compliance.
          </>
        ),
        tags: [
          { name: "Azure", icon: "azureBrand" },
          { name: "Azure Monitor", icon: "azure" },
          { name: "Log Analytics", icon: "azure" },
          { name: "Terraform", icon: "terraform" },
        ],
        achievements: [
          <span key="sec-1">Integrated <b>VNets/VPCs</b>, private endpoints, firewalls, <b>IAM/RBAC</b> models, encryption at rest and in transit, secrets management, and key rotation.</span>,
          <span key="sec-2">Acted as a design and review authority for data-platform-related network and security decisions, even when execution was owned by specialized infrastructure teams.</span>,
          <span key="sec-3">Ensured compliance with <b>GDPR</b>, <b>SOX</b>, <b>HIPAA</b>, and <b>GxP</b>, embedding controls directly into architecture and delivery workflows.</span>,
          <span key="sec-4">Built secure multi-region infrastructure with managed identities, reducing security vulnerabilities while maintaining operational efficiency.</span>,
          <span key="sec-5">Designed zero-trust architecture patterns for data access, leveraging <b>Azure AD</b>, <b>Key Vault</b>, and conditional access policies.</span>
        ],
      },
      {
        company: "Data Governance & Compliance Frameworks",
        role: "Product-Grade Governance & Metadata Management",
        timeframe: "2017 — Present",
        summary: (
          <>
            Implemented product-grade data governance frameworks using <b>Unity Catalog</b>, <b>Collibra Data Intelligence Cloud</b>, and <b>Informatica IDMC</b>, covering ownership, stewardship, policies, and operating workflows.
          </>
        ),
        tags: [
          { name: "Unity Catalog", icon: "database" },
          { name: "Databricks", icon: "databricks" },
          { name: "MS Fabric", icon: "cloud" },
        ],
        achievements: [
          <span key="gov-1">Led adoption of <b>Unity Catalog</b>, <b>Collibra</b>, <b>Informatica IDMC</b>, <b>Axon</b>, <b>EDC</b>, and <b>EDQ</b> for enterprise governance.</span>,
          <span key="gov-2">Embedded lineage, auditability, privacy, consent management, and data quality controls across ingestion pipelines, Lakehouse layers, analytics workloads, and CI/CD pipelines.</span>,
          <span key="gov-3">Orchestrated <b>Hive Metastore</b> → <b>Unity Catalog</b> migration with <b>ABAC</b> and <b>ACLs</b> for robust data governance.</span>,
          <span key="gov-4">Established data governance, lineage, and monitoring frameworks using <b>Unity Catalog</b>, <b>Purview</b>, and <b>Fabric Workspaces</b>, ensuring 99.9% uptime for critical operations.</span>,
          <span key="gov-5">Ensured governance capabilities scale with customer growth without slowing product delivery.</span>
        ],
      },
      {
        company: "Analytics, BI, AI/ML & GenAI Enablement",
        role: "Customer-Facing & Internal Analytics Platforms",
        timeframe: "2012 — Present",
        summary: (
          <>
            Enabled customer-facing and internal analytics using <b>Power BI</b> (semantic models, DAX, RLS, Direct Lake) and <b>Tableau</b>, while designing data foundations for AI/ML and GenAI use cases.
          </>
        ),
        tags: [
          { name: "Power BI", icon: "googleAnalytics" },
          { name: "Tableau", icon: "tableau" },
          { name: "Superset", icon: "apacheSuperset" },
          { name: "Chart.js", icon: "chartjs" },
          { name: "Python", icon: "python" },
          { name: "Databricks", icon: "databricks" },
        ],
        achievements: [
          <span key="ai-1">Architected semantic and visualization layers with <b>Power BI</b>, <b>Fabric DirectLake</b>, and <b>Synapse SQL</b>, delivering governed dashboards and KPI reporting for leadership teams.</span>,
          <span key="ai-2">Designed data foundations for AI/ML supporting feature engineering, experimentation, training, inference, and monitoring.</span>,
          <span key="ai-3">Worked hands-on with <b>Azure OpenAI</b> and LLM-based solutions, enabling insight generation, summarization, and prompt-driven analytics.</span>,
          <span key="ai-4">Designed <b>agent-based orchestration frameworks</b> enabling coordinated AI workflows for automation discovery and enterprise optimization using <b>Databricks LLM</b>, <b>Vertex AI</b>, and <b>Azure AI Foundry</b>.</span>,
          <span key="ai-5">Built scalable <b>GenAI reference architectures</b> incorporating <b>RAG patterns</b>, agent interoperability standards, and model orchestration frameworks to support extensible AI ecosystems.</span>,
          <span key="ai-6">Applied specialized ML models including <b>Drain3</b> (log parsing), <b>SBERT</b> (semantic similarity), <b>HDBSCAN</b> (clustering), and <b>Chronos 2</b> (time-series forecasting) for building an <b>Azure Context Driven Auto-scaler</b>.</span>,
          <span key="ai-7">Established <b>GPU infrastructure strategies</b> for AI workloads including capacity planning, workload isolation, and cost-optimized resource provisioning.</span>,
          <span key="ai-8">Integrated ML workflows using <b>MLflow</b> and <b>Azure ML</b>, enabling governed and repeatable MLOps patterns.</span>
        ],
      },
      {
        company: "Platform DevOps, Reliability & FinOps",
        role: "End-to-End Ownership & Cost Optimization",
        timeframe: "2014 — Present",
        summary: (
          <>
            Embedded architectural ownership across the entire Agile delivery lifecycle, with deep expertise in <b>CI/CD</b>, <b>observability</b>, <b>incident management</b>, and <b>FinOps</b>.
          </>
        ),
        tags: [
          { name: "Azure DevOps", icon: "azureDevops" },
          { name: "Terraform", icon: "terraform" },
          { name: "Docker", icon: "docker" },
          { name: "Kubernetes", icon: "kubernetes" },
          { name: "Grafana", icon: "grafana" },
          { name: "Prometheus", icon: "prometheus" },
          { name: "Elastic Search", icon: "elasticsearch" },
          { name: "Kibana", icon: "kibana" },
          { name: "FinOps", icon: "cloud" },
        ],
        achievements: [
          <span key="devops-1">Designed and governed CI/CD pipelines using <b>Azure DevOps</b>, <b>GitHub Actions</b>, <b>Jenkins</b>, and applied Infrastructure as Code using <b>Terraform</b>, <b>Ansible</b>, <b>Helm</b>, and GitOps.</span>,
          <span key="devops-2">Designed observability and telemetry systems using <b>Azure Monitor</b>, <b>Log Analytics</b>, <b>Prometheus</b>, <b>Grafana</b>, <b>ELK</b>, <b>Splunk</b>, and <b>Datadog</b>, focusing on reliability, SLAs, data freshness, and cost signals.</span>,
          <span key="devops-3">Took end-to-end accountability for production incidents, leading RCA efforts and driving long-term platform hardening.</span>,
          <span key="devops-4">Owned infrastructure cost management and FinOps, defining capacity models, scaling strategies, right-sizing compute, storage tiering, query optimization, and cost-efficiency trade-offs.</span>,
          <span key="devops-5">Executed <b>FinOps</b> strategies (auto-scaling, caching, parallelization, telemetry) via <b>Azure Monitor</b>, reducing compute costs by 25%.</span>
        ],
      },
      {
        company: "Leadership & Stakeholder Engagement",
        role: "People Management & Technical Leadership",
        timeframe: "2014 — Present",
        summary: (
          <>
            Built, led, and mentored data engineers, analytics engineers, platform engineers, and junior architects, while operating as both people manager and technical leader.
          </>
        ),
        tags: [
          { name: "Team Leadership", icon: "users" },
          { name: "Stakeholder Management", icon: "briefcase" },
          { name: "Agile Delivery", icon: "rocket" },
          { name: "Mentoring", icon: "academicCap" },
          { name: "Architecture Reviews", icon: "presentationChart" },
          { name: "Strategic Planning", icon: "lightBulb" },
        ],
        achievements: [
          <span key="lead-1">Led teams delivering new analytics capabilities and advanced feature-engineering pipelines under aggressive timelines using <b>Agile</b> methodologies.</span>,
          <span key="lead-2">Worked closely with product managers, engineering leaders, DevOps, security teams, customers, and vendors, aligning architecture with roadmaps and release milestones.</span>,
          <span key="lead-3">Served as a trusted architectural advisor for enterprise customers, leading discovery sessions, architecture reviews, scalability discussions, and roadmap alignment.</span>,
          <span key="lead-4">Partnered with CXOs, product owners, and client stakeholders to define modernization roadmaps, cloud strategies, and reference architectures aligned with business goals.</span>,
          <span key="lead-5">Managed and mentored cross-functional teams of data engineers and DevOps specialists to modernize data ecosystems.</span>
        ],
      },
      {
        company: "Pre-Sales & Enterprise Solution Architecture",
        role: "Customer-Facing Architecture & Deal Leadership",
        timeframe: "2017 — Present",
        summary: (
          <>
            Led end-to-end pre-sales activities for enterprise clients — from <b>RFP/RFI analysis</b> and <b>solution design</b> to architecture workshops, technical proposals, and deal negotiations.
          </>
        ),
        tags: [
          { name: "Azure", icon: "azureBrand" },
          { name: "AWS", icon: "aws" },
          { name: "Databricks", icon: "databricks" },
          { name: "Terraform", icon: "terraform" },
        ],
        achievements: [
          <span key="presales-1">Acted as the lead enterprise solution architect in strategic pre-sales initiatives, translating complex business, security, and data requirements into scalable <b>Lakehouse</b> and <b>AI-ready</b> architecture frameworks.</span>,
          <span key="presales-2">Facilitated architecture workshops with enterprise security, governance, and network teams to design secure hybrid connectivity leveraging <b>Azure ExpressRoute</b>, <b>AWS Direct Connect</b>, Site-to-Site VPN, private endpoints, VNet isolation, and <b>mTLS</b>-secured communication.</span>,
          <span key="presales-3">Prepared comprehensive <b>RFP/RFQ</b> technical proposals, including architecture diagrams, <b>HA/DR</b> strategies with defined <b>RPO/RTO</b>, scalability models, and cost-to-scale projections for enterprise deployments.</span>,
          <span key="presales-4">Served as the primary SME for all customer data & analytics discussions, leading architecture, security, and scalability reviews — reducing escalations and customer issues by &gt;50%.</span>,
          <span key="presales-5">Negotiated a strategic <b>$10M GCP agreement</b> securing <b>$3.5M in credits</b> plus ~25% list-price discounts, materially improving migration economics and long-term cloud runway.</span>,
          <span key="presales-6">Directed vendor assessments, technical proof-of-concepts, and commercial negotiations for platforms including <b>MinIO</b>, <b>Dash0</b>, <b>Datadog</b>, and <b>CelerData</b>.</span>
        ],
      },
      {
        company: "Big Data Training & Industry Enablement",
        role: "Technical Trainer & Author",
        timeframe: "2014 — Present",
        summary: (
          <>
            Built a parallel career as a <b>Big Data Trainer and Author</b>, delivering corporate, retail and academic trainings across India and South-East Asia.
          </>
        ),
        tags: [
          { name: "Salesforce", icon: "salesforce" },
          { name: "Databricks", icon: "databricks" },
          { name: "Power BI", icon: "googleAnalytics" },
          { name: "MongoDB", icon: "mongodb" },
          { name: "Apache Hadoop", icon: "apacheHadoop" },
          { name: "Apache Kafka", icon: "apacheKafka" },
          { name: "Snowflake", icon: "snowflake" },
        ],
        achievements: [
          <span key="train-1">Delivered <b>200+ workshops</b> on <b>Hadoop</b>, <b>Spark</b>, <b>Kafka</b>, <b>MongoDB</b>, <b>Databricks</b>, <b>Power BI</b>, <b>Cassandra</b>, <b>Neo4j</b>, and <b>Salesforce</b> for engineers, architects, and leadership audiences.</span>,
          <span key="train-2">Designed and delivered <b>Databricks Enablement Programs</b> covering Spark optimization, Delta Lake/Medallion patterns, ingestion pipelines, ELT/ETL design, orchestration, CI/CD concepts, and production best practices including certification-oriented modules with hands-on labs.</span>,
          <span key="train-3">Delivered <b>GenAI/LLM enablement sessions</b> for data teams with practical labs on prompting patterns, <b>RAG concepts</b>, embeddings, vector search fundamentals, evaluation approaches, and building assistant-style analytics workflows on Lakehouse data.</span>,
          <span key="train-4">Conducted <b>Snowflake Analyst Training</b> covering virtual warehouses, storage/compute separation, schema design, performance basics, and consumption patterns to help teams transition from legacy DW to cloud-native workflows.</span>,
          <span key="train-5">Built deep specialization in <b>MongoDB training</b> — administration, security, performance tuning, replica sets, sharding, indexing, backup/restore, and monitoring aligned to production scenarios.</span>,
          <span key="train-6">Served as a Certified <b>Salesforce Trainer</b> (2017–2019), delivering programmes for large enterprise customers across India, Singapore, Malaysia, Vietnam, and the Philippines.</span>,
          <span key="train-7">Founded <b>Wisdom Sprouts</b> (2016–2018), partnering with engineering colleges in Pune and Maharashtra for industry-focused skill-development programmes.</span>,
          <span key="train-8">Authored best-selling <b>"MongoDB Administration"</b> course on <b>Udemy</b> (4.3+ stars, thousands of learners); contributed content to <b>HP Micro Focus</b>, <b>O'Reilly</b>, and <b>Packt</b>; featured in Higher Education Magazine for industry-academia collaboration.</span>
        ],
      },
      {
        company: "Early Career – Core Engineering Foundations",
        role: "Software Engineer & Big Data Consultant",
        timeframe: "2012 — 2014",
        summary: (
          <>
            Started career as a Software Engineer building strong foundations in <b>PostgreSQL</b> administration, <b>Python</b>-based ETL, and <b>Hadoop</b> ecosystem.
          </>
        ),
        tags: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "Python", icon: "python" },
          { name: "Apache Hadoop", icon: "apacheHadoop" },
          { name: "Spark", icon: "apacheSpark" },
          { name: "Rest API", icon: "postman" },
        ],
        achievements: [
          <span key="early-1">Administered and optimized <b>PostgreSQL</b> databases, improving performance through query tuning and indexing.</span>,
          <span key="early-2">Built Python-based ETL utilities and automation, REST API integrations, and data validation frameworks.</span>,
          <span key="early-3">Gained hands-on experience with <b>Hadoop</b> ecosystem (HDFS, Hive, HBase, YARN, MapReduce, ZooKeeper).</span>,
          <span key="early-4">Performed <b>Spark</b> performance tuning and large-scale batch processing optimization.</span>,
          <span key="early-5">This phase built the engineering depth that enabled transition into architecture, leadership, and platform ownership roles.</span>
        ],
      },
    ],
  },
};

const work = {
  path: "/work",
  label: "Work",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const projects = {
  path: "/projects",
  label: "Projects",
  title: "Projects",
  description: `Explore projects and work by ${person.name}`,
};

const demos = {
  path: "/demos",
  label: "Demos",
  title: "Live demonstrations and examples",
  description: `Interactive demos and examples by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Visual Portfolio",
  description: `A collection of visual work by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Horizontal image 1",
      orientation: "horizontal"
    },
    {
      src: "/images/gallery/vertical-1.jpg", 
      alt: "Vertical image 1",
      orientation: "vertical"
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Horizontal image 2", 
      orientation: "horizontal"
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Vertical image 2",
      orientation: "vertical"
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Horizontal image 3",
      orientation: "horizontal"
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Vertical image 3", 
      orientation: "vertical"
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "Horizontal image 4",
      orientation: "horizontal"
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Vertical image 4",
      orientation: "vertical"
    }
  ]
};

const certifications = {
  path: "/certifications",
  label: "Certifications",
  title: "Professional Certifications",
  description: `Industry-recognized certifications in data engineering and cloud technologies by ${person.name}`,
};

const showcase = {
  path: "/showcase",
  label: "Showcase",
  title: "High-Impact Engineering Projects",
  description: `Deep technical case studies with real architectures and measurable outcomes by ${person.name}`,
};

const courses = {
  path: "/courses",
  label: "Courses",
  title: "Corporate Training Courses",
  description: `Expert-led corporate training in Databricks, Power BI, and Microsoft Fabric by ${person.name}`,
};

const portfolio = {
  path: "/portfolio",
  label: "Portfolio",
  title: "Data Engineering & Analytics Portfolio",
  description: `End-to-end data engineering and analytics projects with real datasets, Databricks pipelines, and interactive dashboards by ${person.name}`,
};

export { person, social, newsletter, home, about, work, projects, demos, gallery, certifications, courses, showcase, portfolio };
