import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import DemoPost from "./DemoPost";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export function DemoPosts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  let allDemos = getPosts(["src", "app", "demos", "demo-posts"]);

  // Exclude by slug (exact match)
  if (exclude.length) {
    allDemos = allDemos.filter((post) => !exclude.includes(post.slug));
  }

  const sortedDemos = allDemos.sort((a, b) => {
    const indexA = a.metadata.index ?? 999;
    const indexB = b.metadata.index ?? 999;
    return indexA - indexB;
  });

  const displayedDemos = range
    ? sortedDemos.slice(range[0] - 1, range.length === 2 ? range[1] : sortedDemos.length)
    : sortedDemos;

  return (
    <>
      {displayedDemos.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedDemos.map((post) => (
            <DemoPost key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
