import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Counter from "./components/Counter/Counter";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" exact element={<Counter />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
