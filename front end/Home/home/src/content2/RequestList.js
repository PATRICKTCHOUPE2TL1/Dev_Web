import React,{Component} from "react"
import ProfilPat from './ProfPat'
import axios from 'axios'





class DemandeAss extends Component{
  constructor(props){
    super(props)
    this.state = {
      db : ' ',
      callBack : ' ',
      loaded : " ",
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
      console.log("test get_Pat")
        console.log(response)
        this.setState({
          db : response.data,
          loaded : "true"
        })
        
    })
    .catch(erreur =>{
        console.log(erreur)
    })
  }
 
  render(){
    console.log("tesstststts")
    console.log(this.state.db)

    const arr = []
    for(let i=0; i<this.state.db.length;i++){

      arr.push(<ProfilPat
         id ={this.state.db[i][0]} nom={this.state.db[i][1]} 
         prenom ={this.state.db[i][2]} image={this.state.db[i][3]} 
          callBackFromParent ={this.myCallBack}/>)
      }

 const Display = () =>{
    if(this.state.db.length ===0){
      return(<p>Vous n'avez aucune demande pour le moment</p>)

    }else {
      if(this.state.loaded === "true"){
        return(arr)
      }else {
        return(<p>not loaded</p>)
      }
    }
  }
    
  
  
return(
  <div>
           
{Display()}
  </div>
)
}
}
export default DemandeAss