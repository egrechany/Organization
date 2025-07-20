import React from "react";

interface MutualConnectionProps {
  style?: React.CSSProperties;
}

const MutualConnection: React.FC<MutualConnectionProps> = ({ style }) => (
  <span
    style={{
      width: 16,
      height: 16,
      backgroundColor: "#000",
      display: "inline-block",
      ...style,
    }}
    title="Mutual Connection"
  />
);

export default MutualConnection;
