import { createFileRoute } from "@tanstack/react-router";
import MasonryLayout from "../components/home/MasonryLayout";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <MasonryLayout />
    </>
  );
}
