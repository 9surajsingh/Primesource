"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  scale?: number;
}

export function CardTilt({ children, className = '', tiltMax = 8, scale = 1.02 }: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angleX = -((yc - y) / yc) * tiltMax;
    const angleY = ((xc - x) / xc) * tiltMax;

    gsap.to(card, {
      rotateX: angleX,
      rotateY: angleY,
      scale: scale,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
