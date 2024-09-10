import React from 'react';

function TalentDetails({ talent, talentIndex, jobIndex, handleInputChange }) {
    return (
        <div className="mb-3">
            <div className="row">
                <h6> <input type="checkbox" name="" id="" /> Talent #{talentIndex + 1}</h6>
            
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>Contract Duration</label>
                        <input
                            type="text"
                            className="form-control"
                            name="contractDuration"
                            placeholder='Contract Duration'
                            value={talent.contractDuration}
                            onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
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
                            placeholder='Bill Rate'
                            value={talent.billRate}
                            onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>Currency<span style={{ color: 'red' }}>*</span></label>
                    <select name="currency" className="form-select" value={talent.currency} onChange={(e) => handleInputChange(e, jobIndex, talentIndex)} required >
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
                            placeholder='Std. Time BR'
                            value={talent.standardTimeBR}
                            onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
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
                            placeholder='Overtime BR'
                            value={talent.overtimeBR}
                            onChange={(e) => handleInputChange(e, jobIndex, talentIndex)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TalentDetails;
