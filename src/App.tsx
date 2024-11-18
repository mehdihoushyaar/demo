import React from "react";

import { ErrorBoundary } from "@components";
import { QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "@routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "@services/client";

export const router = createRouter({ routeTree });

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
