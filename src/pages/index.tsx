import React from "react";
import { Helmet } from "react-helmet";
import { Hero, Football, Slider } from "../components";
import "./../styles/index.scss";

export default () => (
  <>
    <Helmet>
      <title>Ashleigh Simonelli - Code Expert</title>
    </Helmet>
    <Hero />
    <section className="section" id="about-me">
      <div className="container">
        <div className="columns is-vcentered is-centered">
          <div className="column is-4">
            <img src="https://instagram.flhr4-2.fna.fbcdn.net/v/t51.2885-15/e35/92828381_526969508007635_5711811657121496365_n.jpg?_nc_ht=instagram.flhr4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=kXvzMKnJ7TUAX8y3ECU&tp=1&oh=50b52a2c0d17ee4d379b14607178ab14&oe=602F3DF4" title="Ashleigh Simonelli" alt="My Photo... ...guess it didn't load..."/>
          </div>
          <div className="column is-6">
            <div className="content">
              <h4 className="title is-2">About Me</h4>
              <p>I'm Ashleigh, I'm a backend developer, app developer, consultant and amature designer. I've been building websites and systems for the best part of 10 years now.</p>
              <p>I Love TypeScript at the moment, JavaScript plus strict typing is amazing for both frontend and backend development. Making a versitile language that can easily be used across the entire system.</p>
              <h3 className="title is-5">
                What I'm good at
              </h3>
              <ul>
                <li>Bringing products to live</li>
                <li>Quirky designs</li>
                <li>Backend solutions</li>
                <li>Automation</li>
                <li>PWAs (progressive web apps)</li>
                <li>Complete solutions, front to back</li>
                <li>Integrations</li>
                <li>Cloud platforms</li>
                <li>Internet Of Things</li>
                <li>Plubic Speaking</li>
              </ul>
            </div>
            <h3 className="title is-4">Links</h3>

            <ul className="mini-links">
                <li>
                  <a href="https://colchesterdigital.org.uk/">Colchester Digital</a>
                </li>
                <li>
                  <a href="https://github.com/bashleigh">Github</a>
                </li>
                <li>
                  <a href="https://stackoverflow.com/users/1844811/bashleigh">Stackoverflow</a>
                </li>
                <li>
                  <a href="https://profile.codersrank.io/user/bashleigh/">Codersrank</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/bashleigh.sh/">Insta</a>
                </li>
                <li>
                  <a href="https://www.facebook.com/ashleigh.simonelliWeb">Facebook Page</a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="section is-primary-900" id="my-work">
      <h2 className="title has-text-centered">My Work</h2>
    </section>
    <Slider />
    <Football />
  </>
);
