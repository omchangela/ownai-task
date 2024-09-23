import React, { useState, useEffect } from 'react';

function TalentDetails({ talent, talentIndex, jobIndex, handleInputChange, isChecked, handleCheckboxChange }) {
    const [currencyError, setCurrencyError] = useState('');
    const [contractDurationError, setContractDurationError] = useState('');
    const [billRateError, setBillRateError] = useState('');
    const [standardTimeBRError, setStandardTimeBRError] = useState('');
    const [overtimeBRError, setOvertimeBRError] = useState('');

    const validateFields = () => {
        let isValid = true;

        if (isChecked && !talent.currency) {
            setCurrencyError('Currency is required.');
            isValid = false;
        } else {
            setCurrencyError('');
        }

        if (isChecked && !talent.contractDuration) {
            setContractDurationError('Contract Duration is required.');
            isValid = false;
        } else {
            setContractDurationError('');
        }

        if (isChecked && !talent.billRate) {
            setBillRateError('Bill Rate is required.');
            isValid = false;
        } else if (talent.billRate < 0) {
            setBillRateError('Bill Rate cannot be less then 0.');
            isValid = false;
        } else {
            setBillRateError('');
        }

        if (isChecked && !talent.standardTimeBR) {
            setStandardTimeBRError('Standard Time BR is required.');
            isValid = false;
        } else if (talent.standardTimeBR < 0) {
            setStandardTimeBRError('Standard Time BR cannot be less then 0.');
            isValid = false;
        } else {
            setStandardTimeBRError('');
        }

        if (isChecked && !talent.overtimeBR) {
            setOvertimeBRError('Overtime BR is required.');
            isValid = false;
        } else if (talent.overtimeBR < 0) {
            setOvertimeBRError('Overtime BR cannot be less then 0.');
            isValid = false;
        } else {
            setOvertimeBRError('');
        }

        return isValid;
    };

    const handleChange = (e) => {
        handleInputChange(e, jobIndex, talentIndex);
        validateFields(); 
    };

    const handleRemoveCurrency = (e) => {
        handleInputChange({ target: { name: 'currency', value: '' } }, jobIndex, talentIndex);
    };

    const handleCurrencyChange = (e) => {
        handleChange(e);
        validateFields(); 
    };

    useEffect(() => {
        validateFields(); 
    }, [talent]); 

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
                                    className={`form-control ${contractDurationError ? 'is-invalid' : ''}`}
                                    name="contractDuration"
                                    placeholder="Contract Duration"
                                    value={isChecked ? talent.contractDuration : ''}
                                    onChange={handleChange}
                                    disabled={!isChecked}
                                />
                                {contractDurationError && <div className="invalid-feedback">{contractDurationError}</div>}
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-1">
                                <label>Bill Rate</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className={`form-control ${billRateError ? 'is-invalid' : ''}`}
                                        name="billRate"
                                        placeholder="Bill Rate"
                                        value={isChecked ? talent.billRate : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                    />
                                    <span className="input-group-text">/hr</span>
                                    {billRateError && <div className="invalid-feedback">{billRateError}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Currency<span style={{ color: 'red' }}>*</span></label>
                                <div className="input-container">
                                    <select
                                        name="currency"
                                        className={`form-select ${currencyError ? 'is-invalid' : ''}`}
                                        value={isChecked ? talent.currency : ''}
                                        onChange={handleCurrencyChange}
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
                                    {currencyError && <div className="invalid-feedback">{currencyError}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Standard Time BR</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className={`form-control ${standardTimeBRError ? 'is-invalid' : ''}`}
                                        name="standardTimeBR"
                                        placeholder="Std. Time BR"
                                        value={isChecked ? talent.standardTimeBR : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                    />
                                    <span className="input-group-text">/hr</span>
                                    {standardTimeBRError && <div className="invalid-feedback">{standardTimeBRError}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Currency<span style={{ color: 'red' }}>*</span></label>
                                <div className="input-container">
                                    <select
                                        name="currency"
                                        className={`form-select ${currencyError ? 'is-invalid' : ''}`}
                                        value={isChecked ? talent.currency : ''}
                                        onChange={handleCurrencyChange}
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
                                    {currencyError && <div className="invalid-feedback">{currencyError}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Overtime BR</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className={`form-control ${overtimeBRError ? 'is-invalid' : ''}`}
                                        name="overtimeBR"
                                        placeholder="Overtime BR"
                                        value={isChecked ? talent.overtimeBR : ''}
                                        onChange={handleChange}
                                        disabled={!isChecked}
                                    />
                                    <span className="input-group-text">/hr</span>
                                    {overtimeBRError && <div className="invalid-feedback">{overtimeBRError}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="mb-2">
                                <label>Currency<span style={{ color: 'red' }}>*</span></label>
                                <div className="input-container">
                                    <select
                                        name="currency"
                                        className={`form-select ${currencyError ? 'is-invalid' : ''}`}
                                        value={isChecked ? talent.currency : ''}
                                        onChange={handleCurrencyChange}
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
                                    {currencyError && <div className="invalid-feedback">{currencyError}</div>}
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
