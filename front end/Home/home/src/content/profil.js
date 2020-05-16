import React ,{Component} from "react"
import './MedSpace.css'
import av from "../image/av.png"
import axios from 'axios'





class Profil extends Component{
  constructor(props){
    super(props)
    this.state ={
      id : this.props.id,
      name : this.props.nom,
      surname : this.props.prenom,
      speciality : this.props.specialite,
      others : this.props.autre,
      profil : "helol"

    }
   this.handleOnclick = this.handleOnclick.bind(this)
    }
handleContact =() =>{
  axios
            .post('http://127.0.0.1:5000/addCons', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(erreur => {
                console.log(erreur)
            })

          console.log(this.state)

}

   handleOnclick = ()=>{
    this.props.callBackFromParent(this.state.id)}
 
  render(){
    return(
      <div>
 
      <div className="row">
     

  <div className="column">
    <div className="card">
      <img src={av} alt="Jane" style={{width:'20%'}} />

      <div className="container">
    <h2>{this.props.nom+'   '+this.props.prenom}</h2>
        <p className="title">{this.props.specialite}</p>
        <p>{this.props.autre}</p>
        <p>example@example.com</p>
        <p><button className="button" onClick = {() =>this.handleContact()} >Contact</button></p>
        
        <button type ="button" className="button"  onClick ={() =>this.handleOnclick()}>Cnsulter Profil</button>
        
        <div id = "megInv"><span></span></div>
      </div>
    </div>
  </div>
 
  </div>}
  </div>

    )
}
}
export default Profil