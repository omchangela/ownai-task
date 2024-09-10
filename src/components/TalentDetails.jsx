import React from 'react';

function TalentDetails({ talent, talentIndex, jobIndex, handleInputChange, isChecked, handleCheckboxChange }) {
    return (
        <div className="mb-3">
            <div className="row">
                {/* Render talent details only if the jobTitle is selected */}
                {talent.name && (
                    <>
                        <div className="col-md-12">
                            {/* Checkbox and Talent Name */}
                            <h6>
                                <input
                                    type="checkbox"
                                    name={`talentSelected-${jobIndex}-${talentIndex}`}
                                    id={`talentCheckbox-${jobIndex}-${talentIndex}`}
                                    checked={isChecked}
                                    onChange={(e) => handleCheckboxChange(e, jobIndex, talentIndex)}
                                />{' '}
                                {talent.name} {/* Show Talent Name */}
                            </h6>
                        </div>

                        {/* Talent Details */}
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label>Contract Duration</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contractDuration"
                                    placeholder="Contract Duration"
                                    value={talent.contractDuration}
                                    onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
                                    disabled={!isChecked} // Disable input if checkbox is not checked
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label>Bill Rate</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="billRate"
                                    placeholder="Bill Rate"
                                    value={talent.billRate}
                                    onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
                                    disabled={!isChecked} // Disable input if checkbox is not checked
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label>Currency<span style={{ color: 'red' }}>*</span></label>
                                <select
                                    name="currency"
                                    className="form-select"
                                    value={talent.currency}
                                    onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
                                    disabled={!isChecked} // Disable input if checkbox is not checked
                                    required
                                >
                                    <option value="USD">USD - Dollars($)</option>
                                    <option value="EUR">Euro</option>
                                    <option value="INR">INR</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label>Standard Time Bill Rate</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="standardTimeBR"
                                    placeholder="Std. Time BR"
                                    value={talent.standardTimeBR}
                                    onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
                                    disabled={!isChecked} // Disable input if checkbox is not checked
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="mb-2">
                                <label>Overtime Bill Rate</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="overtimeBR"
                                    placeholder="Overtime BR"
                                    value={talent.overtimeBR}
                                    onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
                                    disabled={!isChecked} // Disable input if checkbox is not checked
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TalentDetails;
