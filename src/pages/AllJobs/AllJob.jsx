import React from "react";
import axios from "axios";
import { Button, Card } from "reactstrap";

class AllJob extends React.Component {

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
            newJob: {}
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/api/job/', this.state.config)
            .then((response) => {
                console.log("Jobs Per Employer", response.data.data);
                this.setState({
                    job: response.data.data
                })
            }).catch((err) => console.log(err))
    }


    handleJobApply(jid) {
        // alert("JobId", jid)
        axios.put(`http://localhost:5000/api/job/apply/${jid}`, this.state.newJob, this.state.config)
            .then((response) => {

                // this.forceUpdate()
                let latestJob = this.state.job.map((job) => {
                    if (job._id === jid) {
                        job = this.state.newJob
                    }
                    return job
                })
                this.setState({
                    job: latestJob
                })
                alert("Job Applied Successfully")
                window.location.reload();

            }).catch((err) => console.log(err))
    }




    render() {
        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
        return (
            <div>
                {/* <h1>All Jobs</h1> */}


                <div className="container mt-5">

                    <div className="row">

                        <div className="col-sm-12">

                            <h3>All Jobs List</h3><hr />
                            <h5>Jobs Added</h5>

                            <a href="/job-add">/Back to Add Job Page | </a>
                            <a href="/profile">Back to Profile</a>





                            {console.log("Jobs Per Employer", this.state.job)}
                            {this.state.job && (this.state.job).map((item, index) => {
                                if (item.employee === localStorage.getItem("user_id")) {
                                    // document.getElementById("apply").style.display = "block";
                                }
                                return (
                                    <Card className="mb-1" id="card01">
                                        <div className="card-body mt-5 bg-light border">
                                            <h5 className="card-title ">{item.job_title}</h5>
                                            <p className="card-text">Experience Required: {item.experience_required}</p>
                                            <p className="card-text">Job Provider: {item.company}</p>
                                            <p className="card-text">Job Level : {item.job_level}</p>
                                            <p className="card-text">Job Time: {item.job_time}</p>
                                            <p className="card-text">Company Details: {item.company_details}</p>
                                        </div>
                                        <div className="card-footer bg-dark">
                                            <Button className="text-white"
                                                onClick={() => {
                                                    if (window.confirm(`Are you sure to appply to this job?`)) {
                                                        this.handleJobApply(item._id)

                                                    }
                                                }}>Apply</Button>

                                        </div>
                                    </Card>
                                )
                            })}

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AllJob;
