
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import JobAdd from './pages/JobAdd/JobAdd';
import JobApplied from './pages/JobApplied/JobApplied';
import JobList from './pages/JobList/JobList'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import JobUpdate from './pages/JobUpdate/JobUpdate';
import AllJob from './pages/AllJobs/AllJob';



function App() {
  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />
          {/* <PrivateRoute path="/dashboard" element={<Dashboard/>} /> */}

          <Route path='/profile' element={<Profile />} />
          <Route path='/job-add' element={<JobAdd />} />
          <Route path='/job-applied' element={<JobApplied />} />
          <Route path='/job-list' element={<JobList />} />
          <Route path='/job-edit/:id' element={<JobUpdate />} />
          <Route path='/job-all/' element={<AllJob />} />


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
