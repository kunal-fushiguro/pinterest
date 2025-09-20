import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { client } from "../../lib/appwrite";

export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  async function sendPing() {
    try {
      const result = await client.ping();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    sendPing();

    return () => {};
  }, []);

  return <div>{/* <App /> */}</div>;
}
