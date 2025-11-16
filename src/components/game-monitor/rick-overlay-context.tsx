import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react"

export type RickExpression =
  | "normal"
  | "panic"
  | "excited"
  | "sarcastic"
  | "showoff"

interface RickOverlayContextType {
  narration: string | null
  expression: RickExpression
  overlayPosition: "top-left" | "top-center" | "bottom-right"
  setOverlayPosition: (
    position: "top-left" | "top-center" | "bottom-right",
  ) => void
  showRick: (
    narration: string,
    expression?: RickExpression,
    duration?: number,
  ) => void
  hideRick: () => void
}

const RickOverlayContext = createContext<RickOverlayContextType | undefined>(
  undefined,
)

export const RickOverlayProvider: React.FC<{
  children: React.ReactNode
  initialOverlayPosition: "top-left" | "top-center" | "bottom-right"
}> = ({ children, initialOverlayPosition }) => {
  const [narration, setNarration] = useState<string | null>(null)
  const [expression, setExpression] = useState<RickExpression>("normal")
  const [overlayPosition, setOverlayPosition] = useState<
    "top-left" | "top-center" | "bottom-right"
  >(initialOverlayPosition || "bottom-right")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showRick = useCallback(
    (
      narration: string,
      expression: RickExpression = "normal",
      duration: number = 4000,
    ) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      // Set the new narration and expression
      setNarration(narration)
      setExpression(expression)

      // Auto-hide after duration
      timeoutRef.current = setTimeout(() => {
        setNarration(null)
        timeoutRef.current = null
      }, duration)
    },
    [],
  )

  const hideRick = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setNarration(null)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <RickOverlayContext.Provider
      value={{
        narration,
        expression,
        showRick,
        hideRick,
        overlayPosition,
        setOverlayPosition,
      }}
    >
      {children}
    </RickOverlayContext.Provider>
  )
}

export const useRickOverlay = () => {
  const context = useContext(RickOverlayContext)
  if (context === undefined) {
    throw new Error("useRickOverlay must be used within a RickOverlayProvider")
  }
  return context
}
