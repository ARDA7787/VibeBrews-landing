import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * ContinuousImage - Apple-style image loading with blur-up effect
 * Images emerge from a blurred state rather than popping in abruptly
 */
export default function ContinuousImage({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  ...props 
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {/* Skeleton shimmer - only shows before load */}
      {!loaded && !error && (
        <motion.div
          className="absolute inset-0 bg-white/[0.03]"
          initial={{ opacity: 1 }}
          animate={{ opacity: loaded ? 0 : 1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: 'linear'
            }}
          />
        </motion.div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03]">
          <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      {/* Actual image with blur-up emergence */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
        animate={{
          opacity: loaded ? 1 : 0,
          filter: loaded ? 'blur(0px)' : 'blur(20px)',
          scale: loaded ? 1 : 1.1
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1] // Apple's ease-out-expo
        }}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        {...props}
      />
    </div>
  )
}
