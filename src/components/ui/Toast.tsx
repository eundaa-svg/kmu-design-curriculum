import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useToastStore } from '../../store/useToastStore'

const ICONS = {
  success: <CheckCircle size={18} style={{ color: 'var(--color-accent-green)', flexShrink: 0 }} />,
  error:   <XCircle    size={18} style={{ color: 'var(--color-accent-red)',   flexShrink: 0 }} />,
  info:    <Info       size={18} style={{ color: 'var(--color-accent-blue)',  flexShrink: 0 }} />,
}

export default function ToastContainer() {
  const { toasts, remove } = useToastStore()

  return (
    <div
      aria-live="polite"
      aria-label="알림"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            role="alert"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              padding: '12px 16px',
              minWidth: 240,
              maxWidth: 360,
            }}
          >
            {ICONS[t.type]}
            <span
              style={{
                flex: 1,
                fontFamily: 'var(--font-family)',
                fontSize: 14,
                color: 'var(--color-text-primary)',
                lineHeight: '20px',
              }}
            >
              {t.message}
            </span>
            <button
              onClick={() => remove(t.id)}
              aria-label="닫기"
              style={{
                flexShrink: 0,
                width: 24,
                height: 24,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                transition: 'background 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
