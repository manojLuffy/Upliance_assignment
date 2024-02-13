import { useState, useCallback } from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import * as Icons from "./Icons";
import "./styles.css";
import { FaAlignCenter, FaChevronDown, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import PropTypes from "prop-types";

const LOCAL_STORAGE_KEY = "richEditorContent";

export function SimpleEditor({ onHtmlChange = () => {}, setIsContentChanged }) {
	const loadContentFromStorage = () => {
		try {
			const storedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
			return storedContent || "<p>Initial Content</p>"; // Default, if needed
		} catch (error) {
			console.error("Error loading from local storage:", error);
			return "<p>Initial Content</p>"; // Handle errors gracefully
		}
	};
	let content = loadContentFromStorage() || "<p>Some initial content</p>";

	const [alignmentDropdownOpen, setAlignmentDropdownOpen] = useState(false);

	const editor = useEditor({
		extensions: [
			Document,
			Text,
			Bold,
			Underline,
			Italic,
			History,
			Paragraph,
			TextAlign.configure({
				types: ["paragraph"],
			}),
		],
		content,
		onUpdate: ({ editor }) => {
			onHtmlChange({ notes: editor?.getHTML() || "<p></p>" });
			saveContentToStorage(editor?.getHTML() || "<p></p>");
			setIsContentChanged(true);
		},
	});

	const saveContentToStorage = (content) => {
		try {
			localStorage.setItem(LOCAL_STORAGE_KEY, content);
		} catch (error) {
			console.error("Error saving to local storage:", error);
		}
	};

	const toggleBold = useCallback(() => {
		editor.chain().focus().toggleBold().run();
	}, [editor]);

	const toggleUnderline = useCallback(() => {
		editor.chain().focus().toggleUnderline().run();
	}, [editor]);

	const toggleItalic = useCallback(() => {
		editor.chain().focus().toggleItalic().run();
	}, [editor]);

	const toggleLeftAlign = useCallback(() => {
		editor.chain().focus().setTextAlign("left").run();
		setAlignmentDropdownOpen(false);
	}, [editor]);

	const toggleCenterAlign = useCallback(() => {
		editor.chain().focus().setTextAlign("center").run();
		setAlignmentDropdownOpen(false);
	}, [editor]);

	const toggleRightAlign = useCallback(() => {
		editor.chain().focus().setTextAlign("right").run();

		setAlignmentDropdownOpen(false);
	}, [editor]);

	const handleKeyDown = useCallback((event) => {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	}, []);

	const openAlignmentDropdown = () => {
		setAlignmentDropdownOpen(!alignmentDropdownOpen);
	};

	const renderAlignmentButton = (textAlign, icon) => (
		<div
			className={classNames("menu-button", {
				"is-active": editor.isActive({ textAlign }),
			})}
			style={{ display: "flex", alignItems: "center", gap: "5px", width: "3rem", cursor: "pointer", flexDirection: "row", marginTop: "5px" }}
			onClick={openAlignmentDropdown}>
			<div>{icon}</div>
			<FaChevronDown />
		</div>
	);

	if (!editor) {
		return null;
	}

	return (
		<div className="editor" onKeyDown={handleKeyDown}>
			<div className="menu">
				<div style={{ borderRight: "1px solid #e3e5e9", paddingLeft: "24px", display: "flex", flexDirection: "row" }}>
					<button type="button" className="menu-button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
						<Icons.RotateLeft />
					</button>
					<button type="button" className="menu-button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
						<Icons.RotateRight />
					</button>

					<button
						type="button"
						className={classNames("menu-button", {
							"is-active": editor.isActive("bold"),
						})}
						onClick={toggleBold}>
						<Icons.Bold />
					</button>
					<button
						type="button"
						className={classNames("menu-button", {
							"is-active": editor.isActive("underline"),
						})}
						onClick={toggleUnderline}>
						<Icons.Underline />
					</button>
					<button
						type="button"
						className={classNames("menu-button", {
							"is-active": editor.isActive("italic"),
						})}
						onClick={toggleItalic}>
						<Icons.Italic />
					</button>
				</div>
				<div style={{ display: "flex", flexDirection: "column", alignSelf: "start" }}>
					{editor.isActive({ textAlign: "left" }) && renderAlignmentButton("left", <FaAlignLeft />)}
					{editor.isActive({ textAlign: "center" }) && renderAlignmentButton("center", <FaAlignCenter />)}
					{editor.isActive({ textAlign: "right" }) && renderAlignmentButton("right", <FaAlignRight />)}

					{alignmentDropdownOpen && (
						<div style={{ display: "flex", flexDirection: "column", paddingTop: "16px", backgroundColor: "white" }}>
							<button
								type="button"
								className={classNames("menu-button", {
									"is-active": editor.isActive({ textAlign: "left" }),
								})}
								onClick={toggleLeftAlign}>
								<FaAlignLeft />
							</button>
							<button
								type="button"
								className={classNames("menu-button", {
									"is-active": editor.isActive({ textAlign: "center" }),
								})}
								onClick={toggleCenterAlign}>
								<FaAlignCenter />
							</button>
							<button
								type="button"
								className={classNames("menu-button", {
									"is-active": editor.isActive({ textAlign: "right" }),
								})}
								onClick={toggleRightAlign}>
								<FaAlignRight />
							</button>
						</div>
					)}
				</div>
			</div>

			<EditorContent editor={editor} />
		</div>
	);
}

SimpleEditor.propTypes = {
	onHtmlChange: PropTypes.func.isRequired,
	setIsContentChanged: PropTypes.func.isRequired,
};
