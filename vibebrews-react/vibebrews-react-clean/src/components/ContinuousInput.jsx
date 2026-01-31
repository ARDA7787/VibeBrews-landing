import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ContinuousInput - Apple-style input with focus expansion from click point
 * Focus state radiates from where user clicked, errors shake the input
 */
export default function ContinuousInput({
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  disabled,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const [clickPoint, setClickPoint] = useState({ x: 50, y: 50 })
  const inputRef = useRef(null)

  const handleFocus = (e) => {
    // Calculate click point relative to input for radial focus effect
    if (inputRef.current && e.nativeEvent) {
      const rect = inputRef.current.getBoundingClientRect()
      const clientX = e.nativeEvent.clientX || rect.left + rect.width / 2
      const clientY = e.nativeEvent.clientY || rect.top + rect.height / 2
      
      setClickPoint({
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100
      })
    }
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <div className="relative">
      {/* Focus expansion effect - radiates from click point */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          opacity: focused ? 1 : 0,
          background: focused
            ? `radial-gradient(ellipse at ${clickPoint.x}% ${clickPoint.y}%, rgba(255,255,255,0.08) 0%, transparent 70%)`
            : 'transparent'
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Border glow animation */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: error
            ? '0 0 0 2px rgba(255,69,58,0.5), 0 0 20px rgba(255,69,58,0.2)'
            : focused
              ? '0 0 0 2px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.05)'
              : '0 0 0 1px rgba(255,255,255,0.1)'
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Actual input with shake animation on error */}
      <motion.input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        animate={error ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
        transition={error ? { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] } : {}}
        className={`
          relative z-10 w-full bg-white/5 border border-transparent rounded-full
          px-5 py-3 text-white text-sm
          placeholder:text-white/40
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? 'border-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />

      {/* Error message with slide animation */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-red-400 mt-2 ml-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
