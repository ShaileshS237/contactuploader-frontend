import React from "react";
import {
	Grid,
	GridItem,
	Input,
	Button,
	Stack,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Text,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from "@chakra-ui/react";
import {
	PhoneIcon,
	CheckIcon,
	ArrowForwardIcon,
	LockIcon,
	EmailIcon,
} from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import axios from "axios";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(props) {
	const history = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let axiosConfig = {
		withCredentials: true,
	};
	const change = () => {
		history("/register");
	};

	function notify(message) {
		toast(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}
	const navigate = useNavigate();
	let item = { email, password };
	const login = async (e) => {
		e.preventDefault();
		await axios
			.post("http://localhost:5000/login", item, axiosConfig)
			.then(async (result) => {
				console.log(result.status);
				if (result.status === 200) {
					await notify("Login Succesfull");
					navigate("/");
				}
			})
			.catch((err) => {
				console.log(err.response);
			});
		console.log(email, password);
	};

	const [name, setName] = useState();
	return (
		<>
			<Navbar />
			<div style={{ padding: "2% 30%" }}>
				<Card>
					<CardBody style={{ padding: "5% " }}>
						<Stack spacing={4}>
							<Text fontSize="3xl" as="b">
								Welcome Back
							</Text>
							<Text fontSize="md">Continue to Login</Text>
							<InputGroup>
								<Input
									focusBorderColor="green.300"
									type="email"
									placeholder="Email ID"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</InputGroup>

							<InputGroup>
								<Input
									focusBorderColor="green.300"
									placeholder="Password"
									type="password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</InputGroup>
							<Button
								rightIcon={<ArrowForwardIcon />}
								colorScheme="green"
								variant="outline"
								onClick={login}
								disabled={!email || !password}
							>
								Login
							</Button>

							<Text fontSize="md" style={{ textAlign: "center" }}>
								Don't have an account?{" "}
								<Text as="b" style={{ cursor: "pointer" }} onClick={change}>
									Sign up for free
								</Text>
							</Text>
						</Stack>
					</CardBody>
				</Card>
				<ToastContainer />
			</div>
		</>
	);
}
