// import axios from "axios";
import { Associate, AssociateModified } from "./associatesSlice";

export async function searchUsersByName(name: string) {
  // Mocked associates data with artificial delay
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([
        "Іван Петренко",
        "Олена Ковальчук",
        "Сергій Іванов",
        "Марія Шевченко",
        "SDF is a user",
        "ASDFGASDFGASDFGASDFGASDFG",
      ]);
    }, 700); // 700ms delay
  });
}

export async function fetchAssociateByNameCall(
  associateName: string
): Promise<Associate> {
  // Mocked supporters data with artificial delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: associateName,
        score: 45,
        supports: "BANAN BFSLDFJLSDJF",
        registeredDate: "12-34-2020",
        connections: [
          {
            name: "IVAN IVANENKO",
        score: 44,
        mutual: true,
          },
          null,
          {
            name: "VASYL VASYLENKO",
        score: 3,
        mutual: false,
          },
                    {
            name: "DEYNYS DENYSOV",
        score: 44,
        mutual: true,
          },
        ]
      });
    }, 500); // 500ms delay
  });
}


export async function modifyAssociateCall(
  modifiedAssociate: AssociateModified
): Promise<any> {
  // Mocked supporters data with artificial delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sucess: true,
      });
    }, 500); // 500ms delay
  });
}
