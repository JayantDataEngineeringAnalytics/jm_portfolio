"use client";

import React, { useState } from "react";
import { Tag, Text, Icon } from "@once-ui-system/core";
import { IconName } from "@/resources/icons";
import styles from "./about.module.scss";

interface ExperienceTag {
  name: string;
  icon?: string;
}

interface Experience {
  company: string;
  role: string;
  summary: React.ReactNode;
  achievements: React.ReactNode[];
  tags?: ExperienceTag[];
}

export default function CollapsibleExperience({
  experiences,
}: {
  experiences: Experience[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordionList}>
      {experiences.map((exp, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={`exp-${index}`} className={styles.accordionItem}>
            <button
              type="button"
              className={styles.accordionHeader}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <div className={styles.accordionTitleGroup}>
                <Text
                  variant="heading-strong-m"
                  onBackground="neutral-strong"
                  className={styles.accordionTitle}
                >
                  {exp.company}
                </Text>
                {exp.tags && exp.tags.length > 0 && (
                  <div className={styles.tagList}>
                    {exp.tags.map((tag, i) => (
                      <Tag key={i} size="s" prefixIcon={tag.icon as IconName}>
                        {tag.name}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
              <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>
                <Icon name="arrowRight" size="s" onBackground="neutral-weak" />
              </span>
            </button>
            {isOpen && (
              <div className={styles.accordionContent}>
                <Text variant="body-default-s" onBackground="neutral-weak" marginBottom="12">
                  {exp.summary}
                </Text>
                <ul className={styles.achievementList}>
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className={styles.achievementItem}>
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
