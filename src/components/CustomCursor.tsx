"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;
    if (!dot || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update the dot immediately
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      
      if (!isActive) {
        setIsActive(true);
        document.body.classList.add("custom-cursor-active");
      }
    };

    const updateFollower = () => {
      // Linear interpolation (lerp) for smooth inertia follower physics
      const ease = 0.15;
      followerX += (mouseX - followerX) * ease;
      followerY += (mouseY - followerY) * ease;

      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;

      requestAnimationFrame(updateFollower);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest(".glass-interactive") !== null ||
        target.classList.contains("cursor-pointer");

      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      document.body.classList.remove("custom-cursor-active");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const animationId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isActive]);

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`custom-cursor ${isHovered ? "hovered" : ""} ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: "-100px", top: "-100px" }}
      />
      <div
        ref={cursorFollowerRef}
        className={`custom-cursor-follower ${isHovered ? "hovered" : ""} ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: "-100px", top: "-100px" }}
      />
    </>
  );
}
