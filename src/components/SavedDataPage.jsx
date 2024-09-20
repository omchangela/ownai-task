import React from 'react';
import './SaveDataPage.css';

function SaveDataPage({ formData, checkedTalents }) {
    const handleBackClick = () => {
        window.location.reload(); 
    };

    return (
        <div className="container-fluid saved-data">
            <h2 className="text-center my-4">Saved Data</h2>


            <div className="client-details mb-4">
                <h4>Client Details</h4>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="form-group">
                            <label>Client Name</label>
                            <input type="text" className="form-control" value={formData.clientName} disabled />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="form-group">
                            <label>Purchase Order Type</label>
                            <input type="text" className="form-control" value={formData.poType} disabled />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="form-group">
                            <label>Order Number</label>
                            <input type="text" className="form-control" value={formData.poNumber} disabled />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="form-group">
                            <label>Received On</label>
                            <input type="date" className="form-control" value={formData.receivedOn ? formData.receivedOn.toISOString().substr(0, 10) : 'N/A'} disabled />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-6 col-12 col-lg-2">
                            <div className="form-group">
                                <label>Received On</label>
                                <input type="text" className="form-control" value={`${formData.receivedFromName}`} disabled />
                            </div>
                        </div>
                        <div className="col-md-6 col-12 col-lg-2">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" value={`(${formData.receivedFromEmail})`} disabled />
                            </div>
                        </div>
                        <div className="col-md-6 col-12 col-lg-2">
                            <div className="form-group">
                                <label>PO Start Date</label>
                                <input type="date" className="form-control" value={formData.poStartDate ? formData.poStartDate.toISOString().substr(0, 10) : 'N/A'} disabled />
                            </div>
                        </div>
                        <div className="col-md-6 col-12 col-lg-2">
                            <div className="form-group">
                                <label>PO End Date</label>
                                <input type="date" className="form-control" value={formData.poEndDate ? formData.poEndDate.toISOString().substr(0, 10) : 'N/A'} disabled />
                            </div>
                        </div>
                        <div className="col-md-6 col-12 col-lg-2">
                            <div className="form-group">
                                <label>Budget</label>
                                <input type="text" className="form-control" value={`${formData.budget}`} disabled />
                            </div>
                        </div>
                        <div className="col-md-6 col-12 col-lg-2">
                            <div className="form-group">
                                <label>Currency</label>
                                <select name="currency" className="form-select" value={formData.currency} disabled>
                                    <option value="USD">USD</option>
                                    <option value="EUR">Euro</option>
                                    <option value="INR">INR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="mb-4">Talent Details</h4>
            {formData.jobDetails.map((job, jobIndex) => (
                <div key={jobIndex} className="job-details mb-4">
                    <h5>{job.jobTitle} (REQ ID: {job.reqId})</h5>
                    {job.talents.filter((talent, talentIndex) => checkedTalents[`${jobIndex}-${talentIndex}`]).map((talent, talentIndex) => (
                        <div key={talentIndex} className="row">
                            <div className="col-md-6 col-12 col-lg-2">
                                <h6><input type="checkbox" disabled /> {talent.name}</h6>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12 col-lg-2">
                                    <div className="form-group">
                                        <label>Contract Duration</label>
                                        <input type="text" className="form-control" value={talent.contractDuration} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 col-lg-2">
                                    <div className="form-group">
                                        <label>Bill Rate</label>
                                        <input type="text" className="form-control" value={`${talent.billRate} ${talent.currency}`} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 col-lg-2">
                                    <div className="form-group">
                                        <label>Currency</label>
                                        <select name="currency" className="form-select" value={talent.currency} disabled>
                                            <option value="USD">USD</option>
                                            <option value="EUR">Euro</option>
                                            <option value="INR">INR</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 col-lg-2">
                                    <div className="form-group">
                                        <label>Standard Time BR</label>
                                        <input type="text" className="form-control" value={talent.standardTimeBR} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 col-lg-2">
                                    <div className="form-group">
                                        <label>Currency</label>
                                        <select name="currency" className="form-select" value={talent.currency} disabled>
                                            <option value="USD">USD</option>
                                            <option value="EUR">Euro</option>
                                            <option value="INR">INR</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 col-lg-2">
                                    <div className="form-group">
                                        <label>Overtime BR</label>
                                        <input type="text" className="form-control" value={talent.overtimeBR} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 col-lg-2">
                                    <div className="form-group">
                                        <label>Currency</label>
                                        <select name="currency" className="form-select" value={talent.currency} disabled>
                                            <option value="USD">USD</option>
                                            <option value="EUR">Euro</option>
                                            <option value="INR">INR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-dark mb-4 " onClick={handleBackClick}>
                    Back
                </button>
            </div>

        </div>
    );
}

export default SaveDataPage;
