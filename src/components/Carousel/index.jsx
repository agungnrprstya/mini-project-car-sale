import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { carouselImages } from "../../assets/image/image";

function Carousel() {
  const slides = carouselImages;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured cars"
      className="relative overflow-hidden rounded-lg border border-paper-line bg-white"
    >
      <div className="relative aspect-[16/10] bg-paper">
        <img
          src={slides[currentIndex].src}
          alt={slides[currentIndex].alt}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white transition-colors duration-200 hover:bg-ink"
        >
          <BsChevronCompactLeft aria-hidden="true" size={30} />
          <span className="sr-only">Previous slide</span>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white transition-colors duration-200 hover:bg-ink"
        >
          <BsChevronCompactRight aria-hidden="true" size={30} />
          <span className="sr-only">Next slide</span>
        </button>
      </div>
      <div className="border-t border-paper-line px-4">
        <div className="flex h-11 items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-current={i === currentIndex}
              className="inline-flex h-11 items-center"
            >
              <span
                className={`block h-1.5 w-10 rounded-full transition-colors duration-200 ${
                  i === currentIndex ? "bg-signal" : "bg-ink-mute hover:bg-ink"
                }`}
              />
              <span className="sr-only">Show slide {i + 1}</span>
            </button>
          ))}
          <p aria-live="polite" className="ml-auto text-sm tabular-nums text-ink-mute">
            {currentIndex + 1} / {slides.length}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
