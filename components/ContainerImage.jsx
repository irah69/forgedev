"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";


export default function ContainerImage({

  src = "/image.png",

  // image size
  height = "h-screen",
  width = "w-full",

  // bands
  bands = 2,
  bandWidth = "18%",
  bandGap = "15%",

  // movement
  direction = "right",
  movement = "140%",

  objectFit = "cover",

}) {


  const containerRef = useRef(null);


  const { scrollYProgress } = useScroll({

    target: containerRef,

    offset:[
      "start end",
      "end start"
    ]

  });



  return (

    <section

      ref={containerRef}

      className={`
        relative
        ${height}
        ${width}
        overflow-hidden
        bg-black
      `}

    >

      <div

        className={`
          sticky
          top-0
          ${height}
          ${width}
        `}

      >


        <Image

          src={src}

          alt="container"

          fill

          sizes="100vw"

          className={`
            object-${objectFit}
          `}

        />



        {
          Array.from({length:bands}).map((_,index)=>{


            const startPosition =
              `-${index * 15}%`;


            const endPosition =
              direction === "right"
              ? movement
              : `-${movement}`;



            const x = useTransform(

              scrollYProgress,

              [0,1],

              [
                startPosition,
                endPosition
              ]

            );



            return (

              <motion.div

                key={index}

                style={{

                  x,

                  width:bandWidth,

                  left:
                    `calc(${index} * (${bandWidth} + ${bandGap}))`

                }}


                className="
                  absolute
                  top-0
                  h-full
                  bg-black
                  z-10
                "

              />

            )

          })
        }


      </div>


    </section>

  );
}