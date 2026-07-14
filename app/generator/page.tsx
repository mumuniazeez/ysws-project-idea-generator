"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ChevronDownIcon,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface Weapon {
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

export default function GeneratorPage() {
  const [selectedWeapons, setSelectedWeapons] = useState<Weapon[]>([]);

  return (
    <div className="flex my-10 flex-col items-center justify-center gap-4 gap-y-10">
      <Badge variant="default" className="text-xl">
        STEP 1 OF 4
      </Badge>
      <div className="text-center space-y-3">
        <h1 className="text-4xl italic">CHOOSE YOUR WEAPON</h1>
        <p className="text-black/80">
          WHat kind of wizardry do you practice? Or what are you hoping to
          learn? (Select all that apply)
        </p>
      </div>

      <Progress value={25} className="w-1/4" />

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

      <div className="mt-5 flex items-center justify-between w-1/2">
        <Button variant={"neutral"} size={"lg"}>
          <ChevronLeft /> Cancel
        </Button>
        <Button size={"lg"}>
          Continue <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
