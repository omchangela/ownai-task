import React from 'react';
import TalentDetails from './TalentDetails';

function JobDetails({ jobDetails, jobOptions, poType, handleInputChange, addJobDetail, removeJobDetail }) {
    return (
        <div>
            <div className="row align-items-center my-3 bg-light text-dark">
                <div className="col mx-3">
                    <h2>Talent Details</h2>
                </div>
                <div className="col text-end">
                    {poType === 'Group PO' && (
                        <button type="button" className="btn border rounded-pill" onClick={addJobDetail}>
                            + Add Another
                        </button>
                    )}
                </div>
            </div>

            {jobDetails.map((job, jobIndex) => (
                <div key={jobIndex} className="card my-2">
                    <div className="card-body">
                        <h5 className="card-title">Job Detail #{jobIndex + 1}</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>Job Title/REQ Name <span style={{ color: 'red' }}>*</span></label>
                                    <select
                                        name="jobTitle"
                                        className="form-select"
                                        onChange={(e) => handleInputChange(e, jobIndex)}
                                        value={job.jobTitle}
                                    >
                                        <option value="">Select Job Title</option>
                                        {jobOptions.map((option, idx) => (
                                            <option key={idx} value={option.jobTitle}>
                                                {option.jobTitle}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>REQ ID <span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="reqId"
                                        disabled
                                        value={job.reqId}
                                        onChange={(e) => handleInputChange(e, jobIndex)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Talent Details */}
                        {job.talents.map((talent, talentIndex) => (
                            <TalentDetails
                                key={talentIndex}
                                talent={talent}
                                talentIndex={talentIndex}
                                jobIndex={jobIndex}
                                handleInputChange={handleInputChange}
                            />
                        ))}

                        {poType === 'Group PO' && (
                            <button type="button" className="btn btn-danger" onClick={() => removeJobDetail(jobIndex)}>
                                Remove Job Detail
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobDetails;
