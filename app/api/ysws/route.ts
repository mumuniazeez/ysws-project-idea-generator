export interface HackClubYSWS {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  url: string;
  status: "ongoing" | "upcoming" | "ended";
  startDate: string | null;
  endDate: string | null;
  announcedAt: string;
  format: string | null;
  inPerson: {
    start: string | null;
    end: string | null;
    location: string | null;
  } | null;
  projectTypes: string[];
  slackChannel: string | null;
  slackUrl: string | null;
  requirements: string | null;
  pinned: boolean;
  logoUrl: string | null;
  background: unknown;
  theme: unknown;
}

export async function GET() {
  try {
    const res = await fetch("https://hackclub.com/api/v1/events", {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch YSWS programs" },
        { status: 502 },
      );
    }

    const response = (await res.json()) as { data?: HackClubYSWS[] };
    const events = Array.isArray(response.data) ? response.data : [];
    const activeEvents = events.filter(
      (event) => event.status === "ongoing" || event.status === "upcoming",
    );

    return Response.json(activeEvents);
  } catch {
    return Response.json(
      { error: "Failed to fetch YSWS programs" },
      { status: 502 },
    );
  }
}
