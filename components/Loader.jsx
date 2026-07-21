"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",
  "नमस्ते",
  "నమస్కారం",
  "வணக்கம்",
  "ನಮಸ್ಕಾರ",
];

const LOADER_TIME = 5000;

export default function Loader({ onComplete }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);


  // Progress timer
  useEffect(() => {

    const start = Date.now();

    const interval = setInterval(() => {

      const elapsed = Date.now() - start;
      const value = Math.min(
        (elapsed / LOADER_TIME) * 100,
        100
      );

      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setLoading(false);
          onComplete?.();
        },300);
      }

    },20);


    return () => clearInterval(interval);

  }, [onComplete]);



  // Typing animation
  useEffect(() => {

    const current = greetings[index];

    let char = 0;


    // slower typing
    const typingSpeed = 120;


    const typing = setInterval(() => {

      setText(current.slice(0,char + 1));

      char++;


      if(char >= current.length){

        clearInterval(typing);


        setTimeout(()=>{

          if(index < greetings.length - 1){

            setIndex(prev => prev + 1);
            setText("");

          }

        },350);

      }


    },typingSpeed);



    return ()=> clearInterval(typing);


  },[index]);



  return (
    <AnimatePresence>

      {loading && (

        <motion.div

          initial={{
            opacity:1
          }}

          exit={{
            y:"-100%",
            transition:{
              duration:0.8,
              ease:"easeInOut"
            }
          }}

          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black text-white
          "

        >


          <motion.h1

            key={text}

            initial={{
              opacity:0,
              scale:0.95
            }}

            animate={{
              opacity:1,
              scale:1
            }}

            transition={{
              duration:0.2
            }}

            className="
              font-bold
              text-5xl
              sm:text-6xl
              md:text-8xl
              lg:text-9xl
              tracking-tight
            "

          >

            {text}

          </motion.h1>



          {/* Progress Bar */}

          <div
            className="
              absolute
              bottom-8
              left-1/2
              -translate-x-1/2
              w-[80%]
              max-w-xl
              h-[3px]
              bg-white/20
              overflow-hidden
            "
          >

            <motion.div

              className="
                h-full
                bg-white
              "

              style={{
                width:`${progress}%`
              }}

            />

          </div>


          {/* Percentage */}

          <div
            className="
              absolute
              bottom-12
              right-8
              text-sm
              text-white/50
              font-mono
            "
          >
            {Math.floor(progress)}%
          </div>


        </motion.div>

      )}

    </AnimatePresence>
  );
}