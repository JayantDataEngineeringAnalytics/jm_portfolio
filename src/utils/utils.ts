import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  index?: number;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  skills?: { name: string; icon: string }[];
  powerbi_embed?: string;
};

import { notFound } from "next/navigation";

// Central mapping from skill names to icon names - matches the About page system
function mapSkillsToIcons(skills: string[]): { name: string; icon: string }[] {
  const skillIconMap: Record<string, string> = {
    // Data Engineering
    "Apache Kafka": "apacheKafka",
    "Kafka": "apacheKafka",
    "RabbitMQ": "rabbitmq",
    "Rest API": "postman",
    "REST APIs": "postman",
    "Databricks": "databricks",
    "Apache Hadoop": "apacheHadoop",
    "Azure Synapse": "azureDevops",
    "Azure Synapse Analytics": "azure",
    "Azure Data Factory": "azure",
    "Snowflake": "snowflake",
    "Hive": "apacheHive",
    "Apache Hive": "apacheHive",
    "Spark": "apacheSpark",
    "Apache Spark": "apacheSpark",
    "PySpark": "apacheSpark",
    "Python": "python",
    "Airflow": "apacheAirflow",
    "Apache Airflow": "apacheAirflow",
    
    // Power BI & Analytics
    "Power BI": "googleAnalytics",
    "Superset": "apacheSuperset",
    "Apache Superset": "apacheSuperset",
    "Tableau": "tableau",
    
    // Databases
    "PostgreSQL": "postgresql",
    "MySQL": "mysql",
    "MongoDB": "mongodb",
    "Cassandra": "apacheCassandra",
    "Apache Cassandra": "apacheCassandra",
    "Neo4j": "neo4j",
    
    // Cloud Platforms
    "Azure": "azure",
    "AWS": "aws",
    "Salesforce": "salesforce",
    
    // Azure Services
    "Azure Functions": "azure",
    "Azure Event Hubs": "azure",
    "Event Hubs": "azure",
    "Azure ML": "azure",
    "Azure Advisor": "azure",
    "Azure DevOps": "azureDevops",
    
    // Specialized Technologies
    "Unity Catalog": "databricks",
    "Delta Lake": "databricks",
    "Auto Loader": "databricks",
    "MLflow": "book",
    "Docker": "book",
    "Kubernetes": "book",
    "JavaScript": "javascript",
    "Next.js": "nextjs",
    "Supabase": "supabase",
    "Figma": "figma",
    
    // Generic categories - using appropriate fallback icons
    "Data Governance": "book",
    "Data Architecture": "grid",
    "Data Warehousing": "book",
    "ETL/ELT": "book",
    "CDC": "book",
    "Streaming": "book",
    "Structured Streaming": "apacheSpark",
    "Real-time Processing": "book",
    "Event-driven Architecture": "book",
    "MLOps": "book",
    "Machine Learning": "book",
    "Real-time Analytics": "book",
    "Financial Analytics": "book",
    "High Availability": "book",
    "Sharding": "mongodb",
    "Replica Sets": "mongodb",
    "Database Architecture": "book",
    "Database Administration": "mongodb",
    "Performance Optimization": "book",
    "DevOps": "book",
    "Monitoring": "book",
    "Cost Management": "book",
    "Debezium": "book",
    "Kafka Connect": "apacheKafka",
    "SQL Warehouse": "book",
    "IoT": "book",
    "SQL": "postgresql",
  };

  return skills.map(skill => ({
    name: skill,
    icon: skillIconMap[skill] || "book" // Default to arrow icon if not found
  }));
}



function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    index: data.index,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    skills: mapSkillsToIcons(data.skills || []),
    powerbi_embed: data.powerbi_embed || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
