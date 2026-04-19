"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type Step = {
  array: number[]
  comparing: number[]
  description: string
}

type Props = {
  steps: Step[]
}

export default function Visualizer({ steps }: Props) {
  const [currentStep, setCurrentStep] = useState(0)

  if (steps.length === 0) return null

  const step = steps[currentStep]
  const max = Math.max(...step.array)

  return (
    <div className="flex flex-col items-center gap-8 w-full mt-12">
      <div className="flex items-end gap-2 h-48">
        {step.array.map((value, i) => (
          <motion.div
            key={i}
            layout
            className={`w-12 rounded-t-lg flex items-end justify-center pb-1 text-sm font-bold
              ${step.comparing.includes(i) ? "bg-rose-400 text-white" : "bg-stone-300 text-stone-600"}`}
            style={{ height: `${(value / max) * 100}%` }}
          >
            {value}
          </motion.div>
        ))}
      </div>
      <p className="text-rose-400 text-sm font-medium">Pass {step.iteration}</p>
      <p className="text-stone-500 text-base">{step.description}</p>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          className="px-4 py-2 rounded-full bg-rose-100 text-rose-400 font-medium hover:bg-rose-200"
        >
          ← Prev
        </button>
        <span className="text-stone-400 text-sm">{currentStep + 1} / {steps.length}</span>
        <button
          onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
          className="px-4 py-2 rounded-full bg-rose-100 text-rose-400 font-medium hover:bg-rose-200"
        >
          Next →
        </button>
      </div>
    </div>
  )
}