import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    /* 
    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
    } */

    body {
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-100']};
    }

    body, input, textarea, button  {
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: 400;
    }
`
