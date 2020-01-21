import * as React from "react"

import { NextPage } from "next"
import Layout from "../components/layout/Layout"
import { CenterPageContainer } from "../components/layout/CenterPage"
import { ProfileImage } from "../components/ui/ProfileImage"

const IndexPage: NextPage = () => {
	const handleClick = () => {
		window.open("https://wa.me/573193292571")
	}

	return (
		<Layout>
			<CenterPageContainer>
				<div>
					<ProfileImage size={"10rem"} onClick={handleClick} />
					<h1>Santiago Arias</h1>
					<h3>Front-End & Mobile Developer</h3>
				</div>
			</CenterPageContainer>
		</Layout>
	)
}

export default IndexPage
