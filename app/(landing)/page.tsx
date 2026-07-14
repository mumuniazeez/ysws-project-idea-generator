"use client";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="flex my-50 flex-col items-center justify-center gap-4">
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
    </div>
  );
}
