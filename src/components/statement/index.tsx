import React, { FC, useState } from 'react'
import './statement.scss'
import { Carousel } from './carousel'

export const Statement = () => {
  return (
    <div id='statement'>
      <Carousel>
        <div className="slide-body is-flex is-justify-content-center matrix">
          <section className='section is-flex is-justify-content-center is-flex-direction-column'>
          <div className="columns is-centered is-flex-direction-row-reverse">
            <div className="column">
              <h3 className="title mb-4 has-text-white is-size-1">
                &quot;Shit code is shit code, good code is good code&quot;
              </h3>
              <p className='has-text-white'>
                I don't spend my time on linkedin creating flashy word grabbing
                posts. I prefer to be productive.
              </p>
            </div>
            <div className="column">
              Imagine a beautiful picture of me here.
            </div>
          </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center thegoodthebadtheugly">
          <section className='section is-flex is-justify-content-center is-flex-direction-column'>
          <div className="columns is-centered is-flex-direction-row-reverse">
            <div className="column ">
              <h3 className="title mb-4 has-text-white is-size-1">
                "If you're going to shoot, shoot, don't talk."
              </h3>
              <small>- Tuco Benedicto Pacifico Juan Maria Ramirez</small>
              <p className='has-text-white'>
                I absolutely LOVE The good, The bad and The ugly film. So much so I've started getting into cinematography.
              </p>
              <p className='has-text-white'>I'm not particularly any good at it but I'm having fun.</p>
            </div>
          </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center">
          <section className='section is-flex is-justify-content-center is-flex-direction-column'>
          <div className="columns is-centered is-flex-direction-row-reverse">
            <div className="column ">
              <h3 className="title mb-4 has-text-white is-size-1 has-text-centered">
                I didn't think anyone would look at this slide so pretend it's amazing!
              </h3>
            </div>
          </div>
          </section>
        </div>
      </Carousel>
    </div>
  )
}
