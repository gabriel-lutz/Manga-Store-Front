import { useState } from "react"
import { BrowserRouter,Switch, Route } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import Navbar from "./Navbar/Navbar"

export default function App(){
    return(
        <UserContext.Provider value={{}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <Navbar></Navbar>
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}