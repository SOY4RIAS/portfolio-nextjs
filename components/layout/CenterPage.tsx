import styled from "@emotion/styled"

export const CenterPageContainer = styled.div`
	position: absolute;

	display: flex;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	justify-content: center;
	align-items: center;

	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
`
