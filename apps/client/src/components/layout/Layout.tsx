import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-12 py-8 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
