import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import Navbar from "./Navbar";
export default function Home() {
	return (
		<div>
			<Navbar />
			<div style={{ textAlign: "center", marginTop: "5%" }}>
				<Stack spacing={6}>
					<Heading
						style={{ color: "#1b402f" }}
						as="h1"
						size="2xl"
						noOfLines={2}
					>
						Hi👋, There
					</Heading>
					<Heading
						style={{ color: "#1b402f" }}
						as="h1"
						size="4xl"
						noOfLines={1}
					>
						Welcome To Contact Saver
					</Heading>
					<Heading
						style={{ color: "#1b402f" }}
						as="h1"
						size="2xl"
						noOfLines={1}
					>
						From CSV File
					</Heading>
				</Stack>
			</div>
		</div>
	);
}
