import React from "react";
import { mainTheme } from "../../App";

interface MedalProps {
  children?: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

const Medal: React.FC<MedalProps> = ({ children, title, style }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: 4,
      background: mainTheme.palette.secondary.main,
      color: mainTheme.palette.primary.main,
      marginRight: 8,
      // border: "2px solid #FFD600",
      fontSize: 22,
      fontWeight: 700,
      ...style,
    }}
    title={title}
  >
    {children}
  </span>
);

export default Medal;
