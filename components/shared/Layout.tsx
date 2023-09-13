import { Nav } from "./Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <div className="container mx-auto px-5 sm:px-0 ">
        <header>
          <Nav />
        </header>
        <main className="flex flex-col gap-3">{children}</main>
      </div>
    </div>
  );
}
