import { Component } from "react";
import axios from "axios";
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            photo: null
        }

        this.handleFileSelectChange = this.handleFileSelectChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

    }


    componentDidMount() {
        axios.get('http://localhost:5000/api/auth/', this.state.config)
            .then((response) => {
                console.log("Profile", response.data.data);
                this.setState({
                    user: response.data.data
                })
            }).catch((err) => console.log(err))
    }

    userUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/users/', this.state.user, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        alert("Profile Updated Successfully");

    }



    handleFileUpload = (e) => {
        e.preventDefault()
        const formData = new FormData()
        console.log(formData.append('photo', this.state.photo))
        axios.post('http://localhost:5000/api/users/uploads/', formData, this.state.config)
            .then((response) => {
                if (response.data.success == true) {
                    alert("Profile Picture Updated Successfully")
                }
            }
            ).catch((err) => console.log(err))
    }

    handleFileSelectChange = (e) => {
        e.preventDefault()
        this.setState({
            photo: e.target.files[0]
        })
    }

    updatePassword = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/users/update_password/', this.state.user, this.state.config)
            .then((response) => {
                console.log(response.data);
                if (response.data.success === true) {
                    alert(response.data.msg);
                    window.location.href = "/";
                }

            }
            ).catch((err) => alert(err.response.data.errors[0].msg))

    }

    logoutPrompt = (e) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            window.location.href = "/";
        } else {
            return false;
        }

    }

    handleChange(e) {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    logoutPrompt = (e) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            window.location.href = "/";
        } else {
            return false;
        }

    }



    render() {

        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        return (
            <>

                <div class="container rounded bg-white">

                    <div class="row">

                        <div class="col-md-3 border-right">
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                <form onSubmit={this.handleFileUpload}>

                                    <img class="rounded-circle mt-5" width="150px"
                                        src={`http://localhost:5000/uploads/${this.state.user.photo}`} />
                                </form>
                                <span class="font-weight-bold">{this.state.user.name}</span>
                                <span class="text-black-50">{this.state.user.email}</span><span> </span>
                                <a href="" onClick={this.logoutPrompt}>Logout</a>

                                <span> <label htmlFor="" className="mt-5 strong text-black-50">Select Image</label>
                                    <input type="file" name="photo" onChange={this.handleFileSelectChange} className="form-control small w-100 h-25" />
                                    <input type="submit" value="Upload Image" className="mt-2 btn btn-sm btn-primary w-100" onClick={this.handleFileUpload} />
                                </span>

                            </div>
                        </div>
                        <div class="col-md-5 border-right">
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center mb-3" style={{ border: "1px solid black" }} >
                                    <h4 style={{ paddingLeft: "25%", paddingTop: "5px" }} class="text-right" >Profile Settings</h4>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12"><label class="labels">Full Name</label><input type="text" class="form-control" placeholder={this.state.user.name} name="name" onChange={(e) => this.handleChange(e)} /></div>

                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder={this.state.user.phone} name="phone" onChange={(e) => this.handleChange(e)} /></div>
                                    <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder={this.state.user.email} name="email" onChange={(e) => this.handleChange(e)} /></div>
                                    {/* <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control"  value="" /></div> */}
                                </div>

                                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={this.userUpdate}>Save Profile</button></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center experience ml-3" style={{ border: "1px solid black" }}><h4 style={{ paddingLeft: "25%", paddingTop: "5px" }}>Update Password</h4>
                                </div><br />
                                <div class="col-md-12"><label class="labels">Enter Old Password</label><input type="password" class="form-control" value={this.state.user.password} name="oldPassword" onChange={(e) => this.handleChange(e)} /></div>
                                <div class="col-md-12"><label class="labels">Enter New Password</label><input type="password" class="form-control" value={this.state.user.password} name="newPassword" onChange={(e) => this.handleChange(e)} />
                                    {/* <i id="showHide" style={{ marginTop: 10, float: "right" }}> <FaEye /></i> */}
                                </div>
                                {/* <div class="col-md-12"><label class="labels">Re-enter Password</label><input type="password" class="form-control" value="" name="re_password" /></div><br /> */}
                                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={this.updatePassword}>Update Password</button></div>
                            </div>
                            <div class="col-md-12">
                                <div class="p-3 py-1">

                                    <div class="d-flex justify-content-between align-items-center experience ml-3"
                                        style={{ border: "1px solid black" }} > <h4 style={{ paddingLeft: "25%", paddingTop: "5px" }}>Jobs Section</h4>

                                    </div><br />

                                    <div class="row mt-3 px-3">
                                        <div class="col-md-12"><label class="labels form-control"><a href="job-add">Post New Job</a></label></div>
                                        <div class="col-md-12"><label class="labels form-control"><a href="job-applied">Applied Jobs</a></label></div>
                                        <div class="col-md-12"><label class="labels form-control"><a href="job-all">All Jobs</a></label></div>
                                        {/* <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control"  value="" /></div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>


        );
    }

}

export default Profile;