"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function HeroThreeCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.7,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
    });

    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 4;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      scene.rotation.y = mouse.x * 0.12;
      scene.rotation.x = -mouse.y * 0.12;

      const posArr = points.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        posArr[i * 3] += velocities[i].x;
        posArr[i * 3 + 1] += velocities[i].y;
        posArr[i * 3 + 2] += velocities[i].z;

        if (posArr[i * 3] > 16 || posArr[i * 3] < -16) velocities[i].x *= -1;
        if (posArr[i * 3 + 1] > 10 || posArr[i * 3 + 1] < -10) velocities[i].y *= -1;
        if (posArr[i * 3 + 2] > 7 || posArr[i * 3 + 2] < -7) velocities[i].z *= -1;
      }

      points.geometry.attributes.position.needsUpdate = true;

      lineGroup.clear();

      const linePositions: number[] = [];
      for (let i = 0; i < count; i++) {
        const x1 = posArr[i * 3];
        const y1 = posArr[i * 3 + 1];
        const z1 = posArr[i * 3 + 2];

        for (let j = i + 1; j < count; j++) {
          const x2 = posArr[j * 3];
          const y2 = posArr[j * 3 + 1];
          const z2 = posArr[j * 3 + 2];

          const dist = Math.hypot(x1 - x2, y1 - y2, z1 - z2);
          if (dist < 4.5) {
            linePositions.push(x1, y1, z1, x2, y2, z2);
          }
        }
      }

      if (linePositions.length > 0) {
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const lines = new THREE.LineSegments(lineGeo, lineMaterial);
        lineGroup.add(lines);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        try {
          container.removeChild(renderer.domElement);
        } catch (e) {
          console.error("Error removing WebGL renderer canvas:", e);
        }
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-55" />;
}
