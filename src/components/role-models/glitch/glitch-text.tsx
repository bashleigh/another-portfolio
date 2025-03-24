import { FC, PropsWithChildren } from "react"
import "./styles.scss"

export const GlitchText: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <span data-text={children} className="glitch">
      {children}
    </span>
  )
}
