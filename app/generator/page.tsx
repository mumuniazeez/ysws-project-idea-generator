"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDownIcon,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Shield,
  ShieldAlertIcon,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProjectIdeas } from "../api/generate/route";

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

type Step = "WEAPON-SELECTION" | "PROJECT-CATEGORY" | "TIMEFRAME" | "LEVEL";

const steps: Step[] = [
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
}

export default function GeneratorPage() {
  const [selectedWeapons, setSelectedWeapons] = useState<Weapon[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | null>(
    null,
  );
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("WEAPON-SELECTION");
  const [formError, setFormError] = useState("");
  const [generationError, setGenerationError] = useState("");
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
        setGenerationError(err);
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
    }
  };
  const goNext = () => {
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormError("");
  }, [selectedWeapons, selectedCategories, selectedLevel, selectedTimeframe]);

  return (
    <>
      {!isGenerating && generatedIdeas.length === 0 && !generationError ? (
        <div className="flex my-10 flex-col items-center justify-center gap-4 gap-y-10">
          <Badge variant="default" className="text-xl">
            STEP {steps.findIndex((s) => s === currentStep) + 1} OF{" "}
            {steps.length}
          </Badge>
          {currentStep === "WEAPON-SELECTION" ? (
            <div className="text-center space-y-3">
              <h1 className="text-4xl italic">CHOOSE YOUR WEAPON</h1>
              <p className="text-black/80">
                WHat kind of wizardry do you practice? Or what are you hoping to
                learn? (Select all that apply)
              </p>
            </div>
          ) : currentStep === "PROJECT-CATEGORY" ? (
            <div className="text-center space-y-3">
              <h1 className="text-4xl italic">FOLLOW YOUR EXCITEMENT</h1>
              <p className="text-black/80">
                What kind of problems or categories get you super hyped? (Select
                all that apply)
              </p>
            </div>
          ) : currentStep === "TIMEFRAME" ? (
            <div className="text-center space-y-3">
              <h1 className="text-4xl italic">CHECK THE CALENDER</h1>
              <p className="text-black/80">
                How long can you realistically dedicate to this project? (Select
                one)
              </p>
            </div>
          ) : currentStep === "LEVEL" ? (
            <div className="text-center space-y-3">
              <h1 className="text-4xl italic">DETERMINE YOUR TIER</h1>
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
            </Alert>
          )}

          {currentStep === "WEAPON-SELECTION" ? (
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 gap-4">
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
            <div className="grid grid-cols-1 gap-4">
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
            <Button size={"lg"} onClick={goNext}>
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
            <h1 className="text-4xl italic">ANALYZING YOUR INPUT...</h1>

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
            <h1 className="text-4xl italic">GOT SOME IDEAS HERE</h1>
            <p className="text-black/80">
              We have analyzed your input and curated this project ideas
            </p>
          </div>

          <div className="w-[80%] space-y-3">
            <div className="flex items-center gap-x-3">
              <Sparkles />
              <h1 className="text-3xl">AI SUGGESTED PROJECTS</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {generatedIdeas.map((idea, idx) => (
                <div key={idx} className="relative">
                  <Badge className="absolute right-0">OPTION {idx + 1}</Badge>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">{idea.title}</CardTitle>
                      <CardDescription className="font-semibold italic border-b-5 pb-2">
                        &quot;{idea.shortDescription}&quot;
                      </CardDescription>
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
            <h1 className="text-4xl italic">REQUEST FAILED</h1>
            <p className="text-black/80">
              AI service may currently be loaded, or there was a network issue.
              Please retry the idea generation
            </p>
          </div>
          <Alert variant={"destructive"} className="my-5 text-green-300">
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
