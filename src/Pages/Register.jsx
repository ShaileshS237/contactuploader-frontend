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
	useToast,
	CardFooter,
} from "@chakra-ui/react";
import {
	PhoneIcon,
	CheckIcon,
	ArrowForwardIcon,
	LockIcon,
	ViewIcon,
	EmailIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
export default function Register(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const history = useNavigate();

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
	const register = (e) => {
		e.preventDefault();
		let item = { name, mobile, password, email };
		axios
			.post("http://localhost:5000/register", item)
			.then((result) => {
				if (result.status == 201) {
					notify("Successfully Registerd, Please Login");
				}

				console.log(result);
			})
			.catch((err) => {
				notify("Something Went Wrong");
				console.log(err.response.status);
			});
	};

	const change = () => {
		history("/login");
	};

	return (
		<>
			<Navbar />
			<div style={{ padding: "2% 30%" }}>
				<Card>
					<CardBody style={{ padding: "5% " }}>
						<Stack spacing={4}>
							<Text fontSize="3xl" as="b">
								Hey There,
							</Text>
							<Text fontSize="md">Register to continue</Text>
							<InputGroup>
								<Input
									focusBorderColor="green.300"
									type="text"
									style={{ textTransform: "capitalize" }}
									placeholder="Name"
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</InputGroup>
							<InputGroup>
								<Input
									focusBorderColor="green.300"
									type="tel"
									placeholder="Email ID"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</InputGroup>
							<InputGroup>
								<Input
									focusBorderColor="green.300"
									type="tel"
									placeholder="Mobile No."
									onChange={(e) => {
										setMobile(e.target.value);
									}}
								/>
							</InputGroup>
							<InputGroup>
								<Input
									type="password"
									focusBorderColor="green.300"
									placeholder="Password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</InputGroup>
							<Button
								rightIcon={<ArrowForwardIcon />}
								colorScheme="green"
								variant="outline"
								onClick={register}
							>
								Register
							</Button>

							<Text fontSize="md" style={{ textAlign: "center" }}>
								Already have an account?{" "}
								<Text as="b" style={{ cursor: "pointer" }} onClick={change}>
									Login
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
