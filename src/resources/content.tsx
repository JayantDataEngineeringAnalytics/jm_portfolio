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
  image: "/api/og/generate?title=Certified Data Engineer & Solutions Architect",
  label: "Home",
  title: "Jayant Mohite - Certified Data Engineer & Solutions Architect",
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
      I'm <b>Jayant</b>, a Certified Data Engineer And Solutions Architect. <br /> I design and build data
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
        <p>Results-driven <b>Azure Solutions Architect & Technical Manager</b> with 13+ years of experience designing and delivering enterprise-scale data platforms across <b>Azure</b>, <b>Databricks</b>, <b>Microsoft Fabric</b>, and <b>Power BI</b>.</p>
        <p>Proven expertise in building end-to-end cloud data ecosystems unifying <b>ingestion</b>, <b>processing</b>, <b>governance</b>, <b>machine learning</b>, and <b>analytics</b>.</p>
        <p>Strong background in <b>Hadoop</b>, <b>Spark</b>, <b>Kafka</b>, <b>MongoDB</b>, <b>Cassandra</b>, and <b>Neo4j</b>, evolved into modern lakehouse architectures leveraging <b>Delta Lake</b>, <b>Synapse</b>, and <b>Fabric OneLake</b>.</p>
        <p>Skilled in <b>FinOps</b>, <b>CI/CD</b>, <b>data governance</b>, and <b>real-time streaming</b>, with a track record of driving cost optimization, scalability, and actionable insights for global organizations.</p>
      </>
    ),
  },
  studies: {
    display: false,
    title: "",
    institutions: [],
  },
  technical: {
    display: true,
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
          
        ],
      },
      {
        title: "Data Visualization",
        description: "DAX, Data Modeling, Executive Dashboards, Self-Service Analytics",
        tags: [
          { name: "Power BI", icon: "googleAnalytics" },
          { name: "Superset", icon: "apacheSuperset" },
          { name: "Tableau", icon: "tableau" },
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
        ],
      },
      {
        title: "Salesforce",
        description: "Admin, Advanced Admin, Sales Cloud Consultant, Data Integration",
        tags: [
          { name: "Salesforce", icon: "salesforce" },
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
    title: "Work Experience",
    experiences: [
      {
        company: "SKAN AI LABS",
        role: "Data Platform Manager / Solutions Architect",
        timeframe: "2020 — Present",
        achievements: [
          "Partnered with CXOs, product owners, and client stakeholders to define modernization roadmaps, cloud strategies, and reference architectures aligned with business goals.",
          "Designed end-to-end architectures integrating Data Factory, Synapse, Event Hub, Kafka, Airflow, Blob Storage, ADLS, OneLake, and Delta Lake for unified batch and streaming workloads.",
          "Engineered optimized PySpark and Structured Streaming pipelines via Databricks Workflows, Auto Loader, and REST APIs, achieving a 40% increase in throughput and reduced latency.",
          "Led Delta Lake infrastructure design using Delta Engine, Z-Ordering, and Data Skipping, improving query and storage performance; orchestrated the Hive Metastore → Unity Catalog migration with ABAC and ACLs for robust data governance.",
          "Led architectural assessments for external client engagements, recommending Hadoop-to-Databricks, SQL-to-Fabric, and on-prem to cloud landing zone migration strategies.",
          "Managed and modernized MongoDB infrastructure, overseeing migration to MongoDB Atlas with Global Clusters, Multi-Region Writes, and Automated Sharding; optimized schema design and indexing for a 30% improvement in query execution times.",
          "Built secure multi-region infrastructure with VNets, private endpoints, and managed identities; executed FinOps and performance-tuning strategies (auto-scaling, caching, parallelization, telemetry) via Azure Monitor and Log Analytics, reducing compute costs by 25%.",
          "Established data governance, lineage, and monitoring frameworks using Unity Catalog, Purview, Fabric Workspaces, and Log Analytics, ensuring 99.9% uptime for critical operations.",
          "Architected semantic and visualization layers with Power BI, Fabric DirectLake, and Synapse SQL, delivering governed dashboards and KPI reporting for leadership teams.",
          "Integrated Azure Machine Learning, Snowflake, PostgreSQL, MongoDB, and Scikit-Learn for predictive analytics and cross-platform data exchange.",
          "Promoted automated CI/CD and release management practices via Azure DevOps, enabling faster, scalable, and cost-effective pipeline deployments.",
          "Led the feature engineering team using Agile methodologies, managing sprint planning, reviews, and delivery of high-impact data and analytics features aligned with business objectives."
        ],
      },
      {
        company: "PALANNTECH INDIA",
        role: "Senior Big Data Consultant",
        timeframe: "2017 — 2020",
        achievements: [
          "Managed agile data-engineering and DevOps teams delivering new analytics capabilities and advanced feature-engineering pipelines under aggressive timelines.",
          "Designed and deployed end-to-end Hadoop clusters using HDFS, YARN, Hive, Pig, Sqoop, and Spark, enabling distributed analytics on multi-terabyte workloads.",
          "Built ETL and ELT workflows with Apache Airflow, Oozie, and Kafka, orchestrating ingestion from RDBMS, APIs, and file systems at enterprise scale.",
          "Architected and administered Cassandra, MongoDB, and Neo4j environments for high-volume, schema-flexible, and relationship-intensive use cases.",
          "Achieved a 20% reduction in cloud infrastructure spend through improved resource utilization and cross-cloud cost governance (Azure + AWS).",
          "Implemented partitioning and schema-design strategies in Hive and HBase for optimized query performance and scalability.",
          "Developed Power BI, Tableau, and Superset dashboards to provide real-time insights and visual analytics to business stakeholders.",
          "Configured cluster security, capacity planning, and performance tuning, ensuring high availability and efficient workload distribution.",
          "Provided architecture consulting and migration roadmaps for transitioning on-prem Hadoop workloads to cloud-native data platforms on Azure and AWS."
        ],
      },
      {
        company: "FREELANCER",
        role: "Big Data Consultant",
        timeframe: "2014 — 2017",
        achievements: [
          "Built and deployed data platforms using Apache Hadoop (Hortonworks, Cloudera), Spark, Kafka, Cassandra, MongoDB, and Neo4j, enabling high-volume analytics and real-time processing.",
          "Designed custom ETL frameworks with Apache NiFi, Airflow, and Pig to automate ingestion, transformation, and loading workflows, improving reliability and reducing manual intervention.",
          "Implemented Kafka + Spark Streaming pipelines for financial and ecommerce clients, delivering low-latency, high-throughput event-driven analytics.",
          "Developed scalable data models and replication/sharding strategies in MongoDB, Cassandra, and Neo4j, optimizing query performance and fault tolerance.",
          "Built Hadoop data lakes supporting batch and near real-time workloads with Hive, Pig, Sqoop, and Spark, consolidating structured and semi-structured data sources.",
          "Conducted hands-on client training sessions on Big Data stacks, empowering internal teams to manage and scale their own data infrastructure.",
          "Created shell/Python-based monitoring and data-flow scripts using REST APIs for pipeline observability and operational control."
        ],
      },
      {
        company: "DB XENTO SYSTEMS",
        role: "Software Engineer",
        timeframe: "2012 — 2014",
        achievements: [
          "Administered and optimized PostgreSQL databases, improving performance through query tuning and indexing.",
          "Automated data validation and reconciliation processes using Python scripts, reducing manual QA effort and improving data reliability.",
          "Developed Power BI prototypes for internal performance monitoring, combining SQL and Python outputs into visual insights for engineering managers.",
          "Monitored and fine-tuned application and database servers for high availability, fault tolerance, and scalability.",
          "Built reusable ETL utilities in Python to extract and transform data from REST APIs, CSVs, and transactional databases.",
          "Wrote stored procedures, functions, and triggers to support business workflows and reporting use cases."
        ],
      },
      {
        company: "TRAINING & PUBLICATIONS",
        role: "Technical Trainer & Author",
        timeframe: "2014 — Present",
        achievements: [
          "Best-Seller Author - MongoDB Administration course on Udemy (4.3+ stars, thousands of learners).",
          "Published Author - Technical content for HP Micro Focus Big Data, O'Reilly, Packt Publications.",
          "Featured in Higher Education Magazine for contributions to skill-based technical education.",
          "Conducted 300+ corporate, academic and retail trainings on Databricks, Big Data, Spark, Power BI, NoSQL Databases and Salesforce.",
          "Certified Salesforce Trainer for 12+ courses.",
          "Founded Wisdom Sprouts in 2016 - An Academic and Retail Training Platform."
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
