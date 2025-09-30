import { Column, Meta, Schema } from "@once-ui-system/core";
import { FilterableProjectsList } from "@/components/blog/FilterableProjectsList";
import { baseURL, projects, person } from "@/resources";
import { getPosts } from "@/utils/utils";

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
  // Fetch projects server-side and ensure uniqueness by slug
  const allProjectsRaw = getPosts(["src", "app", "projects", "project-posts"]);
  const uniqueProjects = new Map();
  
  // Remove duplicates by keeping only the latest version of each slug
  allProjectsRaw.forEach(project => {
    uniqueProjects.set(project.slug, project);
  });
  
  const allProjects = Array.from(uniqueProjects.values());

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
      <Column fillWidth flex={1} gap="40">
        <FilterableProjectsList projects={allProjects} columns="2" direction="column" />
      </Column>
    </Column>
  );
}
