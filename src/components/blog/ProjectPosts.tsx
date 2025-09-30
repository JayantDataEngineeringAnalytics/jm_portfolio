import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export function ProjectPosts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  let allProjects = getPosts(["src", "app", "projects", "project-posts"]);

  // Exclude by slug (exact match)
  if (exclude.length) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    const indexA = a.metadata.index ?? 999;
    const indexB = b.metadata.index ?? 999;
    return indexA - indexB;
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range.length === 2 ? range[1] : sortedProjects.length)
    : sortedProjects;

  return (
    <>
      {displayedProjects.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedProjects.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
