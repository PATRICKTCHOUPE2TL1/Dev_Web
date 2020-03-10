import React,{useEffect,fetch } from "react";
import logo from './logo.svg';
import './App.css';



class App extends React.Component{
	
	useEffect( {
		fetch('/').then(response =>
			response.json().then(data=>{console.log(data);})
		);
	},[]);
	
	render(){
		return (
			<div className="App">
			  <header className="App-header">
				<a className="App-link" href= "#body">chat rapide</a>
				<a className="App-link" href= "#plus-d-info">plus d'info</a>
				<img src={logo} className="App-logo" alt="logo" />
				
			  </header>
			<div>
				<body className = "App-center" id="body">
				
				
				
				</body>
			</div>
			<footer className="App-footer" id="plus-d-info">
			<p>Pour plus d'info voir google...</p>
			</footer>
			</div>
		  );
	}
}

export default App;
