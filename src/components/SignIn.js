import styled from "styled-components"


export default function SignIn() {
    
    return (
        <Wrapper>
            <Title>
                login
            </Title>
        </Wrapper>
    )
}

const Wrapper= styled.div`
    margin: 0 auto;
    padding: 0 25px;
    max-width: 373px;
    height: 100vh;
    background-color: #DBDBDB;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title= styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
`
