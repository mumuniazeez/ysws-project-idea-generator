"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  ChevronDownIcon,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const projectCategory: ProjectCategory[] = [
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

type STEP = "WEAPON-SELECTION" | "PROJECT-CATEGORY" | "TIMEFRAME" | "LEVEL";

const STEPS: STEP[] = [
  "WEAPON-SELECTION",
  "PROJECT-CATEGORY",
  "TIMEFRAME",
  "LEVEL",
];

export default function GeneratorPage() {
  const [selectedWeapons, setSelectedWeapons] = useState<Weapon[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | null>(
    null,
  );
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentStep, setCurrentStep] = useState<STEP>("WEAPON-SELECTION");
  const [error, setError] = useState("");
  const router = useRouter();

  const goBack = () => {
    if (STEPS.findIndex((s) => s === currentStep) === 0) {
      router.push("/");
    } else {
      setCurrentStep(STEPS[STEPS.findIndex((s) => s === currentStep) - 1]);
    }
  };
  const goNext = () => {
    if (STEPS.findIndex((s) => s === currentStep) === STEPS.length - 1) {
    } else {
      if (currentStep === "WEAPON-SELECTION" && selectedWeapons.length === 0)
        return setError("Please select at least one skill from the options");
      if (currentStep === "PROJECT-CATEGORY" && selectedCategories.length === 0)
        return setError("Please select at least one category from the options");
      if (currentStep === "TIMEFRAME" && selectedTimeframe === null)
        return setError("Please select at your timeframe from the options");
      if (currentStep === "LEVEL" && selectedLevel === null)
        return setError(
          "Please select at your level of comfort from the options",
        );
      setCurrentStep(STEPS[STEPS.findIndex((s) => s === currentStep) + 1]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError("");
  }, [selectedWeapons, selectedCategories, selectedLevel, selectedTimeframe]);

  return (
    <div className="flex my-10 flex-col items-center justify-center gap-4 gap-y-10">
      <Badge variant="default" className="text-xl">
        STEP {STEPS.findIndex((s) => s === currentStep) + 1} OF {STEPS.length}
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
            What kind of problems or categories get you super hyped? (Select all
            that apply)
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
          (100 / STEPS.length) * (STEPS.findIndex((s) => s === currentStep) + 1)
        }
        className="w-1/4"
      />
      {error && (
        <Alert className="w-[70%]" variant={"destructive"}>
          <Shield size={24} />
          <AlertTitle>{error}</AlertTitle>
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
                  <p className="text-sm text-black/80">{weapon.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      ) : currentStep === "PROJECT-CATEGORY" ? (
        <div className="grid grid-cols-2 gap-4">
          {projectCategory.map((category, idx) => {
            const isSelected =
              selectedCategories.find((c) => c.name === category.name) && true;

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
                  <p className="text-sm text-black/80">{level.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between w-[70%] pt-5 border-t-5">
        <Button variant={"neutral"} size={"lg"} onClick={goBack}>
          <ChevronLeft />{" "}
          {STEPS.findIndex((s) => s === currentStep) === 0 ? "CANCEL" : "BACK"}
        </Button>
        <Button size={"lg"} onClick={goNext}>
          {STEPS.findIndex((s) => s === currentStep) === STEPS.length - 1
            ? "GENERATE IDEA"
            : "CONTINUE"}{" "}
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
