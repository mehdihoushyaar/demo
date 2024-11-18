import { Header } from "@components";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="text-white min-h-screen">
      <div className="container mx-auto">
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  ),
});
