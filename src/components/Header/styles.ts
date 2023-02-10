import styled, { keyframes } from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 4rem;

  margin-bottom: 1rem;

  nav {
    display: flex;
    gap: 0.5rem;

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

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
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

export const ProfilePicContainer = styled.div`
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23d5ab, #fcd512, #f0d805);
  background-size: 400% 400%;
  animation: ${gradient} 5s ease infinite;

  height: 3.5rem;
  width: 3.5rem;
  border-radius: 999999px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
      height: 3rem;
      width: 3rem;

      border: 1px solid black;
      border-radius: 999999px;
    }
`
