import React from "react"
import Head from "next/head"
import { Global, css } from "@emotion/core"

export interface LayoutProps {
	title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
	return (
		<>
			<Head>
				<html lang='es' />
				<title>Santiago Arias {title ? ` · ${title}` : ""}</title>
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
					integrity='sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU='
				/>
				<link
					href='https://fonts.googleapis.com/css?family=Permanent+Marker|Press+Start+2P|VT323&display=swap'
					rel='stylesheet'
				/>
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
					h3 {
						margin: 0 0 2rem 0;
						line-height: 1.5;
					}

					h1,
					h2 {
						font-family: "Permanent Marker", serif;
						font-weight: 700;
					}

					h3 {
						font-family: "VT323", sans-serif;
					}

					ul {
						list-style: none;
						margin: 0;
						padding: 0;
					}
					a {
						text-decoration: none;
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

					* {
						transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
					}
				`}
			/>
			<main>{children}</main>
		</>
	)
}

export default Layout
