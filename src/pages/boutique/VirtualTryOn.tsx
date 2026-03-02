'use client';

import React, { useRef, useEffect, useState } from 'react';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch {
      setError("Camera access is required for Virtual Try-On.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsCameraActive(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-orea-dark/95 backdrop-blur-md animate-in fade-in duration-500 p-4">
      <div className="relative w-full max-w-2xl aspect-[9/16] md:aspect-square bg-orea-dark overflow-hidden rounded-sm shadow-2xl">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-80" />

        {/* AR Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-32 h-32 animate-pulse">
            <img
              src="https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-1_1200x.jpg?v=1710924432"
              alt="AR Ring"
              className="w-full h-full object-contain drop-shadow-2xl mix-blend-screen"
            />
            <div className="absolute inset-0 border border-orea-champagne/30 rounded-full scale-110" />
          </div>
        </div>

        {/* UI Controls */}
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center bg-gradient-to-b from-orea-dark/60 to-transparent">
          <div>
            <h3 className="text-orea-cream text-h5 font-serif italic tracking-wide">Virtual Try-On</h3>
            <p className="text-micro text-orea-champagne/60 font-bold uppercase tracking-widest">Position your hand within view</p>
          </div>
          <button onClick={onClose} className="text-orea-cream/60 hover:text-orea-cream transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
            <p className="text-orea-cream text-body-sm font-light font-serif italic">{error}</p>
          </div>
        )}

        <div className="absolute bottom-8 left-0 right-0 px-8 flex flex-col items-center gap-4">
          <p className="text-micro text-orea-cream/50 font-bold uppercase tracking-wider text-center">Drag or pinch to adjust the ring position</p>
          <div className="w-12 h-1 bg-orea-cream/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
