import styled from "styled-components"

export default function HistoryMangaCard({manga}){
    return(
        <Conteiner>
            <img src={manga.imageUrl}></img>
            <Info>
                <h1>{manga.name}</h1>
                <p> Category: {manga.categoryName}</p>
                <p>{(manga.price/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
            </Info>
        </Conteiner>
    )
}

const Conteiner = styled.div`
    width: 100%;
    margin: 5px 0;
    background: #DBDBDB;
    border-radius: 5px;
    display: flex;
    img{
        width: 100px;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    h1{
        font-size: 20px;
    }
    p{
        margin-top: 10px;
    }
`