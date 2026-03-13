"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const MLoader = ({ onComplete, size = 200, duration = 3 } = {}) => {
  const [isExiting, setIsExiting] = useState(false)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        onComplete?.()
      }, 1000)
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  const slideUp = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen min-h-screen min-w-screen flex items-center justify-center bg-white z-[99999999999]"
    >
      {dimension.width > 0 && (
        <>
          <div className="relative z-10 flex items-center justify-center" style={{ width: size, height: size }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: `${size * 0.8}px`,
                fontWeight: 700,
                color: "#000",
                letterSpacing: "0.1em"
              }}
            >
              M
            </motion.div>
          </div>
          
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path 
              variants={curve} 
              initial="initial" 
              animate={isExiting ? "exit" : "initial"} 
              fill="#ffffff" 
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}

export default MLoader