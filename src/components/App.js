import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {useState} from "react"
import UserContext from "../contexts/UserContext"
import Store from "./Store/Store"

import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Cart from "./Cart"
import Checkout from "./Checkout"

export default function App(){
    const [cartItens,setCartItens]= useState(0)
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem('mangaStoreUserInfo'))!==null?
            JSON.parse(localStorage.getItem('mangaStoreUserInfo')):
            ""
    );

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, cartItens,setCartItens}}>
            <Router>
                <GlobalStyle/>
                <Switch>
                    <Route path="/" exact component={SignIn}/>
                    <Route path="/sign-up" exact component={SignUp}/>
                    <Route path="/cart" exact component={Cart}/>
                    <Route path="/main" exact component={Store}/>
                    <Route path="/checkout" exact component={Checkout}/>
                </Switch>
            </Router>
        </UserContext.Provider>
    )
}