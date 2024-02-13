import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Counter from "./components/Counter/Counter";
import RichTextEditor from "./components/TipTapEditor/RichTextEditor";
import UserForm from "./components/UserForm/Userform";
import Chart from "./components/Chart";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/counter" exact element={<Counter />} />
					<Route path="/rich-text-editor" exact element={<RichTextEditor />} />
					<Route path="/form" exact element={<UserForm />} />
					<Route path="/chart" exact element={<Chart />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
