import React from "react";
import cn from "classnames";
import { forwardRef, PropsWithChildren } from "react";

import './index.css'

interface TypographyProps extends PropsWithChildren {
  color?: "white" | "black" | "gray" | "black__900" | "green__900" | "green__500" | "text_ido";
  size?: 20 | 16 | 15 | 14 | 13 | 12 | 10 | 8;
  weight?: "bold" | "semi_bold" | "medium" | "normal";
  className?: string;
}

const TypoParagraph = forwardRef<HTMLParagraphElement, TypographyProps>(
  (props: TypographyProps, ref) => {
    const {
      color = "white",
      size = 10,
      weight = "medium",
      className,
      children,
      ...restProps
    } = props;
    const paragraphClassNames = cn(
      'paragraph',
      color && `paragraph__${color}`,
      `paragraph__${size}`,
      `paragraph__${weight}`,
      className
    );
    return (
      <p {...restProps} ref={ref} className={paragraphClassNames}>
        {children}
      </p>
    );
  }
);

TypoParagraph.displayName = "TypoParagraph";

export default TypoParagraph;
