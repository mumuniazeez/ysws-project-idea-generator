import Link from "next/link";

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
      <main className="mb-10">{children}</main>
      <footer className="bg-black flex items-center justify-between md:flex-row flex-col gap-2 py-5 px-20 text-white fixed bottom-0 w-full">
        <p>
          Built with {"<3"} by{" "}
          <Link
            href={"https://github.com/mumuniazeez"}
            className="underline text-main"
          >
            AzCodes
          </Link>
        </p>
        <p>
          Open source on{" "}
          <Link
            href={"https://github.com/mumuniazeez/ysws-project-idea-generator"}
            className="underline text-main"
          >
            Github
          </Link>
        </p>
        <p>
          <Link href={"https://hackclub.com"} className="underline text-main">
            Hack Club
          </Link>
        </p>
      </footer>
    </>
  );
}
