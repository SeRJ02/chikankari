import React, { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  /** Classes for the wrapper (set width/height/rounding here). */
  className?: string;
  /** Extra classes for the <img> itself (e.g. hover transforms). */
  imgClassName?: string;
  /** Load immediately instead of lazily — use for above-the-fold images. */
  eager?: boolean;
}

/**
 * Image with a skeleton placeholder while loading, a fade-in on load,
 * native lazy loading, and a graceful fallback when the source fails.
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  eager = false,
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // Reset when the source changes so the skeleton shows for the new image.
  useEffect(() => {
    setStatus('loading');
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {status === 'error' ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <ImageOff size={28} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
