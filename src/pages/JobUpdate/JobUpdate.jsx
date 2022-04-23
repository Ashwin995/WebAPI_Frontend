import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";


class JobUpdate extends React.Component {

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
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            newJob: {},
            id: Array(window.location.pathname).pop().split('/')[2].split("=")[1]

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/job/${this.state.id}`, this.state.config)
            .then((response) => {
                console.log("Jobs fsdfds", response.data.data);
                this.setState({
                    job: response.data.data
                })
            }).catch((err) => console.log(err))
    }

    updateJob = () => {
        // e.preventDefault();
        let id = this.state.id
        axios.put(`http://localhost:5000/api/job/update/${id}`, this.state, this.state.config)
            .then((response) => {
                alert("Job Updated Successfully")
                // this.forceUpdate()
                let latestJob = this.state.job.map((job) => {
                    if (job._id === id) {
                        job = this.state
                    }
                    return job
                })
                this.setState({
                    job: latestJob
                });

                // this.toggle();

            }).catch((err) => console.log(err))
    }


    render() {
        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }


        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <form action="">
                                <legend className=" mt-2" htmlFor="">Update Job</legend>
                                <a href="/profile"> / Back to Profile</a><hr />

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="">Job Title</label>
                                                <input type="text" className="form-control form-control-sm" placeholder={this.state.job.job_title} name="job_title" value={this.state.job_title} onChange={this.handleChange} />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Experience Required</label>
                                                <textarea className="form-control form-control-sm" rows="3" placeholder={this.state.job.experience_required} value={this.state.experience_required} name="experience_required" onChange={this.handleChange} ></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Provider or Company</label>
                                                <input type="text" className="form-control form-control-sm" placeholder={this.state.job.company} name="company" value={this.state.company} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="">Job Provider or Company Details</label>
                                                <textarea className="form-control form-control-sm" rows="3" placeholder={this.state.job.company_details} value={this.state.company_details} name="company_details" onChange={this.handleChange}  ></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Level (ex: Junior, Senior ...)</label>
                                                <input type="text" className="form-control form-control-sm" placeholder={this.state.job.job_level} value={this.state.job_level} name="job_level" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Job Type (ex: full time , part time)</label>
                                                <input type="text" className="form-control form-control-sm" placeholder={this.state.job.job_time} value={this.state.job_time} name="job_time" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-50"
                                    onClick={this.updateJob}
                                >Submit</button>
                                <a href="/job-list" className="ml-5">Go to Job List</a>
                            </form>

                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default JobUpdate;