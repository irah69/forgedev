"use client"

import { useState } from "react"
import MLoader from "./Loader"

export default function LoaderWrapper() {
  const [showLoader, setShowLoader] = useState(true)

  const handleComplete = () => {
    setShowLoader(false)
  }

  if (!showLoader) return null

  return <MLoader onComplete={handleComplete} size={200} duration={3} />
}
