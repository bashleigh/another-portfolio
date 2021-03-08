import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import "./cv.scss";
import { Helmet } from "react-helmet";
import Highlighter from "react-highlight-words";
import { shleemy } from "shleemy";
import { Link } from "gatsby";

type AshleighCV = {
  access: boolean;
  name: string;
};

type CVData = {
  updated_at: string;
  url: string;
  name: string;
  dob: string;
  avatar_url: string;
  email_address: string;
  mobile_number: string;
  postal_region: string;
  description: string[];
  achievements: string[];
  currently_contributing_to: string[];
  languages: { [s: string]: string };
  frameworks: { [s: string]: string[] };
  protocols_and_methods: string[];
  operating_systems: string[];
  platforms: { [s: string]: string };
  tools: string[];
  employment_history: {
    [s: string]: {
      dates: {
        start: string;
        finish: string;
      };
      position: string;
      description: string[];
    };
  };
  clouds: string[];
  ratings: { [s: string]: number };
};

const generateToken = (name: string = "stranger") => {
  return btoa(
    JSON.stringify({
      name: name || "stranger",
      access: true,
    })
  );
};

// @ts-ignore
if (typeof window !== "undefined") window.generateToken = generateToken;

const validateToken = (
  token?: string | null
): { valid: true; payload: AshleighCV } | { valid: false; reason: string } => {
  if (token === "" || typeof token === "undefined" || token === null) {
    return { valid: false, reason: "Invalid token" };
  }
  try {
    const payload = JSON.parse(atob(token));

    if (
      typeof payload !== "object" ||
      payload === "undefined" ||
      !payload.access ||
      !payload.name
    ) {
      return { valid: false, reason: "Invalid Token" };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, reason: "Failed to validate token" };
  }
};

const TokenRequired = ({
  setPayload,
}: {
  setPayload: (payload: AshleighCV) => void;
}) => {
  const [token, setTokenValue] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmit = event => {
    event.preventDefault();
    setError(undefined);
    const result = validateToken(token);

    if (!result.valid) {
      /** @ts-ignore */
      setError(result.reason);
      return;
    }

    history.pushState(undefined, "Ashleigh's CV", `?token=${token}`);

    setPayload(result.payload);
  };

  return (
    <>
      <Helmet>
        <title>Ashleigh Simonelli's CV | Please enter a valid token</title>
      </Helmet>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="box">
                <h2 className="title">Ashleigh's CV</h2>
                <p>
                  Please enter the token you was provided with to view my CV.
                  Why do you need a token? My CV holds personal information I
                  wish to control.
                </p>
                <br />
                <form onSubmit={onSubmit}>
                  {error && (
                    <div className="notification is-danger">{error}</div>
                  )}
                  <label className="label">Token</label>
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        className="input"
                        name="token"
                        type="text"
                        value={token}
                        onChange={event => setTokenValue(event.target.value)}
                      />
                    </div>
                    <div className="control">
                      <input
                        className="button is-primary"
                        name=""
                        type="submit"
                        value="Check"
                      />
                    </div>
                  </div>
                </form>
                <br />
                <h4 className="title is-4">Would you like access?</h4>
                <p>
                  Please get in contact with me via{" "}
                  <a href="https://www.linkedin.com/in/ashleigh-simonelli-01b5a1b6/">
                    Linkedin
                  </a>{" "}
                  or{" "}
                  <a href="https://www.facebook.com/ashleigh.simonelliWeb">
                    Facebook
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Loader = () => (
  <div className="hero is-fullheight">
    <div className="hero-body">
      <div className="loader"></div>
    </div>
  </div>
);

export const ViewCV = ({ payload }: { payload: AshleighCV }) => {
  const [data, setData] = useState<undefined | CVData>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);

  const octo = new Octokit();

  const gistId = "3bdd8052db7617a9ca3b31976a8cffa0";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);

      const result = await octo.request(`GET /gists/${gistId}`, {
        gist_id: gistId,
      });

      setLoading(false);

      if (result.status !== 200) {
        setError("Problem fetching data");

        return;
      }

      const cv = JSON.parse(result.data.files["cv.json"].content);

      setData({
        ...cv,
        avatar_url: result.data.owner.avatar_url,
        updated_at: result.data.updated_at,
      });
    };

    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : !data || error ? (
    <div className="notification is-danger">{error}</div>
  ) : (
    <>
      <Helmet>
        <title>Ashleigh Simonelli's CV</title>
      </Helmet>
      <header>
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-item">
              View Site
            </Link>
            <div className="navbar-item">👋 Hello! {payload.name}</div>
            <div className="navbar-item">Ashleigh Simonelli's CV</div>
            <div className="navbar-end">
              <a href={`tel:${data.mobile_number}`} className="navbar-item">
                {data.mobile_number}
              </a>
              <a
                href="https://www.linkedin.com/in/ashleigh-simonelli-01b5a1b6/"
                className="navbar-item"
              >
                Linkedin
              </a>
              <a href="https://github.com/bashleigh/" className="navbar-item">
                GitHub
              </a>
              {/* <a className="navbar-item" href="">Share</a> */}
            </div>
          </div>
        </nav>
      </header>
      <section className="section">
        <div className="container">
          <div className="box">
            <div className="level">
              <div className="level-item">
                <a
                  href={
                    "https://gist.github.com/bashleigh/3bdd8052db7617a9ca3b31976a8cffa0"
                  }
                  target="_blank"
                >
                  View on Gist
                </a>
              </div>
              {window &&
                window.navigator &&
                typeof window.navigator === "function" && (
                  <div className="level-item">
                    <a
                      href="#"
                      onClick={event => {
                        event.preventDefault();

                        window.navigator.share({
                          text: "Ashleigh Simonelli's CV",
                        });
                      }}
                    >
                      Share
                    </a>
                  </div>
                )}
              <div className="level-item">
                <Link to="#achievements">Achievements</Link>
              </div>
              <div className="level-item">
                <Link to="#skills">Skill Ratings</Link>
              </div>
              <div className="level-item">
                <Link to="#employment">Employment History</Link>
              </div>
            </div>
            <div></div>
            <div className="box-header">
              <img src={data.avatar_url} />
              <h1 className="title">{data.name}</h1>
              {data.description.map(description => (
                <p key={description}>{description}</p>
              ))}
            </div>
            <section className="section" id="achievements">
              <div className="content">
                <h4 className="title is-3">Achievements</h4>
                <ul>
                  {data.achievements.reverse().map(achievement => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </section>
            <hr />

            <section className="section" id="skills">
              <div className="container">
                <div className="columns">
                  <div className="column is-6 is-offset-3">
                    <h4 className="title is-3">Skill Ratings</h4>

                    <div className="content">
                      <p>
                        This is a list of skill ratings that I would rate
                        myself. We can never be perfect and we can always learn
                        something new so I've not set anything at 10!
                      </p>
                    </div>
                    {Object.keys(data.ratings).map(key => (
                      <div className="columns is-vcentered">
                        <div className="column is-3">
                          <label className="label">{key}</label>
                        </div>
                        <div className="column">
                          {data.ratings[key]}/10
                          <progress
                            className="progress is-primary"
                            value={data.ratings[key]}
                            max={10}
                          >
                            {data.ratings[key]}
                          </progress>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <hr />

            <section className="section">
              <div id="employment">
                <h3 className="title is-3">Employment History</h3>
                {Object.keys(data.employment_history).map(key => (
                  <div className="employment-history" key={`employment-${key}`}>
                    <div className="columns">
                      <div className="column is-linear-container">
                        <div className="linear"></div>
                      </div>
                      <div className="column">
                        <div className="content">
                          <h3 className="title is-5">
                            {data.employment_history[key].position}
                          </h3>
                          <h6 className="subtitle is-6">{key}</h6>
                          <h5 className="subtitle is-7">
                            {Object.values(
                              data.employment_history[key].dates
                            ).join(" - ")}
                          </h5>
                          <div className="content">
                            {data.employment_history[key].description.map(
                              description => (
                                <p key={description}>{description}</p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <hr />
            <section className="section">
              <div className="columns">
                <div className="column is-6">
                  <h4 className="title is-4">Keywords and Buzzwords</h4>
                  <p>
                    This is a list of keywords and buzzwords of softwares I use,
                    have used or am familiar with. This list is likely not 100%
                    complete
                  </p>
                </div>
                <div className="column is-6">
                  <label className="label">Highlight keywords</label>
                  <p className="help">
                    Enter your keywords to be highlighted; separated by comma
                  </p>
                  <form onSubmit={event => event.preventDefault()}>
                    <div className="field has-addons">
                      <div className="control is-expanded">
                        <input
                          name="keywords"
                          className="input"
                          value={keywords.join(", ")}
                          onChange={event => {
                            setKeywords([
                              ...event.target.value
                                .split(", ")
                                .map(word => word.trim()),
                            ]);
                          }}
                        />
                      </div>
                      <div className="control">
                        <input
                          className="button is-primary"
                          type="submit"
                          value="Search"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="columns is-multiline">
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Contributing to</h4>
                    <ul>
                      {data.currently_contributing_to.map(contributing => (
                        <li key={contributing}>
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={contributing}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Languages</h4>
                    <ul>
                      {Object.keys(data.languages).map(key => (
                        <li key={`language-${key}`}>
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={`${key}: ${data.languages[key]}`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Frameworks</h4>
                    {Object.keys(data.frameworks).map(key => (
                      <div key={`framework-${key}`}>
                        <h5 className="subtitle">
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={key}
                          />
                        </h5>
                        <ul>
                          {Array.isArray(data.frameworks[key]) &&
                            data.frameworks[key].map(framework => (
                              <li>
                                <Highlighter
                                  caseSensitive={false}
                                  highlightClassName="selected-word"
                                  searchWords={keywords}
                                  textToHighlight={framework}
                                />
                              </li>
                            ))}
                          {typeof data.frameworks[key] === "object" &&
                            !Array.isArray(data.frameworks[key]) &&
                            Object.keys(data.frameworks[key]).map(innerKey => (
                              <li>
                                <Highlighter
                                  caseSensitive={false}
                                  highlightClassName="selected-word"
                                  searchWords={keywords}
                                  textToHighlight={`${innerKey} ${data.frameworks[key][innerKey]}`}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Tools</h4>
                    <ul>
                      {data.tools.map(tool => (
                        <li key={`tools-${tool}`}>
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={tool}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Protocols and Methods</h4>
                    <ul>
                      {data.protocols_and_methods.map(protocol => (
                        <li key={`protocols-${protocol}`}>
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={protocol}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Operating Systems</h4>
                    <ul>
                      {data.operating_systems.map(os => (
                        <li key={`OS-${os}`}>
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={os}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Platforms</h4>
                    <ul>
                      {Object.keys(data.platforms).map(key => (
                        <li key={`platform-${key}`}>
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={`${key} ${data.platforms[key]}`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="column is-3">
                  <div className="content">
                    <h4 className="title is-4">Clouds</h4>
                    <ul>
                      {data.clouds.map(cloud => (
                        <li key={`clouds-${cloud}`}>
                          <Highlighter
                            caseSensitive={false}
                            highlightClassName="selected-word"
                            searchWords={keywords}
                            textToHighlight={cloud}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <div className="box-footer">
              <hr />
              JSON Last Modified {`${shleemy(data.updated_at)}`}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default () => {
  const urlParams = new URLSearchParams(
    typeof document !== "undefined"
      ? document.location.search.substring(1)
      : undefined
  );
  const existingToken = urlParams.get("token");

  const result = validateToken(existingToken);

  const [payload, setPayload] = useState<undefined | AshleighCV>(
    result.valid ? result.payload : undefined
  );

  return payload ? (
    <ViewCV payload={payload} />
  ) : (
    <TokenRequired setPayload={setPayload} />
  );
};
