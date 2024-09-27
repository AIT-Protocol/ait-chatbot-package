import React from "react";
import cn from "classnames";
import { forwardRef, PropsWithChildren } from "react";

import './index.css';

interface TypoLabelProps extends PropsWithChildren {
  color?:
  | "white"
  | "black"
  | "gray"
  | "black__900"
  | "green"
  | "brown"
  | "text_ido"
  | "purple"
  | "green__900"
  | "text_banner"
  | "blue__500"
  | "red"
  | "orange"
  | "dark_purple"
  | "green__500"
  | "gray__200";
  size?: 42 | 40 | 32 | 24 | 20 | 18 | 16 | 14 | 13 | 12 | 10 | 8;
  weight?: "bold" | "semi_bold" | "medium" | "normal";
  tag?: "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
}

const TypoLabel = forwardRef<HTMLHeadingElement, TypoLabelProps>(
  (props: TypoLabelProps, ref) => {
    const {
      color = "white",
      size = 10,
      weight = "medium",
      tag: Tag = "span",
      className,
      children,
      ...restProps
    } = props;

    const headingClassNames = cn(
      'label',
      color && `label__${color}`,
      `label__${size}`,
      `label__${weight}`,
      className
    );
    return (
      <Tag {...restProps} ref={ref} className={headingClassNames}>
        {children}
      </Tag>
    );
  }
);

TypoLabel.displayName = "TypoLabel";

export default TypoLabel;
