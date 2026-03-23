import * as React from 'react'
import { LoaderCircle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-ember-500 text-white shadow-sharp hover:bg-ember-400 focus-visible:ring-ember-500',
        secondary:
          'bg-ink-100 text-ink-900 hover:bg-ink-200 focus-visible:ring-ink-500',
        ghost:
          'border border-ink-200 text-ink-700 hover:bg-white/70 focus-visible:ring-ink-500'
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4',
        lg: 'h-12 px-7',
        icon: 'h-11 w-11',
        'icon-sm': 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    const spinnerClassName =
      size === 'sm' || size === 'icon-sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-loading={loading ? '' : undefined}
        {...props}
      >
        <span
          className={cn(
            'inline-flex items-center justify-center gap-2 transition-opacity',
            loading && 'opacity-0'
          )}
        >
          {children}
        </span>
        <span
          aria-hidden='true'
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity',
            loading ? 'opacity-100' : 'opacity-0'
          )}
        >
          <LoaderCircle className={cn(spinnerClassName, 'animate-spin')} />
        </span>
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
