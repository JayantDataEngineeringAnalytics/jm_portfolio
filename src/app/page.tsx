import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Column gap="12" fillWidth>
                <Row gap="12" vertical="center" horizontal="start" wrap>
                  <Badge
                    background="brand-alpha-weak"
                    paddingX="12"
                    paddingY="4"
                    onBackground="neutral-strong"
                    textVariant="label-default-s"
                    arrow={false}
                  >
                    <Row paddingY="2">{home.featured.title}</Row>
                  </Badge>
                  <Badge
                    background="brand-alpha-weak"
                    paddingX="12"
                    paddingY="4"
                    onBackground="neutral-strong"
                    textVariant="label-default-s"
                    arrow={false}
                  >
                    <Row gap="8" vertical="center">
                      <strong>Microsoft Certified</strong>
                      <Line background="brand-alpha-strong" vert height="16" />
                      <Text onBackground="brand-medium">Azure AI Engineer Associate</Text>
                    </Row>
                  </Badge>
                </Row>
                <Row gap="12" vertical="center" horizontal="start" wrap>
                  <Badge
                    background="brand-alpha-weak"
                    paddingX="12"
                    paddingY="4"
                    onBackground="neutral-strong"
                    textVariant="label-default-s"
                    arrow={false}
                  >
                    <Row gap="8" vertical="center">
                      <strong>Microsoft Certified</strong>
                      <Line background="brand-alpha-strong" vert height="16" />
                      <Text onBackground="brand-medium">Azure Solutions Architect Expert</Text>
                    </Row>
                  </Badge>
                  <Badge
                    background="brand-alpha-weak"
                    paddingX="12"
                    paddingY="4"
                    onBackground="neutral-strong"
                    textVariant="label-default-s"
                    arrow={false}
                  >
                    <Row gap="8" vertical="center">
                      <strong>Microsoft Certified</strong>
                      <Line background="brand-alpha-strong" vert height="16" />
                      <Text onBackground="brand-medium">Azure Administrator Associate</Text>
                    </Row>
                  </Badge>
                </Row>
                <Row gap="12" vertical="center" horizontal="start" fillWidth wrap>
                  <Badge
                    background="brand-alpha-weak"
                    paddingX="12"
                    paddingY="4"
                    onBackground="neutral-strong"
                    textVariant="label-default-s"
                    arrow={false}
                  >
                    <Row gap="8" vertical="center">
                      <strong>Microsoft Certified</strong>
                      <Line background="brand-alpha-strong" vert height="16" />
                      <Text onBackground="brand-medium">Agentic AI Business Solutions Architect</Text>
                    </Row>
                  </Badge>
                  <Badge
                    background="brand-alpha-weak"
                    paddingX="12"
                    paddingY="4"
                    onBackground="neutral-strong"
                    textVariant="label-default-s"
                    arrow={false}
                  >
                    <Row gap="8" vertical="center">
                      <strong>Microsoft Certified</strong>
                      <Line background="brand-alpha-strong" vert height="16" />
                      <Text onBackground="brand-medium">Power BI Data Analyst Associate</Text>
                    </Row>
                  </Badge>
                </Row>
              </Column>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
        </Column>
      </Column>
    </Column>
  );
}
