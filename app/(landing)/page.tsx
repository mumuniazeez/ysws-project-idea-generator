"use client";
import { Button } from "@/components/ui/button";
import { Sparkle, BoxIcon, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Idea } from "../api/generate/route";
import ProjectIdeaCard from "@/components/ProjectIdeaCard";

export default function Home() {
  const router = useRouter();

  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [isRefreshing, setIsRefresing] = useState(false);

  const loadSavedIdeas = () => {
    setIsRefresing(true);
    const savedIdeasStr = localStorage.getItem("savedIdeas");
    if (savedIdeasStr) setSavedIdeas(JSON.parse(savedIdeasStr));
    setTimeout(() => setIsRefresing(false), 1000);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSavedIdeas();
  }, []);

  return (
    <div className="flex  items-center flex-col py-10">
      <div className="flex mt-40 flex-col items-center justify-center gap-4">
        <h1 className="text-7xl max-w-4xl text-center font-bold mb-3">
          Don&apos;t know what to build for your next YSWS?
        </h1>
        <p className="text-2xl">
          Let&apos;s suggest what you should build for your next YSWS
        </p>
        <div className="flex gap-x-3 mt-3">
          <Button
            variant="default"
            size={"lg"}
            onClick={() => router.push("/generator")}
          >
            <Sparkle /> GET STARTED
          </Button>
        </div>
      </div>

      <div className="w-[80%] mt-10 border-t-5 pt-10">
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="text-4xl">SAVED PROJECT IDEAS</h1>
            <p className="text-black/80">
              Your ideas are in the prison below. Won&apos;t let them out until
              you do
            </p>
          </div>
          <Button onClick={loadSavedIdeas}>
            <RefreshCcw className={`${isRefreshing && "animate-spin"}`} />
          </Button>
        </div>

        {savedIdeas.length !== 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {savedIdeas.map((idea, idx) => (
              <ProjectIdeaCard idea={idea} idx={idx} key={idx} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-y-4">
            <BoxIcon size={60} />
            <h3 className="text-2xl">NO PROJECT SAVED YET!</h3>
            <p className="text-black/80">
              Generate some ideas and saved them to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
