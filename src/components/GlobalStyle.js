import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-style: normal;
        font-weight: normal;
        font-family: 'Raleway', sans-serif;
    }
    a{
        text-decoration: none;
    }
    button{
        border:none;
    }
    input{
        outline:none ;
        border:none;
    }

`