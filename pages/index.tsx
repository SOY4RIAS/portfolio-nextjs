import * as React from "react"

import { NextPage } from "next"
import Layout from "../components/layout/Layout"
import { CenterPageContainer } from "../components/layout/CenterPage"
import { ProfileImage } from "../components/ui/ProfileImage"

import { FiGithub, FiGitlab, FiMail, FiLinkedin } from "react-icons/fi"
import styled from "@emotion/styled"

const ContactLinks = styled.ul`
	display: flex;
	flex-direction: row;
	list-style: none;
	justify-content: space-around;
	align-items: center;
	width: 100%;
`

const Click = styled.div`
	cursor: pointer !important;
`

const IndexPage: NextPage = () => {
	const handleClick = () => {
		window.open("https://wa.me/573193292571")
	}

	const openLink = (link: string) => {
		window.open(link)
	}

	return (
		<Layout>
			<CenterPageContainer>
				<div id='sumary'>
					<ProfileImage
						size={"10rem"}
						onClick={handleClick}
						className='profile-image'
					/>
					<h1>Santiago Arias</h1>
					<h3>Front-End & Mobile Developer</h3>

					<ContactLinks>
						<li>
							<Click onClick={() => openLink("https://www.linkedin.com/in/csarias/")}>
								<FiLinkedin size={"2.2rem"} />
							</Click>
						</li>
						<li>
							<Click onClick={() => openLink("https://github.com/SOY4RIAS")}>
								<FiGithub size={"2.2rem"} />
							</Click>
						</li>
						<li>
							<Click onClick={() => openLink("https://gitlab.com/SOY4RIAS")}>
								<FiGitlab size={"2.2rem"} />
							</Click>
						</li>
						<li>
							<Click onClick={() => openLink("mailto:ariasdevweb@gmail.com")}>
								<FiMail size={"2.2rem"} />
							</Click>
						</li>
					</ContactLinks>
				</div>
			</CenterPageContainer>
		</Layout>
	)
}

export default IndexPage
