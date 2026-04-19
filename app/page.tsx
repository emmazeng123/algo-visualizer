"use client"
import Visualizer from "./components/Visualizer"
import { useState } from "react"

type Step = {
  // array of numbers
  array: number[]
  // index of current 2 values 
  comparing: number[]
  // ex: "comparing values 3 and 5" //
  description: string
  iteration: number
}

function generateBubbleSortSteps(arr: number[]): Step[] {
  const steps: Step[] = []
  const array = [...arr]
  const n = array.length
  let lastIteration = 0

  for (let i = 0; i < n - 1; i++){
    lastIteration = i+1
    for (let j = 0; j < n - i - 1; j++){
      // save a snapshot into steps before performing comparison 
      steps.push({
        array: [...array],
        comparing: [j, j+1],
        description: `comparing values ${array[j]} and ${array[j+1]}`,
        // first iteration passes from 0 to 1
        iteration: i + 1
      })

      // perform the swap 
      if (array[j] > array[j+1]){
        let temp = array[j]
        array[j] = array[j+1]
        array[j+1] = temp

        // save a snapshot into steps after swap has happened
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          description: `swapped ${array[j + 1]} and ${array[j]}`,
          // after the loop ends, the outer i will increment and match with this i + 1
          iteration: i+1
          })
      }
    }
  }

  steps.push({
    array: [...array],
    comparing: [],
    description: `array is sorted! ✓`,
    iteration: lastIteration
  })

  return steps
}


export default function Home() {
  const steps = generateBubbleSortSteps([5, 3, 1, 4, 2])



  return (
   <main className="min-h-screen bg-gradient-to-br from-stone-100 via-rose-50 to-amber-50 text-stone-800 flex flex-col items-center p-12">
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="bg-pink-400/20 border border-pink-400/30 rounded-full px-4 py-1 text-pink-200 text-sm">
          ◝(ᵔᗜᵔ)◜ visual leetcode animations ♡
         </div>
        <h1 className="text-6xl font-bold text-black">
          Algorithm Visualizer
        </h1>
        <p className="text-pink-300/70 text-lg">
          sorting algorithms ˚₊·
        </p>
      </div>
     <Visualizer steps={steps} />
    </main>
  )
}

