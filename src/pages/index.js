import React from "react";
import Link from "gatsby-link";
import Social from "../includes/social";
import TinyLetter from "../includes/tinyletter";

const IndexPage = () => (
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
								Making internet arts and musics. Working on
								websites and tools for likeminded folx.
							</p>
							<p>
								Baze also writes and records{" "}
								<a href="https://soundcloud.com/bazeblackwood">
									music
								</a>, too. You might have heard him play
								saxophone with The New Limits once in a while.
							</p>
							<p>
								Soon-to-be audio apprentice at Plaid Dog Studio.
								Look out.
							</p>
							<p>
								Follow on{" "}
								<a href="https://twitter.com/bazeblackwood">
									Twitter
								</a>, duh. RT and follow and like and shit.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/*<div className="soundcloud box center-column">
			<p className="center">
				<b>Listen:</b> The raw mix of Oceans (Sink or Float) will only
				be up until the end of July!
			</p>
			<%= File.read("src/includes/soundcloud.html") %>
		</div>*/}
		{/*<div className="show-row">
			<% upcoming.each_with_index do |show, i| %>
        <aside className="show post box rowbox">
          <a href="<%= show["link"] %>" className="show-cover"></a>
          <h3 className="hug"><%= show["today"] ? "today's" : timesigs[i] %> show</h3>
          <h4 className="hug"><%= show["act"] ? show["act"] : "solo show" %></h4>
          <span>on</span>
          <div className="date">
            <span className="hug month code"><%= show["month"] %></span>
            <span className="hug day code"><%= show["date"].day %></span>
          </div>
          <div className="at-sym">@</div>
          <div className="venue"><%= show["venue"] %></div>
          <div className="location">in <b><%= show["city"] + ", " + show["state"] %></b></div>
          <% if show["future"] || show["today"] %>              
            <div className="price phat"><%= show["price"] ? "cover is $" + show["price"].to_s : "no cover!" %></div>
          <% else %>
            <div className="price phat"><%= show["sentiment"] %></div>
          <% end %>
        </aside>
      <% end %>
		</div>*/}
		<h4 className="center">what else?</h4>
		<aside className="post box center-column">
			<p className="center">
				Sign up for email updates, essays and lessons:
			</p>
			<TinyLetter />
		</aside>
	</main>
);

export default IndexPage;
