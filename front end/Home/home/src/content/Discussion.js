import React, { Component } from "react";
import io from "socket.io-client";

let endPoint = "http://127.0.0.1:5000/";
let socket = io.connect(`${endPoint}`);

class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [{"messageRecieve" : " ","userId" : " "}],
      message: "",
      name: props.email,
      sender: props.userEmail,
      color: " "
    };
  }

  componentDidMount = () => {

    socket.emit('message', { 'message': " ", 'userId': this.state.sender ,"recId":this.state.sender})

    socket.on("message", msg => {
    
    
      let dictMess = msg
      let len = Object.keys(dictMess).length
      if (dictMess["messageRecieve"] === " ") {
       

      }else if((dictMess["messageRecieve"] !==" ")&&(len ===2)){
        
        this.setState({

          messages: [...this.state.messages, dictMess],

        });
        
    
      } else {
        console.log("third option")

        this.setState({

          messages:dictMess

        });
      }

    });
  };



  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = () => {
    const { message } = this.state;
    if (message !== "") {
      this.setState({
        message: ""
      });
      
      socket.emit("message", { 'message': message, 'userId': this.state.sender ,"recId":this.state.sender });

    } else {
      alert("Please Add A Message");
    }
  };
 

  render() {
    const { messages, message } = this.state;
    return (
      <div>
        {messages.length > 0 &&
          messages.map(msg => (
            
            <div id="message" style={msg["recId"] === this.state.sender ? { backgroundColor: 'red',marginLeft : '60%' } : { backgroundColor: 'blue', marginRight:'100px'}}>
              
              <p>{msg["messageRecieve"]}</p>
            </div>
          ))}
        <input
          value={message}
          name="message"
          onChange={e => this.onChange(e)} style ={{width :'85%',height:"55px",marginTop:"30%" ,border:'2px ,solid,gray',borderRadius:"4px" }}
        /><br /><br/>
        <button type="butoon"  className ="btn btn-success" onClick={() => this.onClick()}>Send Message</button>

      </div>

    );
  }
}
 export default Discussion;