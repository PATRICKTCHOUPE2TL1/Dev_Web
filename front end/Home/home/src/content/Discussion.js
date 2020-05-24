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
      color: " "
    };
    this.handleStyle = this.handleStyle.bind(this)
  }

  componentDidMount = () => {
    { this.handleStyle() }

    socket.emit('message', { 'message': " ", 'userId': this.state.sender })

    socket.on("message", msg => {

      if (msg['userId'] === this.state.sender) {
        this.setState({
          color: "yes"
        })
      } else {
        this.setState({
          color: "no"
        })
      }
      let messageRecive = msg['messageRecieve']
      if (typeof (messageRecive) == "object") {

        let lengthArr = messageRecive.length - 1
        for (let i in messageRecive) {
          this.setState({
            messages: [...this.state.messages, messageRecive[i]],
            lastMess: messageRecive[lengthArr - 1]
          });
        }
      } else {


        this.setState({

          messages: [...this.state.messages, messageRecive],

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

      socket.emit("message", { 'message': message, 'userId': this.state.sender });

    } else {
      alert("Please Add A Message");
    }
  };
  handleStyle = () => {
    if (this.state.color === "yes") {
      document.getElementById("message").style.backgroundColor = "green"
    } else {
      document.getElementById("message").style.backgroundColor = "grey"
    }
  }

  render() {
    const { messages, message } = this.state;
    return (
      <div>
        {messages.length > 0 &&
          messages.map(msg => (
            <div id="message"  style={this.state.color === "yes" ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }}>
              <p className="msgPatient">{msg}</p>
            </div>
          ))}
        <div className="form-group col-md-6">
        <input
          value={message}
          name="message"
          onChange={e => this.onChange(e)}
          className="form-control"
        />
        </div>
        <button type="butoon"  className ="btn btn-success" onClick={() => this.onClick()}>Send Message</button>

      </div>

    );
  }
}
export default Discussion;