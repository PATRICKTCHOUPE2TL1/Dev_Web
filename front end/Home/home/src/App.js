import React,{Component} from 'react' 
import Entete from "./components/header"
import "./App.css"
import Main from './components/Main'
//import Login from './components/login'





class App extends Component {
    render() {

    return (
     
        <div>
        <Entete />
        <Main /> 
        </div>
        
 )
}
}
export default App