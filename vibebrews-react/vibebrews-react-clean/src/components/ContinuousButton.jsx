import { motion, AnimatePresence } from 'framer-motion'

/**
 * ContinuousButton - Apple-style button with morphing state transitions
 * States flow into each other rather than snapping
 * 
 * @param {string} state - 'idle' | 'loading' | 'success' | 'error'
 * @param {string} idleText - Text to show in idle state
 * @param {string} successText - Text to show in success state (optional)
 * @param {string} errorText - Text to show in error state (optional)
 */
export default function ContinuousButton({
  state = 'idle',
  onClick,
  disabled,
  idleText = 'Submit',
  successText = 'Done!',
  errorText = 'Try again',
  className = '',
  children,
  ...props
}) {
  const isLoading = state === 'loading'
  const isSuccess = state === 'success'
  const isError = state === 'error'

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      layout
      animate={{
        width: isLoading ? 52 : 'auto',
        backgroundColor: isSuccess ? '#30D158' : isError ? '#FF453A' : '#ffffff',
        color: isSuccess || isError ? '#ffffff' : '#000000'
      }}
      whileHover={!isLoading ? { scale: 1.02 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      transition={{
        layout: { type: 'spring', stiffness: 500, damping: 35 },
        backgroundColor: { duration: 0.2 },
        scale: { duration: 0.15 }
      }}
      className={`
        relative overflow-hidden rounded-full font-semibold
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isLoading ? 'px-0 py-3' : 'px-6 py-3'}
        ${className}
      `}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {/* Idle state */}
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            {children || idleText}
          </motion.span>
        )}

        {/* Loading state - morphs into spinner */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
            />
          </motion.div>
        )}

        {/* Success state */}
        {isSuccess && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
            {successText}
          </motion.span>
        )}

        {/* Error state */}
        {isError && (
          <motion.span
            key="error"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: [0, -8, 8, -8, 8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.15 },
              x: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
            }}
            className="flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {errorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
