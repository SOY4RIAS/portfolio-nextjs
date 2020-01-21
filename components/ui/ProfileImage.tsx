import styled from "@emotion/styled"

export interface ProfileImageProps {
	bgImage?: string
	size?: string
}

const image = "/img/0.jpeg"

export const ProfileImage = styled.div<ProfileImageProps>`
	background-image: url('${({ bgImage }) => bgImage ?? image}');
    width: ${({ size }) => size ?? "200px"};
    height: ${({ size }) => size ?? "200px"};
    border-radius: ${({ size }) => size ?? "200px"};
    background-repeat: no-repeat;
    background-size:  ${({ size }) => size ?? "200px"};


    :hover {
		filter: brightness(90%) blur(1px);
	}

`
