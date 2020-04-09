import React,{Component,  useEffect} from "react"
import socketIOClient from "socket.io-client";
import io from 'socket.io-client';
//import MessageList from './MessageList/MessageList'

/*
useEffect(()=>{
	socket.on( 'connect', function() {
	  
        socket.emit( 'my event', {
          data: 'User Connected'
        } )
	})
	});*/
	/*
const Discussion = () =>{
    return (<div className="discussion">
            
            <MessageList />
            
         </div>
	)
}*/
class Discussion extends Component {
	
	 constructor(props){

        super(props);
        this.state =  {
		   //io : require('socket.io')(),
		   socket : null,
           message : ''
		   //nb : 0
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
       
    }
	
	componentWillMount() {
		this.initSocket();
	};
	initSocket=() =>{
		var so = io.connect('http://127.0.0.1:5000');
		so.on('message' , function(msg){
			if(msg.data != undefined){
				var ajout = document.getElementById("message_holder");
				ajout.innerHTML += '<p id = ' + this.state.nb+ '>'+ msg.data +'</p>';
				/*
				this.state.nb = this.state.nb+1;
				if(this.state.nb==20){
					var elem = document.getElementById("20");
					elem.
				}*/
			}
		});
		/*
		so.on( 'connect', function() {
		  
			so.emit( 'my event', {
			  data: 'User Connected'
			} )
	  });*/
	  this.setState({socket : so})
	}
	handleSubmit = function(event){
		//console.log(this.state.message);
		var mess = this.state.message;
		event.preventDefault();
		this.state.socket.emit('my event',{data: mess});
		var input = document.getElementById("message");
		input.value = '';
		
	};
	handleMessageChange = event => {
		this.setState({
            message: event.target.value
        })
	};
	
	
	
	render(){
		return(
		<div class="div">
		
			<div>
			<p>décrivez votre problème</p>
			</div>
			
				
				<div id="message_holder"></div>
				
				
			<div class="div">
			<form onSubmit={this.handleSubmit}>
				  <input type="text" id="message" onChange={this.handleMessageChange} />
				  <input type="submit"  />
			</form>
			</div>
			</div>
			 
		);
	}
}
export default Discussion