import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {useState} from "react"
import UserContext from "../contexts/UserContext"

import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Cart from "./Cart"

export default function App(){
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem('mangaStoreUserInfo'))!==null?
            JSON.parse(localStorage.getItem('mangaStoreUserInfo')):
            ""
    );

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            <Router>
                <GlobalStyle/>
                <Switch>
                    <Route path="/" exact component={SignIn}/>
                    <Route path="/sign-up" exact component={SignUp}/>
                    <Route path="/cart" exact component={Cart}/>
                </Switch>
            </Router>
        </UserContext.Provider>
    )
}