import React, { FC } from "react"
import "./glitch-image.scss"

export const GlitchImage: FC<{
  src: string
  title?: string
  alt?: string
  delay?: number
  duration?: number
}> = ({ src, delay, duration, title, alt }) => {
  return (
    <div className="glitch-image">
      <img src={src} title={title} alt={alt} />
      <img
        className="blue-image"
        src={src}
        title={title}
        alt={alt}
        style={{
          animationDelay: `-${delay || 0}s`,
          animationDuration: `${duration || 5}s`,
        }}
      />
      <img
        className="red-image"
        src={src}
        title={title}
        alt={alt}
        style={{
          animationDelay: `-${delay || 0}s`,
          animationDuration: `${duration || 5}s`,
        }}
      />
    </div>
  )
}
