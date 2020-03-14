import React ,  {Component} from "react"

import SignIn from "./Signin"
import Login from "./login"
import Home from "./Home"
import NotFound from "./404"

import { Switch, Route } from 'react-router-dom'
//component necessary for routing
   

class Main extends Component {
    constructor(props){
        super(props)
    }
   render(){
       return (
           //revise switch
        <main>
        <Switch>
          <Route path ='/not found' component = {NotFound} />
          <Route exact path ='/' component = {Home} />
          <Route path='/signin' component={SignIn}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </main>
       )
   }
}

export default Main
 