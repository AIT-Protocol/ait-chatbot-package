import React from "react";
import { PropsWithChildren } from "react";
import './index.css';
interface TypographyProps extends PropsWithChildren {
    color?: "white" | "black" | "gray" | "black__900" | "green__900" | "green__500" | "text_ido";
    size?: 20 | 16 | 15 | 14 | 13 | 12 | 10 | 8;
    weight?: "bold" | "semi_bold" | "medium" | "normal";
    className?: string;
}
declare const TypoParagraph: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLParagraphElement>>;
export default TypoParagraph;
