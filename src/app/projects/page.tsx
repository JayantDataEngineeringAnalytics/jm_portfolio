import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { ProjectPosts } from "@/components/blog/ProjectPosts";
import { baseURL, projects, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: projects.title,
    description: projects.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(projects.title)}`,
    path: projects.path,
  });
}

export default function Projects() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={projects.title}
        description={projects.description}
        path={projects.path}
        image={`/api/og/generate?title=${encodeURIComponent(projects.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/projects`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {projects.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <ProjectPosts columns="2" direction="column" />
      </Column>
    </Column>
  );
}
