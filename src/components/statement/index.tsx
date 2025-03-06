import React from 'react'
import './statement.scss'

export const Statement = () => {
  return (
    <div id='statement' className="hero is-fullheight is-primary is-black">
      <div className="hero-body is-flex is-justify-content-center">
        <section className='section'>
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
    </div>
  )
}
