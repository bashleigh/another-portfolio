import React, { FC, useState } from 'react'

import './carousel.scss'

const CarouselButtons: FC<{ active: number, count: number, onClick: (index: number) => void }> = ({ count, onClick, active }) => {
  return (
    <div className='carousel-buttons'>
      {Array.from(Array(count).keys()).map((i) => (<a className={active === i ? 'active' : ''} key={`carousel-button-${i}`} href='#' onClick={event => {
        event.preventDefault()
        onClick(i)
      }}></a>))}
    </div>
  )
}

export const Carousel: FC = ({ children }) => {
  const amount = React.Children.count(children)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  
  const previous = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const next = () => {
    if (currentIndex < (amount - 1)) setCurrentIndex(currentIndex + 1)
  }

  const goTo = (index: number) => setCurrentIndex(index)

  return (
    <div className='carousel is-fullheight'>
      <div className='slider' style={{ width: `${100 * amount}vw`, transform: `translateX(-${(currentIndex) * 100}vw)` }}>
        {React.Children.map(children, (child, index) => (
          <div className='slide' key={`slide-${index}`}>
            {child}
          </div>
        ))}
      </div>
      <button className='slide-button previous' onClick={() => {
        previous()
      }}>&lt;</button>
      <button className='slide-button next' onClick={() => {
        next()
      }}>&gt;</button>
      <CarouselButtons active={currentIndex} count={amount} onClick={goTo} />
    </div>
  )
}
