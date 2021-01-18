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
    <section className="section" id="#about-me">
      <div className="container">
        <div className="columns is-vcentered is-centered">
          <div className="column is-6">
            <h2 className="title">About Me</h2>
          </div>
        </div>
      </div>
    </section>
    <section className="section is-primary-900" id="#my-work">
      <h2 className="title has-text-centered">My Work</h2>
    </section>
    <Slider/>
    <Football />
  </>
);
