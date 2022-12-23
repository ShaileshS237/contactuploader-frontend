import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
	return (
		<div
			style={{
				display: "flex",
				margin: "3% 80px",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Link to="/" className="item">
				Home
			</Link>
			<Link className="item" to="/upload">
				Upload Contact
			</Link>
			{/* <Link className="item" to="/view">
				View Contact
			</Link> */}
			<Link className="item" to="/login">
				<button className=" login__btn">Login </button>
			</Link>
			<Link className="item" to="/register">
				<button className=" register__btn">Register</button>
			</Link>
		</div>
	);
}
