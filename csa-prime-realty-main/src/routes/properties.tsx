import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/properties")({
  component: PropertiesLayout,
});

function PropertiesLayout() {
  // Outlet ka matlab hai ki ab iske andar ke routes (jaise $propertySlug.tsx) properly render honge
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}