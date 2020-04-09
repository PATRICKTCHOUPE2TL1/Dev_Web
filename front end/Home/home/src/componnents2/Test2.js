import React, { Component } from 'react'

class Test2 extends Component {

  componentDidMount() {
    fetch('http://127.0.0.1:5000/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ ident: data })
    })
    .catch(console.log)
  }
  
}