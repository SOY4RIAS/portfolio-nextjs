import * as React from "react"

import { NextPage } from "next"
import Layout from "../components/layout/Layout"
import { CenterPageContainer } from "../components/layout/CenterPage"
import { ProfileImage } from "../components/ui/ProfileImage"

import { TiSocialLinkedin } from "react-icons/ti"
import { FiGithub, FiGitlab, FiMail } from "react-icons/fi"
import styled from "@emotion/styled"

const ContactLinks = styled.ul`
	display: flex;
	flex-direction: row;
	list-style: none;
	justify-content: space-around;
	align-items: center;
	width: 100%;
`

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

					<ContactLinks>
						<li>
							<a href='https://www.linkedin.com/in/csarias/' target='_blank'>
								<TiSocialLinkedin size={"2.5rem"} />
							</a>
						</li>
						<li>
							<a
								href='https://github.com/SOY4RIAS'
								target='_blank'
								rel='noopener noreferrer'
							>
								<FiGithub size={"2.2rem"} />
							</a>
						</li>
						<li>
							<a href='https://gitlab.com/SOY4RIAS' target='_blank'>
								<FiGitlab size={"2.2rem"} />
							</a>
						</li>
						<li>
							<a href='mailto:ariasdevweb@gmail.com'>
								<FiMail size={"2.2rem"} />
							</a>
						</li>
					</ContactLinks>
				</div>
			</CenterPageContainer>
		</Layout>
	)
}

export default IndexPage
