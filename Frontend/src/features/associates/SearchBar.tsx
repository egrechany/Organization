import {
  TextField,
  InputAdornment,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { searchUsersByName } from "./associatesApi";
import { useNavigate } from "react-router";
import { mainTheme } from "../../App";

interface SearchBarProps {
  associate: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  associate,
}) => {
  const [inputValue, setInputValue] = useState(associate);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleInputValueChange = (newInputValue: string) => {
    const inputValueCapitalized = newInputValue.toUpperCase();
    if (inputValueCapitalized.length === 0) setOptions([]);
    if (
      (inputValueCapitalized.trim().length === 3 && inputValue.length < 3) ||
      (inputValueCapitalized.trim().length > 3 &&
        inputValueCapitalized.substring(0, 3) !== inputValue.substring(0, 3))
    ) {
      setLoading(true);
      searchUsersByName(inputValueCapitalized.substring(0, 3)).then(
        (res): void => {
          setOptions(res);
          setLoading(false);
        }
      );
    }
    setInputValue(inputValueCapitalized);
  };

  if (!searchActive) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
        width="100%"
      >
        <Button
          onClick={() => {
            setInputValue("");
            setOptions([]);
            setSearchActive(true);
            setTimeout(() => {
              if (inputRef.current) inputRef.current.focus();
            }, 0);
          }}
          color="primary"
          style={{
            height: 40,
            minWidth: 40,
            paddingRight: 8,
            paddingLeft: 8,
            marginRight: 8,
            background: mainTheme.palette.secondary.main,
            color: mainTheme.palette.primary.main,
          }}
        >
          <SearchIcon style={{position: "absolute", right: 6}}/>
        </Button>
        <Typography variant="h6">{associate}</Typography>
      </Box>
    );
  }

  return (
    <Autocomplete
      fullWidth
      options={options}
      value={inputValue}
      style={{
        background: mainTheme.palette.secondary.main,
        color: mainTheme.palette.primary.main,

        borderRadius: 4,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        },
      }}
      onInputChange={(_, newValue) => handleInputValueChange(newValue)}
      onChange={(event: any, newValue: string | null) => {
        if (newValue) {
          setSearchActive(false);
          navigate(`/associates/${newValue.replaceAll(" ", "_")}`);
        }
      }}
      onBlur={() => {
        setSearchActive(false);
      }}
      noOptionsText={
        inputValue
          ? loading
            ? "Здійснюється пошук..."
            : inputValue.length < 3
            ? "Продовжуйте вводити..."
            : "Не знайдено співпадінь"
          : "Ведіть ім'я"
      }
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          variant="outlined"
          placeholder="Пошук"
          size="small"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment
                style={{ paddingLeft: 4, color:  mainTheme.palette.primary.main,
 }}
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = "";
                    inputRef.current.blur();
                  }
                }}
                position="start"
              >
                <SearchIcon style={{cursor: "pointer"}} />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
