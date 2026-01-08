// ...existing code...

import { About, Blog, Home, Newsletter, Person, Social } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
// ...existing code...
const person: Person = {
  firstName: "Jayant",
  lastName: "Mohite",
  name: `Jayant Mohite`,
  role: "Certified Cloud Data Platform Architect | Big Data Consultant | Technical Trainer",
  avatar: "/images/avatar.jpg",
  email: "hello@jayantmohite.com",
  location: "Asia/Kolkata", // India/Pune uses Asia/Kolkata IANA time zone
  languages: [
  "Microsoft Certified: Azure Solutions Architect Expert",
    "Databricks Certified Data Engineer Professional",
    "Microsoft Certified Power BI Data Analyst",
    "Microsoft Certified Azure Administrator",
    "Salesforce Certified Administrator",
    "Salesforce Certified Advance Administrator",
    "Salesforce Certified Sales Cloud Consultant"
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
        <p><b>Solution Architect</b> with <b>13+ years</b> of experience designing, building, and scaling <b>enterprise-grade data and analytics platforms</b> across <b>on-prem</b> and <b>cloud</b> environments. Proven expertise in <b>data platform architecture</b>, <b>distributed systems</b>, and <b>cloud-native analytics</b>, with hands-on depth spanning the <b>Apache Hadoop</b> ecosystem, <b>Spark</b>-based processing, modern <b>Lakehouse architectures</b>, and <b>cloud data warehouses</b>.</p>
        <p>Extensive experience leading end-to-end data platform initiatives on <b>Microsoft Azure</b> with strong multi-cloud exposure across <b>AWS</b> and <b>GCP</b>, delivering solutions using <b>Azure Databricks</b>, <b>Delta Lake</b>, <b>Microsoft Fabric</b>, <b>Azure Data Factory</b>, <b>Azure Synapse</b>, <b>Apache Spark</b>, <b>Kafka</b>, <b>Flink</b>, <b>Iceberg</b>, <b>MongoDB</b>, <b>PostgreSQL</b>, <b>Snowflake</b>, and <b>Amazon Redshift</b>. Deep understanding of <b>streaming</b>, <b>batch</b>, and <b>hybrid data processing</b> patterns, <b>data governance</b>, and analytics enablement using <b>Power BI</b> and enterprise BI platforms.</p>
        <p>Recognized for blending <b>solution architecture</b> thinking with <b>hands-on data engineering</b>, contributing to cloud foundation reviews, <b>network and security-aware designs</b>, <b>DevOps-enabled data platforms</b>, and <b>FinOps-driven cost optimization</b>. Experienced in product-scale ownership, customer and vendor collaboration, and leading high-performing engineering teams in <b>Agile</b> environments, while enabling <b>AI/ML</b> and <b>LLM-driven</b> use cases on modern data platforms.</p>
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
    title: "Professional Experience",
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
          <>Designed and owned enterprise-grade data platforms across on-premise and cloud environments, with deep specialization in modern <b>Lakehouse architectures</b>.</>,
          <>Defined target-state architectures, platform roadmaps, reference architectures, and non-functional requirements spanning ingestion, storage, processing, analytics, governance, and AI/ML enablement.</>,
          <>Translated complex business, analytical, and regulatory requirements into scalable, secure, and cost-efficient platform designs, balancing delivery speed with long-term maintainability.</>,
          <>Authored and maintained <b>HLDs</b>, <b>LLDs</b>, dependency diagrams, capacity models, and <b>Architecture Decision Records (ADRs)</b> that actively guided release planning and architectural governance.</>,
          <>Architected data platforms integrating <b>Apache Iceberg</b>, <b>Azure Data Factory</b>, and cloud-native storage for unified analytics and governance.</>
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
          <>Built robust ingestion frameworks integrating product telemetry, event data, ERP/CRM systems, SaaS platforms, third-party APIs, streaming sources, and CDC pipelines.</>,
          <>Deep hands-on experience in partitioning strategies, caching, workload isolation, query optimization, and horizontal scalability, supporting peak-load scenarios and low-latency analytics.</>,
          <>Partnered with engineering and QA teams to define performance benchmarks, validated through load testing and stress testing, ensuring platforms scale reliably with business growth.</>,
          <>Implemented <b>Delta Lake</b> infrastructure using <b>Delta Engine</b>, <b>Z-Ordering</b>, and <b>Data Skipping</b>, improving query and storage performance.</>,
          <>Engineered optimized <b>Structured Streaming</b> pipelines via <b>Databricks Workflows</b>, <b>Auto Loader</b>, achieving 40% increase in throughput and reduced latency.</>
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
          <><b>MongoDB</b> (on-prem & Atlas): schema design, indexing strategies, performance tuning, migrations, operational best practices, and large-scale production workloads with <b>Global Clusters</b> and <b>Multi-Region Writes</b>.</>,
          <><b>PostgreSQL</b> (standalone & distributed): analytical workloads, concurrency handling, query optimization, and Lakehouse integration.</>,
          <><b>Snowflake</b>: database and schema design, RBAC, warehouse sizing, workload isolation, auto-scaling, cost-aware tuning, and secure data sharing.</>,
          <><b>Amazon Redshift</b>: MPP architecture design, distribution styles, sort keys, WLM queues, concurrency scaling, and performance tuning.</>,
          <>Evaluated emerging storage and analytics engines including <b>StarRocks</b>, <b>CelerData</b>, and <b>MinIO</b> for next-generation platform capabilities.</>
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
          <>Implemented event-driven architectures with replayability, fault tolerance, and at-least-once / exactly-once semantics where applicable.</>,
          <>Experience with workflow orchestration and automation using <b>Apache Airflow</b>, <b>Oozie</b>, and cloud-native schedulers, defining DAGs with retries, SLAs, alerting, and failure handling.</>,
          <>Built self-healing pipelines with automated validation, anomaly detection, alerting, and recovery mechanisms to ensure data reliability.</>,
          <>Implemented <b>Kafka</b> + <b>Spark Streaming</b> pipelines for financial and ecommerce clients, delivering low-latency, high-throughput event-driven analytics.</>,
          <>Designed <b>Event Hub</b> and <b>Structured Streaming</b> architectures for unified batch and streaming workloads with predictable latency.</>
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
          <><b>Microsoft Azure</b> (primary): Databricks, Fabric, ADLS, Synapse, Data Factory, Event Hubs, Key Vault, Monitor, Log Analytics, DevOps.</>,
          <><b>AWS</b>: S3, EMR, Glue, Redshift, Lambda, Step Functions, Aurora/RDS.</>,
          <><b>GCP</b> (working knowledge & PoCs): BigQuery, Dataflow, Cloud Storage.</>,
          <>Designed multi-cloud architectures, ensuring portability, operational consistency, and secure cross-cloud integration.</>,
          <>Led architectural assessments for external client engagements, recommending <b>Hadoop-to-Databricks</b>, <b>SQL-to-Fabric</b>, and on-prem to cloud landing zone migration strategies.</>
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
          <>Integrated <b>VNets/VPCs</b>, private endpoints, firewalls, <b>IAM/RBAC</b> models, encryption at rest and in transit, secrets management, and key rotation.</>,
          <>Acted as a design and review authority for data-platform-related network and security decisions, even when execution was owned by specialized infrastructure teams.</>,
          <>Ensured compliance with <b>GDPR</b>, <b>SOX</b>, <b>HIPAA</b>, and <b>GxP</b>, embedding controls directly into architecture and delivery workflows.</>,
          <>Built secure multi-region infrastructure with managed identities, reducing security vulnerabilities while maintaining operational efficiency.</>,
          <>Designed zero-trust architecture patterns for data access, leveraging <b>Azure AD</b>, <b>Key Vault</b>, and conditional access policies.</>
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
          <>Led adoption of <b>Unity Catalog</b>, <b>Collibra</b>, <b>Informatica IDMC</b>, <b>Axon</b>, <b>EDC</b>, and <b>EDQ</b> for enterprise governance.</>,
          <>Embedded lineage, auditability, privacy, consent management, and data quality controls across ingestion pipelines, Lakehouse layers, analytics workloads, and CI/CD pipelines.</>,
          <>Orchestrated <b>Hive Metastore</b> → <b>Unity Catalog</b> migration with <b>ABAC</b> and <b>ACLs</b> for robust data governance.</>,
          <>Established data governance, lineage, and monitoring frameworks using <b>Unity Catalog</b>, <b>Purview</b>, and <b>Fabric Workspaces</b>, ensuring 99.9% uptime for critical operations.</>,
          <>Ensured governance capabilities scale with customer growth without slowing product delivery.</>
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
        ],
        achievements: [
          <>Architected semantic and visualization layers with <b>Power BI</b>, <b>Fabric DirectLake</b>, and <b>Synapse SQL</b>, delivering governed dashboards and KPI reporting for leadership teams.</>,
          <>Designed data foundations for AI/ML supporting feature engineering, experimentation, training, inference, and monitoring.</>,
          <>Worked hands-on with <b>Azure OpenAI</b> and LLM-based solutions, enabling insight generation, summarization, and prompt-driven analytics.</>,
          <>Integrated ML workflows using <b>MLflow</b> and <b>Azure ML</b>, enabling governed and repeatable MLOps patterns.</>,
          <>Integrated <b>Azure Machine Learning</b>, <b>Scikit-Learn</b>, and cross-platform data exchange for predictive analytics.</>
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
          <>Designed and governed CI/CD pipelines using <b>Azure DevOps</b>, <b>GitHub Actions</b>, <b>Jenkins</b>, and applied Infrastructure as Code using <b>Terraform</b>, <b>Ansible</b>, <b>Helm</b>, and GitOps.</>,
          <>Designed observability and telemetry systems using <b>Azure Monitor</b>, <b>Log Analytics</b>, <b>Prometheus</b>, <b>Grafana</b>, <b>ELK</b>, <b>Splunk</b>, and <b>Datadog</b>, focusing on reliability, SLAs, data freshness, and cost signals.</>,
          <>Took end-to-end accountability for production incidents, leading RCA efforts and driving long-term platform hardening.</>,
          <>Owned infrastructure cost management and FinOps, defining capacity models, scaling strategies, right-sizing compute, storage tiering, query optimization, and cost-efficiency trade-offs.</>,
          <>Executed <b>FinOps</b> strategies (auto-scaling, caching, parallelization, telemetry) via <b>Azure Monitor</b>, reducing compute costs by 25%.</>
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
        tags: [],
        achievements: [
          <>Led teams delivering new analytics capabilities and advanced feature-engineering pipelines under aggressive timelines using <b>Agile</b> methodologies.</>,
          <>Worked closely with product managers, engineering leaders, DevOps, security teams, customers, and vendors, aligning architecture with roadmaps and release milestones.</>,
          <>Served as a trusted architectural advisor for enterprise customers, leading discovery sessions, architecture reviews, scalability discussions, and roadmap alignment.</>,
          <>Partnered with CXOs, product owners, and client stakeholders to define modernization roadmaps, cloud strategies, and reference architectures aligned with business goals.</>,
          <>Managed and mentored cross-functional teams of data engineers and DevOps specialists to modernize data ecosystems.</>
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
        ],
        achievements: [
          <>Delivered 200+ workshops on <b>Hadoop</b>, <b>Spark</b>, <b>Kafka</b>, <b>MongoDB</b>, <b>Databricks</b>, <b>Power BI</b>, <b>Cassandra</b>, <b>Neo4j</b>, and <b>Salesforce</b> for engineers, architects, and leadership audiences.</>,
          <>Served as a Certified <b>Salesforce Trainer</b> (2017–2019), delivering programmes for large enterprise customers across India, Singapore, Malaysia, Vietnam, and the Philippines.</>,
          <>Founded <b>Wisdom Sprouts</b> (2016–2018), partnering with engineering colleges in Pune and Maharashtra for industry-focused skill-development programmes.</>,
          <>Authored best-selling <b>"MongoDB Administration"</b> course on <b>Udemy</b> (4.3+ stars, thousands of learners).</>,
          <>Contributed content to <b>HP Micro Focus</b>, <b>O'Reilly</b>, and <b>Packt</b>; featured in Higher Education Magazine for industry-academia collaboration.</>
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
          <>Administered and optimized <b>PostgreSQL</b> databases, improving performance through query tuning and indexing.</>,
          <>Built Python-based ETL utilities and automation, REST API integrations, and data validation frameworks.</>,
          <>Gained hands-on experience with <b>Hadoop</b> ecosystem (HDFS, Hive, HBase, YARN, MapReduce, ZooKeeper).</>,
          <>Performed <b>Spark</b> performance tuning and large-scale batch processing optimization.</>,
          <>This phase built the engineering depth that enabled transition into architecture, leadership, and platform ownership roles.</>
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

export { person, social, newsletter, home, about, work, projects, demos, gallery, certifications };
