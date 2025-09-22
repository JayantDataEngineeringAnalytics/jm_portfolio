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
  publishedAt: string;
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

// Mapping from skill names to icon names
function mapSkillsToIcons(skills: string[]): { name: string; icon: string }[] {
  const skillIconMap: Record<string, string> = {
    "Databricks": "databricks",
    "Unity Catalog": "databricks", // Use databricks icon for Unity Catalog
    "Delta Lake": "databricks", // Use databricks icon for Delta Lake
    "Azure": "azure",
    "Data Governance": "book", // Use book icon for Data Governance
    "PySpark": "python", // Use python icon for PySpark
    "SQL": "postgresql", // Use postgresql icon for SQL
    "Power BI": "googleAnalytics", // Use analytics icon for Power BI
    "Data Architecture": "grid", // Use grid icon for Data Architecture
    "Apache Kafka": "apacheKafka",
    "Apache Spark": "apacheSpark",
    "Apache Hadoop": "apacheHadoop",
    "Apache Hive": "apacheHive",
    "Apache Cassandra": "apacheCassandra",
    "MongoDB": "mongodb",
    "PostgreSQL": "postgresql",
    "MySQL": "mysql",
    "Neo4j": "neo4j",
    "Python": "python",
    "Snowflake": "snowflake",
    "Tableau": "tableau",
    "Salesforce": "salesforce",
    "Apache Airflow": "apacheAirflow",
    "Apache Superset": "apacheSuperset",
  };

  return skills.map(skill => ({
    name: skill,
    icon: skillIconMap[skill] || "book" // Default to book icon if not found
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
    publishedAt: data.publishedAt,
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
