import React from 'react';
import { Login } from '../components/login';
import {instance} from '../utils/AxiosConfig';
import { withRouter } from "react-router-dom";
import setAuthorizationToken from "../utils/AxiosConfig";

class Login_smart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalid: false,
            input: {}
        };
        this.TakeInput = this.TakeInput.bind(this);
        this.Login = this.Login.bind(this);
    }

    TakeInput(event) {
        const { id, value } = event.target;
        this.setState(prevState => ({
            input: {
                ...prevState.input,
                [id]: value
            }
        }));
    }

    Login() {
        instance.post('/login', this.state.input)
            .then((response) => {
                console.log(response.data);
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);

                if (response.data.Status === 'S') {
                    this.props.history.push("/Dashboard");
                } else if (response.data.Status === 'F') {
                    this.setState({ invalid: true });
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                this.setState({ invalid: true });
            });
    }

    render() {
        return (
            <Login 
                sts={this.state.invalid} 
                input={this.TakeInput} 
                login={this.Login}
            />
        );
    }
}

export default withRouter(Login_smart);