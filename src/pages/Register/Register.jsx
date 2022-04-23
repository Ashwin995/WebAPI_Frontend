import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            errors: {},
            isRegistered: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/', this.state)
            .then((response) => {
               if(response.data.success===true){

                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.setState({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    isRegistered: true
                });
               }
            }).catch((err) => console.log(err))
    }

    render() {
        if(this.state.isRegistered === true){
            return <Navigate to="/" />
        }
        return (
            <div>
                <div class="container">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">

                            <div class="row">
                                <div class="col-lg-5 d-none d-lg-block bg-registerr-image"></div>
                                <div class="col-lg-7">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <div class="mb-3 mb-sm-0">
                                                    <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                        placeholder="Full Name" name='name' value={this.state.name} required onChange={this.handleChange} />
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Email Address" name='email' value={this.state.email} required onChange={this.handleChange} />
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="number" class="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Phone" name='phone' value={this.state.phone} required onChange={this.handleChange} />
                                                </div>
                                                <div class="col-sm-6">
                                                    <input type="password" class="form-control form-control-user"
                                                        id="exampleRepeatPassword" placeholder="Password" name='password' value={this.state.password} onChange={this.handleChange} required />
                                                </div>
                                            </div>

                                            <input class="btn btn-primary btn-user btn-block" type="submit" value="Register" onClick={this.registerUser} />



                                        </form>
                                        <hr />
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="/">Already have an account? Login!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register;