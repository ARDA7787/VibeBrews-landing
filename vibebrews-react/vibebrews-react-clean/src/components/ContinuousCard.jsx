import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * ContinuousCard - Apple-style card with touch-aware hover effects
 * Interactions radiate from the point of contact, not from center
 * Creates a 3D tilt effect that follows the cursor
 */
export default function ContinuousCard({
  children,
  onClick,
  className = '',
  hoverScale = 1.02,
  tiltAmount = 10,
  enableSpotlight = true,
  enableTilt = true,
  as: Component = 'div',
  ...props
}) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !enableTilt) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate tilt based on cursor distance from center
    const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -tiltAmount
    const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * tiltAmount
    
    // Spotlight position as percentage
    const spotX = ((e.clientX - rect.left) / rect.width) * 100
    const spotY = ((e.clientY - rect.top) / rect.height) * 100
    
    setTilt({ x: tiltX, y: tiltY })
    setSpotlightPos({ x: spotX, y: spotY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setSpotlightPos({ x: 50, y: 50 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const MotionComponent = motion[Component] || motion.div

  return (
    <MotionComponent
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? hoverScale : 1,
        z: isHovered ? 50 : 0
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.5
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`relative ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
      
      {/* Spotlight overlay - follows cursor */}
      {enableSpotlight && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}
          transition={{ opacity: { duration: 0.2 } }}
          style={{ borderRadius: 'inherit' }}
        />
      )}
      
      {/* Subtle border glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? `inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 30px rgba(255,255,255,0.05)`
            : 'inset 0 0 0 1px transparent'
        }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: 'inherit' }}
      />
    </MotionComponent>
  )
}
