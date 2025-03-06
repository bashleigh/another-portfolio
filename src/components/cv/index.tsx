import React, { FC, useState } from "react"
import "./cv.scss"
import { Bingo } from './bingo'

const cells = {
  languages: [
    "JavaScript",
    "TypeScript",
    "PHP",
    "Python",
    "Dart",
    "Pascal",
    "C++",
    "CSS/SCSS",
  ],
  frameworks: [
    "ExpressJS",
    "NestJS",
    "React",
    "React Native",
    "Jest",
    "Flutter",
    "Symfony",
    "Laravel",
  ],
  libraries: ["NodeJS"],
  databases: ["MySQL", "PostGresSQL", "MongoDB", "DynamoDB"],
  protocols: [
    "I2C",
    "SPI",
    "AMQP",
    "MQTT",
    "HTTP",
    "HTTPS",
    "WS",
    "WSS",
    "SOAP",
    "JWT",
    "RPC",
    "gRPC",
    "TCP",
  ],
  "cloud platforms": ["AWS", "Google Cloud Platform"],
  methodologies: ["REST", "SOLID"],
}

const WhatIKnow: FC<{ searchPhrase: string }> = ({ searchPhrase }) => {
  const colours = ["primary", "danger", "warning", "info", "link"]

  return (
    <div id="what-i-know" className="hero is-halfheight">
      <div className="hero-body">
        <div className="container">
          <div
            className={`grid is-col-min-12 is-row-gap-6${searchPhrase !== "" ? " searching" : ""}`}
          >
            {Object.keys(cells).map(key => (
              <div className="cell" key={key}>
                <h4
                  className={`subtitle has-text-${colours[Math.floor(Math.random() * (colours.length - 1 + 1))]} ${cells[key].some(word => word.toLowerCase().includes(searchPhrase.toLowerCase())) ? "highlighted" : ""}`}
                >
                  {key}
                </h4>
                <ul>
                  {cells[key].map(word => (
                    <li
                      className={
                        word.toLowerCase().includes(searchPhrase.toLowerCase())
                          ? "highlighted"
                          : ""
                      }
                      key={`${key}-${word}`}
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const CV = () => {
  const date = new Date()
  const thisYear = date.getFullYear()
  const experienceInYears = thisYear - 2015
  const [searchPhrase, setSearchPhrase] = useState<string>("")
  const [bingoEnabled, setBingoEnabled] = useState<boolean>(false)

  return (
    <>
    <Bingo isActive={bingoEnabled} setBingoEnabled={setBingoEnabled} words={Object.values(cells).flat(1)} />
      <div className="mt-6">
        <div className="navbar">
          <div className="container">
            <h3 className="title">What do I know?</h3>
            <div className="navbar-end">
              <div className="navbar-item">
                <form>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input search"
                        placeholder="Search..."
                        value={searchPhrase}
                        onChange={event => {
                          setSearchPhrase(event.target.value)
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="navbar-item">
                <button className="button is-primary" onClick={() => setBingoEnabled(true)}>Bingo</button>
              </div>
            </div>
          </div>
        </div>
        <WhatIKnow searchPhrase={searchPhrase} />
      </div>
      <section className="hero is-halfheight is-primary">
        <div className="hero-body">
          <div>
            <h3 className="title is-size-1">Where have I been all your life?</h3>
            <div className="workplace">
              <p className="workplace-name">Reapit Ltd</p>
              <p className="jobtitle">
                Senior Platform Applications Engineer, Manager
              </p>
              <p className="is-size-7 date">05/2021 - present</p>
              <p className="description">
                At Reapit I'm responsible for building developer tools for our
                internal and customer's developers. I have successfully built a
                working dynamic CI/CD pipeline tool to deploy PWA apps to AWS
                and I'm currently planning a verison 2 capable of deploying and
                maintaining backend application solutions.
              </p>
              <p className="description">
                Despite the funky job title I'm not a manager. Within my team
                I'm almost self sufficient. However I have been supporting
                aspiring junior developers within the company by offering them
                support whenever I can.
              </p>
            </div>
            <div className="workplace">
              <p className="workplace-name">Freelance</p>
              <p className="jobtitle">CEO, of course</p>
              <p className="is-size-7 date">01/2021 - 05/2021</p>
              <p className="description">
                As a freelancer I had a various clients that I worked with to
                build and maintain their unique solutions. An interesting
                project I had was for Essex university where I built a graphical
                'speed dial' to monitor gRPC calls to a server. I also attempted
                at developing my own applications for several business ideas
                using firebase and flutter to produce multi platform apps.
              </p>
            </div>
            <div className="workplace">
              <p className="workplace-name">HomeServeNow</p>
              <p className="jobtitle">Senior Fullstack Developer</p>
              <p className="is-size-7 date">05/2020 - 12/2020</p>
              <p className="description">
                At HomeserveNow I started a project to rebuild the entire
                platform to be more performative, organised and use more
                structured methodologies such as REST, IaC, SRP, open-closed and
                others. I've also maintained and improved our mobile app, admin
                dashboard and customer facing web site. Planned, designed, built
                and published homeserve's first public library
                https://github.com/Homeservenow/serverless-aws-handler At
                HomeserveNow we used AWS, TypeScript, lambdas, cognito, react,
                react-native, SQS, SES, pusher, expo and others.
              </p>
            </div>
            <div className="workplace">
              <p className="workplace-name">Velocity Black</p>
              <p className="jobtitle">Senior JavaScript Developer</p>
              <p className="is-size-7 date">08/2019 - 04/2020</p>
              <p className="description">
                At Velocity Black I'm responsible for developing the
                infrastructure for Velocity Black's newest technology in the
                industry. I'm currently within a team of 3 and primarily build a
                variety of applications for Velocity's systems using mainly
                TypeScript with NestJS. During my time at VB I used kubernetes,
                TypeScript, Google Cloud Platform, NestJS, React and others.
              </p>
            </div>
            <div className="workplace">
              <p className="workplace-name">Wi-Q</p>
              <p className="jobtitle">Developer</p>
              <p className="is-size-7 date">05/2018 - 07/2019</p>
              <p className="description">
                At Wi-Q I develop micro services using TypeScript, PHP with
                symfony and Nodejs to deliver emails, url shortening, link click
                tracking, machine learning Facebook messenger bot to answer
                questions with defined answers. I also architectured their
                promotion handling system and their batch action/job system for
                handling serval tasks simultaneously.
              </p>
              <p className="description">
                At Wi-Q I used PHP, symfony, kubernetes, Google Cloud Platform,
                react, nodejs, express, rabbitMQ (AMQP) and others.
              </p>
            </div>
            <div className="workplace">
              <p className="workplace-name">Ansta Ltd</p>
              <p className="jobtitle">Senior Software Engineer</p>
              <p className="is-size-7 date">03/2017 - 05/2018</p>
              <p className="description">
                My time at Ansta I have delved into many new languages,
                experiences and server architecture. I've worked on maintaining
                small CMS', built native apps and PWAs to building systems
                capable of thousands of concurrent uses.
              </p>
              <p className="description">
                I'm now in a position where I'm planning, scheduling and appling
                new projects and systems within my deadlines and communicating
                with my clients and colleagues. Whilst at Ansta I used PHP,
                Laravel, Lumen, a Custom PHP framework, A custom PWA framework,
                Debian, CentOS, React, bootstrap, React-Native, Expo and
                produced a dynamic web page for Stamford Bridge's stadium
                displays.
              </p>
            </div>
            <div className="workplace">
              <p className="workplace-name">DotFive</p>
              <p className="jobtitle">Web Developer</p>
              <p className="is-size-7 date">06/2016 - 03/2017</p>
              <p className="description">
                During my time at DotFive I gained an extremely considerable
                amount of experience in Laravel and package management. I was
                tasked with assisting in the build of a property sales system
                called LegalZoom for a company called Beaumount legal. I also
                developed a wine and whiskey review based site and API. Working
                on a custom built framework written in a custom language I
                learnt a great deal of how a language and framework should not
                be maintained. A 7 year project without a goal or use is an
                extremely costly blackhole! At DotFive I used various languages
                and frameworks, mainly PHP, Laravel and jQuery.
              </p>
            </div>
            <div className="workplace">
              <p className="workplace-name">Merali Digital</p>
              <p className="jobtitle">Web Developer</p>
              <p className="is-size-7 date">10/2015 - 06/2016</p>
              <p className="description">
                My main task at Merali Digital was to maintain and updating a
                system built in Zend 1.4 for managing and documenting opticians
                test results and patients. Patients requiring attention would be
                referred to hospital via fax. During my extremely long journey
                to work I used the time to experiment with Codeigniter and other
                frameworks such as Symfony and Laravel.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hero is-link is-large">
        <div className="hero-body">
          <h2 className="title has-text-centered is-size-1">
            That's <span className="is-size-1">{experienceInYears}</span> years
            experience!
          </h2>
        </div>
      </section>
    </>
  )
}
