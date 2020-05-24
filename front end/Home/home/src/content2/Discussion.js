import React, { Component } from "react";
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [""],
      message: "",
      name: props.email,
      sender: props.userEmail,
      myEmail :props.myEmail
    };

    socket.emit('message', { 'message': " ", 'userId': this.state.sender,'recId':this.state.myEmail })

  }

  

  componentDidMount = () => {


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
    {console.log("test sender")}
{console.log(this.state.sender)}
    if (message !== "") {
      this.setState({
        message: ""
      });

      socket.emit("message", { 'message': message, 'userId': this.state.sender,'recId':this.state.myEmail });

    } else {
      alert("Please Add A Message");
    }
  };


  render() {
    const { messages, message } = this.state;
    return (
      <div>
        {console.log("test props")}
        {console.log(this.state.sender)}
        {messages.length > 0 &&
          messages.map(msg => (
            
            <div id="message" style={msg["recId"] === this.state.myEmail ? { backgroundColor: 'red' } : { backgroundColor: 'blue' }}>
             
              <p>{msg["messageRecieve"]}</p>
            </div>
          ))}
        <input
          value={message}
          name="message"
          onChange={e => this.onChange(e)}
        />
        <button type="butoon" onClick={() => this.onClick()}>Send Message</button>

      </div>

    );
  }
}
 export default Discussion;