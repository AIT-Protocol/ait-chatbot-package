import React from "react";
import cn from "classnames";
import { forwardRef, PropsWithChildren } from "react";

import './index.css';

interface TypographyProps extends PropsWithChildren {
  color?: "white" | "black" | "gray" | "black__900" | 'green__500' | 'green__900' | 'red' | "blue" | "gray__400";
  size?: 48 | 32 | 28 | 24 | 20 | 16 | 14 | 12 | 10;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  weight?: "bold" | "semi_bold" | "medium" | "normal";
  className?: string;
  uppercase?: boolean
}

const TypoHeading = forwardRef<HTMLHeadingElement, TypographyProps>(
  (props: TypographyProps, ref) => {
    const {
      color = "white",
      size = 10,
      tag: Tag = "h6",
      weight = "bold",
      uppercase = false,
      className,
      children,
      ...restProps
    } = props;
    const headingClassNames = cn(
      'heading',
      color && `heading__${color}`,
      `heading__${size}`,
      `heading__${weight}`,
      uppercase && 'heading__uppercase',
      className
    );
    return (
      <Tag {...restProps} ref={ref} className={headingClassNames}>
        {children}
      </Tag>
    );
  }
);

TypoHeading.displayName = "TypoHeading";

export default TypoHeading;
