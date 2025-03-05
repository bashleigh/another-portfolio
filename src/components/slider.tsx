import React, { useState } from "react"
import "./slider.scss"
import { useSwipeable } from "react-swipeable"
import Img from "gatsby-image"
import { graphql, StaticQuery } from "gatsby"
import { slides, Slide as SlideType } from "./slides"

const stringToHex = (string: string): string => {
  const indexes = "abcdefghijklmnopqrstuvwxyz".split("")
  const r = string.split("").reduce((num, char) => {
    num = num + indexes.indexOf(char)

    return num
  }, 0)

  const float = parseFloat("0." + (r * r * 1000).toString().replace(/^0/, ""))
  return "#" + Math.floor(float * 16777215).toString(16)
}

const Slide = (
  props: SlideType & { isActive: boolean; onClick: () => void; image?: any },
) => {
  const [showDesc, setShowDesc] = useState<boolean>(false)
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
                event.preventDefault()
                setShowDesc(!showDesc)
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
  )
}

export const Slider = () => {
  const [active, setActive] = useState<number>(0)
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => active < slides.length - 1 && setActive(active + 1),
    onSwipedRight: () => active > 0 && setActive(active - 1),
  })

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
          lineup: file(relativePath: { eq: "lineup.png" }) {
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
          pospal: file(relativePath: { eq: "pospal.png" }) {
            childImageSharp {
              fluid(maxWidth: 1900) {
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
                    setIsMenuActive(!isMenuActive)
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
                            event.preventDefault()
                            setActive(index)
                            setIsMenuActive(!isMenuActive)
                          }}
                        >
                          <span className="slide-status">
                            <span
                              className={`status is-${slide.status.replace(
                                " ",
                                "-",
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
                    setActive(index)
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    />
  )
}
