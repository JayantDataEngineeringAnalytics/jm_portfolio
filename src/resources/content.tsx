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
    title: "Work Experience",
    experiences: [
      {
        company: "SKAN AI LABS",
        role: "Data Platform Manager / Solutions Architect",
        timeframe: "2020 — Present",
        summary: (
          <>
            Transformed traditional data ecosystem into a modern, cloud-native analytics platform built on <b>Azure</b>, <b>Databricks</b>, <b>Microsoft Fabric</b>, and <b>Power BI</b>, unifying data, AI, and governance to deliver real-time business intelligence and measurable cost efficiency.
          </>
        ),
        achievements: [
          <>Partnered with <b>CXOs</b>, product owners, and client stakeholders to define modernization roadmaps, cloud strategies, and reference architectures aligned with business goals.</>,
          <>Designed end-to-end architectures integrating <b>Data Factory</b>, <b>Synapse</b>, <b>Event Hub</b>, <b>Kafka</b>, <b>Airflow</b>, <b>Blob Storage</b>, <b>ADLS</b>, <b>OneLake</b>, and <b>Delta Lake</b> for unified batch and streaming workloads.</>,
          <>Engineered optimized <b>PySpark</b> and <b>Structured Streaming</b> pipelines via <b>Databricks Workflows</b>, <b>Auto Loader</b>, and <b>REST APIs</b>, achieving a 40% increase in throughput and reduced latency.</>,
          <>Led <b>Delta Lake</b> infrastructure design using <b>Delta Engine</b>, <b>Z-Ordering</b>, and <b>Data Skipping</b>, improving query and storage performance; orchestrated the <b>Hive Metastore</b> → <b>Unity Catalog</b> migration with <b>ABAC</b> and <b>ACLs</b> for robust data governance.</>,
          <>Led architectural assessments for external client engagements, recommending <b>Hadoop</b>-to-<b>Databricks</b>, <b>SQL</b>-to-<b>Fabric</b>, and on-prem to cloud landing zone migration strategies.</>,
          <>Managed and modernized <b>MongoDB</b> infrastructure, overseeing migration to <b>MongoDB Atlas</b> with <b>Global Clusters</b>, <b>Multi-Region Writes</b>, and <b>Automated Sharding</b>; optimized schema design and indexing for a 30% improvement in query execution times.</>,
          <>Built secure multi-region infrastructure with <b>VNets</b>, private endpoints, and managed identities; executed <b>FinOps</b> and performance-tuning strategies (auto-scaling, caching, parallelization, telemetry) via <b>Azure Monitor</b> and <b>Log Analytics</b>, reducing compute costs by 25%.</>,
          <>Established data governance, lineage, and monitoring frameworks using <b>Unity Catalog</b>, <b>Purview</b>, <b>Fabric Workspaces</b>, and <b>Log Analytics</b>, ensuring 99.9% uptime for critical operations.</>,
          <>Architected semantic and visualization layers with <b>Power BI</b>, <b>Fabric DirectLake</b>, and <b>Synapse SQL</b>, delivering governed dashboards and <b>KPI</b> reporting for leadership teams.</>,
          <>Integrated <b>Azure Machine Learning</b>, <b>Snowflake</b>, <b>PostgreSQL</b>, <b>MongoDB</b>, and <b>Scikit-Learn</b> for predictive analytics and cross-platform data exchange.</>,
          <>Promoted automated <b>CI/CD</b> and release management practices via <b>Azure DevOps</b>, enabling faster, scalable, and cost-effective pipeline deployments.</>,
          <>Led the feature engineering team using <b>Agile</b> methodologies, managing sprint planning, reviews, and delivery of high-impact data and analytics features aligned with business objectives.</>
        ],
      },
      {
        company: "PALANNTECH INDIA",
        role: "Senior Big Data Consultant",
        timeframe: "2017 — 2020",
        summary: (
          <>
            Directed large-scale <b>Big Data</b> platform design and delivery initiatives for enterprise clients, leading cross-functional teams of data engineers and DevOps specialists to modernize data ecosystems across <b>Hadoop</b>, <b>NoSQL</b>, and cloud environments (<b>Azure</b>, <b>AWS</b>).
          </>
        ),
        achievements: [
          <>Managed <b>agile</b> data-engineering and <b>DevOps</b> teams delivering new analytics capabilities and advanced feature-engineering pipelines under aggressive timelines.</>,
          <>Designed and deployed end-to-end <b>Hadoop</b> clusters using <b>HDFS</b>, <b>YARN</b>, <b>Hive</b>, <b>Pig</b>, <b>Sqoop</b>, and <b>Spark</b>, enabling distributed analytics on multi-terabyte workloads.</>,
          <>Built <b>ETL</b> and <b>ELT</b> workflows with <b>Apache Airflow</b>, <b>Oozie</b>, and <b>Kafka</b>, orchestrating ingestion from <b>RDBMS</b>, <b>APIs</b>, and file systems at enterprise scale.</>,
          <>Architected and administered <b>Cassandra</b>, <b>MongoDB</b>, and <b>Neo4j</b> environments for high-volume, schema-flexible, and relationship-intensive use cases.</>,
          <>Achieved a 20% reduction in cloud infrastructure spend through improved resource utilization and cross-cloud cost governance (<b>Azure</b> + <b>AWS</b>).</>,
          <>Implemented partitioning and schema-design strategies in <b>Hive</b> and <b>HBase</b> for optimized query performance and scalability.</>,
          <>Developed <b>Power BI</b>, <b>Tableau</b>, and <b>Superset</b> dashboards to provide real-time insights and visual analytics to business stakeholders.</>,
          <>Configured cluster security, capacity planning, and performance tuning, ensuring high availability and efficient workload distribution.</>,
          <>Provided architecture consulting and migration roadmaps for transitioning on-prem <b>Hadoop</b> workloads to cloud-native data platforms on <b>Azure</b> and <b>AWS</b>.</>
        ],
      },
      {
        company: "FREELANCER",
        role: "Big Data Consultant",
        timeframe: "2014 — 2017",
        summary: (
          <>
            Delivered end-to-end <b>Big Data</b> and <b>NoSQL</b> solutions for clients across <b>finance</b>, <b>e-commerce</b>, and <b>analytics</b> domains, leveraging the <b>Apache Hadoop</b> ecosystem and modern distributed data technologies.
          </>
        ),
        achievements: [
          <>Built and deployed data platforms using <b>Apache Hadoop</b> (<b>Hortonworks</b>, <b>Cloudera</b>), <b>Spark</b>, <b>Kafka</b>, <b>Cassandra</b>, <b>MongoDB</b>, and <b>Neo4j</b>, enabling high-volume analytics and real-time processing.</>,
          <>Designed custom <b>ETL</b> frameworks with <b>Apache NiFi</b>, <b>Airflow</b>, and <b>Pig</b> to automate ingestion, transformation, and loading workflows, improving reliability and reducing manual intervention.</>,
          <>Implemented <b>Kafka</b> + <b>Spark Streaming</b> pipelines for financial and ecommerce clients, delivering low-latency, high-throughput event-driven analytics.</>,
          <>Developed scalable data models and replication/sharding strategies in <b>MongoDB</b>, <b>Cassandra</b>, and <b>Neo4j</b>, optimizing query performance and fault tolerance.</>,
          <>Built <b>Hadoop</b> data lakes supporting batch and near real-time workloads with <b>Hive</b>, <b>Pig</b>, <b>Sqoop</b>, and <b>Spark</b>, consolidating structured and semi-structured data sources.</>,
          <>Conducted hands-on client training sessions on <b>Big Data</b> stacks, empowering internal teams to manage and scale their own data infrastructure.</>,
          <>Created shell/<b>Python</b>-based monitoring and data-flow scripts using <b>REST APIs</b> for pipeline observability and operational control.</>
        ],
      },
      {
        company: "DB XENTO SYSTEMS",
        role: "Software Engineer",
        timeframe: "2012 — 2014",
        summary: (
          <>
            Focused on database administration, performance optimization, and data processing automation for enterprise applications.
          </>
        ),
        achievements: [
          <>Administered and optimized <b>PostgreSQL</b> databases, improving performance through query tuning and indexing.</>,
          <>Automated data validation and reconciliation processes using <b>Python</b> scripts, reducing manual <b>QA</b> effort and improving data reliability.</>,
          <>Developed <b>Power BI</b> prototypes for internal performance monitoring, combining <b>SQL</b> and <b>Python</b> outputs into visual insights for engineering managers.</>,
          <>Monitored and fine-tuned application and database servers for high availability, fault tolerance, and scalability.</>,
          <>Built reusable <b>ETL</b> utilities in <b>Python</b> to extract and transform data from <b>REST APIs</b>, <b>CSVs</b>, and transactional databases.</>,
          <>Wrote stored procedures, functions, and triggers to support business workflows and reporting use cases.</>
        ],
      },
      {
        company: "TRAINING & PUBLICATIONS",
        role: "Technical Trainer & Author",
        timeframe: "2014 — Present",
        summary: (
          <>
            Alongside my consulting work, I ran a parallel practice as a technical trainer and author, delivering corporate, retail and academic trainings across India and South-East Asia.
          </>
        ),
        achievements: [
          <>Delivered 200+ corporate, academic and retail workshops (online and classroom) on <b>Apache Hadoop</b> & its ecosystem, <b>MongoDB</b>, <b>Databricks</b>, <b>Power BI</b> and <b>Salesforce</b> for engineers, architects and leadership audiences.</>,
          <>Acted as a Certified <b>Salesforce</b> Trainer (2017–2019), delivering programmes for large enterprise customers across India, Singapore, Malaysia, Vietnam and the Philippines.</>,
          <>Founded <b>Wisdom Sprouts</b> (2016–2018) as a dedicated training company, signing MoUs with multiple engineering colleges in Pune and across Maharashtra and running industry-focused skill-development programmes.</>,
          <>Conducted trainings for major IT giants in India like <b>Accenture</b>, <b>Infosys</b>, <b>Persistent</b>, <b>TCS</b> and <b>IBM</b>, designing end-to-end curriculum, hands-on labs and case studies tailored to each organisation's tech stack and maturity.</>,
          <>Authored the best-selling "<b>MongoDB Administration</b>" course on <b>Udemy</b> (4.3+ stars, thousands of learners), focused on practical administration, performance and operations.</>,
          <>Published author for <b>HP Micro Focus Big Data</b>, <b>O'Reilly</b> and <b>Packt</b>, contributing technical content on <b>Big Data</b>, <b>NoSQL</b> and analytics.</>,
          <>Featured in Higher Education Magazine for contributions to skill-based technical education and industry–academia collaboration.</>
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
