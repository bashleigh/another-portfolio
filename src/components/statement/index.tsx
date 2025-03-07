import React, { FC, useState } from "react"
import "./statement.scss"
import { Carousel } from "./carousel"

export const Statement = () => {
  return (
    <div id="statement">
      <Carousel>
        <div className="slide-body is-flex is-justify-content-center matrix">
          <section className="section is-flex is-justify-content-center is-flex-direction-column">
            <div className="columns is-centered is-flex-direction-row-reverse">
              <div className="column content">
                <h3 className="title mb-4 has-text-white is-size-1">
                  &quot;You must choose. The working code or the poor
                  code.&quot;
                </h3>
                <p className="has-text-white">
                  I don't spend my time on linkedin creating flashy word
                  grabbing posts. I prefer to be productive.
                </p>
              </div>
              <div className="column">
                Imagine a beautiful picture of me here.
              </div>
            </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center johnnyfive">
          <section className="section is-flex is-justify-content-center is-flex-direction-column is-flex-grow-1">
            <div className="columns is-centered is-flex-direction-row-reverse">
              <div className="column is-6 is-offset-4 blur-card content">
                <h3 className="title mb-4 has-text-white is-size-1">
                  "NO DISASSEMBLE"
                </h3>
                <p className="has-text-white">
                  Every kid born in the 80s wanted a Johnny five. I was born in
                  the 90s so I have no idea why I wanted to build a Johnny 5.
                </p>
                <p className="has-text-white">
                  Unfortunately I lived in the UK as a kid and had to settle for
                  cybot and Robot Wars.
                </p>
                <p className="has-text-white">
                  Which is probably why I ended up in software.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center virus">
          <section className="section is-flex is-justify-content-center is-flex-direction-column">
            <div className="columns is-centered">
              <div className="column is-6 content">
                <h3 className="title mb-4 has-text-white is-size-1 is-silkscreen">
                  "YOU ARE VIRUS"
                </h3>
                <p className="has-text-white">
                  If you haven't noticed by now, this site is heavily inspired
                  by 'tech' films and media. The terminal I built from an idea
                  of mashing the film Virus and Rick and Morty.
                </p>
                <p className="has-text-white">
                  Looking back on it, films and Tv shows had a lot of influence
                  on my choices in career as a kid. Robot Wars, Virus,
                  Independence Day, Short Circuit & The Terminator.
                </p>
              </div>
              <div className="column is-6"></div>
            </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center terminator">
          <section className="section is-flex is-justify-content-center is-flex-direction-column is-flex-grow-1">
            <div className="columns is-centered">
              <div className="column is-6 content blur-card">
                <h3 className="title mb-4 has-text-white is-size-1 has-text-centered">
                  &quot;You have been terminated&quot;
                </h3>
                <p className="has-text-white">
                  If you've never heard of the programming language{" "}
                  <a target="_blank" href="https://lhartikk.github.io/ArnoldC/">
                    ArnoldC
                  </a>{" "}
                  you should check it out.
                </p>
                <p className="has-text-white">
                  When you click the link, feel free to say &quot;I'll be
                  back&quot;. Don't milk it though.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center gizmo">
          <section className="section is-flex is-justify-content-center is-flex-direction-column is-flex-grow-1">
            <div className="columns is-centered">
              <div className="column is-6 content blur-card">
                <h3 className="title mb-4 has-text-white is-size-1 has-text-centered">
                  Gizmos & Gadgets
                </h3>
                <p className="has-text-white">
                  I really wouldn't have become a developer without a game such
                  as Gizmos and Gadgets. Remember playing this at 6 years old on
                  windows 95. To unlock each door in the game you had to solve a
                  logic puzzle. Those puzzles have stuck with me all these
                  years!
                </p>
              </div>
            </div>
          </section>
        </div>
      </Carousel>
    </div>
  )
}
