import React from "react";
import axios from "axios";
import "./Job.css"
import { Navigate, Link } from "react-router-dom";
import {
    Row, Col,
    Button, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup

} from 'reactstrap'

class JobList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            job: [],
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            isEdit: false,
            newJob: {}
        }
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

    deleteJob = (id) => {
        axios.delete(`http://localhost:5000/api/job/delete/${id}`, this.state.config)
            .then((response) => {
                if (response.data.success === true) {
                    alert("Job Deleted Successfully");
                    this.setState({
                        job: this.state.job.filter(job => job._id !== id)
                    })
                }
            }).catch((err) => console.log(err))
    }

    render() {
        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        return (


            <div className="container mt-5">

                <div className="row">

                    <div className="col-sm-12">

                        <h3>All Jobs List</h3><hr />
                        <h5>Jobs Added</h5>

                        <a href="/job-add">/Back to Add Job Page</a>


                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Experience Required</th>
                                    <th>Company</th>
                                    <th>Company Details</th>
                                    <th>Job Level</th>
                                    <th>Job Type</th>
                                    <th>Action Type</th>
                                </tr>
                            </thead>
                            <tbody>

                                {console.log("Jobs Per Employer", this.state.job)}
                                {this.state.job && (this.state.job).map((item, index) => {
                                    return (
                                        <tr>
                                            <td className="cell">{item.job_title}</td>
                                            <td className="cell">{item.experience_required}</td>
                                            <td className="cell">{item.company}</td>
                                            <td className="cell">{item.company_details}</td>
                                            <td className="cell">{item.job_level}</td>
                                            <td className="cell">{item.job_time}</td>
                                            <td className="cell">
                                                <Link to={{
                                                    pathname: `/job-edit/id=${item._id}`,
                                                    state: {
                                                        job: "data passed"
                                                    }
                                                }}><i className="fas fa-edit one"></i></Link>
                                                <a href=""
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure to delete this job?'))
                                                            this.deleteJob(item._id)
                                                    }}><i className="fas fa-trash one"></i></a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}


export default JobList