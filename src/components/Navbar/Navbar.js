import styled from "styled-components"
import {FaShoppingCart, FaSignOutAlt} from "react-icons/fa"
export default function Navbar(){
    return(
        <Conteiner>
            <UserMenu>
                <UserName>
                    <p>Bem vindo, Fulano</p>
                </UserName>
                <HorizontalSeparator></HorizontalSeparator>
                <CartLogoutWrapper>
                    <FaSignOutAlt></FaSignOutAlt>
                    <VerticalSeparator></VerticalSeparator>
                    <FaShoppingCart></FaShoppingCart>
                    <p>0 itens</p>
                </CartLogoutWrapper>

            </UserMenu>
            <SearchBar></SearchBar>
            <PageName> Mangá Store </PageName>
        </Conteiner>
    )
}

const Conteiner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    padding: 0 50px;
    height: 100px;
    background: #151515;
    color:white;
    z-index:1;

`
const UserMenu = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;

`
const PageName = styled.h1`
     font-family: 'Fredericka the Great', cursive;
     font-size: 48px;
`

const CartLogoutWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    svg{
        font-size: 20px;
    }
`

const HorizontalSeparator = styled.div`
    width: 100%;
    border: 1px solid white;
`
const VerticalSeparator = styled.div`
    border: 1px solid white;
    height: 20px;
    margin: 0 5px;
`

const UserName = styled.div`
    font-size: 18px;
`

const SearchBar = styled.div`
    width: 300px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
`
