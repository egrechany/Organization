import { Leader, Supporters } from "./leadersSlice";

export async function fetchLeadersCall(): Promise<Leader[]> {
  // Mocked leaders data with artificial delay
  return new Promise<Leader[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "ЛІДЕР ЛІДЕРЧУК",
          score: 88,
        },
        {
          name: "LEADER 2",
          score: 66,
        },
        { name: "ПЕТРЕНКО ПЕТljРО", score: 66 },
        { name: "ІВАН ІВАНОgfВИЧ ІВАНОВ", score: 66 },
        { name: "ВАСИЛЕНfgКО ВАСИЛЬ", score: 66 },
        { name: "СВfgІТЛАНЕНКО СВІТЛАНА", score: 66 },
        { name: "ПЕТРЕgfНКО ПЕТРО", score: 66 },
        { name: "ІvcВАН ІВАНОВИЧ ІВАНОВ", score: 66 },
        { name: "vcВАСИЛЕНКО ВАСИЛЬ", score: 66 },
        { name: "СDFВІТЛАНЕНКО СВІТЛАНА", score: 66 },
        { name: "FПЕТРЕНКО ПЕТРО", score: 66 },
        { name: "FFІВАН ІВАНОВИЧ ІВАНОВ", score: 1 },
        { name: "ВАGFСИЛЕНКО ВАСИЛЬ", score: 1 },
        { name: "СВІТЛАGFНЕНКО СВІТЛАНА", score: 1 },
        { name: "ПЕТРЕНКDFGО ПЕТРО", score: 1 },
        { name: "ІВАН ІВАGDFНОВИЧ ІВАНОВ", score: 1 },
        { name: "ВАСИЛЕНFDКО ВАСИЛЬ", score: 1 },
        { name: "СВІТЛАНGFDЕНКО СВІТЛАНА", score: 1 },
        { name: "ПЕТРЕНКОDFG ПЕТРО", score: 1 },
        { name: "ІВАН ІВАНFDОВИЧ ІВАНОВ", score: 1 },
        { name: "ВАСИЛЕНКО ВDFАСИЛЬ", score: 1 },
        { name: "СВІТЛАНЕНКО СDFGВІТЛАНА", score: 1 },
        { name: "ПЕТРЕНКО ПGЕТРО", score: 1 },
        { name: "ІВАН ІВАНОFDВИЧ ІВАНОВ", score: 1 },
      ]);
    }, 500); // 500ms delay
  });
}

export async function fetchSupportersByLeaderCall(
  leaderName: string
): Promise<Leader[]> {
  // Mocked supporters data with artificial delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "ПЕТРЕНКО ПЕТРО", score: 23 },
        { name: "ІВАН ІВАНОВИЧ ІВАНОВ", score: 11 },
        { name: "ВАСИЛЕНКО ВАСИЛЬ", score: 4 },
        { name: "СВІТЛАНЕНКО СВІТЛАНА", score: 1 },
        { name: "ПЕТРЕНКО ПЕТРО2", score: 1 },
      ]);
    }, 500); // 500ms delay
  });
}
