// Comprehensive skill to icon mapping
export const getSkillIcon = (skill: string): string | undefined => {
  const skillIconMap: Record<string, string> = {
    // Cloud Platforms
    "Azure": "azure",
    "AWS": "aws",
    "Salesforce": "salesforce",
    
    // Data Platforms & Warehouses
    "Databricks": "databricks",
    "Snowflake": "snowflake",
    "Power BI": "arrowUpRight", // No specific Power BI icon available
    
    // Databases
    "MongoDB": "mongodb",
    "PostgreSQL": "postgresql",
    "MySQL": "mysql",
    "Neo4j": "neo4j",
    "Apache Cassandra": "apacheCassandra",
    
    // Big Data & Processing
    "Apache Spark": "apacheSpark",
    "PySpark": "apacheSpark",
    "Spark": "apacheSpark",
    "Apache Kafka": "apacheKafka",
    "Kafka": "apacheKafka",
    "Apache Hadoop": "apacheHadoop",
    "Apache Hive": "apacheHive",
    "Hive": "apacheHive",
    
    // Programming Languages
    "Python": "python",
    "JavaScript": "javascript",
    "SQL": "arrowUpRight",
    
    // DevOps & Orchestration
    "Apache Airflow": "apacheAirflow",
    "Airflow": "apacheAirflow",
    "Azure DevOps": "azureDevops",
    "Docker": "arrowUpRight",
    "Kubernetes": "arrowUpRight",
    
    // Azure Services
    "Azure Functions": "azure",
    "Azure Data Factory": "azure",
    "Azure Synapse Analytics": "azure",
    "Azure Event Hubs": "azure",
    "Event Hubs": "azure",
    "Azure ML": "azure",
    "Azure Advisor": "azure",
    
    // Data Engineering Concepts
    "Unity Catalog": "databricks",
    "Delta Lake": "databricks",
    "Auto Loader": "databricks",
    "Data Governance": "arrowUpRight",
    "Data Architecture": "arrowUpRight",
    "ETL/ELT": "arrowUpRight",
    "CDC": "arrowUpRight",
    "Data Warehousing": "arrowUpRight",
    "Streaming": "arrowUpRight",
    "Structured Streaming": "apacheSpark",
    "Real-time Processing": "arrowUpRight",
    "Event-driven Architecture": "arrowUpRight",
    
    // ML & Analytics
    "MLflow": "arrowUpRight",
    "MLOps": "arrowUpRight",
    "Machine Learning": "arrowUpRight",
    "Real-time Analytics": "arrowUpRight",
    "Financial Analytics": "arrowUpRight",
    
    // Database Administration
    "High Availability": "arrowUpRight",
    "Sharding": "mongodb",
    "Replica Sets": "mongodb",
    "Database Architecture": "arrowUpRight",
    "Database Administration": "mongodb",
    "Performance Optimization": "arrowUpRight",
    
    // Development & Operations
    "DevOps": "arrowUpRight",
    "Monitoring": "arrowUpRight",
    "REST APIs": "arrowUpRight",
    "Cost Management": "arrowUpRight",
    
    // Integration & Connectivity
    "Debezium": "arrowUpRight",
    "Kafka Connect": "apacheKafka",
    
    // BI & Visualization
    "Tableau": "tableau",
    "SQL Warehouse": "arrowUpRight",
    
    // IoT & Sensors
    "IoT": "arrowUpRight",
    
    // Web Technologies
    "Next.js": "nextjs",
    "Supabase": "supabase",
    "Figma": "figma",
    
    // Additional mappings
    "dbt": "arrowUpRight",
    "RabbitMQ": "rabbitmq",
    "Postman": "postman",
    "Google Analytics": "googleAnalytics"
  };
  
  return skillIconMap[skill];
};
