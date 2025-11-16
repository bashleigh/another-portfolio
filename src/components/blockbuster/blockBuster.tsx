import "./blockbuster.scss"
import BlockbusterLogo from "./blockbuster.svg?react"

type MediaItem = {
  src: string
  alt: string
  type: "dvd" | "game"
}

const mediaItems: MediaItem[] = [
  {
    src: "images/blockbuster/matrix-dvd.webp",
    alt: "The Matrix DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/robot-wars-dvd.webp",
    alt: "Robot War DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/star-trek-first-contact-dvd.webp",
    alt: "Star Trek: First Contact DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/terminator-dvd.webp",
    alt: "Terminator 3 DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/star-trek-armada.webp",
    alt: "Star Trek: The Next Generation - The Aramda DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/virus-dvd.webp",
    alt: "Virus DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/futurama-dvd.webp",
    alt: "Futurama DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/star-trek-next-generation-dvd.webp",
    alt: "Star Trek: The Next Generation DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/jurassic-park-dvd.webp",
    alt: "Jurassic Park DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/dexters-lab.webp",
    alt: "Dexter's Laboratory cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/sg-1.webp",
    alt: "Stargate SG1 DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/star-trek-voyager.webp",
    alt: "Star Trek: Voyager DVD cover",
    type: "dvd",
  },
  {
    src: "images/blockbuster/command-and-conquer.webp",
    alt: "Command & Conquer cover",
    type: "game",
  },
  {
    src: "images/blockbuster/pokemon-yellow.webp",
    alt: "Pokemon Yellow cartridge",
    type: "game",
  },
  {
    src: "images/blockbuster/gizmos-and-gadgets.webp",
    alt: "Gizmo & Gadget cover",
    type: "game",
  },
  {
    src: "images/blockbuster/tomb-raider.webp",
    alt: "Tomb Raider 1",
    type: "game",
  },
  {
    src: "images/blockbuster/rollercoaster-tycoon.webp",
    alt: "Rollercoaster Tycoon",
    type: "game",
  },
]

export const BlockBuster = () => {
  return (
    <div className="section is-blockbuster is-fullheight">
      <div className="container">
        <div className="blockbuster-logo">
          <BlockbusterLogo />
        </div>
        <div className="blockbuster-titles">
          <h5 className="title late-fees">
            NO MORE
            <br />
            LATE FEES
          </h5>
          <div className="blockbuster-content">
            <p>
              &quot;Excuse me, old person. But <br />
              <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Blockbuster_(retailer)"
                className="link"
              >
                Wtf is blockbuster?
              </a>
              &quot;
            </p>
          </div>
        </div>
        <h3 className="title">
          90s films &amp; programmes that inspired me to get into tech
        </h3>
        <div className="block-grid">
          {mediaItems
            .filter(item => item.type === "dvd")
            .map((item, index) => (
              <div key={index} className={`grid-item is-dvd`}>
                <figure className="image">
                  <img src={item.src} alt={item.alt} />
                </figure>
              </div>
            ))}
        </div>
        <h3 className="title">90s games that inspired me to get into tech</h3>
        <div className="block-grid">
          {mediaItems
            .filter(item => item.type === "game")
            .map((item, index) => (
              <div key={index} className={`grid-item is-game`}>
                <figure className="image">
                  <img src={item.src} alt={item.alt} />
                </figure>
              </div>
            ))}
        </div>
        <div className="blockbuster-titles">
          <h5 className="title late-fees">
            IN A WORLD, WITH-
            <br />
            OUT STREAMING...
          </h5>
          <h5 className="title late-fees is-desktop">
            THERE WAS
            <br />
            <span className="blockbuster-text">BLOCKBUSTER</span>
          </h5>
        </div>
      </div>
    </div>
  )
}
