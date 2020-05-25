import React, { Component } from "react";
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
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
      console.log("message")
      console.log(msg)
      console.log(msg.length)
    
      let dictMess = msg
      let len = Object.keys(dictMess).length
      console.log(len)
      if (dictMess["messageRecieve"] === " ") {
        console.log("first connection")
        console.log(true)

      }else if((dictMess["messageRecieve"] !==" ")&&(len ===2)){
        console.log("not first connection")
        console.log(dictMess)
        this.setState({

          messages: [...this.state.messages, dictMess],

        });
        
       /* for (let i in dictMess) {
          this.setState({
            messages: [...this.state.messages, dictMess[i]],
            lastMess: dictMess[lengthArr - 1]
          });
        }*/
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
      {console.log("test sender")}
      {console.log(this.state.sender)}
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
              {console.log("test result")}
              {console.log(msg)}
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