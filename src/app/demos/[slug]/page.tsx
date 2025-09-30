import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Column,
  Heading,
  Row,
  Text,
  SmartLink,
  Avatar,
} from "@once-ui-system/core";
import { baseURL, about, demos, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import React from "react";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "demos", "demo-posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "demos", "demo-posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${demos.path}/${post.slug}`,
  });
}

export default async function DemoPost({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "demos", "demo-posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${demos.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={undefined}
            dateModified={undefined}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/demos">
              <Text variant="label-strong-m">Demos</Text>
            </SmartLink>
            <Heading variant="display-strong-m">{post.metadata.title}</Heading>
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          
          {/* Power BI Embed Section - Moved to top */}
          {post.metadata.powerbi_embed && (
            <Column maxWidth="xl" horizontal="center" marginBottom="40">
              <Column horizontal="center" marginBottom="24">
                <Heading as="h2" variant="heading-strong-l">
                  Interactive Dashboard
                </Heading>
              </Column>
              <div 
                style={{ 
                  width: '100%',
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '12px',
                  border: '1px solid var(--neutral-alpha-weak)',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <iframe
                  title="retail_analytics_demo"
                  src="https://app.powerbi.com/view?r=eyJrIjoiZGUwM2I0MWYtODQyYy00YTdjLWJlMjItNDg4MzRjODBhZmY2IiwidCI6IjI1Y2NiMGU5LTg0ODEtNDYyOC04ZTA3LTA3Zjg5MWNjOTRkZiJ9&pageName=ReportSection2e5116d592f50302d0cc"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allowFullScreen={true}
                />
              </div>
            </Column>
          )}
          
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
  );
}
