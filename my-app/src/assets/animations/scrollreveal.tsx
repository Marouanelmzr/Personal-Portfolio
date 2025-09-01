// src/assets/animations/scrollreveal.tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "../lib/utils";

interface ScrollRevealProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /**
   * Optional external scroll container. If provided, ScrollReveal will use this ref
   * to read scrollYProgress. If not provided, it will use its own internal container ref.
   */
  containerRef?: React.RefObject<HTMLElement | null>;
}

/** Flatten text into words/fragments (keeps elements intact) */
const flattenChildren = (children: React.ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        result.push(...flattenChildren(child.props.children));
      } else if (child.props && child.props.children) {
        result.push(...flattenChildren(child.props.children));
      } else {
        result.push(child);
      }
    } else if (typeof child === "string" || typeof child === "number") {
      const words = String(child).split(/(\s+)/);
      words.forEach((word, i) => result.push(<React.Fragment key={i}>{word}</React.Fragment>));
    }
  });
  return result;
};

function OpacityChild({
  children,
  index,
  progress,
  total,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.1, 1]);

  let childClass = "";
  if (React.isValidElement(children)) {
    childClass = (children.props as any)?.className ?? "";
  }

  return (
    <motion.span style={{ opacity }} className={cn(childClass, "inline-block")}>
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  children,
  className,
  containerRef: externalContainerRef,
  ...props
}: ScrollRevealProps) {
  // internal ref used only when an external containerRef is NOT provided
  const internalRef = useRef<HTMLDivElement>(null);
  const usedContainerRef = externalContainerRef ?? internalRef;

  const flat = flattenChildren(children);
  const count = flat.length;

  // useScroll reads from the container reference we chose
  const { scrollYProgress } = useScroll({
    // framer-motion accepts a RefObject<Element | Window | null>
    container: usedContainerRef as React.RefObject<any>,
  });

  const isUsingExternal = Boolean(externalContainerRef);

  return (
    // If external containerRef is passed, don't attach our internal ref to this root
    <div
      {...props}
      ref={isUsingExternal ? undefined : internalRef}
      className={cn("relative w-full text-white", className)}
    >
      {/* sticky/pinned area inside this component */}
      <div className="sticky top-0 flex h-full w-full items-center justify-center">
        <div className="flex flex-wrap whitespace-pre-wrap p-4 text-lg leading-relaxed text-center">
          {flat.map((child, index) => (
            <OpacityChild
              key={index}
              index={index}
              total={count}
              progress={scrollYProgress}
            >
              {child}
            </OpacityChild>
          ))}
        </div>
      </div>

      {/* If ScrollReveal is used as an internal scroll container, provide extra space to allow scrolling.
          If an external scroll container is used, DON'T add internal spacer (external container should provide scroll space). */}
      {!isUsingExternal && <div style={{ height: `${Math.max(600, count * 18)}px` }} />}
    </div>
  );
}
