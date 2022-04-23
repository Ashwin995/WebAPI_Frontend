import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";


class JobAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            job: [],
            job_title: '',
            experience_required: '',
            company: '',
            company_details: '',
            job_level: '',
            job_time: '',
            employer: localStorage.getItem('user_id'),
            errors: null,
            isAdded: false,
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/job/per_user/', this.state.config)
            .then((response) => {
                console.log("Jobs Per Employer", response.data.data);
                this.setState({
                    job: response.data.data
                })
            }).catch((err) => console.log(err))
    }



    jobAdd = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/job/', this.state, this.state.config)
            .then((response) => {
                if (response.data.success === true) {
                    alert("Job Added Successfully");

                    // console.log("userid", localStorage.getItem("user_id"))
                    this.setState({
                        job_title: '',
                        experience_required: '',
                        company: '',
                        company_details: '',
                        job_level: '',
                        job_time: '',
                        employer: localStorage.getItem('user_id'),
                        isAdded: false
                    });
                }
            }).catch((err) => console.log(err))
    }



    render() {

        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        
        if (this.state.isAdded === true) {

            return window.location.reload(true);
        }

        return (
            <div>


                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <form action="">
                                <legend className=" mt-2" htmlFor="">Add New Job</legend>
                                <a href="/profile"> / Back to Profile</a><hr />

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="">Job Title</label>
                                                <input type="text" className="form-control form-control-sm" placeholder="Enter Job Title" name="job_title" onChange={this.handleChange} value={this.state.job_title} />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Experience Required</label>
                                                <textarea className="form-control form-control-sm" rows="3" placeholder="Enter Job Experience" name="experience_required" onChange={this.handleChange} value={this.state.experience_required}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Provider or Company</label>
                                                <input type="text" className="form-control form-control-sm" placeholder="Enter Job Provider" name="company" onChange={this.handleChange} value={this.state.company} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="">Job Provider or Company Details</label>
                                                <textarea className="form-control form-control-sm" rows="3" placeholder="Enter Company Details" name="company_details" onChange={this.handleChange} value={this.state.company_details} ></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Level</label>
                                                <input type="text" className="form-control form-control-sm" placeholder="Enter Job Level (ex - Senior , Junior , Manager ...)" name="job_level" onChange={this.handleChange} value={this.state.job_level} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Type</label>
                                                <input type="text" className="form-control form-control-sm" placeholder="Enter Job Type (ex - Full Time, Part-Time)" name="job_time" onChange={this.handleChange} value={this.state.job_time} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-50" onClick={this.jobAdd}>Submit</button>
                                <a href="/job-list" className="ml-5">Go to Job List</a>
                            </form>

                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default JobAdd;