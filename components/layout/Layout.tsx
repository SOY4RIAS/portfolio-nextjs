import React, { useEffect } from "react"
import Head from "next/head"
import { Global, css } from "@emotion/core"
import ReactGA from "react-ga"

export interface LayoutProps {
	title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
	useEffect(() => {
		ReactGA.initialize('G-XN9NLL60J2')
		ReactGA.pageview(window.location.pathname + window.location.search)
	}, [])

	return (
		<>
			<Head>
				<meta
					name='Description'
					content='Tarjeta de presentación de Santiago Arias; Desarrollador de software Front-End y Movil'
				/>
				<title>Santiago Arias {title ? ` · ${title}` : ""}</title>
				<link href='/css/fonts.css' rel='stylesheet' />
			</Head>

			{/* <Header /> */}
			<Global
				styles={css`
					:root {
						--gray: #3d3d3d;
						--gray-light: #6f6f6f;
						--gray-alt: #e1e1e1;
						--orange: #da552f;
					}

					html {
						font-size: 62.5%;
						box-sizing: border-box;
					}

					*,
					*:before,
					*:after {
						box-sizing: inherit;
					}

					body {
						font-family: sans-serif;
						font-size: 1.6rem;
						line-height: 1.5;
					}

					h1,
					h2,
					h3,
					h4 {
						margin: 0 0 2rem 0;
						line-height: 1.5;
					}

					h1,
					h2 {
						font-family: "Permanent Marker", serif;
						font-weight: 700;
					}

					h3, h4 {
						font-family: "VT323", sans-serif;
					}

					ul {
						list-style: none;
						margin: 0;
						padding: 0;
					}
					a {
						text-decoration: none;
						color: inherit;
					}

					button {
						cursor: pointer;
					}

					@media (prefers-color-scheme: dark) {
						body {
							background-color: black;
							color: #ccc;
						}
					}

					h1,
					h3 {
						transition: all 0.5s cubic-bezier(0.6, -0.28, 0.74, 0.05);
					}

					@keyframes dash {
						to {
							stroke-dashoffset: 0;
						}
					}
					svg {
						stroke-dasharray: 1000;
						stroke-dashoffset: 1000;
						animation: dash 20s linear forwards infinite alternate;
					}
				`}
			/>
			<main>{children}</main>
		</>
	)
}

export default Layout
