"use client";

import { useEffect, useRef } from "react";

export default function MistBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
      }) ||
      canvas.getContext("experimental-webgl");


    if (!gl) {
      console.warn("WebGL unavailable");
      return;
    }


    const vertexShader = `
      attribute vec2 position;

      void main(){
        gl_Position = vec4(position,0.0,1.0);
      }
    `;


    const fragmentShader = `
      precision mediump float;

      uniform float u_time;
      uniform vec2 u_resolution;


      float random(vec2 p){
        return fract(
          sin(dot(p,vec2(12.9898,78.233))) *
          43758.5453
        );
      }


      float noise(vec2 p){

        vec2 i=floor(p);
        vec2 f=fract(p);

        float a=random(i);
        float b=random(i+vec2(1.0,0.0));
        float c=random(i+vec2(0.0,1.0));
        float d=random(i+vec2(1.0,1.0));


        vec2 u=f*f*(3.0-2.0*f);

        return mix(
          mix(a,b,u.x),
          mix(c,d,u.x),
          u.y
        );
      }


      void main(){

        vec2 uv=
          gl_FragCoord.xy /
          u_resolution.xy;


        uv.x *= u_resolution.x/u_resolution.y;


        float n =
          noise(
            uv*2.5 +
            vec2(u_time*0.05)
          );


        float mist =
          smoothstep(
            0.35,
            0.75,
            n
          );


        vec3 color =
          mix(
            vec3(0.02,0.025,0.04),
            vec3(0.35,0.4,0.5),
            mist
          );


        gl_FragColor =
          vec4(
            color,
            mist*0.35
          );

      }
    `;



    function createShader(type,source){

      const shader =
        gl.createShader(type);

      gl.shaderSource(
        shader,
        source
      );

      gl.compileShader(shader);


      return shader;
    }



    const vs =
      createShader(
        gl.VERTEX_SHADER,
        vertexShader
      );


    const fs =
      createShader(
        gl.FRAGMENT_SHADER,
        fragmentShader
      );


    const program =
      gl.createProgram();


    gl.attachShader(program,vs);
    gl.attachShader(program,fs);
    gl.linkProgram(program);
    gl.useProgram(program);



    const vertices =
      new Float32Array([
        -1,-1,
         1,-1,
        -1, 1,

        -1,1,
         1,-1,
         1,1
      ]);


    const buffer =
      gl.createBuffer();


    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffer
    );


    gl.bufferData(
      gl.ARRAY_BUFFER,
      vertices,
      gl.STATIC_DRAW
    );


    const position =
      gl.getAttribLocation(
        program,
        "position"
      );


    gl.enableVertexAttribArray(position);


    gl.vertexAttribPointer(
      position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );



    const time =
      gl.getUniformLocation(
        program,
        "u_time"
      );


    const resolution =
      gl.getUniformLocation(
        program,
        "u_resolution"
      );



    function resize(){

      const dpr =
        Math.min(
          window.devicePixelRatio,
          1.5
        );


      canvas.width =
        innerWidth*dpr;

      canvas.height =
        innerHeight*dpr;


      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }



    resize();


    window.addEventListener(
      "resize",
      resize
    );



    let animation;


    function render(t){

      gl.uniform1f(
        time,
        t*0.001
      );


      gl.uniform2f(
        resolution,
        canvas.width,
        canvas.height
      );


      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );


      animation =
        requestAnimationFrame(render);
    }


    animation =
      requestAnimationFrame(render);



    return ()=>{

      cancelAnimationFrame(animation);

      window.removeEventListener(
        "resize",
        resize
      );

      gl.deleteProgram(program);
    };


  },[]);



  return (
    <canvas
      ref={canvasRef}
      className="
        absolute
        inset-0
        h-full
        w-full
        pointer-events-none
      "
    />
  );
}