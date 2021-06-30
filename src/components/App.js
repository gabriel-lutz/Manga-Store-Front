import { useState } from "react"
import { BrowserRouter,Switch, Route } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import Navbar from "./Navbar/Navbar"
import Store from "./Store/Store"

export default function App(){
    return(
        <UserContext.Provider value={{}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <Navbar></Navbar>
                        <Store></Store>
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}