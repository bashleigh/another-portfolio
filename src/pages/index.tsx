import React from "react";
import { Helmet } from "react-helmet";
import { Hero } from "../components";
import "./../styles/index.scss";

export default () => (
  <>
    <Helmet>
      <title>Ashleigh Simonelli - Code Expert</title>
    </Helmet>
    <Hero />
    <section className="section">
      <div className="container">
        <div className="columns is-vcentered is-centered">
          <div className="column is-6">
            <h2 className="title">About Me</h2>
          </div>
        </div>
      </div>
    </section>
  </>
);
