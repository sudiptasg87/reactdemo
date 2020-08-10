import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import CheckAppService from '../../api/lego/CheckAppService.js';
import LegoService from '../../api/lego/LegoService.js';

class TodoApp extends Component{
    render(){
        return (
            <div className="TodoApp">
                    <Router>
                        <Switch>
                            <Route path="/" exact component={WelcomeComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome" component={WelcomeComponent}/>
                            <Route path="/legoSets" component ={LegoSetsComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch> 
                        <FooterComponent/> 
                    </Router>                                             
            </div>
        );
    }
}

class LegoSetsComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            legos : []            
        }
    }

    componentDidMount(){
        LegoService.retrieveAllLegoSets()
        .then(response => {
                this.setState({legos: response.data});
            }
        );
    }

    render(){
        return (
            <div>
                <h1>LegoSets</h1>
                <div className="container">
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>                                
                                <th>NAME</th>
                                <th>DIFFICULTY</th>
                                <th>THEME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.legos.map(
                                    lego => 
                                        <tr>                                            
                                            <td>{lego.name}</td>
                                            <td>{lego.difficulty}</td>
                                            <td>{lego.theme}</td>
                                        </tr>   
                                )
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class FooterComponent extends Component{
    render(){
        return (
            <div>
               <hr/> All rights reserved. 
            </div>
        );
    }
}

class WelcomeComponent extends Component{
    constructor(props){
        super(props);
        this.getStatusMsg = this.getStatusMsg.bind(this);
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessFulResponse = this.handleSuccessFulResponse.bind(this);
    }
    render(){
        return (
            <>
            <h1>Welcome!!!</h1>
            <div className="container">
                Your legosets are displayed <Link to='/legoSets'>here</Link>.
            </div>
            <div className="container">
                Click here to check status of boot based app.<br/>
                <button className="btn btn-primary" onClick={this.getStatusMsg}>Click Here</button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}    
            </div>

            </>
        );
    }
    getStatusMsg() {
        CheckAppService.executeCheckApp()
        .then(response => this.handleSuccessFulResponse(response));
    }
    handleSuccessFulResponse(response){
        this.setState({welcomeMessage: response.data});
    }
}

class LoginComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: 'Zero4',
            password: '',
            hasLoginFailed: false
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChangeEvent(event) {
        this.setState(
            {[event.target.name]:event.target.value}
        );
    }

    loginClicked(){
        if(this.state.username==='Zero4' && this.state.password==='Zero4'){
            this.props.history.push("/welcome");
        }else{           
            this.setState({hasLoginFailed: true});
        }
    }

    render(){
        return(
            <div>
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}               
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChangeEvent}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChangeEvent}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }
}

function ErrorComponent(){
    return <div>An error occured, incorrect path</div>;
}

export default TodoApp;

