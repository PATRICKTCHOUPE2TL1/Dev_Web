import React,{Component} from "react"
import ProfilPat  from './profilPat'
import axios from 'axios'
//import MesDonnees from "../content2/MesDonnees"
import ProfMed from './profilNosMed'




class NosMedecin extends Component{
  constructor(props){
    super(props)
    this.state = {
      db : ' ',
      callBack : ' '
    }
    this.myCallBack = this.myCallBack.bind(this)
  }

  myCallBack = (dataFromChild) => {
    this.setState({callBack : dataFromChild})
  }

  componentDidMount() {
    axios
    .post('http://127.0.0.1:5000/get_Pat', this.state)
    .then(response =>{
        this.setState({
          db : response.data
        })
    })
    .catch(erreur =>{
        console.log(erreur)
    })
  }
 
  render(){

    const arr = []
    for(let i=0; i<this.state.db.length;i++){
      arr.push(<ProfilPat key={i} id ={this.state.db[i][0]} nom={this.state.db[i][1]} prenom ={this.state.db[i][2]} image={this.state.db[i][3]}  callBackFromParent ={this.myCallBack}/>)
    
  }
  
return(
  <div>
{this.state.callBack ===' ' ?  <div>{arr}</div> :<div>{console.log('y')}<ProfMed userId ={this.state.callBack} /> </div>}
  </div>
)
}
}
export default NosMedecin