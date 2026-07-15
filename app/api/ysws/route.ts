export interface HackClubYSWS {
  name: string;
  description: string;
  website: string;
  slack: string;
  slackChannel: string;
  status: "active"; // fetching only active ysws program

  // Optional fields based on the dataset
  deadline?: string; // e.g., "2026-07-28T04:59:59Z" or "2026-08-31"
  opens?: string; // e.g., "2026-07-01"
  detailedDescription?: string;
  steps?: string[];

  // These fields can appear as either a single string or an array of strings
  details?: string | string[];
  requirements?: string | string[];
}

export async function GET() {
  const res = await fetch("https://ysws.hackclub.com/api.json");

  if (!res.ok) throw new Error("Failed to fecth YSWs programs");

  const response: {
    limitedTime: HackClubYSWS[];
    recentlyEnded: HackClubYSWS[];
    drafts: HackClubYSWS[];
    indefinite: HackClubYSWS[];
  } = await res.json();

  const yswsArr = [
    ...response.limitedTime,
    ...response.recentlyEnded,
    ...response.drafts,
    ...response.indefinite,
  ];

  return Response.json(yswsArr.filter((ysws) => ysws.status === "active"));
}
