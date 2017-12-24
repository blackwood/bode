import React from 'react'
import Link from 'gatsby-link'
import Social from '../includes/social'
import TinyLetter from '../includes/tinyletter'
import avatar from '../assets/2018-drawn.png'

const IndexPage = () => (
  <main id="main">
    <div className="container center-column">
      <div className="grid">
        <div className="grid__col--1-of-2 center grid__col">
          <p className="about-block">
            producer <span>•</span> musician <span>•</span> web guy{' '}
          </p>
          <img width="300" height="300" src={avatar} />
          <Social />
        </div>
        <div className="grid__col--1-of-2 grid__col grid__col--am">
          <div className="vc-outer">
            <div className="vc">
              <p className="about-block center">
                <b>about baze:</b>
              </p>
              <p>
                Making internet arts and musics. Working on websites and tools
                for likeminded folx.
              </p>
              <p>
                Baze also writes and records{' '}
                <a href="https://soundcloud.com/bazeblackwood">music</a>, too.
                You might have heard him play saxophone with The New Limits once
                in a while.
              </p>
              <p>Soon-to-be audio apprentice at Plaid Dog Studio. Look out.</p>
              <p>
                Follow on{' '}
                <a href="https://twitter.com/bazeblackwood">Twitter</a>, duh. RT
                and follow and like and shit.
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
)

export default IndexPage
