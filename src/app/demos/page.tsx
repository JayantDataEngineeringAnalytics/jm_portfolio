import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { DemoPosts } from "@/components/blog/DemoPosts";
import { baseURL, demos, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: demos.title,
    description: demos.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(demos.title)}`,
    path: demos.path,
  });
}

export default function Demos() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={demos.title}
        description={demos.description}
        path={demos.path}
        image={`/api/og/generate?title=${encodeURIComponent(demos.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/demos`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {demos.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <DemoPosts columns="2" thumbnail direction="column" />
      </Column>
    </Column>
  );
}