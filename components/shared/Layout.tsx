import { Hero } from "./Hero";
import { Nav } from "./Nav";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen    backdrop-filter backdrop-blur-lg ">
      <div className="container mx-auto px-5 sm:px-0  ">
        <header>
          <Nav />
          {/* <Hero title={title} /> */}
        </header>
      </div>
      <div className="w-screen backdrop-filter bg-black/30 backdrop-blur-sm py-20">
        <main className="container mx-auto px-5 sm:px-0 flex flex-col gap-3 ">
          {children}
        </main>
      </div>
    </div>
  );
}
