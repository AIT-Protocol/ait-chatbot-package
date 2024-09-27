import React from "react";
import { PropsWithChildren } from "react";
import './index.css';
interface TypoLabelProps extends PropsWithChildren {
    color?: "white" | "black" | "gray" | "black__900" | "green" | "brown" | "text_ido" | "purple" | "green__900" | "text_banner" | "blue__500" | "red" | "orange" | "dark_purple" | "green__500" | "gray__200";
    size?: 42 | 40 | 32 | 24 | 20 | 18 | 16 | 14 | 13 | 12 | 10 | 8;
    weight?: "bold" | "semi_bold" | "medium" | "normal";
    tag?: "h4" | "h5" | "h6" | "p" | "span";
    className?: string;
}
declare const TypoLabel: React.ForwardRefExoticComponent<TypoLabelProps & React.RefAttributes<HTMLHeadingElement>>;
export default TypoLabel;
