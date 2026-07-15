import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Idea } from "@/app/api/generate/route";
import { Badge } from "./ui/badge";

export default function ProjectIdeaCard({
  idea,
  idx,
}: {
  idea: Idea;
  idx: number;
}) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const allSavedIdeasStr = localStorage.getItem("savedIdeas");
    if (allSavedIdeasStr) {
      const savedIdeas: Idea[] = JSON.parse(allSavedIdeasStr);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSaved(savedIdeas.find((i) => i.title === idea.title) ? true : false);
    }
  }, [idea]);

  const handleActionButton = () => {
    const allSavedIdeasStr = localStorage.getItem("savedIdeas");
    if (allSavedIdeasStr) {
      const savedIdeas: Idea[] = JSON.parse(allSavedIdeasStr);
      if (isSaved)
        localStorage.setItem(
          "savedIdeas",
          JSON.stringify(savedIdeas.filter((i) => i.title !== idea.title)),
        );
      else {
        savedIdeas.push(idea);
        localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
      }
    } else {
      localStorage.setItem("savedIdeas", JSON.stringify([idea]));
    }
    setIsSaved((prev) => !prev);
  };
  return (
    <div className="relative">
      <Badge className="absolute right-0">OPTION {idx + 1}</Badge>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{idea.title}</CardTitle>
          <CardDescription className="font-semibold italic border-b-5 pb-2">
            &quot;{idea.shortDescription}&quot;
          </CardDescription>
          <CardAction>
            <Button
              title="Save"
              variant={isSaved ? "default" : "neutral"}
              onClick={handleActionButton}
            >
              <Bookmark />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>{idea.longDescription}</p>
          <div className="pb-3">
            <h6 className="font-bold">RECOMMENDED TECH STACK:</h6>

            <div className="flex flex-wrap gap-1 5">
              {idea.recommendedTechStack.map((tech, idx) => (
                <Badge key={idx} variant={"neutral"}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
