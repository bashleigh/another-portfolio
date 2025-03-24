import React, { FC, useState } from "react"
import "./styles.scss"
import { GlitchImage, GlitchText } from "./glitch"

type RoleModel = {
  name: string
  image: string
  programOrFilm: string
  description: string[]
}

const roleModels: RoleModel[] = [
  {
    name: "Dr Samantha Carter",
    image: "images/samanthacarter.webp",
    programOrFilm: "Stargate SG1",
    description: [
      "Dr Samantha Carter, a theoretical astrophysist and USAF pilot that brought quantum physics to the sci-fi action program.",
      "She would always produce an alternative solution to 'all guns blazing'",
    ],
  },
  {
    name: "Seven of Nine",
    image: "images/sevenofnine.webp",
    programOrFilm: "Star Trek: Voyager",
    description: [
      "A former Borg drone who joined the federation that struggled with assimilating with the illogical culture of humanoid species.",
      "A strong, scientifically motivated women who had a robotic like charisma.",
    ],
  },
  {
    name: "Ellen Ripley",
    image: "images/ellenripley.webp",
    programOrFilm: "Aliens",
    description: [
      "Although Ripley was not a predominately scientist or into tech I can't denied that Ripley had an influence on me.",
      "Her fight for survival in the sci-fi/horror Aliens inspired me to become a fighter no matter the situation.",
    ],
  },
  {
    name: "Ellie Sattler",
    image: "images/elliesattler.webp",
    programOrFilm: "Jurassic Park",
    description: [
      "A paleobotanist turn velociraptor bait, Ellie inspired me to pursue",
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
    image: "images/lisasimpson.webp",
    programOrFilm: "The Simpsons",
    description: [
      "As much as I hate to admit it, Lisa Simpson had a big impact on me as a child. She played the saxophone, I played guitar, she was a massive sicence nerd, I was a massive science nerd.",
    ],
  },
  {
    name: "Dexter",
    image: "images/dexter.webp",
    programOrFilm: "Dexter's Laboratory",
    description: [
      "There wasn't many strong female role models from the 90s that I could find so I've had to include Dexter!",
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
    image: "images/laracroft.jpeg",
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
      "Another Star Trek character that was robitic and struggled with human interaction. There's a theme here?",
    ],
  },
]

const RoleModelCard: FC<RoleModel> = ({
  name,
  description,
  image,
  programOrFilm,
}) => {
  const nameShouldGlitch = Math.random() * 100 > 70
  const shouldLabelGlitch = !nameShouldGlitch && Math.random() * 100 > 70
  const shouldImageGlitch = Math.random() * 100 > 70

  return (
    <div
      className="card terminal-box"
      style={{ animationDelay: `-${Math.random() * 5}s` }}
    >
      <figure className="image">
        {shouldImageGlitch ? (
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
          {nameShouldGlitch ? (
            <GlitchText delay={Math.random() * 5}>{name}</GlitchText>
          ) : (
            name
          )}
        </h2>
        <label className="label">
          {shouldLabelGlitch ? (
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

function* chunkCards<T>(arr: T[], splitBy: number): Generator<T[], void> {
  for (let index = 0; index < arr.length; index += splitBy) {
    yield arr.slice(index, index + splitBy)
  }
}

export const RoleModels = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const cardsPerPage = 3 // TODO change on screen size change
  const pages: RoleModel[][] = [
    ...chunkCards<RoleModel>(roleModels, cardsPerPage),
  ]

  return (
    <div className="role-models hero is-fullheight">
      <div className="screen-buzz"></div>
      <div className="hero-body">
        <div className="terminal-boxes">
          <div className="terminal-box">
            <h1 className="title is-size-1">
              <GlitchText>My Role Models</GlitchText>
            </h1>
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
                <button
                  onClick={() => setCurrentPage(0)}
                  className={`carousel-button${currentPage === 0 ? " active" : ""}`}
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`carousel-button${currentPage === 1 ? " active" : ""}`}
                >
                  2
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`carousel-button${currentPage === 2 ? " active" : ""}`}
                >
                  3
                </button>
                <button
                  className="carousel-button"
                  onClick={() =>
                    currentPage < 2 && setCurrentPage(currentPage + 1)
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
          <div className="">
            {pages.map((page, index) => (
              <div
                className={`role-group${index === currentPage ? " active" : ""}`}
              >
                {page.map(roleModel => (
                  <RoleModelCard key={roleModel.name} {...roleModel} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
