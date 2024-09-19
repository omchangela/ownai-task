import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientDetails from './components/ClientDetails';
import JobDetails from './components/JobDetails';
import '@fortawesome/fontawesome-free/css/all.min.css';

const clientJobData = {
    Client1: [
        { jobTitle: 'Software Engineer', reqId: 'REQ123' },
        { jobTitle: 'Product Manager', reqId: 'REQ124' },
        { jobTitle: 'Data Analyst', reqId: 'REQ125' },
    ],
    Client2: [
        { jobTitle: 'Software Engineer', reqId: 'REQ123' },
        { jobTitle: 'Product Manager', reqId: 'REQ124' },
        { jobTitle: 'Data Analyst', reqId: 'REQ125' },
    ]
};

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

const currencySymbols = {
    USD: { symbol: '$', position: 'before' },
    EUR: { symbol: '€', position: 'before' },
    INR: { symbol: '₹', position: 'before' },
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
    const [checkedTalents, setCheckedTalents] = useState({});
    const [loading, setLoading] = useState(false);

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
                const updatedJobDetails = formData.jobDetails.map((job, index) => {
                    if (index === jobIndex) {
                        const updatedJob = { ...job, [name]: value };
                        if (name === 'jobTitle') {
                            const selectedJob = jobOptions.find(option => option.jobTitle === value);
                            updatedJob.reqId = selectedJob ? selectedJob.reqId : '';
                            updatedJob.talents = dummyTalentData[value] || [{ contractDuration: '', billRate: '', currency: 'USD', standardTimeBR: '', overtimeBR: '' }];
                        }
                        return updatedJob;
                    }
                    return job;
                });
                setFormData({ ...formData, jobDetails: updatedJobDetails });
            }
        } else {
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

    const handleDateChange = (name, value) => {
        const newDate = new Date(value);
        if (name === 'poEndDate' && newDate < formData.poStartDate) {
            alert("End date cannot be before the start date.");
            return; 
        }
        
        setFormData({
            ...formData,
            [name]: newDate
        });
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
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsViewMode(true);
        }, 1000);
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
            <h2 className="text-center my-5 p-3" style={{ backgroundColor: 'green', color: 'white' }}>
                {isViewMode ? 'View Details' : 'Purchase Order Form'}
            </h2>

            {loading && (
                <div className="alert alert-info text-center" role="alert">
                    Saving data...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {!isViewMode ? (
                    <>
                        <ClientDetails
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleDateChange={handleDateChange}
                        />

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
                        />

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end my-3">
                            <button type="submit" className="btn btn-outline-dark rounded-pill me-2" disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" className="btn btn-light btn-outline-dark rounded-pill" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="bg-light p-4 rounded shadow-sm">
                        <h4 className="text-primary mb-4">Client & Purchase Order Details</h4>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>Client Name:</strong> {formData.clientName}
                            </div>
                            <div className="col-md-6">
                                <strong>PO Type:</strong> {formData.poType}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>PO Number:</strong> {formData.poNumber}
                            </div>
                            <div className="col-md-6">
                                <strong>Received On:</strong> {new Date(formData.receivedOn).toDateString()}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>Received From:</strong> {formData.receivedFromName} ({formData.receivedFromEmail})
                            </div>
                            <div className="col-md-6">
                                <strong>PO Start Date:</strong> {new Date(formData.poStartDate).toDateString()}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>PO End Date:</strong> {new Date(formData.poEndDate).toDateString()}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>Budget:</strong>
                                {currencySymbols[formData.currency]?.position === 'before' && (
                                    <span style={{ marginRight: '5px' }}>{currencySymbols[formData.currency].symbol}</span>
                                )}
                                <span>{formData.budget}</span>
                                {currencySymbols[formData.currency]?.position === 'after' && (
                                    <span style={{ marginLeft: '5px' }}>{currencySymbols[formData.currency].symbol}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <strong>Currency:</strong> {formData.currency}
                            </div>
                        </div>

                        <h4 className="text-primary mt-5 mb-4">Talent Details</h4>
                        {formData.jobDetails.map((job, jobIndex) => (
                            <div key={jobIndex} className="card my-2 shadow-sm border-0">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title text-info">Job Detail #{jobIndex + 1}</h5>
                                    </div>
                                    <p><strong>Job Title:</strong> <span className="text-muted">{job.jobTitle}</span></p>
                                    <p><strong>REQ ID:</strong> <span className="text-muted">{job.reqId}</span></p>

                                    <h6 className="mt-4 mb-3 text-dark border-bottom pb-2">Talents</h6>
                                    {job.talents.map((talent, talentIndex) => (
                                        checkedTalents[`${jobIndex}-${talentIndex}`] && (
                                            <div key={talentIndex} className="mb-4">
                                                <strong className="d-block mb-2">{talent.name}</strong>
                                                <div className="bg-light p-3 rounded">
                                                    <ul className="list-unstyled mb-0">
                                                        <li>
                                                            <strong>Contract Duration:</strong>
                                                            <span className="text-muted"> {talent.contractDuration}</span>
                                                        </li>
                                                        <li>
                                                            <strong>Bill Rate:</strong>
                                                            {currencySymbols[talent.currency]?.position === 'before' && (
                                                                <span className="text-muted"> {currencySymbols[talent.currency].symbol}</span>
                                                            )}
                                                            <span className="text-muted"> {talent.billRate}</span>
                                                            {currencySymbols[talent.currency]?.position === 'after' && (
                                                                <span className="text-muted"> {currencySymbols[talent.currency].symbol}</span>
                                                            )}
                                                        </li>
                                                        <li>
                                                            <strong>Standard Time Bill Rate:</strong>
                                                            {currencySymbols[talent.currency]?.position === 'before' && (
                                                                <span className="text-muted"> {currencySymbols[talent.currency].symbol}</span>
                                                            )}
                                                            <span className="text-muted"> {talent.standardTimeBR}</span>
                                                            {currencySymbols[talent.currency]?.position === 'after' && (
                                                                <span className="text-muted"> {currencySymbols[talent.currency].symbol}</span>
                                                            )}
                                                        </li>
                                                        <li>
                                                            <strong>Overtime Bill Rate:</strong>
                                                            {currencySymbols[talent.currency]?.position === 'before' && (
                                                                <span className="text-muted"> {currencySymbols[talent.currency].symbol}</span>
                                                            )}
                                                            <span className="text-muted"> {talent.overtimeBR}</span>
                                                            {currencySymbols[talent.currency]?.position === 'after' && (
                                                                <span className="text-muted"> {currencySymbols[talent.currency].symbol}</span>
                                                            )}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="d-flex justify-content-end mt-4">
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Back</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default App;