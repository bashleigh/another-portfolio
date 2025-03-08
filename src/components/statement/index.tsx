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
                <h3 className="title mb-4 has-text-white is-size-1 has-text-shadow">
                  &quot;Never send a human to do a machine's job.&quot;
                </h3>
                <p className="has-text-white has-text-weight-semibold has-text-shadow">
                  I often find myself asking the question &quot;How did I end up
                  here?&quot;. Well my friend, this carousel will looking into
                  the films, games and programs that influenced me as a kid to
                  get into tech.
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
                <p className="has-text-white has-text-weight-medium">
                  Every kid born in the 80s wanted a Johnny five. I was born in
                  the 90s so I have no idea why I wanted to build a Johnny 5.
                </p>
                <p className="has-text-white has-text-weight-medium">
                  Unfortunately I lived in the UK as a kid and had to settle for
                  cybot and Robot Wars.
                </p>
                <p className="has-text-white has-text-weight-medium">
                  Which is probably why I ended up with a fasination for
                  electronic and software.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center robotwars">
          <section className="section is-flex is-justify-content-center is-flex-direction-column is-flex-grow-1">
            <div className="columns is-centered is-flex-direction-row-reverse">
              <div className="column is-6 content blur-card">
                <h3 className="title mb-4 has-text-white is-size-1 has-text-centered">
                  "3, 2, 1, ACTIVATE"
                </h3>
                <p className="has-text-white has-text-weight-medium has-text-centered">
                  Every night after the Simpsons it was Robot Wars time! The
                  iconic robots and presenter eventually lead my Dad to buy
                  myself and my sister the iRobot magazines. I kept up with the
                  magazines each week until I built my Cybot!
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center virus">
          {/* <div className="alarm"></div>
          <div className="alarm right"></div> */}
          <section className="section is-flex is-justify-content-center is-flex-direction-column">
            <div className="columns is-centered">
              <div className="column is-6 content">
                <h3 className="title mb-4 has-text-white is-size-1 is-silkscreen has-text-shadow">
                  &quot;YOU ARE VIRUS&quot;
                </h3>
                <p className="has-text-white has-text-weight-medium has-text-shadow">
                  If you haven't noticed by now, I've tried to apply the media
                  that influenced me into the design of this site adding a bit
                  of my humour and personality. The terminal (if you're on
                  desktop) I built from an idea of mashing the film Virus and
                  Rick and Morty.
                </p>
                <p className="has-text-white has-text-weight-medium has-text-shadow">
                  Virus was a not well known horror film from 1999 where an
                  'alien entity' had somehow been downloaded onto a Russian
                  surveillance vessel at sea. The entity treated the humans
                  aboard as a 'virus' and decided to use them as spare parts.
                </p>
              </div>
              <div className="column is-6"></div>
            </div>
          </section>
        </div>
        <div className="slide-body is-flex is-justify-content-center terminator">
          <section className="section is-flex is-justify-content-center is-flex-direction-column is-flex-grow-1">
            <div className="columns is-centered">
              <div className="column is-6 content">
                <h3 className="title mb-4 has-text-white is-size-1 has-text-centered has-text-shadow">
                  &quot;You have been terminated&quot;
                </h3>
                <p className="has-text-white has-text-weight-medium has-text-shadow">
                  If you've never heard of the programming language{" "}
                  <a target="_blank" href="https://lhartikk.github.io/ArnoldC/">
                    ArnoldC
                  </a>{" "}
                  you should check it out.
                </p>
                <p className="has-text-white has-text-weight-medium has-text-shadow">
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
                <p className="has-text-white has-text-weight-medium">
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
