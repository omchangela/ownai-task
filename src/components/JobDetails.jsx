import React, { useState } from 'react';
import TalentDetails from './TalentDetails';

function JobDetails({ jobDetails, jobOptions, poType, handleInputChange, addJobDetail, removeJobDetail, checkedTalents, handleCheckboxChange }) {
    const [showModal, setShowModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [jobErrors, setJobErrors] = useState({});

    const handleDeleteClick = (jobIndex) => {
        setJobToDelete(jobIndex);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (jobToDelete !== null) {
            removeJobDetail(jobToDelete);
        }
        setShowModal(false);
    };

    const handleRemoveJobTitle = (jobIndex) => {
        handleInputChange({ target: { name: 'jobTitle', value: '' } }, jobIndex);
    };

    const validateJobTitle = (value, jobIndex) => {
        setJobErrors(prev => {
            const errors = { ...prev };
            if (!value) {
                errors[jobIndex] = "Job Title is required.";
            } else {
                delete errors[jobIndex];
            }
            return errors;
        });
    };

    const handleJobTitleChange = (e, jobIndex) => {
        handleInputChange(e, jobIndex);
        validateJobTitle(e.target.value, jobIndex);
    };

    return (
        <div>
            <div className="row align-items-center justify-content-between text-center my-3 bg-light text-dark">
                <div className="col-6 col-md-6 mx-3">
                    <h2 className="text-start text-md-start">Talent Details</h2>
                </div>
                <div className="col col-sm-3 text-end text-md-end mt-3 mt-md-0">
                    {poType === 'Group PO' && (
                        <button
                            type="button"
                            className="btn border rounded-pill px-3 py-2 custom-btn"
                            style={{ fontSize: '14px' }}
                            onClick={addJobDetail}
                        >
                            + Add Another
                        </button>
                    )}
                </div>
            </div>


            {jobDetails.map((job, jobIndex) => (
                <div key={jobIndex} className="card my-2">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label>Job Title/REQ Name <span style={{ color: 'red' }}>*</span></label>
                                    <div className="input-container">
                                        <select
                                            name="jobTitle"
                                            className={`form-select ${jobErrors[jobIndex] ? 'is-invalid' : ''}`}
                                            onChange={(e) => handleJobTitleChange(e, jobIndex)}
                                            value={job.jobTitle}
                                        >
                                            <option value="">Select Job Title</option>
                                            {jobOptions.map((option, idx) => (
                                                <option key={idx} value={option.jobTitle}>
                                                    {option.jobTitle}
                                                </option>
                                            ))}
                                        </select>
                                        {job.jobTitle && (
                                            <button
                                                type="button"
                                                className="btn-remove"
                                                onClick={() => handleRemoveJobTitle(jobIndex)}
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                    {jobErrors[jobIndex] && <div className="invalid-feedback">{jobErrors[jobIndex]}</div>}
                                </div>
                            </div>
                            <div className="col-md-3">
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

                            <div className="col-md-6 d-flex justify-content-end">
                                {poType === 'Group PO' && (
                                    <i
                                        className="fas fa-trash-alt text-danger"
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '1.5rem',
                                            marginRight: '10px'
                                        }}
                                        onClick={() => handleDeleteClick(jobIndex)}
                                    ></i>
                                )}
                            </div>
                        </div>

                        {job.talents.map((talent, talentIndex) => (
                            <TalentDetails
                                key={talentIndex}
                                talent={talent}
                                talentIndex={talentIndex}
                                jobIndex={jobIndex}
                                handleInputChange={handleInputChange}
                                isChecked={!!checkedTalents[`${jobIndex}-${talentIndex}`]}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobDetails;
