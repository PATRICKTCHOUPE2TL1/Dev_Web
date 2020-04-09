import React,{Component} from 'react'

class MonMedecin extends Component {
	constructor(props){

        super(props);
        this.state =  {
		             
        };
    }
	componentWillMount() {
		this.ask();
	};
	ask = () =>{
		var requete = 'http://127.0.0.1:5000/medecin'
		fetch(requete, {
						mode : 'cors',
						method: "POST",
						//body : JSON.stringify(hash),
						header : {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin' : '*',
							"Access-Control-Allow-Credentials" : true 
						}
					}).then(response => response.json()).then(data=> {
						
						console.log(data);
						var changement = document.getElementById("div");
						for(var i = 0 ; i<data.length; i++){
							changement.innerHTML += '<p><b>prenom</b> : '+ data[i][5] +' , <b>nom</b> : '+data[i][6]+' , <b>spécialité</b> : '+ data[i][1] +'</p>'
						}
						});
	}
	render(){
		return(
			<div id = 'div'>
				
			</div>
		)
	}
}
export default MonMedecin