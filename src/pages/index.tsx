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
            <h1>g</h1>
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
