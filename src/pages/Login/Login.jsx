import React from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isLoggedIn: false,
            error: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    userLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth', this.state)
            .then((response) => {
                console.log(response.data)

                if (response.data.success === true) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("user_id", response.data.data._id)
                    this.setState({ isLoggedIn: true, error: false })
                    // console.log("UserID", localStorage.getItem("user_id"));

                }

            }).catch((err) =>
                // console.log(err.response.data.errors[0].msg)
                alert(err.response.data.errors[0].msg)
            )
        // this.setState({ email: '', password: '' })
    }



    render() {

        if (this.state.isLoggedIn === true) {
            return <Navigate to="/profile" />
        }
        return (
            <div>
                {/* <h1>Please Login to Continue</h1> */}


                <div class="container">


                    <div class="row justify-content-center">

                        <div class="col-xl-10 col-lg-12 col-md-9">

                            <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col-lg-6 d-none d-lg-block bg-loginn-image"></div>
                                        <div class="col-lg-6">
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                </div>
                                                <form class="user">
                                                    <div class="form-group">
                                                        <input type="email" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address" name='email' required value={this.state.email} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="password" class="form-control form-control-user"
                                                            id="exampleInputPassword" placeholder="Password" name="password" required value={this.state.password} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="custom-control custom-checkbox small">
                                                            <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                            <label class="custom-control-label" for="customCheck">Remember
                                                                Me</label>
                                                        </div>
                                                    </div>


                                                    <div class="row button">
                                                        <input type="submit" value="Login" onClick={this.userLogin} class="btn btn-primary btn-user btn-block" />
                                                    </div>
                                                </form>

                                                <hr />
                                                <div class="text-center">
                                                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                                                </div>
                                                <div class="text-center">
                                                    <a class="small" href="register">Create an Account!</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Login;