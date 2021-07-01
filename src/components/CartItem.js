import styled from "styled-components"
import deleteIcon from "../assets/deleteButton.svg"

export default function CartItem({name,category,cover,price,removeFromCart,cartId}) {

    return (
        <Wrapper>
            <Cover src={cover} alt="cover"></Cover>
            <Info>
                <p>{name}</p>
                <p>{category}</p>
                <span>R$ {price}</span>
            </Info>
            <TakeOut>
                <img src={deleteIcon} alt="delete button" onClick={()=>removeFromCart(cartId, name)}></img>
            </TakeOut>
        </Wrapper>
    )
}

const Wrapper= styled.div`
    display:flex;
    align-items: center;
    padding: 10px;
    margin: 0 auto;
    border-radius: 5px;
    width: 100%;
    height: 120px;
    gap:10px;
    background-color:#474747;
`

const Cover= styled.img`
    height: 100%;
`

const Info= styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    color: white;
    width: 80%;
    font-size: 20px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    span{
        color:#56AD6E;
    }
`

const TakeOut= styled.div`
    width:25px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

// #DBDBDB => plano de fundo
// #474747 => botao e o texto em baixo do botao
// #696969 => placeholder