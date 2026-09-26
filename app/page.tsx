import { Fragment, type CSSProperties } from "react";
import { portfolio } from "@/data/portfolio";
import Arrow from "@/components/Arrow";
import SplitWords from "@/components/SplitWords";
import Header from "@/components/Header";
import TracePill from "@/components/TracePill";
import Motion from "@/components/Motion";
import CopyEmail from "@/components/CopyEmail";
import SessionTime from "@/components/SessionTime";
import Timeline from "@/components/Timeline";
import HeroArt from "@/components/art/HeroArt";
import TranslationArt from "@/components/art/TranslationArt";
import RoutingArt from "@/components/art/RoutingArt";
import IngestArt from "@/components/art/IngestArt";
import AgentArt from "@/components/art/AgentArt";
import FreelanceBrief from "@/components/FreelanceBrief";
import ShortenerArt from "@/components/art/ShortenerArt";
import ShortenerDemo from "@/components/ShortenerDemo";
import LiveLinks from "@/components/LiveLinks";

const artwork = { translation: TranslationArt, agentic: RoutingArt, ingestion: IngestArt, "agentic-engineering": AgentArt };

function OfferGlyph({ index }: { index: number }) {
  return (
    <svg className={`offer-glyph offer-glyph-${index}`} viewBox="0 0 40 40" aria-hidden="true">
      {index === 0 && <circle cx="20" cy="20" r="16" />}
      {index === 1 && <polygon points="20,3 37,20 20,37 3,20" />}
      {index === 2 && <rect x="5" y="5" width="30" height="30" />}
      {index === 3 && <path d="M3 30a17 17 0 0 1 34 0Z" />}
    </svg>
  );
}

export default function HomePage() {
  const { email } = portfolio;
  const thesisWords = portfolio.thesis.split(" ");
  const turnWords = portfolio.thesisTurn.split(" ");

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header email={email} />
      <Motion />

      <main id="main">
        {/* 01 — intake */}
        <section id="intake" className="hero" aria-labelledby="hero-title">
          <div className="hero-meta wrap">
            <span className="label">01 — intake</span>
            <span className="label hide-sm">{portfolio.role}</span>
            <span className="label hide-sm">{portfolio.location} · {portfolio.coordinates}</span>
            <a className="label status link-draw" href="#freelance">
              <span className="pulse" aria-hidden="true" /> Available for freelance
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <HeroArt />
            <span className="fig-caption">fig. 00 — intent, meeting structure</span>
          </div>

          <div className="hero-body wrap">
            <h1 id="hero-title" className="hero-title">
              <span className="hero-name">
                <SplitWords text="Udit Narayan Modi —" />
              </span>
              <span className="hero-line">
                <SplitWords text="I build the quiet machinery that makes AI" offset={3} />{" "}
                <em>
                  <SplitWords text="actually work." offset={11} />
                </em>
              </span>
            </h1>
          </div>

          <div className="hero-foot wrap">
            <p className="hero-intro">
              GenAI engineer and backend builder at {portfolio.employer}. {portfolio.introduction}
            </p>
            <div className="hero-actions">
              <a className="btn btn-ink" href="#work">
                See the work <Arrow dir="down" size={14} />
              </a>
              <a className="link-draw" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>
        </section>

        {/* 02 — reason */}
        <section id="reason" className="thesis wrap" aria-label="Thesis">
          <div className="thesis-side" data-reveal>
            <span className="label">02 — reason</span>
            <p>On the distance between a prompt and a product.</p>
          </div>
          <p className="thesis-text">
            {thesisWords.map((word, index) => (
              <Fragment key={index}>
                <span className="tw">{word}</span>{" "}
              </Fragment>
            ))}
            <em>
              {turnWords.map((word, index) => (
                <Fragment key={index}>
                  <span className="tw">{word}</span>
                  {index < turnWords.length - 1 ? " " : null}
                </Fragment>
              ))}
            </em>
          </p>
        </section>

        {/* 03 — execute */}
        <section id="work" className="work" aria-labelledby="work-title">
          <header className="section-head wrap">
            <span className="label" data-reveal>03 — execute</span>
            <h2 id="work-title" className="display" data-reveal>
              <SplitWords text="Selected systems." />
            </h2>
            <p className="section-note" data-reveal>
              Most of this work is private, so instead of screenshots, each system is shown as what it is — a working
              diagram of its architecture.
            </p>
          </header>

          <div className="plates">
            {portfolio.projects.map((project, index) => {
              const Art = artwork[project.id];
              return (
                <article
                  key={project.id}
                  className={`plate plate-${project.id}`}
                  data-plate
                  style={{ "--i": index } as CSSProperties}
                  aria-labelledby={`${project.id}-title`}
                >
                  <div className="plate-inner">
                    <header className="plate-top">
                      <span className="label">03.{index + 1}</span>
                      <span className="label">{project.category}</span>
                      <span className="label status">
                        <span className="pulse" aria-hidden="true" /> {project.status} · {project.collection}
                      </span>
                    </header>

                    <div className="plate-grid">
                      <div className="plate-text">
                        <span className="plate-num" aria-hidden="true">{project.number}</span>
                        <h3 id={`${project.id}-title`} className="plate-title">{project.title}</h3>
                        <p className="plate-desc">{project.description}</p>
                        <ol className="route" aria-label="Request path">
                          {project.flow.map((step, stepIndex) => (
                            <li key={step} style={{ "--k": stepIndex } as CSSProperties}>{step}</li>
                          ))}
                        </ol>
                        <p className="plate-evidence">{project.evidence}</p>
                        <ul className="tags" aria-label="Technologies">
                          {project.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      </div>

                      <figure className="plate-figure">
                        <div className="art-frame" data-art>
                          <Art />
                        </div>
                        <figcaption className="wall-label">
                          <p className="wall-title">
                            <span>Fig. {project.number}</span> {project.figure}
                          </p>
                          <p className="wall-medium">
                            <span>Medium</span> {project.medium}
                          </p>
                          <p className="wall-caption">{project.caption}</p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 04 — plan */}
        <section id="design" className="design" aria-labelledby="design-title">
          <div className="wrap">
            <header className="section-head">
              <span className="label" data-reveal>04 — plan</span>
              <h2 id="design-title" className="display" data-reveal>
                <SplitWords text="Draw it" />{" "}
                <em>
                  <SplitWords text="before you build it." offset={2} />
                </em>
              </h2>
              <p className="section-note" data-reveal>{portfolio.designStudy.note}</p>
            </header>

            <article className="study" aria-labelledby="study-title">
              <header className="plate-top">
                <span className="label">Study 01</span>
                <span className="label">System design · URL shortener</span>
                <span className="label status">
                  <span className="pulse" aria-hidden="true" /> Design study · live on this site
                </span>
              </header>

              <div className="study-grid">
                <div className="study-text">
                  <h3 id="study-title" className="plate-title">
                    URL shortener. <em>Short links, long thinking.</em>
                  </h3>
                  <p className="plate-desc">{portfolio.designStudy.lede}</p>
                  <div className="reqs">
                    <div>
                      <h4 className="label">Functional</h4>
                      <ul>
                        {portfolio.designStudy.functional.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="label">Non-functional</h4>
                      <ul>
                        {portfolio.designStudy.nonFunctional.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                <figure className="plate-figure">
                  <div className="art-frame study-frame" data-art>
                    <ShortenerArt />
                  </div>
                  <figcaption className="wall-label">
                    <p className="wall-title">
                      <span>Fig. 05</span> Reads take the fast lane.
                    </p>
                    <p className="wall-medium">
                      <span>Medium</span> Load balancer, cache-aside Redis, range-allocated IDs, sharded key-value store, queue
                    </p>
                  </figcaption>
                </figure>
              </div>

              <div className="estimates">
                <div className="estimates-head">
                  <h4 className="label">Back of the envelope</h4>
                  <p>Assumptions: {portfolio.designStudy.assumptions}</p>
                </div>
                <dl className="kpis">
                  {portfolio.designStudy.estimates.map((estimate) => (
                    <div key={estimate.label} className="kpi">
                      <dt>{estimate.label}</dt>
                      <dd className="kpi-value">{estimate.value}</dd>
                      <dd className="kpi-working">{estimate.working}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="study-specs">
                <div className="spec">
                  <h4 className="label">API</h4>
                  <pre>{portfolio.designStudy.api.join("\n")}</pre>
                </div>
                <div className="spec">
                  <h4 className="label">Data model</h4>
                  <pre>{portfolio.designStudy.model.join("\n")}</pre>
                </div>
              </div>

              <div className="decisions">
                <h4 className="label">Decisions &amp; trade-offs</h4>
                <ol>
                  {portfolio.designStudy.decisions.map((decision, index) => (
                    <li key={decision.question} className="decision" data-reveal>
                      <span className="principle-n">0{index + 1}</span>
                      <p className="decision-q">{decision.question}</p>
                      <div>
                        <p className="decision-choice">{decision.choice}</p>
                        <p className="decision-why">{decision.why}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="study-try">
                <ShortenerDemo />
                <LiveLinks />
              </div>
            </article>
          </div>
        </section>

        {/* 05 — operate */}
        <section id="principles" className="principles wrap" aria-labelledby="principles-title">
          <div className="principles-head">
            <span className="label" data-reveal>05 — operate</span>
            <h2 id="principles-title" className="display" data-reveal>
              <SplitWords text="Intelligence is a feature." />{" "}
              <em>
                <SplitWords text="Reliability is the product." offset={4} />
              </em>
            </h2>
          </div>

          <ol className="principle-list">
            {portfolio.principles.map((principle, index) => (
              <li key={principle.title} className="principle" data-reveal>
                <span className="principle-n">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </li>
            ))}
          </ol>

          <div className="toolkit" data-reveal>
            <h3 className="label">Toolkit</h3>
            <dl className="toolkit-grid">
              {portfolio.capabilities.map((capability) => (
                <div key={capability.title}>
                  <dt>{capability.title}</dt>
                  <dd>{capability.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 06 — persist */}
        <section id="path" className="path wrap" aria-labelledby="path-title">
          <div className="path-head">
            <span className="label" data-reveal>06 — persist</span>
            <h2 id="path-title" className="display" data-reveal>
              <SplitWords text="The path," /> <em><SplitWords text="so far." offset={2} /></em>
            </h2>
            <p className="section-note" data-reveal>
              Read it like a trace waterfall — each span is a role, drawn to scale, from first internship to now.
            </p>
          </div>
          <Timeline />
          <ul className="credentials">
            {portfolio.credentials.map((credential, index) => (
              <li key={credential.title} data-reveal style={{ "--d": index } as CSSProperties}>
                <span className="label">{credential.kind}</span>
                <h3>{credential.title}</h3>
                <p>{credential.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 07 — accept */}
        <section id="freelance" className="freelance" aria-labelledby="freelance-title">
          <div className="wrap">
            <div className="freelance-head">
              <span className="label" data-reveal>07 — accept</span>
              <p className="freelance-flag" data-reveal>
                <span className="pulse" aria-hidden="true" /> Now accepting freelance projects
              </p>
              <h2 id="freelance-title" className="display" data-reveal>
                <SplitWords text="Freelance, open." />{" "}
                <em>
                  <SplitWords text="Bring me anything." offset={2} />
                </em>
              </h2>
              <p className="section-note" data-reveal>{portfolio.freelance.note}</p>
            </div>

            <ul className="offers">
              {portfolio.freelance.offers.map((offer, index) => (
                <li key={offer.title} className="offer" data-reveal style={{ "--d": index } as CSSProperties}>
                  <OfferGlyph index={index} />
                  <h3>{offer.title}</h3>
                  <p>{offer.body}</p>
                </li>
              ))}
            </ul>
            <p className="offers-more" data-reveal>
              Not on the list? <em>Ask anyway</em> — “anything” is meant literally.
            </p>

            <ol className="process" aria-label="How an engagement works" data-reveal>
              {portfolio.freelance.process.map((step, index) => (
                <li key={step.title}>
                  <span className="process-n">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>

            <div data-reveal>
              <FreelanceBrief email={email} types={portfolio.freelance.types} timelines={portfolio.freelance.timelines} />
            </div>
          </div>
        </section>

        {/* 08 — respond */}
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="contact-stage">
          <div className="contact-art" aria-hidden="true">
            <span className="contact-sun" />
            <span className="contact-horizon" />
          </div>
          <div className="contact-body wrap">
            <span className="label" data-reveal>08 — respond</span>
            <h2 id="contact-title" className="contact-title" data-reveal>
              <SplitWords text="Got a hard problem?" />{" "}
              <em>
                <SplitWords text="Let’s make it boring." offset={4} />
              </em>
            </h2>
            <div className="contact-row" data-reveal>
              <a className="contact-email" href={`mailto:${email}`}>
                {email}
                <Arrow dir="up-right" size={28} />
              </a>
              <CopyEmail email={email} />
            </div>
            <p className="contact-note" data-reveal>
              Freelance projects, agentic workflows, backend platforms — anything that has to work in the real world,
              not just in the demo. Based in {portfolio.location}.
            </p>
          </div>
          </div>

          <footer className="footer">
            <div className="footer-inner wrap">
              <span className="label footer-response">
                <span className="ok">200 OK</span> trace complete in <SessionTime />
              </span>
              <span className="label">© {new Date().getFullYear()} {portfolio.name}</span>
              <span className="label hide-sm">Set in Fraunces, Inter Tight &amp; JetBrains Mono. No trackers. No cookies.</span>
              <a className="label link-draw" href="#intake">
                Back to intake <Arrow dir="up" size={12} />
              </a>
            </div>
          </footer>
        </section>
      </main>

      <TracePill />
    </>
  );
}
