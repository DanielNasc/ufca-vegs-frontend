import styled, { keyframes } from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 4rem;

  margin-bottom: 1rem;

  /* background-color: red; */

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      &.active {
        color: ${(props) => props.theme['green-500']};
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }
    }
  }

  a {
    /* width: 3rem; */
    height: 3rem;
    gap: 0.25rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme['gray-100']};

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    text-decoration: none;
  }

  @media (max-width: 768px) {
    nav a:not(.active) span {
      display: none;
    }
  }
`

const gradient = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

interface ProfilePicContainerProps {
  pfp_src: string
}

export const ProfilePicContainer = styled.div<ProfilePicContainerProps>`
  background: linear-gradient(
    -45deg,
    #ee7752,
    #e73c7e,
    #23d5ab,
    #fcd512,
    #f0d805
  );
  background-size: 400% 400%;
  animation: ${gradient} 5s ease infinite;

  height: 3.5rem;
  width: 3.5rem;
  border-radius: 999999px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    height: 3rem;
    width: 3rem;

    background-image: url(${(props) => props.pfp_src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    border: 1px solid black;
    border-radius: 999999px;
  }
`
