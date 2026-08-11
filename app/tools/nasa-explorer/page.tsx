import { redirect } from "next/navigation";

export const metadata = {
  title: "NASA Real-Time Space Observatory & Data Visualizer",
  description: "Official NASA Mission Control Terminal & Real-Time Open Data Science Workbench.",
};

export default function NASAExplorerRedirect() {
  redirect("/nasa");
}
