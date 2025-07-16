import React, { useEffect, useRef, useMemo } from "react";
import createGlobe from "cobe";

// Default configuration options
const defaultConfig = {
  scale: 1.0,
  width: 1000,
  height: 1000,
  phi: 0,
  theta: 0,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.1, 0.8, 1],
  glowColor: [1, 1, 1],
  markers: [],
  onRender: () => {},
  enableGlow: false,
  autoRotate: true,
  autoRotateSpeed: 0.5,
  enableZoom: false,
  rotation: true,
  rotationSpeed: 0.25,
};

/**
 * Globe component that renders a 3D interactive globe using COBE
 *
 * @param {Object} props - Component props
 * @param {string} props.className - CSS class name for the container
 * @param {Object} props.config - Configuration options for the globe
 */
export function Globe({ className = "", config = {} }) {
  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  // Use useMemo to avoid recreating options object on every render
  const options = useMemo(() => {
    return { ...defaultConfig, ...config };
  }, [config]);

  const { autoRotate, enableZoom, rotation, rotationSpeed } = options;

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    // Store a reference to the canvas element for cleanup
    const canvasElement = canvasRef.current;
    const onResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.offsetWidth;
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width,
      height: width,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      scale: options.scale,
      mapSamples: options.mapSamples,
      mapBrightness: options.mapBrightness,
      baseColor: options.baseColor,
      markerColor: options.markerColor,
      glowColor: options.enableGlow ? options.glowColor : [0, 0, 0],
      markers: options.markers,
      onRender: (state) => {
        // Auto rotation when not interacting
        if (autoRotate && !pointerInteracting.current) {
          phi += rotationSpeed / 100;
        }

        state.phi = currentPhi + phi;
        state.theta = currentTheta;

        if (options.onRender) {
          options.onRender(state);
        }
      },
    });

    // Handle pointer interactions for manual rotation
    const onPointerDown = (e) => {
      if (!rotation) return;
      pointerInteracting.current =
        e.clientX - pointerInteractionMovement.current;
      canvasRef.current.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      if (!rotation) return;
      pointerInteracting.current = null;
      canvasRef.current.style.cursor = "grab";
    };

    const onPointerOut = () => {
      if (!rotation) return;
      pointerInteracting.current = null;
      canvasRef.current.style.cursor = "grab";
    };

    const onPointerMove = (e) => {
      if (!rotation || pointerInteracting.current === null) return;
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      phi = delta / 100;
    };

    const onWheel = (e) => {
      if (!enableZoom) return;
      e.preventDefault();
      // Implement zoom if needed
    };

    // Add event listeners
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointermove", onPointerMove);

    if (enableZoom) {
      canvasRef.current.addEventListener("wheel", onWheel);
    }

    return () => {
      globe.destroy();
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);

      if (enableZoom && canvasElement) {
        canvasElement.removeEventListener("wheel", onWheel);
      }
    };
  }, [options, autoRotate, enableZoom, rotation, rotationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{
        width: "100%",
        height: "100%",
        contain: "layout paint size",
        opacity: 0.8,
        touchAction: "none",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
}
