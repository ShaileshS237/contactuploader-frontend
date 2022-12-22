import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Uploadcontact from "./Pages/Uploadcontact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Viewcontact from "./Pages/Viewcontact";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/upload" element={<Uploadcontact />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/view" element={<Viewcontact />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
