import React from "react";
import Link from "gatsby-link";
import Social from "../includes/social";
import TinyLetter from "../includes/tinyletter";

const IndexPage = ({ data }) => (
  <main id="main">
    <div className="container center-column">
      <div className="grid">
        <div className="grid__col--1-of-2 center grid__col">
          <p className="about-block">
            producer <span>•</span> musician <span>•</span> web guy{" "}
          </p>
          <img
            width="300"
            height="300"
            src="https://raw.githubusercontent.com/blackwood/files/master/avatar2017.jpg"
          />
          <Social />
        </div>
        <div className="grid__col--1-of-2 grid__col grid__col--am">
          <div className="vc-outer">
            <div className="vc">
              <p className="about-block center">
                <b>about baze:</b>
              </p>
              <p>
                Apprentice at <a href="https://www.plaiddogrecording.com/">Plaid Dog Recording</a>. JavaScript nerd at <a href="https://www.zipcar.com/">Zipcar</a>. Music theory enthusiast and burgeoning sound designer. 
              </p>
              <p>Check out my most recent album:</p>
              <iframe src="https://open.spotify.com/embed?uri=spotify:album:1DakDR6rvgP92duS0hcCoD" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <p>
                Follow on{" "}
                <a href="https://twitter.com/bazeblackwood">Twitter</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 className="center">what else?</h4>
    <aside className="post box center-column">
      <p className="center">Sign up for email updates, essays and lessons:</p>
      <TinyLetter />
    </aside>
  </main>
);

export default IndexPage;

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
