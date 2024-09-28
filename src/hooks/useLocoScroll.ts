import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start: string) {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: start,
      start: "top top",
      end: "+=90vh",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        gsap.to(start, {
          x: `$(-350 * self.progress)vw`,
          duration: 0.5,
          ease: "power3.inOut",
        });
      },
    });
  }, [start]);
}
