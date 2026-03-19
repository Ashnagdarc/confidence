"use client";

import { type ComponentProps, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

export type LayeredStackProps = ComponentProps<"div">;

export function LayeredStack({
  children,
  className,
  ...props
}: LayeredStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isStacked = useRef(true);
  const stackEnabled = useRef(false);

  const shouldStack = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.innerWidth > 900
    );
  }, []);

  const resetCards = useCallback((animate = true) => {
    const container = containerRef.current;
    if (!container) return;

    isStacked.current = false;
    const cards = Array.from(container.children) as HTMLElement[];

    cards.forEach((card, index) => {
      gsap.killTweensOf(card);
      gsap.set(card, { zIndex: 100 - index });
    });

    if (!animate) {
      gsap.set(cards, { rotate: 0, x: 0, y: 0 });
      return;
    }

    gsap.to(cards, {
      duration: 0.8,
      ease: "expo.out",
      overwrite: true,
      rotate: 0,
      stagger: {
        amount: 0.1,
        from: "start",
      },
      x: 0,
      y: 0,
      zIndex: (index: number) => 100 - index,
    });
  }, []);

  const stackCards = useCallback((animate = true) => {
    const container = containerRef.current;
    if (!container || !stackEnabled.current) return;

    isStacked.current = true;
    const cards = Array.from(container.children) as HTMLElement[];

    cards.forEach((card) => {
      gsap.killTweensOf(card);
    });

    if (!animate) {
      cards.forEach((card) => gsap.set(card, { rotate: 0, x: 0, y: 0 }));

      requestAnimationFrame(() => {
        const liveContainer = containerRef.current;
        if (!liveContainer || !isStacked.current || !stackEnabled.current) {
          return;
        }

        const liveCards = Array.from(liveContainer.children) as HTMLElement[];
        liveCards.forEach((card, index) => {
          const offsetX =
            liveContainer.clientWidth / 2 - card.offsetWidth / 2 - card.offsetLeft;
          const offsetY =
            liveContainer.clientHeight / 2 -
            card.offsetHeight / 2 -
            card.offsetTop;

          gsap.set(card, {
            rotate: gsap.utils.random(-10, 10),
            x: offsetX,
            y: offsetY,
            zIndex: 100 - index,
          });
        });
      });

      return;
    }

    cards.forEach((card) => gsap.set(card, { rotate: 0, x: 0, y: 0 }));

    requestAnimationFrame(() => {
      const liveContainer = containerRef.current;
      if (!liveContainer || !isStacked.current || !stackEnabled.current) {
        return;
      }

      const liveCards = Array.from(liveContainer.children) as HTMLElement[];
      liveCards.forEach((card, index) => {
        const offsetX =
          liveContainer.clientWidth / 2 - card.offsetWidth / 2 - card.offsetLeft;
        const offsetY =
          liveContainer.clientHeight / 2 -
          card.offsetHeight / 2 -
          card.offsetTop;

        gsap.to(card, {
          duration: 0.8,
          ease: "expo.out",
          overwrite: true,
          rotate: gsap.utils.random(-10, 10),
          x: offsetX,
          y: offsetY,
          zIndex: 100 - index,
        });
      });
    });
  }, []);

  const syncLayout = useCallback(
    (animate: boolean) => {
      stackEnabled.current = shouldStack();

      if (stackEnabled.current) {
        stackCards(animate);
        return;
      }

      resetCards(animate);
    },
    [resetCards, shouldStack, stackCards],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    cards.forEach((card, index) => {
      gsap.set(card, { zIndex: 100 - index });
    });

    syncLayout(false);

    const resizeObserver = new ResizeObserver(() => {
      syncLayout(false);
    });
    const handleResize = () => {
      syncLayout(false);
    };

    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [syncLayout]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseEnter={() => {
        if (!stackEnabled.current) return;
        resetCards(true);
      }}
      onMouseLeave={() => {
        if (!stackEnabled.current) return;
        stackCards(true);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
