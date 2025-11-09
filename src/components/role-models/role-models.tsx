import React, { FC, useEffect, useState } from "react"
import "./styles.scss"
import { GlitchImage, GlitchText } from "./glitch"

const ChevronLeft: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="8 5 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ChevronRight: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="8 5 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type RoleModel = {
  name: string
  image: string
  programOrFilm: string
  description: string[]
}

const roleModels: RoleModel[] = [
  {
    name: "Dr Samantha Carter",
    image: "images/samanthacarter.png",
    programOrFilm: "Stargate SG1",
    description: [
      "Dr Samantha Carter, a theoretical astrophysicist and USAF pilot that brought quantum physics to the sci-fi action program.",
      "She would always produce an alternative solution to 'all guns blazing' that involved ",
    ],
  },
  {
    name: "Seven of Nine",
    image: "images/sevenofnine.png",
    programOrFilm: "Star Trek: Voyager",
    description: [
      "A former Borg drone who joined the federation that struggled with assimilating with the illogical culture of humanoid species.",
      "A strong, scientifically motivated woman who had a robotic like charisma.",
    ],
  },
  {
    name: "Ellen Ripley",
    image: "images/ellenripley.png",
    programOrFilm: "Aliens",
    description: [
      "Although Ripley was not a predominantly scientist or into tech I can't deny that Ripley had an influence on me.",
      "Her fight for survival in the sci-fi/horror Aliens inspired me to become a fighter no matter the situation.",
    ],
  },
  {
    name: "Ellie Sattler",
    image: "images/elliesattler.png",
    programOrFilm: "Jurassic Park",
    description: [
      "A paleobotanist turned velociraptor bait, Ellie inspired me to become a scientist and a fighter no matter the situation.",
    ],
  },
  // {
  //   name: 'Sarah Connor',
  //   image: 'images/sarahconnor.webp',
  //   programOrFilm: 'Terminator',
  //   description: [],
  // },
  {
    name: "Lisa Simpson",
    image: "images/lisasimpson.png",
    programOrFilm: "The Simpsons",
    description: [
      "As much as I hate to admit it, Lisa Simpson had a big impact on me as a child. She played the saxophone, I played guitar, she was a massive science nerd, I was a massive science nerd.",
    ],
  },
  {
    name: "Dexter",
    image: "images/dexter.png",
    programOrFilm: "Dexter's Laboratory",
    description: [
      "There weren't many strong female role models from the 90s that I could find so I've had to include Dexter!",
      "Dexter was a lonely kid that spent most of his time in his lab, planning, building and scheming.",
    ],
  },
  {
    name: "Velma Dinkley",
    image: "images/velmadinkley.png",
    programOrFilm: "Scooby Doo",
    description: [],
  },
  // {
  //   name: 'Trinity',
  //   image: 'images/trinity.jpg',
  //   programOrFilm: 'The Matrix',
  //   description: [],
  // },
  {
    name: "Lara Croft",
    image: "images/laracroft.jpg",
    programOrFilm: "Tomb Raider",
    description: [
      "Ah yes, triangle boobed Lara Croft. You didn't think you'd see her here did you? I had the demo for Tomb Raider back in 1997.",
      "I couldn't play the game properly but you could say Tomb Raider got me into computer games from a young age? I don't know, maybe I'm clutching at straws?",
    ],
  },
  {
    name: "Commander Data",
    image: "images/data.jpg",
    programOrFilm: "Star Trek: The Next Generation",
    description: [
      "Another Star Trek character that was robotic and struggled with human interaction. There's a theme here?",
    ],
  },
]

const RoleModelCard: FC<
  RoleModel & {
    hasImageGlitch: boolean
    hasTitleGlitch: boolean
    hasLabelGlitch: boolean
  }
> = ({
  name,
  description,
  image,
  programOrFilm,
  hasImageGlitch,
  hasLabelGlitch,
  hasTitleGlitch,
}) => {
  return (
    <div className="card terminal-box">
      <figure className="image">
        {hasImageGlitch ? (
          <GlitchImage
            delay={Math.random() * 10}
            src={image}
            title={`Ashleigh's role model ${name}`}
            alt={name}
          />
        ) : (
          <img src={image} title={`Ashleigh's role model ${name}`} alt={name} />
        )}
      </figure>
      <div className="content">
        <h2 className="title">
          {hasTitleGlitch ? (
            <GlitchText delay={Math.random() * 5}>{name}</GlitchText>
          ) : (
            name
          )}
        </h2>
        <label className="label">
          {hasLabelGlitch ? (
            <GlitchText delay={Math.random() * 10}>{programOrFilm}</GlitchText>
          ) : (
            programOrFilm
          )}
        </label>
        {description.map(desc => (
          <p key={desc}>{desc}</p>
        ))}
      </div>
    </div>
  )
}

const RoleModelGroup: FC<{ roleModels: RoleModel[]; isActive: boolean }> = ({
  roleModels,
  isActive,
}) => {
  const imageGlitch = roleModels.indexOf(
    roleModels[Math.floor(Math.random() * roleModels.length)],
  )
  const titleGlitch = roleModels.indexOf(
    roleModels[Math.floor(Math.random() * roleModels.length)],
  )
  const labelGlitch = roleModels.indexOf(
    roleModels[Math.floor(Math.random() * roleModels.length)],
  )

  return (
    <div className={`role-group${isActive ? " active" : ""}`}>
      {roleModels.map((roleModel, index) => (
        <RoleModelCard
          key={roleModel.name}
          {...roleModel}
          hasImageGlitch={index === imageGlitch}
          hasTitleGlitch={index === titleGlitch}
          hasLabelGlitch={index === labelGlitch}
        />
      ))}
    </div>
  )
}

function* chunkCards<T>(arr: T[], splitBy: number): Generator<T[], void> {
  for (let index = 0; index < arr.length; index += splitBy) {
    yield arr.slice(index, index + splitBy)
  }
}

const resolveCardsPerPage = (): 1 | 2 | 3 => {
  const outerWidth = window.outerWidth

  if (outerWidth <= 750) return 1
  else if (outerWidth <= 1032) return 2
  return 3
}

export const RoleModels = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [cardsPerPage, setCardsPerPage] = useState<1 | 2 | 3>(
    resolveCardsPerPage(),
  )

  const pages: RoleModel[][] = [
    ...chunkCards<RoleModel>(roleModels, cardsPerPage),
  ]

  useEffect(() => {
    const changeCardsPerPage = () => {
      const newCardsPerPage = resolveCardsPerPage()
      setCardsPerPage(newCardsPerPage)
    }
    window.addEventListener("resize", changeCardsPerPage)

    return () => window.removeEventListener("resize", changeCardsPerPage)
  }, [])

  useEffect(() => {
    // If currentPage is out of bounds after cardsPerPage changes, reset to last valid page
    if (currentPage >= pages.length && pages.length > 0) {
      setCurrentPage(pages.length - 1)
    }
  }, [pages.length, currentPage])

  return (
    <div className="role-models hero is-fullheight">
      <div className="screen-buzz"></div>
      <div className="hero-body">
        <div className="terminal-boxes">
          <div className="terminal-box">
            <h1 className="title is-size-1">My Role Models</h1>
            <p className="subtitle highlight">System Active</p>
          </div>
          <div className="terminal-box">
            <div>
              <p className="highlight blink">Control</p>

              <div className="control-buttons">
                <button
                  className="carousel-button"
                  onClick={() =>
                    currentPage > 0 && setCurrentPage(currentPage - 1)
                  }
                >
                  &lt;
                </button>
                {pages.map((_, index) => (
                  <button
                    key={`control-button-${index}`}
                    onClick={() => setCurrentPage(index)}
                    className={`carousel-button${currentPage === index ? " active" : ""}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="carousel-button"
                  onClick={() =>
                    currentPage < pages.length - 1 && setCurrentPage(currentPage + 1)
                  }
                >
                  &gt;
                </button>
              </div>
              <div className="progressbar">
                <progress />
              </div>
            </div>
          </div>
        </div>
        <div className="role-model-container">
          {pages.map((page, index) => (
            <RoleModelGroup
              key={page.map(role => role.name).join("-")}
              roleModels={page}
              isActive={index === currentPage}
            />
          ))}
        </div>
        <div className="mobile-controls">
          <button className="carousel-button" onClick={() =>
                    currentPage > 0 && setCurrentPage(currentPage - 1)
                  }>
            <ChevronLeft />
          </button>
          <button className="carousel-button" onClick={() =>
                    currentPage < pages.length - 1 && setCurrentPage(currentPage + 1)
                  }>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
