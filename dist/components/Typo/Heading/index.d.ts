import React from "react";
import { PropsWithChildren } from "react";
import './index.css';
interface TypographyProps extends PropsWithChildren {
    color?: "white" | "black" | "gray" | "black__900" | 'green__500' | 'green__900' | 'red' | "blue" | "gray__400";
    size?: 48 | 32 | 28 | 24 | 20 | 16 | 14 | 12 | 10;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    weight?: "bold" | "semi_bold" | "medium" | "normal";
    className?: string;
    uppercase?: boolean;
}
declare const TypoHeading: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLHeadingElement>>;
export default TypoHeading;
