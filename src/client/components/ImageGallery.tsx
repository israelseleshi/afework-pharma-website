import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
}

export function ImageGallery({ images, title = "Product Gallery", className = "" }: ImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Calculate scroll amount based on card width + gap
  const CARD_WIDTH = 500; // 500px cards
  const GAP_WIDTH = 24; // 24px gap between cards
  const SCROLL_AMOUNT = CARD_WIDTH + GAP_WIDTH;

  // Touch event handlers for mobile and touchpad scrolling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    isDragging.current = false;
    setIsAutoScrollPaused(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollWrapperRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = touchStartX.current - touch.clientX;
    const deltaY = touchStartY.current - touch.clientY;
    
    // Determine if this is a horizontal scroll gesture
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isDragging.current = true;
      e.preventDefault(); // Prevent vertical scrolling
      
      // Scroll the container
      scrollWrapperRef.current.scrollLeft += deltaX * 0.8; // Smooth scrolling factor
      touchStartX.current = touch.clientX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, 2000);
  }, []);

  // Enhanced wheel event for touchpad horizontal scrolling
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!scrollWrapperRef.current) return;
    
    // Check if it's a horizontal scroll (shift+wheel or touchpad horizontal)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      setIsAutoScrollPaused(true);
      
      // Use deltaX for horizontal scrolling, or deltaY with shift key
      const scrollDelta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      scrollWrapperRef.current.scrollLeft += scrollDelta;
      
      // Resume auto-scroll after a delay
      setTimeout(() => {
        setIsAutoScrollPaused(false);
      }, 2000);
    }
  }, []);

  // Mouse drag functionality for desktop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollWrapperRef.current) return;
    
    isDragging.current = true;
    touchStartX.current = e.clientX;
    setIsAutoScrollPaused(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollWrapperRef.current) return;
      
      const deltaX = touchStartX.current - e.clientX;
      scrollWrapperRef.current.scrollLeft += deltaX * 0.8;
      touchStartX.current = e.clientX;
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      setTimeout(() => {
        setIsAutoScrollPaused(false);
      }, 2000);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  // Auto-scroll functionality (now with pause capability)
  useEffect(() => {
    if (isAutoScrollPaused) return;
    
    const autoScroll = () => {
      if (scrollWrapperRef.current && !isAutoScrollPaused) {
        const container = scrollWrapperRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll) {
          // Reset to beginning when reaching the end
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scroll to next image
          container.scrollTo({
            left: container.scrollLeft + SCROLL_AMOUNT,
            behavior: 'smooth'
          });
        }
      }
    };

    // Start auto-scroll with 3-second interval
    const intervalId = setInterval(autoScroll, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [SCROLL_AMOUNT, isAutoScrollPaused]);

  const openModal = (image: GalleryImage) => {
    // Only open modal if not dragging
    if (!isDragging.current) {
      setSelectedImage(image);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  // Manual scroll functions
  const scrollLeft = () => {
    if (scrollWrapperRef.current) {
      setIsAutoScrollPaused(true);
      scrollWrapperRef.current.scrollTo({
        left: scrollWrapperRef.current.scrollLeft - SCROLL_AMOUNT,
        behavior: 'smooth'
      });
      setTimeout(() => setIsAutoScrollPaused(false), 2000);
    }
  };

  const scrollRight = () => {
    if (scrollWrapperRef.current) {
      setIsAutoScrollPaused(true);
      scrollWrapperRef.current.scrollTo({
        left: scrollWrapperRef.current.scrollLeft + SCROLL_AMOUNT,
        behavior: 'smooth'
      });
      setTimeout(() => setIsAutoScrollPaused(false), 2000);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={`max-w-5xl mx-auto px-6 ${className}`}>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 pb-2">
        {title}
      </h2>
      
      {/* Gallery Container */}
      <div className="overflow-hidden relative">
        {/* Scroll Instructions */}
        <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          👈 Scroll or drag to browse 👉
        </div>
        
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Scroll Interaction Indicator */}
        {isAutoScrollPaused && (
          <div className="absolute top-2 right-2 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Manual Scroll Active
          </div>
        )}
        
        {/* Scrollable Wrapper */}
        <div 
          ref={scrollWrapperRef}
          className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-6 py-4 cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-[500px] h-[500px] snap-center">
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] w-full h-full flex flex-col">
                <div className="w-full flex-1 bg-gray-100 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="max-w-full max-h-full object-contain cursor-pointer"
                    onClick={() => openModal(image)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/400x300/e0f2f1/0f766e?text=Image+Load+Fail';
                    }}
                  />
                </div>
                <div className="h-[45px] flex flex-col justify-center flex-shrink-0">
                  <p className="text-base font-semibold text-gray-900 truncate">{image.title}</p>
                  <p className="text-sm text-gray-500 truncate">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md transition-opacity duration-300 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          {/* Modal Content Container */}
          <div className="relative bg-white p-6 rounded-xl shadow-2xl max-w-full md:max-w-xl lg:max-w-2xl mx-auto transform scale-100 transition-transform duration-300 overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 p-2 bg-white rounded-full text-gray-600 hover:text-red-600 hover:bg-gray-100 transition focus:outline-none z-20"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Zoomed Image */}
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[70vh] object-contain w-full rounded-lg mx-auto"
            />
            
            {/* Image Caption */}
            <p className="mt-4 text-center text-xl font-bold text-gray-800 border-b pb-4">
              {selectedImage.title} ({selectedImage.subtitle})
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
