"use client";

import { useState, useMemo } from "react";
import { Grid, Row, Column, Tag, Text, Button } from "@once-ui-system/core";
import Post from "./Post";

interface Project {
  metadata: {
    title: string;
    index?: number;
    summary: string;
    image?: string;
    tag?: string;
    skills?: { name: string; icon: string }[];
  };
  slug: string;
  content: string;
}

interface FilterableProjectsListProps {
  projects: Project[];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
}

export function FilterableProjectsList({
  projects,
  columns = "2",
  thumbnail = false,
  direction = "column",
}: FilterableProjectsListProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Sort projects by index
  const sortedProjects = useMemo(() => {
    return projects.sort((a, b) => {
      const indexA = a.metadata.index ?? 999;
      const indexB = b.metadata.index ?? 999;
      return indexA - indexB;
    });
  }, [projects]);

  // Extract all unique skills from all projects
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    sortedProjects.forEach((project) => {
      if (project.metadata.skills) {
        project.metadata.skills.forEach((skill) => {
          skillsSet.add(skill.name);
        });
      }
    });
    return Array.from(skillsSet).sort();
  }, [sortedProjects]);

  // Filter projects based on selected skills
  const filteredProjects = useMemo(() => {
    if (selectedSkills.length === 0) {
      return sortedProjects;
    }

    return sortedProjects.filter((project) => {
      if (!project.metadata.skills) return false;
      
      return selectedSkills.every((selectedSkill) =>
        project.metadata.skills!.some((skill) => 
          skill.name === selectedSkill
        )
      );
    });
  }, [sortedProjects, selectedSkills]);

  // Toggle skill selection
  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((skill) => skill !== skillName)
        : [...prev, skillName]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSkills([]);
  };

  // Get skills to display (show first 12 by default, or all if showAllSkills is true)
  const displayedSkills = showAllSkills ? allSkills : allSkills.slice(0, 12);

  return (
    <Column fillWidth gap="24">
      {/* Skills Filter Section */}
      <Column fillWidth gap="16">
        <Row vertical="center" gap="16" wrap>
          <Text variant="heading-strong-m">Filter by Skills</Text>
          {selectedSkills.length > 0 && (
            <Button
              size="s"
              variant="tertiary"
              label="Clear all"
              onClick={clearFilters}
            />
          )}
        </Row>
        
        <Row gap="8" wrap>
          {displayedSkills.map((skillName) => {
            // Find the skill object to get the icon
            const skillWithIcon = sortedProjects
              .flatMap((project) => project.metadata.skills || [])
              .find((skill) => skill.name === skillName);

            const isSelected = selectedSkills.includes(skillName);
            
            return (
              <Button
                key={skillName}
                size="s"
                variant={isSelected ? "primary" : "secondary"}
                prefixIcon={skillWithIcon?.icon}
                label={skillName}
                onClick={() => toggleSkill(skillName)}
              />
            );
          })}
        </Row>

        {allSkills.length > 12 && (
          <Button
            size="s"
            variant="tertiary"
            label={showAllSkills ? "Show less" : `Show all ${allSkills.length} skills`}
            onClick={() => setShowAllSkills(!showAllSkills)}
          />
        )}
      </Column>

      {/* Results Summary */}
      <Row vertical="center" gap="16">
        <Text variant="body-default-m" onBackground="neutral-medium">
          {selectedSkills.length === 0 
            ? `Showing all ${filteredProjects.length} projects`
            : `Showing ${filteredProjects.length} projects with ${selectedSkills.join(", ")}`
          }
        </Text>
      </Row>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth gap="16">
          {filteredProjects.map((project) => (
            <Post key={project.slug} post={project} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      ) : (
        <Column fillWidth vertical="center" paddingY="40" gap="16">
          <Text variant="heading-strong-l" onBackground="neutral-medium">
            No projects found
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            Try adjusting your skill filters to see more projects.
          </Text>
          <Button
            size="m"
            variant="secondary"
            label="Clear filters"
            onClick={clearFilters}
          />
        </Column>
      )}
    </Column>
  );
}
