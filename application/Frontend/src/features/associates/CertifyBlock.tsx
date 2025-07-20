import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ConnectionModified } from "./associatesSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SimpleAutocomplete from "./SimpleAutocomplete";

interface CertifyBlockProps {
  title: string;
  connection: ConnectionModified | null;
  updateConnection: (newConnection: ConnectionModified | null) => void;
  defaultName?: string;
  switchActive: boolean;
  switchDisabled: boolean;
  toggleSwitch: () => void;
}

const CertifyBlock: React.FC<CertifyBlockProps> = ({
  title,
  connection,
  updateConnection,
  defaultName,
  toggleSwitch,
  switchActive,
  switchDisabled,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  // const [activated, setActivated] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("EXISTING");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleActivation = (e: boolean) => {
    if (defaultName) {
      if (!switchActive) {
        updateConnection(null);
      } else {
        updateConnection({ name: defaultName, password: "" });
      }
    } else {
      if (switchActive) {
        updateConnection(null);
      } else {
        updateConnection({ name: "", password: "" });
      }
    }
    setRadioValue("EXISTING");
    toggleSwitch();
  };

  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      <FormControlLabel
        control={
          <Switch
          color="secondary"
            checked={switchActive}
            disabled={switchDisabled}
            onChange={(e) => handleActivation(e.target.checked)}
          />
        }
        label={defaultName ? "Деактивувати" : "Активувати"}
      />
      {connection && (
        <>
          {!defaultName && (
            <FormControl>
              <RadioGroup
              color="secondary"
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={radioValue}
                onChange={(e) => setRadioValue(e.target.value)}
              >
                <FormControlLabel
                  value="EXISTING"
                  control={<Radio color="secondary"/>}
                  label="Існуючий соратник"
                />
                <FormControlLabel
                  value="NEW"
                  control={<Radio color="secondary"/>}
                  label="Новий соратник"
                />
              </RadioGroup>
            </FormControl>
          )}
          {!defaultName && radioValue === "EXISTING" ? (
            <SimpleAutocomplete
              getSearchedUser={(user) => {
                updateConnection(
                  user ? { name: user, password: connection.password } : null
                );
              }}
            />
          ) : (
            <TextField
              label="Ім'я"
              disabled={!!defaultName}
              variant="outlined"
              size="small"
              fullWidth
              value={connection.name}
              onChange={(e) =>
                updateConnection({
                  name: e.target.value,
                  password: connection.password,
                })
              }
            />
          )}
          <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              id={`password-${title}`}
              type={showPassword ? "text" : "password"}
              value={connection.password}
              size="small"
              fullWidth
              onChange={(e) =>
                updateConnection({
                  name: connection.name,
                  password: e.target.value,
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    // onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </>
      )}
    </Box>
  );
};

export default CertifyBlock;
