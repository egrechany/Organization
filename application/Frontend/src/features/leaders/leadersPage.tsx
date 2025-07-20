import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useNavigate } from "react-router-dom";

import { mainTheme } from "../../App";
import FlagIcon from "@mui/icons-material/Flag";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import {
  fetchLeaders,
  fetchSupportersByLeader,
  Leader,
  Supporters,
} from "./leadersSlice";
import { RootState } from "../../rootReducer";

const LeadersPage = () => {
  // const [associates, setAssociates] = React.useState<User[]>(dummyAssociates);
  const [selection, setSelection] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { leaders, loading, supportersLoading, error, supportersList } =
    useSelector((state: RootState) => state.leaders);

  const handleFetchButtonClick = (name: string) => {
    dispatch(fetchSupportersByLeader(name));
  };
  const leadersTree = useMemo(() => {
    const addSupporters = (leader: Leader): Leader => {
      const supportersItem = supportersList.find(
        (item) => item.supportedLeaderName === leader.name
      );
      if (supportersItem) {
        supportersItem.supporters.forEach((supporter) => {
          addSupporters(supporter);
        });
        return {
          ...leader,
          supporters: supportersItem.supporters,
        };
      } else return leader;
    };
    const newLeaders = leaders.map((leader) => addSupporters(leader));
    return newLeaders;
  }, [leaders, supportersList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <List style={{ padding: 0 }}>
      {leadersTree.map((user, idx) => (
        <RecursiveListItem
          key={user.name + "SDFSD"}
          user={user}
          nestedLevel={0}
          selection={selection}
          index={idx}
          setSelection={setSelection}
          navigate={navigate}
          handleFetchButtonClick={handleFetchButtonClick}
          supportersList={supportersList}
          supportersLoading={supportersLoading}
        />
      ))}
    </List>
  );
};

const RecursiveListItem: React.FC<{
  user: Leader;
  nestedLevel: number;
  selection: string[];
  index: number;
  setSelection: (selection: string[]) => void;
  navigate: ReturnType<typeof useNavigate>;
  handleFetchButtonClick: (name: string) => void;
  supportersList: Supporters[];
  supportersLoading: string;
}> = ({
  user,
  nestedLevel,
  selection,
  index,
  setSelection,
  navigate,
  handleFetchButtonClick,
  supportersList,
  supportersLoading,
}) => {
  const newNestedLevel = nestedLevel + 1;
  return (
    <>
      <ListItem
        key={user.name}
        style={{
          padding: 0,
          paddingRight: 0,
          alignItems: "center",
          flexWrap: "wrap",
          borderBottomWidth: 2,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderStyle: "solid",
          borderColor: mainTheme.palette.secondary.main,
        }}
      >
        <ListItemText
          primary={
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Button
                  style={{
                    background: mainTheme.palette.secondary.main,
                    color: mainTheme.palette.primary.main,
                    marginRight: 8,
                    minWidth: 0,
                    marginLeft: 8 * nestedLevel,
                  }}
                  sx={{".MuiButton-loadingIndicator": {
                    color: mainTheme.palette.primary.main
                  }}}
                  disabled={user.score === 1}
                  loading={user.name === supportersLoading}
                  onClick={() => {
                    if (selection.some((s) => s === user.name)) {
                      setSelection(selection.filter((s) => s !== user.name));
                    } else {
                      setSelection([...selection, user.name]);
                      if (
                        !supportersList.some(
                          (s) => s.supportedLeaderName === user.name
                        )
                      ) {
                        handleFetchButtonClick(user.name);
                      }
                    }
                  }}
                >
                  {user.name === supportersLoading ? (
                    <div style={{width: 24, height: 24}}></div>
                  ) : user.score === 1 ? (
                    <CloseIcon />
                  ) : selection.some((s) => s === user.name) ? (
                    <KeyboardDoubleArrowDownIcon
                      style={{ transform: "rotate(180deg)" }}
                    />
                  ) : (
                    <KeyboardDoubleArrowDownIcon />
                  )}
                </Button>
                <Typography>{user.name}</Typography>
                {newNestedLevel === 1 && index === 0 && (
                  <FlagIcon
                    // fontSize="large"
                    style={{
                      color: mainTheme.palette.primary.main,
                      position: "relative",
                      top: -5,
                    }}
                  />
                )}
              </span>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate(`/associates/${user.name.replaceAll(" ", "_")}`);
                }}
                style={{
                  height: 36,
                  minWidth: 40,
                  padding: 0,
                }}
              >
                <Typography>{user.score}</Typography>
              </Button>
            </span>
          }
        />
      </ListItem>
      {user.supporters &&
        selection.some((s) => s === user.name) &&
        user.supporters.map((supporter, idx) => (
          <RecursiveListItem
            key={supporter.name}
            user={supporter}
            nestedLevel={newNestedLevel}
            index={idx}
            selection={selection}
            setSelection={setSelection}
            navigate={navigate}
            handleFetchButtonClick={handleFetchButtonClick}
            supportersList={supportersList}
            supportersLoading={supportersLoading}
          />
        ))}
    </>
  );
};

export default LeadersPage;
