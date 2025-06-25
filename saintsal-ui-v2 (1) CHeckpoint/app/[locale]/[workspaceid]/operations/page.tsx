import { Metadata } from "next"
import { SaintVisionWorkspaceSimple } from "@/components/workspace/saintvision-workspace-simple"

export const metadata: Metadata = {
  title: "SaintVisionAI™ Workspace",
  description:
    "Your GOTTA GUY™ for everything - AI-powered business operations"
}

export default function OperationsPage() {
  return <SaintVisionWorkspaceSimple />
}
