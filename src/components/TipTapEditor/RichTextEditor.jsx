import React, { useEffect, useState } from "react";
import { SimpleEditor } from "./TipTapEditor";

function RichTextEditor() {
	const [isContentChanged, setIsContentChanged] = useState(false); // Track changes

	const handleHtmlChange = (content) => {
		console.log("html", content.notes);
		setIsContentChanged(true);
	};

	useEffect(() => {
		const handleUnload = (event) => {
			if (isContentChanged) {
				event.preventDefault();
				event.returnValue = "";
				return "";
			}
		};

		window.addEventListener("beforeunload", handleUnload);

		return () => {
			window.removeEventListener("beforeunload", handleUnload);
		};
	}, [isContentChanged]);
	return (
		<div>
			<SimpleEditor onHtmlChange={handleHtmlChange} setIsContentChanged={setIsContentChanged} />
		</div>
	);
}

export default RichTextEditor;
