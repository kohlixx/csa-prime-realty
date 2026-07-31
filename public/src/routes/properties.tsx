import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/properties")({
    component: PropertiesPage,
});

function PropertiesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <h1 className="text-4xl font-serif text-accent">Our Properties Portfolio</h1>
        </div>
    );
}