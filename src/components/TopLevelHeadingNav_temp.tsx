"use client";

import React from 'react';
import { HeadingNav } from '@once-ui-system/core';

interface TopLevelHeadingNavProps {
  fitHeight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TopLevelHeadingNav = React.forwardRef<HTMLDivElement, TopLevelHeadingNavProps>(
  ({ className, style, fitHeight, ...rest }, ref) => {
    return (
      <div 
        ref={ref} 
        className={className} 
        style={style} 
        {...rest}
      >
        <HeadingNav fitHeight={fitHeight} />
      </div>
    );
  }
);

TopLevelHeadingNav.displayName = 'TopLevelHeadingNav';
