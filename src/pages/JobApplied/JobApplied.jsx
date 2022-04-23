import React from "react";


import axios from "axios";

class JobApplied extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            job: [],
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        }
    }





    componentDidMount() {
        axios.get('http://localhost:5000/api/job/per/', this.state.config)
            .then((response) => {
                console.log("Jobs Per Employer", response.data.data);
                this.setState({
                    job: response.data.data
                })
            }).catch((err) => console.log(err))
    }



    render() {
        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        return (
            <div>
                <div className="container mt-5">

                    <div className="row">

                        <div className="col-sm-12">


                            <h5>Jobs Applied</h5>

                            {/* <a href="/job-add">/Back to Add Job Page | </a> */}
                            <a href="/profile">Back to Profile</a>
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Experience Required</th>
                                        <th>Company</th>
                                        <th>Company Details</th>
                                        <th>Job Level</th>
                                        <th>Job Type</th>
                                        {/* <th>Action Type</th> */}
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
                                                {/* <td className="cell">
                                                    <a href=""
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure want to halt the application applied?'))
                                                                this.deleteJob(item._id.parseString())
                                                        }}><i className="fas fa-trash one"></i></a>
                                                </td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default JobApplied
