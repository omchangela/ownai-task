import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import ClientDetails from './components/ClientDetails';
import JobDetails from './components/JobDetails';

const clientJobData = {
    Client1: [
        { jobTitle: 'Software Engineer', reqId: 'REQ123' },
        { jobTitle: 'Product Manager', reqId: 'REQ124' },
        { jobTitle: 'Software Developer', reqId: 'REQ127' },
        { jobTitle: 'Android Developer', reqId: 'REQ128' }
    ],
    Client2: [
        { jobTitle: 'Data Analyst', reqId: 'REQ125' },
        { jobTitle: 'UX Designer', reqId: 'REQ126' },
        { jobTitle: 'Software Developer', reqId: 'REQ129' },
        { jobTitle: 'Android Developer', reqId: 'REQ130' }
    ]
};

function App() {
    const [formData, setFormData] = useState({
        clientName: '',
        poType: '',
        poNumber: '',
        receivedOn: new Date(),
        receivedFromName: '',
        receivedFromEmail: '',
        poStartDate: new Date(),
        poEndDate: new Date(),
        budget: '',
        currency: 'USD',
        jobDetails: [{ jobTitle: '', reqId: '', talents: [{ contractDuration: '', billRate: '', currency: 'USD', standardTimeBR: '', overtimeBR: '' }] }]
    });

    const [jobOptions, setJobOptions] = useState([]);
    const [isViewMode, setIsViewMode] = useState(false);

    useEffect(() => {
        if (formData.clientName) {
            setJobOptions(clientJobData[formData.clientName] || []);
        } else {
            setJobOptions([]);
        }
    }, [formData.clientName]);

    const handleInputChange = (e, jobIndex = null, talentIndex = null) => {
        const { name, value, type, checked } = e.target;

        if (jobIndex !== null) {
            if (talentIndex !== null) {
                // Update talent-specific fields
                const updatedJobDetails = formData.jobDetails.map((job, jIndex) => {
                    if (jIndex === jobIndex) {
                        const updatedTalents = job.talents.map((talent, tIndex) => {
                            if (tIndex === talentIndex) {
                                return { ...talent, [name]: type === 'checkbox' ? checked : value };
                            }
                            return talent;
                        });
                        return { ...job, talents: updatedTalents };
                    }
                    return job;
                });
                setFormData({ ...formData, jobDetails: updatedJobDetails });
            } else {
                // Update job-specific fields and generate REQ ID if jobTitle changes
                const updatedJobDetails = formData.jobDetails.map((job, index) => {
                    if (index === jobIndex) {
                        const updatedJob = { ...job, [name]: value };
                        if (name === 'jobTitle') {
                            const selectedJob = jobOptions.find(option => option.jobTitle === value);
                            updatedJob.reqId = selectedJob ? selectedJob.reqId : '';
                        }
                        return updatedJob;
                    }
                    return job;
                });
                setFormData({ ...formData, jobDetails: updatedJobDetails });
            }
        } else {
            // Update form-level fields
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const addJobDetail = () => {
        setFormData({
            ...formData,
            jobDetails: [...formData.jobDetails, { jobTitle: '', reqId: '', talents: [{ contractDuration: '', billRate: '', currency: 'USD', standardTimeBR: '', overtimeBR: '' }] }]
        });
    };

    const removeJobDetail = (index) => {
        setFormData({
            ...formData,
            jobDetails: formData.jobDetails.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsViewMode(true);
    };

    const handleEdit = () => {
        setIsViewMode(false);
    };

    const handleReset = () => {
        setFormData({
            clientName: '',
            poType: '',
            poNumber: '',
            receivedOn: new Date(),
            receivedFromName: '',
            receivedFromEmail: '',
            poStartDate: new Date(),
            poEndDate: new Date(),
            budget: '',
            currency: 'USD',
            jobDetails: [{ jobTitle: '', reqId: '', talents: [{ contractDuration: '', billRate: '', currency: 'USD', standardTimeBR: '', overtimeBR: '' }] }]
        });
        setIsViewMode(false);
    };

    return (
        <div className="container-fluid">
            <h2>{isViewMode ? 'View Details' : 'Purchase Order Form'}</h2>
            <form onSubmit={handleSubmit}>
                {!isViewMode ? (
                    <>
                        {/* Client and PO Details */}
                        <ClientDetails
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleDateChange={handleDateChange}
                        />

                        {/* Job Details */}
                        <JobDetails
                            jobDetails={formData.jobDetails}
                            jobOptions={jobOptions}
                            poType={formData.poType}
                            handleInputChange={handleInputChange}
                            handleDateChange={handleDateChange}
                            addJobDetail={addJobDetail}
                            removeJobDetail={removeJobDetail}
                        />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" className="btn btn-outline-dark rounded-pill">Save</button>
                            <button type="button" className="btn btn-light btn-outline-dark rounded-pill" onClick={handleReset}>Reset</button>
                        </div>
                    </>
                ) : (
                    <div>
                        {/* Display Form Data */}
                        <h4>Client Name: {formData.clientName}</h4>
                        <h4>PO Type: {formData.poType}</h4>
                        <h4>PO Number: {formData.poNumber}</h4>
                        <h4>Received On: {formData.receivedOn.toDateString()}</h4>
                        <h4>Received From: {formData.receivedFromName} ({formData.receivedFromEmail})</h4>
                        <h4>PO Start Date: {formData.poStartDate.toDateString()}</h4>
                        <h4>PO End Date: {formData.poEndDate.toDateString()}</h4>
                        <h4>Budget: {formData.budget}</h4>
                        <h4>Currency: {formData.currency}</h4>

                        <h3>Talent Details</h3>
                        {formData.jobDetails.map((job, jobIndex) => (
                            <div key={jobIndex} className="card my-2">
                                <div className="card-body">
                                    <h5 className="card-title">Job Detail #{jobIndex + 1}</h5>
                                    <p><strong>Job Title:</strong> {job.jobTitle}</p>
                                    <p><strong>REQ ID:</strong> {job.reqId}</p>
                                    <h6>Talents</h6>
                                    {job.talents.map((talent, talentIndex) => (
                                        <div key={talentIndex} className="mb-3">
                                            <p><strong>Talent #{talentIndex + 1}</strong></p>
                                            <p><strong>Contract Duration:</strong> {talent.contractDuration}</p>
                                            <p><strong>Bill Rate:</strong> {talent.billRate}</p>
                                            <p><strong>Currency:</strong> {talent.currency}</p>
                                            <p><strong>Standard Time Bill Rate:</strong> {talent.standardTimeBR}</p>
                                            <p><strong>Overtime Bill Rate:</strong> {talent.overtimeBR}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default App;
