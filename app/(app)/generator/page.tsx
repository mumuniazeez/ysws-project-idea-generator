"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Shield,
  ShieldAlertIcon,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { ProjectIdeas } from "../../api/generate/route";
import { HackClubYSWS } from "../../api/ysws/route";
import ProjectIdeaCard from "@/components/ProjectIdeaCard";
import { Input } from "@/components/ui/input";

interface Weapon {
  name: string;
  description: string;
}
interface ProjectCategory {
  name: string;
  description: string;
}

interface Timeframe {
  name: string;
  description: string;
}

interface Level {
  name: string;
  description: string;
}

const weapons: Weapon[] = [
  {
    name: "FRONTEND DEV",
    description: "React, Tailwind, HTML, CSS, Interactive web components",
  },
  {
    name: "BACKEND DEV",
    description: "APIs, Nodejs, Express, database, server setup",
  },
  {
    name: "AI & MACHINE LEARNING",
    description: "Python, Tensorflow, Pytorch, OpenAI API, Langchain",
  },
  {
    name: "HARDWARE & ELECTRONICS",
    description: "PCB, Soldering, physical controller, IoT",
  },
  {
    name: "MOBILE APPS",
    description: "React Native, Expo, Kotlin, Swift, Android/iOS",
  },
  {
    name: "GAME DEVELOPMENT",
    description:
      "Sprig JS engine, custom graphics, Unity, Unreal Engine, Godot",
  },
  {
    name: "PRODUCT AND UI/UX DESIGN",
    description: "Figma wireframing, CAD 3D modeling, vector art",
  },
];

const projectCategories: ProjectCategory[] = [
  {
    name: "GAMES & ARCADES",
    description: "Fun retro machines, high scores, procedural levels",
  },
  {
    name: "DEVELOPERS TOOL",
    description: "CLI scripts, VSCode extensions, developer helpers",
  },
  {
    name: "EDUCATION & LEARNING",
    description: "Interactive study tools, scientific visualizations",
  },
  {
    name: "SOCIAL GOOD",
    description: "Helping local non-profits environment, schools, daily fixes",
  },
  {
    name: "PRODUCTIVITY HACKS",
    description: "Personal automation, micro dashboards, school helper",
  },
];

const timeframes: Timeframe[] = [
  {
    name: "1 TO 2 WEEKS",
    description: "Perfect for a rapid sprint or focused",
  },
  {
    name: "2 TO 4 WEEKS",
    description:
      "The sweet spot for building a high-quality finished prototype",
  },
  {
    name: "4 TO 8 WEEKS",
    description:
      "Allows deep-dives into PCB fabrications or heavy API structures",
  },
  {
    name: "2 TO 3 MONTHS",
    description: "A legendary saga of continuous feature iteration",
  },
];
const levels: Level[] = [
  {
    name: "BEGINNER",
    description:
      "Just starting out? This is the perfect level to get your feet wet and learn the basics",
  },
  {
    name: "INTERMEDIATE",
    description:
      "I've built project before, I can hook up databases or integrate APIs.",
  },
  {
    name: "ADVANCED",
    description:
      "Terminal master. Challenge me with custom vector calculations or real physics.",
  },
];

type Step =
  | "YSWS-SELECTION"
  | "WEAPON-SELECTION"
  | "PROJECT-CATEGORY"
  | "TIMEFRAME"
  | "LEVEL";

const steps: Step[] = [
  "YSWS-SELECTION",
  "WEAPON-SELECTION",
  "PROJECT-CATEGORY",
  "TIMEFRAME",
  "LEVEL",
];

export interface ApiRequestBody {
  weapons: Weapon[];
  projectCategories: ProjectCategory[];
  timefame: Timeframe;
  level: Level;
  ysws: HackClubYSWS;
}

export default function GeneratorPage() {
  const [selectedYSWS, setSelectedYSWS] = useState<HackClubYSWS | null>(null);
  const [selectedWeapons, setSelectedWeapons] = useState<Weapon[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | null>(
    null,
  );
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("YSWS-SELECTION");
  const [formError, setFormError] = useState("");
  const [yswsSearchQuery, setYswsSearchQuery] = useState("");
  const [generationError, setGenerationError] = useState("");
  const [hackclubYSWS, setHackclubYSWS] = useState<HackClubYSWS[] | null>(null);
  const router = useRouter();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<ProjectIdeas["ideas"]>(
    [],
  );

  const startGenerating = async () => {
    setIsGenerating(true);

    const requestBody: ApiRequestBody = {
      weapons: selectedWeapons,
      projectCategories: selectedCategories,
      timefame: selectedTimeframe!,
      level: selectedLevel!,
      ysws: selectedYSWS!,
    };

    fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((res: ProjectIdeas) => {
        console.log(res.ideas);
        setGeneratedIdeas(res.ideas);
      })
      .catch((err) => {
        setGeneratedIdeas([]);
        setGenerationError(err.toString());
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const goBack = () => {
    if (steps.findIndex((s) => s === currentStep) === 0) {
      router.push("/");
    } else {
      setCurrentStep(steps[steps.findIndex((s) => s === currentStep) - 1]);
      setFormError("");
    }
  };
  const goNext = () => {
    if (currentStep === "YSWS-SELECTION" && selectedYSWS === null)
      return setFormError("Please select a YSWS from the options");
    if (currentStep === "WEAPON-SELECTION" && selectedWeapons.length === 0)
      return setFormError("Please select at least one skill from the options");
    if (currentStep === "PROJECT-CATEGORY" && selectedCategories.length === 0)
      return setFormError(
        "Please select at least one category from the options",
      );
    if (currentStep === "TIMEFRAME" && selectedTimeframe === null)
      return setFormError("Please select at your timeframe from the options");
    if (currentStep === "LEVEL" && selectedLevel === null)
      return setFormError(
        "Please select at your level of comfort from the options",
      );
    if (steps.findIndex((s) => s === currentStep) === steps.length - 1) {
      startGenerating();
    } else {
      setCurrentStep(steps[steps.findIndex((s) => s === currentStep) + 1]);
    }
  };

  const fetchYSWS = useCallback(() => {
    if (hackclubYSWS) return;
    fetch("/api/ysws", { method: "GET" })
      .then((res) => res.json())
      .then((res: HackClubYSWS[]) => {
        setHackclubYSWS(res);
      })
      .catch(() => {
        setFormError("Failed to fetch active YSWS, please reload this page");
      });
  }, [hackclubYSWS]);

  useEffect(() => {
    fetchYSWS();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormError("");
  }, [
    selectedWeapons,
    selectedCategories,
    selectedLevel,
    selectedTimeframe,
    selectedYSWS,
    fetchYSWS,
  ]);

  return (
    <>
      {!isGenerating && generatedIdeas.length === 0 && !generationError ? (
        <div className="flex my-10 flex-col items-center justify-center gap-4 gap-y-10">
          <Badge variant="default" className="text-xl">
            STEP {steps.findIndex((s) => s === currentStep) + 1} OF{" "}
            {steps.length}
          </Badge>
          {currentStep === "YSWS-SELECTION" ? (
            <div className="text-center space-y-3">
              <h1 className="md:text-4xl  text-2xl italic">
                CHOOSE AN ADVENTURE
              </h1>
              <p className="text-black/80">
                Select the YSWS you want to participate in
              </p>
            </div>
          ) : currentStep === "WEAPON-SELECTION" ? (
            <div className="text-center space-y-3">
              <h1 className="md:text-4xl  text-2xl italic">
                CHOOSE YOUR WEAPON
              </h1>
              <p className="text-black/80">
                What kind of wizardry do you practice? Or what are you hoping to
                learn? (Select all that apply)
              </p>
            </div>
          ) : currentStep === "PROJECT-CATEGORY" ? (
            <div className="text-center space-y-3">
              <h1 className="md:text-4xl  text-2xl italic">
                FOLLOW YOUR EXCITEMENT
              </h1>
              <p className="text-black/80">
                What kind of problems or categories get you super hyped? (Select
                all that apply)
              </p>
            </div>
          ) : currentStep === "TIMEFRAME" ? (
            <div className="text-center space-y-3">
              <h1 className="md:text-4xl  text-2xl italic">
                CHECK THE CALENDER
              </h1>
              <p className="text-black/80">
                How long can you realistically dedicate to this project? (Select
                one)
              </p>
            </div>
          ) : currentStep === "LEVEL" ? (
            <div className="text-center space-y-3">
              <h1 className="md:text-4xl  text-2xl italic">
                DETERMINE YOUR TIER
              </h1>
              <p className="text-black/80">
                What is your current comfort level with software or hardware
                engineering? (Select one)
              </p>
            </div>
          ) : null}

          <Progress
            value={
              // 25 * 2
              (100 / steps.length) *
              (steps.findIndex((s) => s === currentStep) + 1)
            }
            className="w-1/4"
          />
          {formError && (
            <Alert className="w-[70%]" variant={"destructive"}>
              <Shield size={24} />
              <AlertTitle>{formError}</AlertTitle>

              {currentStep === "YSWS-SELECTION" && !hackclubYSWS && (
                <Button
                  variant={"noShadow"}
                  className="absolute top-2.5 right-3 h-6 bg-secondary-background text-foreground"
                  onClick={() => {
                    fetchYSWS();
                    setFormError("");
                  }}
                >
                  <RefreshCw />
                  RETRY
                </Button>
              )}
            </Alert>
          )}

          {currentStep === "YSWS-SELECTION" ? (
            hackclubYSWS ? (
              <div className="w-[80%]">
                <Input
                  type="search"
                  className="mb-2 w-[50%] mx-auto"
                  placeholder="Search for a YSWS (e.g horizons, boba, hardware, game, website)"
                  value={yswsSearchQuery}
                  onChange={(e) => setYswsSearchQuery(e.target.value)}
                />
                <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                  {hackclubYSWS
                    .filter(
                      (ysws) =>
                        ysws.name.includes(yswsSearchQuery) ||
                        ysws.description.includes(yswsSearchQuery),
                    )
                    .map((ysws, idx) => {
                      const isSelected =
                        selectedYSWS?.name === ysws.name && true;

                      const toggle = (
                        e: React.MouseEvent | React.ChangeEvent,
                      ) => {
                        e.preventDefault();
                        if (!isSelected) setSelectedYSWS(ysws);
                      };
                      return (
                        <Card
                          className={`flex gap-x-3 p-5 flex-row ${isSelected && "bg-main"}`}
                          key={idx}
                          onClick={toggle}
                        >
                          <div>
                            <Checkbox checked={isSelected} onChange={toggle} />
                          </div>
                          <div>
                            <h5>{ysws.name}</h5>
                            <p className="text-sm text-black/80">
                              {ysws.description}
                            </p>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </div>
            ) : !formError ? (
              <div className="grid md:grid-cols-4 grid-cols-1 w-[80%] gap-4">
                <Card className={`flex gap-x-3 p-5 flex-row`}>
                  <div>
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-30" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                  </div>
                </Card>
                <Card className={`flex gap-x-3 p-5 flex-row`}>
                  <div>
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-30" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                  </div>
                </Card>
                <Card className={`flex gap-x-3 p-5 flex-row`}>
                  <div>
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-30" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                  </div>
                </Card>
                <Card className={`flex gap-x-3 p-5 flex-row`}>
                  <div>
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-30" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                  </div>
                </Card>
                <Card className={`flex gap-x-3 p-5 flex-row`}>
                  <div>
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-30" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                    <Skeleton className="h-3 w-60" />
                  </div>
                </Card>
              </div>
            ) : null
          ) : currentStep === "WEAPON-SELECTION" ? (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:w-auto w-[80%]">
              {weapons.map((weapon, idx) => {
                const isSelected =
                  selectedWeapons.find((w) => w.name === weapon.name) && true;

                const toggle = (e: React.MouseEvent | React.ChangeEvent) => {
                  e.preventDefault();
                  if (isSelected)
                    setSelectedWeapons((prev) =>
                      prev.filter((w) => w.name !== weapon.name),
                    );
                  else setSelectedWeapons([...selectedWeapons, weapon]);
                };
                return (
                  <Card
                    className={`flex gap-x-3 p-5 flex-row ${isSelected && "bg-main"}`}
                    key={idx}
                    onClick={toggle}
                  >
                    <div>
                      <Checkbox checked={isSelected} onChange={toggle} />
                    </div>
                    <div>
                      <h5>{weapon.name}</h5>
                      <p className="text-sm text-black/80">
                        {weapon.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : currentStep === "PROJECT-CATEGORY" ? (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:w-auto w-[80%]">
              {projectCategories.map((category, idx) => {
                const isSelected =
                  selectedCategories.find((c) => c.name === category.name) &&
                  true;

                const toggle = (e: React.MouseEvent | React.ChangeEvent) => {
                  e.preventDefault();
                  if (isSelected)
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c.name !== category.name),
                    );
                  else setSelectedCategories([...selectedCategories, category]);
                };
                return (
                  <Card
                    className={`flex gap-x-3 p-5 flex-row ${isSelected && "bg-main"}`}
                    key={idx}
                    onClick={toggle}
                  >
                    <div>
                      <Checkbox checked={isSelected} onChange={toggle} />
                    </div>
                    <div>
                      <h5>{category.name}</h5>
                      <p className="text-sm text-black/80">
                        {category.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : currentStep === "TIMEFRAME" ? (
            <div className="grid grid-cols-1 gap-4 md:w-auto w-[80%]">
              {timeframes.map((timeframe, idx) => {
                const isSelected =
                  selectedTimeframe?.name === timeframe.name && true;

                const toggle = (e: React.MouseEvent | React.ChangeEvent) => {
                  e.preventDefault();
                  if (!isSelected) setSelectedTimeframe(timeframe);
                };

                return (
                  <Card
                    className={`flex gap-x-3 p-5 flex-row ${isSelected && "bg-main"}`}
                    key={idx}
                    onClick={toggle}
                  >
                    <div>
                      <Checkbox checked={isSelected} onChange={toggle} />
                    </div>
                    <div>
                      <h5>{timeframe.name}</h5>
                      <p className="text-sm text-black/80">
                        {timeframe.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : currentStep === "LEVEL" ? (
            <div className="grid grid-cols-1 gap-4 md:w-auto w-[80%]">
              {levels.map((level, idx) => {
                const isSelected = selectedLevel?.name === level.name && true;

                const toggle = (e: React.MouseEvent | React.ChangeEvent) => {
                  e.preventDefault();
                  if (!isSelected) setSelectedLevel(level);
                };

                return (
                  <Card
                    className={`flex gap-x-3 p-5 flex-row ${isSelected && "bg-main"}`}
                    key={idx}
                    onClick={toggle}
                  >
                    <div>
                      <Checkbox checked={isSelected} onChange={toggle} />
                    </div>
                    <div>
                      <h5>{level.name}</h5>
                      <p className="text-sm text-black/80">
                        {level.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-between w-[70%] pt-5 border-t-5">
            <Button variant={"neutral"} size={"lg"} onClick={goBack}>
              <ChevronLeft />{" "}
              {steps.findIndex((s) => s === currentStep) === 0
                ? "CANCEL"
                : "BACK"}
            </Button>
            <Button
              size={"lg"}
              onClick={goNext}
              disabled={formError ? true : false}
            >
              {steps.findIndex((s) => s === currentStep) === steps.length - 1
                ? "GENERATE IDEA"
                : "CONTINUE"}{" "}
              <ChevronRight />
            </Button>
          </div>
        </div>
      ) : isGenerating ? (
        <div className="flex my-10 flex-col items-center justify-center gap-4 gap-y-10">
          <Card className="p-5">
            <Sparkles size={34} />
          </Card>

          <div className="space-y-3 text-center">
            <h1 className="md:text-4xl  text-2xl italic">
              ANALYZING YOUR INPUT...
            </h1>

            <Badge className="text-xl">GENERATING A COOL PROJECT IDEA</Badge>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card
              className={`flex gap-x-20 p-5 flex-row items-center justify-between`}
            >
              <div className="space-y-3">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-3 w-60" />
              </div>
              <div>
                <Skeleton className="h-10 w-10" />
              </div>
            </Card>
            <Card
              className={`flex gap-x-20 p-5 flex-row items-center justify-between`}
            >
              <div className="space-y-3">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-3 w-60" />
              </div>
              <div>
                <Skeleton className="h-10 w-10" />
              </div>
            </Card>
            <Card
              className={`flex gap-x-20 p-5 flex-row items-center justify-between`}
            >
              <div className="space-y-3">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-3 w-60" />
              </div>
              <div>
                <Skeleton className="h-10 w-10" />
              </div>
            </Card>
          </div>
        </div>
      ) : generatedIdeas.length !== 0 ? (
        <div className="flex my-10 flex-col items-center justify-center gap-4 gap-y-10">
          <Badge className="bg-green-500">
            <Sparkles /> IDEAS GENERATED SUCCESSFULLY
          </Badge>
          <div className="space-y-3 text-center">
            <h1 className="md:text-4xl  text-2xl italic">
              GOT SOME IDEAS HERE
            </h1>
            <p className="text-black/80">
              We have analyzed your input and curated this project ideas
            </p>
          </div>

          <div className="w-[80%] space-y-3">
            <div className="flex items-center gap-x-3">
              <Sparkles />
              <h1 className="text-3xl">AI SUGGESTED PROJECTS</h1>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {generatedIdeas.map((idea, idx) => (
                <ProjectIdeaCard idea={idea} idx={idx} key={idx} />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between pt-5 border-t-5">
              <Button
                size={"lg"}
                onClick={() => {
                  setCurrentStep(steps[0]);
                  setGeneratedIdeas([]);
                }}
              >
                <ChevronLeft /> START OVER
              </Button>
            </div>
          </div>
        </div>
      ) : generationError ? (
        <div className="flex my-10 flex-col items-center justify-center gap-4 gap-y-10">
          <Card className="p-5 bg-red-500">
            <ShieldAlertIcon color="white" size={34} />
          </Card>
          <div className="space-y-3 text-center">
            <h1 className="md:text-4xl  text-2xl italic">REQUEST FAILED</h1>
            <p className="text-black/80">
              AI service may currently be loaded, or there was a network issue.
              Please retry the idea generation
            </p>
          </div>
          <Alert variant={"destructive"} className="my-5 text-green-300 w-[80%]">
            <AlertDescription>{generationError}</AlertDescription>
          </Alert>
          <div className="flex items-center justify-center gap-x-5">
            <Button size={"lg"}>
              <RefreshCw /> RETRY
            </Button>
            <Button
              size={"lg"}
              variant={"neutral"}
              onClick={() => {
                setCurrentStep(steps[0]);
                setGenerationError("");
              }}
            >
              START OVER
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
