import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientDetails from './components/ClientDetails';
import JobDetails from './components/JobDetails';
import SavedDataPage from './components/SavedDataPage'; 
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
    const [view, setView] = useState('form'); 

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
        setCheckedTalents(prev => ({
            ...prev,
            [`${jobIndex}-${talentIndex}`]: checked
        }));
        console.log('checkedTalents:', { ...checkedTalents, [`${jobIndex}-${talentIndex}`]: checked });
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
    
        let isValid = true;
        formData.jobDetails.forEach((job, jobIndex) => {
            const selectedTalents = job.talents.filter((_, talentIndex) => checkedTalents[`${jobIndex}-${talentIndex}`]);
    
            if (formData.poType === 'Individual PO' && selectedTalents.length !== 1) {
                alert('For Individual PO, only one talent must be selected.');
                isValid = false;
            }
    
            if (formData.poType === 'Group PO' && selectedTalents.length < 2) {
                alert('For Group PO, at least two talents must be selected.');
                isValid = false;
            }
        });
    
        if (!isValid) {
            return;
        }
    
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsViewMode(true);
            setView('saved');
        }, 1000);
    };

    const handleEdit = () => {
        setIsViewMode(false);
        setView('form'); 
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
            {view === 'form' ? (
                <>
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
                                    <button type="submit" className="btn btn-primary me-md-2">Submit</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex justify-content-end mt-4">
                                <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setView('saved')}>View Saved Data</button>
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <SavedDataPage formData={formData} checkedTalents={checkedTalents} />
            )}
        </div>
    );
}

export default App;
