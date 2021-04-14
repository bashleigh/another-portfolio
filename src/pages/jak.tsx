import React from "react";
import { Helmet } from "react-helmet";
import "./../styles/index.scss";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPhone, faStar } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faReact } from '@fortawesome/free-brands-svg-icons';

export default ({ data }) => (
  <>
  <Helmet>
      <title>Ashleigh Simonelli - Jak the Bossman Recruiter</title>
      <meta
        name="description"
        content="This is Jak. A recruiter that found me on linkedin."
      />
      <meta
        name="keywords"
        content="Jak Heer, Recruiter, React, JavaScript, TypeScript, Redux"
      />
    </Helmet>
    <section className="section">
      <Link to="/"><FontAwesomeIcon icon={faArrowLeft}/> Back to me - because that's what you came here for...</Link>
    </section>
    <section className="section">
      <div className="columns is-vcentered is-centered is-reversed">
        <div className="column is-4">
          <div className="content">
            <h1 className="title has-text-primary is-1">This is Jak</h1>
            <h3 className="subtitle">A recruiter for The React Hub</h3>
            <div className="star-container">
              <div className="stars">
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
              </div>
              <small className="">
                - Ashleigh's review
              </small>
            </div>
            <div className="content">
              <p>He's been a great recruiter for me and secured me a job at Reapit! I built this page just for him to show you how he can be beneficial for other devs!</p>
              <p>Jak is very friendly. Him and I have become fairly close friends over the course of the month we've been talking to each other trying to find myself a React/TypeScript job.</p>
            </div>
            <div className="tags">
              <a className="tag" href="https://www.linkedin.com/in/jak-heer-b17bb4120/"><FontAwesomeIcon className="ico" icon={faLinkedin}/> Linkedin</a>
              <a className="tag" href="https://thereacthub.com/reach-us.php">The React Hub</a>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <Img
            className="img is-rounded"
            fluid={data.jak.childImageSharp.fluid}
            title="Jak Heer"
            alt="Jak Heer's photo"
          />
        </div>
      </div>
      <h4 className="title has-text-centered">Below are some things I've found out about Jak</h4>
    </section>
    <section className="section is-dark">
      <div className="columns is-vcentered is-centered">
        <div className="column is-4">
          <h5 className="title">Unfortunately Jak supports Arsenal</h5>
          <h6 className="subtitle">But it's ok, he's fine with them being 10th. I think?</h6>
        </div>
        <div className="column is-4">
          <Img
            fluid={data.disgusting.childImageSharp.fluid}
            title="Disgusting club logo"
            alt="Don't worry if it didn't load. This club doesn't matter and shouldn't be in north London"
          />
        </div>
      </div>
    </section>
    <section className="section">
      <div className="columns is-reversed is-vcentered is-centered">
        <div className="column is-4">
          <h5 className="title">He sprained his ankle the first day back at football</h5>
          <h6 className="subtitle">Might be a bit dramatic</h6>
        </div>
        <div className="column is-4">
          <Img
            fluid={data.mustafi.childImageSharp.fluid}
            title="Jak rolling around on the floor injured"
            alt="Jak rolling around on the floor being injured"
          />
          <small>(This is a re-enactment)</small>
        </div>
      </div>
    </section>
    <section className="section is-dark">
      <div className="columns is-vcentered is-centered">
        <div className="column is-4">
          <h5 className="title">Don't take his advice on the grand national</h5>
          <h6 className="subtitle">I lost £1 betting on a horse he recommended!</h6>
        </div>
        <div className="column is-4">
          <Img
              fluid={data.grandNational.childImageSharp.fluid}
              title="Mr Malarkey Grand National"
              alt="Grand National, mr Malarkey did not finish"
            />
            <small>Mr Malarkey did not finish... ...thanks Jak!</small>
        </div>
      </div>
    </section>
    <section className="hero is-primary is-large">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vecentered">
            <div className="column is-4 has-text-centered">
              <FontAwesomeIcon icon={faReact} size={"10x"} spin={true} />
            </div>
            <div className="column">
              <h5 className="title is-1">This page isn't about Jak</h5>
              <h6 className="subtitle">It's about what he can do for you!</h6>
              <div className="content">
                <p>I guarantee you he'll find you a really great job and he'll put you first before the employeers!</p>
              </div>
              <div className="buttons">
                <a className="button" href="https://www.linkedin.com/in/jak-heer-b17bb4120/"><FontAwesomeIcon className="ico" icon={faLinkedin}/> Linkedin</a>
                <a className="button" href="tel:07398946254"><FontAwesomeIcon className="ico" icon={faPhone}/> Call him</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export const query = graphql`
  query {
    jak: file(relativePath: { eq: "jak.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    disgusting: file(relativePath: { eq: "disgusting.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    mustafi: file(relativePath: { eq: "shkodran-mustafi.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    grandNational: file(relativePath: { eq: "grand-national.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`;
