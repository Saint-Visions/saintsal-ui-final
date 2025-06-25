import { Metadata } from "next"
import { SaintVisionWorkspace } from "@/components/workspace/saintvision-workspace"

export const metadata: Metadata = {
  title: "SaintVisionAI™ Workspace",
  description:
    "Your GOTTA GUY™ for everything - AI-powered business operations"
}

export default function OperationsPage() {
  return <SaintVisionWorkspace />
}
