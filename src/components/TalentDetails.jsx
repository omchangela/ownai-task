import React from 'react';

function TalentDetails({ talent, talentIndex, jobIndex, handleInputChange, isChecked, handleCheckboxChange }) {
    const handleChange = (e) => {
        handleInputChange(e, jobIndex, talentIndex);
    };

    const handleRemoveCurrency = (e) => {
        handleInputChange({ target: { name: 'currency', value: '' } }, jobIndex, talentIndex);
    };

    return (
        <div className="mb-3">
            <div className="row">
                {talent.name && (
                    <>
                        <div className="col-12">
                            <h6>
                                <input
                                    type="checkbox"
                                    name={`talentSelected-${jobIndex}-${talentIndex}`}
                                    id={`talentCheckbox-${jobIndex}-${talentIndex}`}
                                    checked={isChecked}
                                    onChange={(e) => handleCheckboxChange(e, jobIndex, talentIndex)}
                                />{' '}
                                {talent.name}
                            </h6>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Contract Duration</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contractDuration"
                                    placeholder="Contract Duration"
                                    value={isChecked ? talent.contractDuration : ''}
                                    onChange={handleChange}
                                    disabled={!isChecked}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-1">
                                <label>Bill Rate</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="billRate"
                                        placeholder="Bill Rate"
                                        value={isChecked ? talent.billRate : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                    />
                                    <span className="input-group-text">/hr</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Currency<span style={{ color: 'red' }}>*</span></label>
                                <div className="input-container">
                                    <select
                                        name="currency"
                                        className="form-select"
                                        value={isChecked ? talent.currency : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                        required
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="USD">USD - Dollars($)</option>
                                        <option value="EUR">Euro</option>
                                        <option value="INR">INR</option>
                                    </select>
                                    {isChecked && talent.currency && (
                                        <button
                                            type="button"
                                            className="btn-remove"
                                            onClick={handleRemoveCurrency}
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Standard Time BR</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="standardTimeBR"
                                        placeholder="Std. Time BR"
                                        value={isChecked ? talent.standardTimeBR : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                    />
                                    <span className="input-group-text">/hr</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Currency<span style={{ color: 'red' }}>*</span></label>
                                <div className="input-container">
                                    <select
                                        name="currency"
                                        className="form-select"
                                        value={isChecked ? talent.currency : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                        required
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">Euro</option>
                                        <option value="INR">INR</option>
                                    </select>
                                    {isChecked && talent.currency && (
                                        <button
                                            type="button"
                                            className="btn-remove"
                                            onClick={handleRemoveCurrency}
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Overtime BR</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="overtimeBR"
                                        placeholder="Overtime BR"
                                        value={isChecked ? talent.overtimeBR : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                    />
                                    <span className="input-group-text">/hr</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Currency<span style={{ color: 'red' }}>*</span></label>
                                <div className="input-container">
                                    <select
                                        name="currency"
                                        className="form-select"
                                        value={isChecked ? talent.currency : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                        required
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">Euro</option>
                                        <option value="INR">INR</option>
                                    </select>
                                    {isChecked && talent.currency && (
                                        <button
                                            type="button"
                                            className="btn-remove"
                                            onClick={handleRemoveCurrency}
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TalentDetails;
