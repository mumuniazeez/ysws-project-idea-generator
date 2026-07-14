import { Button } from "@/components/ui/button";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <header className="flex items-center justify-between p-4 border-b-5">
        <div>
          <h1 className="text-3xl">Logo</h1>
        </div>
        <div className="flex gap-x-4">
          <Button>Signup</Button>
        </div>
      </header> */}
      <main>{children}</main>
    </>
  );
}
