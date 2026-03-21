import React, { useEffect, useState, useCallback } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";
import SpiderManMask from "./sections/SpiderManMask";

// All heavy images that need to be preloaded before showing the UI
const PRELOAD_IMAGES = [
  "/images/spider.jpg",
  "/images/hari_hero.png",
  "/images/movieposter.avif",
  "/images/hari_me.jpeg",
];

const App = () => {
  const { progress: threeProgress } = useProgress();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imgProgress, setImgProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload all images and track individual progress
  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD_IMAGES.length;

    const promises = PRELOAD_IMAGES.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            loaded++;
            setImgProgress(Math.round((loaded / total) * 100));
            resolve();
          };
          img.src = src;
        })
    );

    Promise.all(promises).then(() => setImagesLoaded(true));
  }, []);

  // Combined progress: 50% weight for images, 50% for 3D model
  const combinedProgress = Math.round(
    imgProgress * 0.5 + threeProgress * 0.5
  );

  // Show UI only when BOTH images AND 3D model are fully loaded
  useEffect(() => {
    if (imagesLoaded && threeProgress === 100) {
      const timer = setTimeout(() => setIsReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded, threeProgress]);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}
      className="relative w-screen min-h-screen overflow-x-hidden"
    >
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {combinedProgress}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${combinedProgress}%` }}
            />
          </div>
        </div>
      )}

      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <div className="sticky top-0 h-screen w-full z-0">
          <SpiderManMask />
        </div>
        <div className="relative z-10 bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col">
          <Hero />
          <ServiceSummary />
          <Services />
          <About />
          <Works />
          <ContactSummary />
          <Contact />
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
