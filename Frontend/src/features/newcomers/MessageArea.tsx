import { Box, Typography } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const responses = [
  { text: "I'm the first response", fromGuest: true },
  { text: "I'm the second response", fromGuest: false },
  { text: "I'm the third response", fromGuest: true },
  {
    text: "I'm the fourth response I'm the fourth response I'm the fourth response I'm the fourth response  I'm the fourth response I'm the fourth response I'm the fourth response   I'm the fourth response I'm the fourth response I'm the fourth response I'm the fourth response",
    fromGuest: false,
  },
  { text: "I'm the fifth response", fromGuest: false },
  { text: "I'm the sixth response", fromGuest: false },
  {
    text: "I'm the seventh response I'm the seventh response I'm the seventh response I'm the seventh response  I'm the seventh response I'm the seventh response I'm the seventh response   I'm the seventh response I'm the seventh response I'm the seventh response I'm the seventh response",
    fromGuest: true,
  },
  { text: "I'm the eighth response", fromGuest: false },
  { text: "I'm the ninth response", fromGuest: true },
  { text: "I'm the tenth response", fromGuest: false },
];

const MessageArea: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100% - 80px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ minHeight: 16 }}></Box>
        {responses.map((response, index) => (
          <Box
            key={index}
          >
            <Box
              sx={{
                maxWidth: "75%",
                float: response.fromGuest ? "right" : "left",
                marginY: 0.25,
                width: "fit-content",
                boxSizing: "border-box",
                border: "2px solid #FFA500",
                backgroundColor: response.fromGuest ? "#fff" : "#FFA500",
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8,
                borderTopRightRadius: response.fromGuest ? 0 : 8,
                borderTopLeftRadius: response.fromGuest ? 8 : 0,
              }}
            >
              <Typography
                marginLeft={2}
                marginRight={2}
                marginTop={1}
                marginBottom={1}
              >
                {response.text}
              </Typography>
            </Box>
          </Box>
        ))}
        <Box sx={{ minHeight: 16 }}></Box>
      </Box>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          border: "2px solid #FFA500",
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4,
          marginBottom: 1,
          paddingTop: 1,
          paddingBottom: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography marginLeft={2}>
          I'm in the box I'm in t I'm in the box I'm in tI'm in the box I'm in t
        </Typography>
        <SendIcon
          fontSize="large"
          sx={{ marginRight: 2, marginLeft: 2, color: "#FFA500" }}
        />
      </Box>
    </Box>
  );
};

export default MessageArea;
