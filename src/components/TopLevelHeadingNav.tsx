"use client";

import React, { useState, useEffect } from 'react';
import { Row, Column, Flex, SmartLink, Text, useHeadingLinks } from '@once-ui-system/core';

interface TopLevelHeadingNavProps {
  fitHeight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TopLevelHeadingNav = React.forwardRef<HTMLDivElement, TopLevelHeadingNavProps>(
  ({ className, style, fitHeight, ...rest }, ref) => {
    const [activeHeadingId, setActiveHeadingId] = useState<string>('');
    const allHeadings = useHeadingLinks();
    
    // Filter to only H2 headings
    const headings = allHeadings.filter(heading => heading.level === 2);
    
    // Set up intersection observer for active highlighting
    useEffect(() => {
      if (headings.length === 0) return;
      
      // Set initial active heading
      setActiveHeadingId(headings[0]?.id || '');
      
      const headingElements = headings
        .map(heading => document.getElementById(heading.id))
        .filter(Boolean) as HTMLElement[];
      
      if (headingElements.length === 0) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter(entry => entry.isIntersecting);
          
          if (visibleEntries.length > 0) {
            // Get the topmost visible heading
            const sortedEntries = visibleEntries.sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );
            const topEntry = sortedEntries[0];
            setActiveHeadingId(topEntry.target.id);
          }
        },
        {
          rootMargin: '-20% 0px -35% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1]
        }
      );
      
      headingElements.forEach(element => observer.observe(element));
      
      return () => {
        headingElements.forEach(element => observer.unobserve(element));
      };
    }, [headings]);
    
    if (headings.length === 0) {
      return null;
    }
    
    return (
      <Row
        ref={ref}
        className={className}
        style={style}
        paddingLeft="8"
        gap="12"
        {...rest}
      >
        <Row
          width="2"
          background="neutral-alpha-medium"
          radius="full"
          overflow="hidden"
          position="relative"
        >
          <Row
            height="32"
            paddingY="4"
            fillWidth
            position="absolute"
            style={{
              top: `calc(${headings.findIndex(h => h.id === activeHeadingId)} * var(--static-space-32))`,
              transition: 'top 0.3s ease',
            }}
          >
            <Row fillWidth solid="brand-strong" radius="full" />
          </Row>
        </Row>
        <Column fillWidth>
          {headings.map((heading) => {
            const isActive = heading.id === activeHeadingId;
            return (
              <Flex
                key={heading.id}
                fillWidth
                height="32"
                paddingX="4"
                vertical="center"
              >
                <SmartLink
                  fillWidth
                  href={`#${heading.id}`}
                  onClick={() => setActiveHeadingId(heading.id)}
                  style={{ textDecoration: 'none' }}
                >
                  <Text
                    variant="label-default-s"
                    style={{
                      color: isActive
                        ? 'var(--neutral-on-background-strong)'
                        : 'var(--neutral-on-background-weak)',
                      fontWeight: isActive ? 500 : 400,
                      transition: 'color 0.2s ease',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {heading.text}
                  </Text>
                </SmartLink>
              </Flex>
            );
          })}
        </Column>
      </Row>
    );
  }
);

TopLevelHeadingNav.displayName = 'TopLevelHeadingNav';
