import React from "react";

const TinyLetter = () => (
	<form
		style={{ padding: "3px", textAlign: "center" }}
		action="https://tinyletter.com/bazeblackwood"
		method="post"
		target="popupwindow"
		onsubmit="window.open('https://tinyletter.com/bazeblackwood', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
	>
		<p>
			<input
				className="input"
				type="text"
				name="email"
				id="tlemail"
				placeholder="email"
			/>
		</p>
		<input type="hidden" value="1" name="embed" />
		<input className="btn" type="submit" value="Subscribe" />
	</form>
);

export default TinyLetter;
