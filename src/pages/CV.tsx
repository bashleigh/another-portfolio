import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import "./cv.scss";

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
  mobile: string;
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
window.generateToken = generateToken;

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

    history.pushState(undefined, 'Ashleigh\'s CV', `?token=${token}`);

    setPayload(result.payload);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <div className="box">
            <h2 className="title">Ashleigh's CV</h2>
            <p>Please enter the token you was provided with to view my CV. Why do you need a token? My CV holds personal information I wish to control.</p>
            <br/>
          <form onSubmit={onSubmit}>
        {error && <div className="notification is-danger">{error}</div>}
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
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

const Loader = () => (
  <div className="hero is-fullheight">
    <div className="hero-body">
    <div className="loader">

    </div>
    </div>
  </div>
);

export const ViewCV = ({ payload }: { payload: AshleighCV }) => {
  const [data, setData] = useState<undefined | CVData>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

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
    <Loader/>
  ) : !data || error ? (
    <div className="notification is-danger">{error}</div>
  ) : (
    <>
    <header>
      <nav className="navbar">
        <div className="container">
        <div className="navbar-item">
        👋   Hello! {payload.name}
        </div>
        <div className="navbar-item">
          Ashleigh Simonelli's CV
        </div>
        <div className="navbar-end">
          {/* <a className="navbar-item" href="">Share</a> */}
        </div>
        </div>
      </nav>
    </header>
    <section className="section">
      <div className="container">
        <div className="box">
          <div>
            <a
              href={
                "https://gist.github.com/bashleigh/3bdd8052db7617a9ca3b31976a8cffa0"
              }
              target="_blank"
            >
              View on Gist
            </a>
            {window.navigator && typeof window.navigator === 'function' && <a
              href="#"
              onClick={event => {
                event.preventDefault();

                window.navigator.share({
                  text: "Ashleigh Simonelli's CV",
                });
              }}
            >
              Share
            </a>}
          </div>
          <div className="box-header">
            <img src={data.avatar_url} />
            <h1 className="title">{data.name}</h1>
            {data.description.map(description => (
              <p key={description}>{description}</p>
            ))}
          </div>
          <section className="section">
            <div className="content">
              <h4 className="title is-4">Achievements</h4>
              <ul>
                {data.achievements.map(achievement => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>
          </section>
          <hr />

          <section className="section">
            <div className="employment history">
              <h3 className="title is-3">Employment History</h3>
              {Object.keys(data.employment_history).map(key => (
                <div key={`employment-${key}`}>
                  <h3 className="title is-5">
                    {key} - {data.employment_history[key].position}
                  </h3>
                  <h5 className="subtitle">
                    {Object.values(data.employment_history[key].dates).join(
                      " - "
                    )}
                  </h5>
                  <div className="content">
                    {data.employment_history[key].description.map(
                      description => (
                        <p key={description}>{description}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />
          <section className="section">
            <h4 className="title is-4">Keywords and Buzzwords</h4>
            <div className="columns is-multiline">
              <div className="column is-3">
                <div className="content">
                  <h4 className="title is-4">Contributing to</h4>
                  <ul>
                    {data.currently_contributing_to.map(contributing => (
                      <li key={contributing}>{contributing}</li>
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
                        {key}: {data.languages[key]}
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
                      <h5 className="subtitle">{key}</h5>
                      <ul>
                        {Array.isArray(data.frameworks[key]) &&
                          data.frameworks[key].map(framework => (
                            <li>{framework}</li>
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
                      <li key={`tools-${tool}`}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="column is-3">
                <div className="content">
                  <h4 className="title is-4">Protocols and Methods</h4>
                  <ul>
                    {data.protocols_and_methods.map(protocol => (
                      <li key={`protocols-${protocol}`}>{protocol}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="column is-3">
                <div className="content">
                  <h4 className="title is-4">Operating Systems</h4>
                  <ul>
                    {data.operating_systems.map(os => (
                      <li key={`OS-${os}`}>{os}</li>
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
                        {key} {data.platforms[key]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <div className="box-footer"></div>
        </div>
      </div>
    </section>
    </>
  );
};

export default () => {
  const urlParams = new URLSearchParams(document.location.search.substring(1));
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
