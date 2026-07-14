export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b-5">
        <div>Logo</div>
      </header>
      <main>{children}</main>
    </>
  );
}
