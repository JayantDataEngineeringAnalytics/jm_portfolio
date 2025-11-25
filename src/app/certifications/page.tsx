import { 
  Column, 
  Row, 
  Card, 
  Media, 
  Text, 
  Heading, 
  SmartLink, 
  Meta, 
  Schema,
  Grid
} from "@once-ui-system/core";
import { baseURL, person, about } from "@/resources";

const certifications = [
  {
    id: "azure-solutions-architect-expert",
    title: "Microsoft Certified: Azure Solutions Architect Expert",
    image: "/images/certifications/azure-solutions-architect-expert.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/JayantMohite-7081/E090708CEEDE4E8C?sharingId=644BB608B7498BD6",
  },
  {
    id: "power-bi-data-analyst",
    title: "Microsoft Certified: Power BI Data Analyst",
    image: "/images/certifications/power-bi-data-analyst.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-gb/JayantMohite-7081/71F25526B2E042F?sharingId=644BB608B7498BD6",
  },
  {
    id: "databricks-data-engineer",
    title: "Databricks Certified Data Engineer Professional", 
    image: "/images/certifications/databricks-data-engineer-professional.png",
    link: "https://credentials.databricks.com/b6a80224-21b2-47cc-ae8e-c66c04dbed40#acc.kYHmix2v",
  },
  {
    id: "azure-administrator",
    title: "Microsoft Certified: Azure Administrator Associate",
    image: "/images/certifications/azure-administrator-associate.png", 
    link: "https://learn.microsoft.com/api/credentials/share/en-gb/JayantMohite-7081/E2E68E6D3AF420E2?sharingId=644BB608B7498BD6",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: `Certifications – ${person.name}`,
    description: "Professional certifications in data engineering and cloud technologies",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Certifications")}`,
    path: "/certifications",
  });
}

export default function CertificationsPage() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/certifications"
        title={`Certifications – ${person.name}`}
        description="Professional certifications in data engineering and cloud technologies"
        image={`/api/og/generate?title=${encodeURIComponent("Certifications")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column gap="24" horizontal="center" align="center">
        <Column maxWidth="s" horizontal="center" align="center" gap="16">
          <Heading variant="display-strong-l" align="center">
            Professional Certifications
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Industry-recognized certifications in data engineering, analytics, and cloud technologies
          </Text>
        </Column>
      </Column>

      <Grid columns="2" s={{ columns: "1" }} m={{ columns: "2" }} l={{ columns: "2" }} fillWidth gap="32" marginTop="32">
        {certifications.map((cert) => (
          <Column key={cert.id} gap="20">
            <Media
              src={cert.image}
              alt={cert.title}
              border="neutral-alpha-weak"
              radius="l"
              style={{ 
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "contain"
              }}
            />
            <SmartLink 
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Text 
                variant="heading-strong-m" 
                onBackground="brand-strong"
                style={{ 
                  cursor: "pointer",
                  transition: "color 0.2s ease"
                }}
                className="hover:opacity-80"
              >
                {cert.title}
              </Text>
            </SmartLink>
          </Column>
        ))}
      </Grid>
      
      <Column gap="16" horizontal="center" align="center" marginTop="40">
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          Click on certification titles to view credentials and verify authenticity
        </Text>
      </Column>
    </Column>
  );
}
