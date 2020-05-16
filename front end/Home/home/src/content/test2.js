import React ,{Component} from 'react'
import './Test2.css'
import av from "../image/av.png"
class Test2 extends Component{

constructor(props){
    super(props)
}

render(){
    return(
        <div>
            <div class="container">
    <div className="row profile">
		<div className="col-md-3">
			<div className="profile-sidebar">
				
				
				<div className="profile-usertitle">
					<div className="profile-usertitle-name">
						Marcus Doe <span class="fa fa-envelope small pull-right"> </span>
					</div>
					<div className="profile-usertitle-job">
						Developer
					</div>
				</div>
				<div className="profile-userbuttons">
					<button type="button" id="follow">Follow</button>
					<button type="button" id="follow">Message</button>
				</div>
				<div className="profile-usermenu">
					<ul className="nav">
						<li className="active">
							<a href="#">
							<i className="glyphicon glyphicon-home"></i>
							Overview </a>
						</li>
						<li>
							<a href="#">
							<i className="glyphicon glyphicon-user"></i>
							Account Settings </a>
						</li>
						<li>
							<a href="#" target="_blank">
							<i className="glyphicon glyphicon-ok"></i>
							Tasks </a>
						</li>
						<li>
							<a href="#">
							<i className="glyphicon glyphicon-flag"></i>
							Help </a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div className="col-md-9">
            <div className="profile-content">
			   Some user related content goes here...
            </div>
		</div>
	</div>
</div>
<center>
<strong>Powered by <a href="http://j.mp/metronictheme" target="_blank">KeenThemes</a></strong>
</center>
<br/>

        </div>
    )
}
}
export default Test2