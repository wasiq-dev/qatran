import { useState } from 'react';

const ProductImage = ({ src, alt, className = '', imgClassName = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-64 object-cover transition-opacity duration-300 ${imgClassName} ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;

