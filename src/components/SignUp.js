import styled from "styled-components"
import {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import axios from "axios"
import paper from "../assets/paper.png"

export default function SignUp() {
    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation,setPasswordConfirmation] = useState("")
    
    let history = useHistory();
    const [requesting,setRequesting] = useState(false)

    function register(e){
        e.preventDefault()
        if(password===passwordConfirmation){
            setRequesting(true)
            const body = {name,email,password}
            axios.post("http://localhost:4000/sign-up",body).then(r=>{
                setRequesting(false)
                history.push("/")
            }).catch(e=> {
                console.log(e)
                setRequesting(false)
            })
        }else{
            alert("Password does not match!")
        }
    }

    return (
        <Wrapper>
            <FormWrapper>
                <TitleWrapper>
                    <Title>
                        Mangá Store
                    </Title>
                </TitleWrapper>
                <Form onSubmit={register}>
                    <Input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}></Input>
                    <Input type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)}></Input>
                    <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}></Input>
                    <Input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={e=>setPasswordConfirmation(e.target.value)}></Input>
                    {requesting?
                        <Button>Signing up...</Button>:
                        <Button type="submit">Sign up</Button>
                    }
                </Form>
                <Link to="/">
                    <p>Have an account? Click here!</p>
                </Link>
            </FormWrapper>
        </Wrapper>
    )
}

const Wrapper= styled.div`
    margin: 0 auto;
    padding: 0 25px;
    max-width: 420px;
    height: 100vh;
    background-color:#dbdbdb;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const FormWrapper= styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:30px;
    p{
        text-decoration: none;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        color: #474747;
    }
`

const Form= styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 13px;
`

const TitleWrapper= styled.div`
    display: flex;
    justify-content: center;
    margin-left: -85px;
    margin-bottom: -30px;
    width: 100%;
    height: 150px;
    background: url(${paper}) no-repeat center center;
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
`

const Title= styled.h1`
    font-family: 'Fredericka the Great', cursive;
    font-style: normal;
    font-weight: normal;
    margin-top: 35px;
    margin-left: -30px;
    font-size: 38px;
    line-height: 50px;
    color: black;
    @media(max-width:374px){
        font-size: 32px;
    }
`

const Input = styled.input`
    height: 58px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    padding-left: 15px;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    ::placeholder{
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 23px;
        color: #696969;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 46px;
    background: #474747;
    border-radius: 5px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    cursor: pointer;
`;

