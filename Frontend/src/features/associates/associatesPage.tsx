import { Typography, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import LetterBubble from "./LetterBubble";
import MutualConnection from "./MutualConnection";
import CakeIcon from "@mui/icons-material/Cake";
import PanToolIcon from "@mui/icons-material/PanTool";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { mainTheme } from "../../App";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import { useAppDispatch } from "../../store";
import { fetchAssociate } from "./associatesSlice";
import Modify from "./Modify";

const AssociatesPage = () => {
  const location = useLocation();
  const [associateName, setAssociateName] = React.useState("");
  const { leaders } = useSelector((state: RootState) => state.leaders);
  const { associate, loading } = useSelector(
    (state: RootState) => state.associates
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [bubblePressCount, setBubblePressCount] = React.useState(0);
  const bubblePressTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const [modifyEnabled, setModifyEnabled] = React.useState(false);

  // Set associate according to location.pathname
  useEffect(() => {
    const match = location.pathname.match(/^\/associates\/(.+)$/);
    setModifyEnabled(false);
    if (match && match[1]) {
      const decodedURI = decodeURIComponent(match[1]);
      const newAssociateName = decodedURI.replaceAll("_", " ");
      setAssociateName(newAssociateName);
    } else if (leaders.length) {
      setAssociateName(leaders[0].name);
    }
  }, [location.pathname, leaders, dispatch, navigate]);

  useEffect(() => {
    associateName && dispatch(fetchAssociate(associateName));
  }, [dispatch, associateName, navigate]);

  const handleCentralBubbleClick = () => {
    setBubblePressCount((prev) => {
      if (prev === 4) {
        onFivePresses();
        return 0;
      } else {
        if (bubblePressTimeout.current)
          clearTimeout(bubblePressTimeout.current);
        bubblePressTimeout.current = setTimeout(
          () => setBubblePressCount(0),
          1500
        );
        return prev + 1;
      }
    });
  };

  const onFivePresses = () => {
    setModifyEnabled(true)
  };

  if (!associateName) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Typography variant="h6">ПРЕДСТАВИВСЯ:</Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <SearchBar associate={associateName} />
      </div>
      <Typography variant="h6">ДОЄДНАВСЯ:</Typography>
      <Box display="flex" alignItems="center">
        <Button
          color="primary"
          style={{
            background: mainTheme.palette.secondary.main,
            color: mainTheme.palette.primary.main,
            marginRight: 8,
            minWidth: 40,
            minHeight: 40,
          }}
        >
          <CakeIcon />
        </Button>
        <Typography variant="h6">{associate.registeredDate}</Typography>
      </Box>
      <Typography variant="h6">ПІДТРИМАВ:</Typography>
      <Box display="flex" alignItems="center">
        <Button
          color="primary"
          style={{
            background: mainTheme.palette.secondary.main,
            color: mainTheme.palette.primary.main,
            marginRight: 8,
            minWidth: 40,
            maxHeight: 40,
          }}
        >
          <span style={{ position: "relative", left: "-2px", top: "2px" }}>
            <PanToolIcon fontSize="medium" />
          </span>
        </Button>
        <Typography variant="h6">{associate.supports}</Typography>
      </Box>
      <Typography variant="h6">ЗАСВІДЧИВ:</Typography>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Button
          title="Arrow Up"
          style={{
            background: mainTheme.palette.secondary.main,
            color: mainTheme.palette.primary.main,
            marginRight: 8,
            minWidth: 40,
          }}
        >
          <KeyboardDoubleArrowUpIcon />
        </Button>
        <Typography variant="h6">{associate.connections[0]?.name}</Typography>
      </Box>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Button
          title="Arrow Right"
          style={{
            background: mainTheme.palette.secondary.main,
            color: mainTheme.palette.primary.main,
            marginRight: 8,
            minWidth: 40,
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </Button>
        <Typography variant="h6">{associate.connections[1]?.name}</Typography>
      </Box>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Button
          title="Arrow Down"
          style={{
            background: mainTheme.palette.secondary.main,
            color: mainTheme.palette.primary.main,
            marginRight: 8,
            minWidth: 40,
          }}
        >
          <KeyboardDoubleArrowDownIcon />
        </Button>
        <Typography variant="h6">{associate.connections[2]?.name}</Typography>
      </Box>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Button
          title="Arrow Left"
          style={{
            background: mainTheme.palette.secondary.main,
            color: mainTheme.palette.primary.main,
            marginRight: 8,
            minWidth: 40,
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <Typography variant="h6">{associate.connections[3]?.name}</Typography>
      </Box>

      <Box
        height={250}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {associate.connections[3] ? (
          <>
            <LetterBubble
              associateName={associate.connections[3].name}
              score={associate.connections[3].score}
            />
            <MutualConnection
              style={{ opacity: associate.connections[3].mutual ? 1 : 0 }}
            />
          </>
        ) : (
          <div style={{ width: 80, height: 80 }}></div>
        )}
        <Box display="flex" flexDirection="column" alignItems="center">
          {associate.connections[0] ? (
            <>
              <LetterBubble
                associateName={associate.connections[0].name}
                score={associate.connections[0].score}
              />
              <MutualConnection
                style={{ opacity: associate.connections[0].mutual ? 1 : 0 }}
              />
            </>
          ) : (
            <div style={{ width: 80, height: 80 }}></div>
          )}
          <LetterBubble
            associateName={associate.name}
            score={associate.score}
            isCentral
            onClick={handleCentralBubbleClick}
          />
          {associate.connections[2] ? (
            <>
              <MutualConnection
                style={{ opacity: associate.connections[2].mutual ? 1 : 0 }}
              />
              <LetterBubble
                associateName={associate.connections[2].name}
                score={associate.connections[2].score}
              />
            </>
          ) : (
            <div style={{ width: 80, height: 80 }}></div>
          )}
        </Box>
        {associate.connections[1] ? (
          <>
            <MutualConnection
              style={{ opacity: associate.connections[1].mutual ? 1 : 0 }}
            />
            <LetterBubble
              associateName={associate.connections[1].name}
              score={associate.connections[1].score}
            />
          </>
        ) : (
          <div style={{ width: 80, height: 80 }}></div>
        )}
      </Box>
        {modifyEnabled && <Modify associate={associate} setModifyEnabled={setModifyEnabled}/>}
    </>
  );
};

export default AssociatesPage;
