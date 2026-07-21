import Image from "next/image";
import Container from "@/components/container";
export default function Hero2({ scrollY, scrollYProgress }) {
  return (
   <section className="relative h-full w-full overflow-hidden bg-[#202B36]">
      <Image
        src="/image.png"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />
      
    </section>
  );
}