import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person } from "@/resources";
import InfographicAbout from "@/components/about/InfographicAbout";

const CERTIFICATIONS = [
  { name: "Microsoft Certified: Agentic AI Business Solutions Architect", url: "https://learn.microsoft.com/api/credentials/share/en-gb/JayantMohite-7081/53450CC0CC45D428?sharingId=644BB608B7498BD6" },
  { name: "Microsoft Certified: Azure AI Engineer Associate",             url: "https://learn.microsoft.com/api/credentials/share/en-gb/JayantMohite-7081/803D7B798E1AC055?sharingId=644BB608B7498BD6" },
  { name: "Microsoft Certified: Azure Solutions Architect Expert",        url: "https://learn.microsoft.com/api/credentials/share/en-us/JayantMohite-7081/E090708CEEDE4E8C?sharingId" },
  { name: "Databricks Certified Data Engineer Professional",              url: "https://credentials.databricks.com/b6a80224-21b2-47cc-ae8e-c66c04dbed40" },
  { name: "Microsoft Certified: Power BI Data Analyst Associate",        url: "https://learn.microsoft.com/api/credentials/share/en-us/JayantMohite-7081/71F25526B2E042F?sharingId" },
  { name: "Microsoft Certified: Azure Administrator Associate",          url: "https://learn.microsoft.com/api/credentials/share/en-us/JayantMohite-7081/E2E68E6D3AF420E2?sharingId" },
];

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column maxWidth="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <InfographicAbout
        name={person.name}
        role={person.role}
        avatar={person.avatar}
        experiences={about.work.experiences}
        certifications={CERTIFICATIONS}
      />
    </Column>
  );
}