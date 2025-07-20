import React from "react";
import { darkenColor, lightenColorLinear } from "../../utils/colors";
import { mainTheme } from "../../App";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

const getInitials = function (string: string) {
  const names = string.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

interface LetterBubbleProps {
  associateName: string;
  score: number;
  isCentral?: boolean;
  onClick?: () => void;
}
const LetterBubble: React.FC<LetterBubbleProps> = ({
  associateName,
  score,
  isCentral,
  onClick
}) => {
  const navigate = useNavigate();

  return (
    <span
      onClick={() => {
        if(isCentral && onClick) {
          onClick()
        } else
        navigate(`/associates/${associateName.replaceAll(" ", "_")}`);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: `linear-gradient(${lightenColorLinear(
          mainTheme.palette.secondary.main,
          50
        )},${darkenColor(mainTheme.palette.secondary.main, 90)})`,
        color: "#000",
        position: "relative",
      }}
      title="Person Initial"
    >
      <Typography variant="h4">{getInitials(associateName)}</Typography>
      <span
        style={{
          position: "absolute",
          top: -8,
          left: 48,
          backgroundColor: mainTheme.palette.secondary.main,
          borderRadius: "50%",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{score}</Typography>
      </span>
    </span>
  );
};

export default LetterBubble;
