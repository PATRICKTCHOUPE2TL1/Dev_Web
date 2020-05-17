import React, { Component } from "react";
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: ["Hello and Welcome"],
      message: "",
      name: props.email,
    };
  }

  componentDidMount = () => {
    console.log('socket test1')

    socket.on("message", msg => {
      console.log('socket test2')
      console.log(msg)
      this.setState({
        messages: [...this.state.messages, msg]
      });

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
      socket.emit("message", {'username' : this.state.name,  'message': message});
     
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
            <div>
              <p>{msg}</p>
            </div>
          ))}
        <input
          value={message}
          name="message"
          onChange={e => this.onChange(e)}
        />
        <button onClick={() => this.onClick()}>Send Message</button>
      </div>
    );
  }
}
export default Discussion;