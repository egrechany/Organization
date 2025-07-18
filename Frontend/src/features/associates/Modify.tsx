import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Associate, AssociateModified, ConnectionModified, modifyAssociate } from "./associatesSlice";
import CertifyBlock from "./CertifyBlock";
import SimpleAutocomplete from "./SimpleAutocomplete";
import { useAppDispatch } from "../../store";

interface ModityProps {
  associate: Associate;
  setModifyEnabled: (b: boolean) => void;
}


const Modify: React.FC<ModityProps> = ({ associate, setModifyEnabled }) => {
  const [associateModified, setAssociateModified] = useState<AssociateModified>(
    {
      name: associate.name,
      supports: associate.supports,
      modifiedIndex: -1,
      connections: [
        associate.connections[0]
          ? { name: associate.connections[0].name, password: "" }
          : null,
        associate.connections[1]
          ? { name: associate.connections[1].name, password: "" }
          : null,
        associate.connections[2]
          ? { name: associate.connections[2].name, password: "" }
          : null,
        associate.connections[3]
          ? { name: associate.connections[3].name, password: "" }
          : null,
      ],
    }
  );
  const dispatch = useAppDispatch()
  const setActiveSwitchIndex = (index: number) => {
    setAssociateModified((prev) => ({ ...prev, modifiedIndex: index }));
  };

  const updateConnectionOnIndex = (
    newConnection: ConnectionModified | null,
    index: number
  ) => {
    setAssociateModified((prev) => ({
      ...prev,
      connections: [
        index === 0 ? newConnection : associateModified.connections[0],
        index === 1 ? newConnection : associateModified.connections[1],
        index === 2 ? newConnection : associateModified.connections[2],
        index === 3 ? newConnection : associateModified.connections[3],
      ],
    }));
  };
  console.log(associateModified);
  return (
    <Box width="100%">
      <Typography variant="h6">Редагується {associate.name}</Typography>
      <Typography variant="body1" color="textSecondary">
        За один запит можна активувати/деактивувати не більше одного засвідчення
      </Typography>
      <CertifyBlock
        title="Верхнє засвідчення"
        connection={associateModified.connections[0]}
        updateConnection={(conn) => updateConnectionOnIndex(conn, 0)}
        defaultName={associate.connections[0]?.name}
        switchActive={associateModified.modifiedIndex === 0}
        switchDisabled={
          associateModified.modifiedIndex !== -1 &&
          associateModified.modifiedIndex !== 0
        }
        toggleSwitch={() =>
          setActiveSwitchIndex(associateModified.modifiedIndex === -1 ? 0 : -1)
        }
      />
      <CertifyBlock
        title="Праве засвідчення"
        connection={associateModified.connections[1]}
        updateConnection={(conn) => updateConnectionOnIndex(conn, 1)}
        defaultName={associate.connections[1]?.name}
        switchActive={associateModified.modifiedIndex === 1}
        switchDisabled={
          associateModified.modifiedIndex !== -1 &&
          associateModified.modifiedIndex !== 1
        }
        toggleSwitch={() =>
          setActiveSwitchIndex(associateModified.modifiedIndex === -1 ? 1 : -1)
        }
      />
      <CertifyBlock
        title="Нижнє засвідчення"
        connection={associateModified.connections[2]}
        updateConnection={(conn) => updateConnectionOnIndex(conn, 2)}
        defaultName={associate.connections[2]?.name}
        switchDisabled={
          associateModified.modifiedIndex !== -1 &&
          associateModified.modifiedIndex !== 2
        }
        switchActive={associateModified.modifiedIndex === 2}
        toggleSwitch={() =>
          setActiveSwitchIndex(associateModified.modifiedIndex === -1 ? 2 : -1)
        }
      />
      <CertifyBlock
        title="Ліве засвідчення"
        connection={associateModified.connections[3]}
        updateConnection={(conn) => updateConnectionOnIndex(conn, 3)}
        defaultName={associate.connections[3]?.name}
        switchActive={associateModified.modifiedIndex === 3}
        switchDisabled={
          associateModified.modifiedIndex !== -1 &&
          associateModified.modifiedIndex !== 3
        }
        toggleSwitch={() =>
          setActiveSwitchIndex(associateModified.modifiedIndex === -1 ? 3 : -1)
        }
      />
      <Typography mb={2} variant="h5">
        Підтримка
      </Typography>
      <SimpleAutocomplete
        presetValue={associateModified.supports}
        getSearchedUser={(u) => {
          setAssociateModified({
            ...associateModified,
            supports: u,
          });
        }}
      />
      <Box display="flex">
        <Button
          style={{ marginTop: 16, marginBottom: 16, marginRight: 8 }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => setModifyEnabled(false)}
        >
          ВІДМІНИТИ
        </Button>
        <Button
          style={{ marginTop: 16, marginBottom: 16 }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            dispatch(modifyAssociate(associateModified))
          }}
        >
          Зберегти
        </Button>
      </Box>
    </Box>
  );
};

export default Modify;
