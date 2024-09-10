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

// Dummy data for talents
const dummyTalentData = {
    'Software Engineer': [
        { name: 'Umesh Khan', contractDuration: '12 months', billRate: '100', currency: 'USD', standardTimeBR: '90', overtimeBR: '120' },
        { name: 'Ravi Sharma', contractDuration: '6 months', billRate: '80', currency: 'USD', standardTimeBR: '70', overtimeBR: '100' }
    ],
    'Product Manager': [
        { name: 'Priya Patel', contractDuration: '18 months', billRate: '120', currency: 'USD', standardTimeBR: '110', overtimeBR: '130' },
        { name: 'Amit Mehta', contractDuration: '9 months', billRate: '95', currency: 'USD', standardTimeBR: '85', overtimeBR: '105' }
    ],
    'Data Analyst': [
        { name: 'Sunil Gupta', contractDuration: '10 months', billRate: '85', currency: 'USD', standardTimeBR: '75', overtimeBR: '95' },
        { name: 'Kiran Verma', contractDuration: '7 months', billRate: '70', currency: 'USD', standardTimeBR: '65', overtimeBR: '85' }
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
    const [checkedTalents, setCheckedTalents] = useState({}); // Track checked status of talents

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

                            // Populate talents with dummy data based on job title
                            updatedJob.talents = dummyTalentData[value] || [{ contractDuration: '', billRate: '', currency: 'USD', standardTimeBR: '', overtimeBR: '' }];
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

    const handleCheckboxChange = (e, jobIndex, talentIndex) => {
        const { checked } = e.target;
        setCheckedTalents({
            ...checkedTalents,
            [`${jobIndex}-${talentIndex}`]: checked
        });
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
        setCheckedTalents({});
        setIsViewMode(false);
    };

    return (
        <div className="container-fluid">
            <h2 className='text-center my-5 ' style={{ backgroundColor: 'green', color: 'white' }}>{isViewMode ? 'View Details' : 'Purchase Order Form'}</h2>
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
                            checkedTalents={checkedTalents}
                            handleCheckboxChange={handleCheckboxChange}
                            formData={formData}
                        />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
                                        <div key={talentIndex} className="mb-2">
                                            <input
                                                type="checkbox"
                                                id={`talent-${jobIndex}-${talentIndex}`}
                                                checked={!!checkedTalents[`${jobIndex}-${talentIndex}`]}
                                                onChange={(e) => handleCheckboxChange(e, jobIndex, talentIndex)}
                                            />
                                            <label htmlFor={`talent-${jobIndex}-${talentIndex}`} className="ms-2">{talent.name}</label>
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

