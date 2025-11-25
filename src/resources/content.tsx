// ...existing code...

import { About, Blog, Home, Newsletter, Person, Social } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
// ...existing code...
const person: Person = {
  firstName: "Jayant",
  lastName: "Mohite",
  name: `Jayant Mohite`,
  role: "Certified Big Data Enginner, Architect and Analyst",
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
          <>I simplify complex data into insight. For 13+ years, I’ve built cloud-ready platforms 
          and analytics that scale—aligning engineering, governance, and business outcomes across finance, 
          e-commerce, healthcare, and education.</>
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
        company: "Skan.ai",
        role: "Technical Manager / Data Platform Architect",
        timeframe: "Oct 2020 — Present",
        achievements: [
          "Designed & operationalized Delta Lake with Delta Engine, Z-Ordering, Data Skipping; boosted performance & storage efficiency.",
          "Built real-time & batch ETL in Databricks (Workflows, Auto Loader, Structured Streaming) → ~40% faster processing across JSON/CSV/Parquet/API.",
          "Led Hive Metastore → Unity Catalog migration with ABAC, table ACLs, lineage; zero downtime and stronger governance.",
          "Optimized ADF & Synapse pipelines → ~25% faster execution, 99.9% uptime for critical workloads.",
          "Delivered Power BI models, DAX, and exec dashboards with drill-through KPIs; enabled self-service analytics.",
          "Directed MongoDB Atlas migration (sharding, global clusters) → ~20% storage savings, ~30% faster queries.",
          "Mentored teams on Spark performance tuning and Power BI optimization at scale."
        ],
      },
      {
        company: "Palanntech India",
        role: "Big Data Consultant/Manager",
        timeframe: "Jun 2017 — Oct 2020",
        achievements: [
          "Delivered enterprise Big Data solutions with Hadoop, Spark (PySpark), Cassandra, MongoDB, Neo4j.",
          "Implemented PySpark-based ETL frameworks for streaming & batch analytics; standardized reusable patterns.",
          "Directed Power BI/Tableau rollouts with RLS and automated refreshes for near real-time insights.",
          "Defined visualization standards and reusable Power BI templates across projects.",
          "Reduced cloud costs ~20% via right-sizing, storage tiering, and workload optimization.",
          "Led onboarding & upskilling programs for Big Data engineering teams."
        ],
      },
      {
        company: "Freelance",
        role: "Big Data Consultant",
        timeframe: "Jun 2014 — Jun 2017",
        achievements: [
          "Built custom ETL with Apache NiFi, Airflow, Pig, and PySpark; delivered streaming with Kafka + Spark Streaming for finance & e-commerce.",
          "Designed Power BI dashboards integrating Hadoop, MongoDB, SQL to enable self-service analytics.",
          "Delivered corporate trainings across India, Singapore, Malaysia, Vietnam, Philippines on Spark, Hadoop, Kafka, MongoDB, Cassandra, Power BI.",
          "Founded Wisdom Sprouts; partnered with colleges for Big Data certification programs."
        ],
      },
      {
        company: "DB Xento Systems",
        role: "Software Engineer",
        timeframe: "May 2012 — Jun 2014",
        achievements: [
          "Administered & optimized PostgreSQL (query tuning, indexing); automated data validation with Python.",
          "Built Power BI prototypes for internal performance monitoring (SQL + Python outputs).",
          "Monitored & tuned servers for high availability and scalability."
        ],
      },
      {
        company: "Freelance",
        role: "Training & Publications",
        timeframe: "May 2014 — Present",
        achievements: [
          "Best-Seller Author – MongoDB Administration course on Udemy (4.3+ stars, thousands of learners).",
          "Published Author – Technical content for HP Micro Focus Big Data, O’Reilly, Packt.",
          "Delivered 12+ Salesforce-authorized courses as a certified Sales/Service Cloud Consultant.",
          "Certified Trainer – Salesforce, MongoDB, Apache Spark, Power BI, and Data Engineering.",
          "Featured in Higher Education Magazine for contributions to skill-based technical education.",
          "Conducted 200+ corporate and academic workshops on Big Data, Spark, Power BI, and NoSQL technologies."
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
