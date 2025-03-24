import { FC, PropsWithChildren } from "react"
import "./glitch-text.scss"

export const GlitchText: FC<
  PropsWithChildren<{ delay?: number; duration?: number }>
> = ({ children, delay, duration }) => {
  return (
    <span
      data-text={children}
      className="glitch"
      style={{
        animationDelay: `${delay || 0}s`,
        animationDuration: `${duration || 5}s`,
      }}
    >
      {children}
    </span>
  )
}
