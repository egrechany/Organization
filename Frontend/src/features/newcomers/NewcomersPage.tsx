import React from "react";
import { Avatar, Box, Link, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import MessageArea from "./MessageArea";

const NewcomersPage: React.FC = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        id="newcomers-box"
        sx={{
          backgroundImage:
            "url(/src/features/newcomers/Telegram_BackGround_Phone_Wallpaper.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "Space-between",
            height: 80,
            borderBottom: "2px solid #000",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="Євген Смірнов"
              src="/photo_1649038846780876724_c.jpg"
            />
            <Typography variant="h5" ml={2}>
              Євген Смірнов
            </Typography>
          </Box>
          <Link
            href="https://t.me/livotron"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon fontSize="large" />
          </Link>
        </Box>
      </Box>
      <MessageArea />
    </Box>
  );
};

export default NewcomersPage;
