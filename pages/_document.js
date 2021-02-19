import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang='es'>
				<Head>
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-XN9NLL60J2"></script>
					<script dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());

							gtag('config', 'G-XN9NLL60J2');
						`
					}} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
