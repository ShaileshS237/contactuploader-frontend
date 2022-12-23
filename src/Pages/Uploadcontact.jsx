import React, { useState } from "react";
import Papa from "papaparse";
import Navbar from "./Navbar";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Heading,
	Td,
	TableContainer,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {
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

	const [parsedData, setparsedData] = useState(null);
	const [data, setData] = useState([]);

	const [error, setError] = useState("");

	const [file, setFile] = useState("");

	const handleFileChange = (e) => {
		setError("");

		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}

			setFile(inputFile);
		}
	};
	const handleParse = () => {
		if (!file) return setError("Enter a valid file");

		const reader = new FileReader();

		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const tempData = csv?.data;
			console.log(tempData.slice(0, tempData.length - 1));
			setparsedData(tempData.slice(0, tempData.length - 1));
		};
		reader.readAsText(file);
	};

	const uploadData = () => {
		axios
			.post("http://localhost:5000/upload", parsedData)
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					notify("Data Uploaded Succefully");
					setparsedData(null);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Navbar />
			<Heading
				style={{
					color: "#1b402f",
					textAlign: "center",
					marginTop: "5%",
					marginBottom: "30px",
				}}
				as="h1"
				size="2xl"
				noOfLines={2}
			>
				Select CSV File
			</Heading>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<input
					style={{
						background: " #e6f4e4",
						padding: "40px",
						borderRadius: "7px",
					}}
					onChange={handleFileChange}
					id="csvInput"
					name="file"
					type="File"
				/>
				{/* <label
					htmlFor="csvInput"
					style={{ display: "block", marginRight: "20px" }}
				>
					Select CSV File
				</label> */}
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Button
					onClick={handleParse}
					style={{
						width: "17%",
						justifyContent: "center",
						marginTop: "2%",
					}}
					colorScheme="teal"
					size="md"
					disabled={!file}
				>
					Parse Data
				</Button>
				{/* <button
					className="login__btn"
					onClick={handleParse}
					style={{
						width: "17%",
						justifyContent: "center",
						marginTop: "2%",
					}}
				>
					Parse
				</button> */}
			</div>
			{parsedData ? (
				<div style={{ marginTop: "3rem", padding: "0 12%" }}>
					<TableContainer>
						<Table size="md" variant="simple">
							<Thead>
								<Tr>
									<Th>Name</Th>
									<Th>Phone</Th>
									<Th>Email ID</Th>
									<Th>LinkedIN Profile</Th>
								</Tr>
							</Thead>
							<Tbody>
								{parsedData.map((data, i) => {
									return (
										<Tr key={i}>
											<Td>{data.name}</Td>
											{!data.phone ? "" : <Td>+91 - {data.phone}</Td>}
											<Td>{data.email}</Td>
											<Td>{data.linkedprofile}</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<button
							className=" register__btn"
							style={{ marginTop: "28px", width: "29%", height: "66px" }}
							onClick={uploadData}
						>
							Upload Data
						</button>
					</div>
				</div>
			) : (
				""
			)}
			<ToastContainer />
		</div>
	);
};

export default App;
