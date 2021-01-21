import React, { useState } from "react";
import "./slider.scss";
import { useSwipeable } from "react-swipeable";
import Img from "gatsby-image";
import { graphql, StaticQuery } from "gatsby";

enum ProjectStatus {
  ACTIVE = "active",
  CEASED = "ceased",
  ONHOLD = "on hold",
  PLANNING = "planning",
  COMPLETE = "complete",
}

type Slide = {
  status: ProjectStatus;
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
  image?: string;
};

const slides: Slide[] = [
  {
    status: ProjectStatus.ACTIVE,
    name: "Typeorm polymorphic",
    description: "A polymorphic typescript repository package for typeorm",
    technologies: ["typeorm", "typescript", "mysql"],
    link: "https://github.com/bashleigh/typeorm-polymorphic",
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "nestjs-typeorm-paginate",
    description: "A pagination function for nestjs + typeorm",
    technologies: ["nestjs", "typeorm", "mysql", "typescript"],
    link: "https://github.com/nestjsx/nestjs-typeorm-paginate",
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "nestjs-config",
    description: "A config package for nestjs based on laravel",
    technologies: ["nestjs", "typescript"],
    link: "https://github.com/nestjsx/nestjs-config",
  },
  {
    status: ProjectStatus.CEASED,
    name: "Ford & sons meat shop",
    description:
      "A quickly built click and collect website for my local butcher. Sadly the website was never published due to franchise issues. The good news however, is the site I built is still available if you wish to view it!",
    link: "https://adoring-villani-ca7b56.netlify.app/",
    technologies: ["gatsby", "typescript", "click & collect", "netlify"],
    image: "fordandsons",
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "Showelli Entertainment",
    description: "My sister's dance agency website!",
    link: "https://showelli.co.uk",
    technologies: ["gatsby", "typescript", "netlify"],
    image: "showelli",
  },
  {
    status: ProjectStatus.PLANNING,
    name: "PosPal",
    description:
      "A mobile only, next generation EPOS system for sole traders and small retailers",
    technologies: [
      "typescript",
      "gcloud",
      "google functions",
      "mysql",
      "react",
      "flutter",
      "barcodes",
      "printers",
      "bluetooth",
      "payment gateways",
      "pub/sub",
      "RTDB",
      "sqlite",
      "google messaging",
    ],
  },
  {
    status: ProjectStatus.ONHOLD,
    name: "Ruddr",
    description:
      "A PWA boat selling and buying marketplace platform. I'm planning on coming back to this and building a native app instead",
    technologies: [
      "typescript",
      "AWS EC2",
      "postgres",
      "react",
      "P2P marketplace",
    ],
    image: "ruddr",
  },
  {
    status: ProjectStatus.PLANNING,
    name: "Trino",
    description:
      "A very secret project of mine that will change the highstreet forever!",
    technologies: ["typescript", "RTDB", "sqlite", "flutter"],
  },
  {
    status: ProjectStatus.ACTIVE,
    name: "Whip Round",
    description: "A collection project",
    technologies: ["firebase", "firebase auth", "firebase store", "flutter"],
  },
];

const stringToHex = (string: string): string => {
  const indexes = "abcdefghijklmnopqrstuvwxyz".split("");
  const r = string.split("").reduce((num, char) => {
    num = num + indexes.indexOf(char);

    return num;
  }, 0);

  const float = parseFloat("0." + (r * r * 1000).toString().replace(/^0/, ""));
  return "#" + Math.floor(float * 16777215).toString(16);
};

const Slide = (
  props: Slide & { isActive: boolean; onClick: () => void; image?: any }
) => {
  const [showDesc, setShowDesc] = useState<boolean>(false);
  return (
    <div
      className={`slide ${props.isActive ? "is-active" : ""}`}
      onClick={props.onClick}
    >
      <div className={`slide-status is-${props.status.replace(" ", "-")}`}>
        {props.status}
      </div>
      {typeof props.image !== "undefined" && (
        <Img
          className="slide-image"
          fluid={props.image.childImageSharp.fluid}
          alt={props.name}
        />
      )}
      <div className="content">
        <div className="level">
          <div className="level-left">
            <h4 className="is-3">
              {props.name}{" "}
              {props.link && (
                <a target="_blank" href={props.link}>
                  View
                </a>
              )}
            </h4>
          </div>
          <div className="level-right">
            <a
              href="#"
              className="slider-description-toggle"
              onClick={event => {
                event.preventDefault();
                setShowDesc(!showDesc);
              }}
            >
              {showDesc ? "Hide" : "Show"} description
            </a>
          </div>
        </div>
        <div className={`slider-description${showDesc ? " is-active" : ""}`}>
          <p>{props.description}</p>
          {props.technologies && (
            <div className="tags">
              {props.technologies.map(tech => (
                <span
                  key={`tech-tag-${props.name}-${tech}`}
                  className="tag"
                  style={{ background: stringToHex(tech), color: "white" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Slider = () => {
  const [active, setActive] = useState<number>(0);
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => active < slides.length - 1 && setActive(active + 1),
    onSwipedRight: () => active > 0 && setActive(active - 1),
  });

  return (
    <StaticQuery
      query={graphql`
        query {
          fordandsons: file(relativePath: { eq: "fordandsons.png" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
          showelli: file(relativePath: { eq: "showelli.png" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
          ruddr: file(relativePath: { eq: "ruddr.png" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <section id="my-work" className="section is-primary-900">
            <div className="container">
              <div className="content">
                <h2 className="title is-1">My Work</h2>
                <p className="has-text-white">
                  This is a list of my current and previous projects of work.
                  Use the menu below to see project titles and their statuses.
                </p>
              </div>
              <div className={`slider-menu${isMenuActive ? " is-active" : ""}`}>
                <div
                  className="menu-title"
                  onClick={event => {
                    setIsMenuActive(!isMenuActive);
                  }}
                >
                  <span
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                  >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </span>
                  Menu
                </div>
                <div className="slider-menu-content">
                  <ul>
                    {slides.map((slide, index) => (
                      <li key={`slide-menu-${index}`}>
                        <a
                          className="menu-item"
                          href="#"
                          onClick={event => {
                            event.preventDefault();
                            setActive(index);
                            setIsMenuActive(!isMenuActive);
                          }}
                        >
                          <span className="slide-status">
                            <span
                              className={`status is-${slide.status.replace(
                                " ",
                                "-"
                              )}`}
                            ></span>
                          </span>

                          {slide.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <div id="slider" {...swipeHandlers}>
            <div
              className="slide-holder"
              style={{
                width: `${75 * slides.length}vw`,
                marginLeft: `${
                  active === 1 ? "-62.5" : -62.5 + -75 * (active - 1)
                }vw`,
              }}
            >
              {slides.map((slide, index) => (
                <Slide
                  key={`slide-${index}-${slide.name}`}
                  {...slide}
                  image={data[slide.image]}
                  isActive={index === active}
                  onClick={() => {
                    setActive(index);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    />
  );
};
