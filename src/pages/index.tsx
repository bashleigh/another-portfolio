import React from "react";
import { Helmet } from "react-helmet";
import { Football, Hero, Slider, Contact } from "../components";
import "./../styles/index.scss";

export default () => (
  <>
    <Helmet>
      <title>Ashleigh Simonelli - Code Expert</title>
    </Helmet>
    <Hero />
    <section className="section" id="business">
      <div className="container">
        <div className="columns is-vcentered is-centered">
          <div className="column is-6 has-text-right">
            <h3 className="title is-1 has-text-primary">Let's Talk Business</h3>
            <h5 className="subtitle">What Can I Do For You?</h5>
            <div className="content">
              <p>With roughly 10 years experience in the tech industry, I can help you achieve your business tech goals by implementing the correct solutions.</p>
              <p></p>
              <button className="button is-primary is-rounded">Contact Me</button>
            </div>
          </div>
          <div className="column content">
            <ul>
              <li>Contracting</li>
              <li>Mentorship</li>
              <li>Design Prototyping</li>
              <li>Workflow Design</li>
              <li>Automation Design and Impelmentation</li>
              <li>Arhitecture Design and Implementation</li>
              <li>Open Source Collaboration</li>
              <li>Technical Consultant</li>
              <li>Technical Advice</li>
              <li>Chat bot and NLP Development</li>
            </ul>
            <p className="is-rainbow-text">To name a few</p>
          </div>
        </div>
      </div>
    </section>
    <section className="section is-primary-100" id="about-me">
      <Football />
      <div className="container">
        <div className="columns is-vcentered is-centered">
          <div className="column is-4">
            <img
              src="https://instagram.flhr4-2.fna.fbcdn.net/v/t51.2885-15/e35/92828381_526969508007635_5711811657121496365_n.jpg?_nc_ht=instagram.flhr4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=kXvzMKnJ7TUAX8y3ECU&tp=1&oh=50b52a2c0d17ee4d379b14607178ab14&oe=602F3DF4"
              title="Ashleigh Simonelli"
              alt="My Photo... ...guess it didn't load..."
            />
          </div>
          <div className="column is-6">
            <div className="content">
              <h4 className="title is-2">About Me</h4>
              <p>
                I'm Ashleigh, I'm a backend developer, app developer, consultant
                and amature designer. I've been building websites and systems
                for the best part of 10 years now.
              </p>
              <p>
                I Love TypeScript at the moment, JavaScript plus strict typing
                is amazing for both frontend and backend development. Making a
                versitile language that can easily be used across the entire
                system.
              </p>
              <h3 className="title is-5">What I'm good at</h3>
              <ul>
                <li>Bringing products to live</li>
                <li>Quirky designs</li>
                <li>Backend solutions</li>
                <li>Automation</li>
                <li>Putting personality into services</li>
                <li>PWAs (progressive web apps)</li>
                <li>Complete solutions, front to back</li>
                <li>Integrations</li>
                <li>Cloud platforms</li>
                <li>Internet Of Things</li>
                <li>Public Speaking</li>
              </ul>
            </div>
            <h3 className="title is-4">Links</h3>

            <ul className="mini-links">
              <li>
                <a href="https://colchesterdigital.org.uk/speakers/ashleigh-simonelli/">
                  Colchester Digital
                </a>
              </li>
              <li>
                <a href="https://github.com/bashleigh">Github</a>
              </li>
              <li>
                <a href="https://stackoverflow.com/users/1844811/bashleigh">
                  Stackoverflow
                </a>
              </li>
              <li>
                <a href="https://profile.codersrank.io/user/bashleigh/">
                  Codersrank
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/bashleigh.sh/">Insta</a>
              </li>
              <li>
                <a href="https://www.facebook.com/ashleigh.simonelliWeb">
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <Slider />
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-3">
            <div className="content">
            <h2 className="title">Technologies I know</h2>
            <h5 className="title is-5">Languages</h5>
            <ul>
              <li>TypeScript</li>
              <li>JavaScript + node.js</li>
              <li>PHP</li>
              <li>CSS</li>
              <li>SASS/SCSS</li>
              </ul>
              <h5 className="title is-5">Databases</h5>
              <ul>
              <li>Postgres</li>
              <li>MySQL</li>
              <li>MongoDB</li>
              <li>RTDB</li>
              <li>DynamoDB</li>
            </ul>
            </div>
          </div>
          <div className="column is-3">
            <div className="content">
            <h5 className="title is-5">Frameworks</h5>
              <ul>
              <li>NestJS</li>
              <li>React</li>
              <li>React Native</li>
              <li>Express.js</li>
              <li>Laravel</li>
              <li>Kraken</li>
              <li>Flutter</li>
              <li>Next</li>
              <li>Nuxt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Contact />
  </>
);
