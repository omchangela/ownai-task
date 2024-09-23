import React, { useState } from 'react';
import './ClientDetails.css';

function ClientDetails({ formData, handleInputChange, handleDateChange }) {
    
    const [formErrors, setFormErrors] = useState({});

    const validateField = (name, value) => {
        let errors = { ...formErrors };

        if (name === "clientName" && !value) {
            errors.clientName = "Client Name is required.";
        } else {
            delete errors.clientName;
        }

        if (name === "poType" && !value) {
            errors.poType = "Purchase Order Type is required.";
        } else {
            delete errors.poType;
        }

        if (name === "poNumber" && !value) {
            errors.poNumber = "Purchase Order Number is required.";
        } else if (name === "poNumber" && !/^[a-zA-Z0-9\-]+$/.test(value)) {
            errors.poNumber = "Purchase Order Number must be alphanumeric.";
        } else {
            delete errors.poNumber;
        }

        if (name === "receivedOn" && !value) {
            errors.receivedOn = "Received On date is required.";
        } else {
            delete errors.receivedOn;
        }

        if (name === "receivedFromName" && !value) {
            errors.receivedFromName = "Received From Name is required.";
        } else {
            delete errors.receivedFromName;
        }

        if (name === "receivedFromEmail") {
            if (!value) {
                errors.receivedFromEmail = "Received From Email is required.";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errors.receivedFromEmail = "Email address is invalid.";
            } else {
                delete errors.receivedFromEmail;
            }
        }

        if (name === "poStartDate" && !value) {
            errors.poStartDate = "PO Start Date is required.";
        } else {
            delete errors.poStartDate;
        }

        if (name === "poEndDate" && !value) {
            errors.poEndDate = "PO End Date is required.";
        } else if (value && formData.poStartDate && new Date(value) < new Date(formData.poStartDate)) {
            errors.poEndDate = "PO End Date cannot be before PO Start Date.";
        } else {
            delete errors.poEndDate;
        }

        if (name === "budget" && (!value || value <= 0)) {
            errors.budget = "Budget must be a positive number.";
        }else if(value > 99999){
            errors.budget = "Budget must be between 0 to 99999";
        } else {
            delete errors.budget;
        }

        if (name === "currency" && !value) {
            errors.currency = "Currency is required.";
        } else {
            delete errors.currency;
        }

        setFormErrors(errors);
    };

    const handleChange = (e) => {
        handleInputChange(e);
        validateField(e.target.name, e.target.value);
    };

    return (
        <div>
            <div className="row mx-2">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="mb-2">
                        <label>Client Name<span style={{ color: 'red' }}>*</span></label>
                        <div className="input-container">
                            <select name="clientName" className={`form-select ${formErrors.clientName ? 'is-invalid' : ''}`} required onChange={handleChange} value={formData.clientName}>
                                <option value="">Select Client</option>
                                <option value="Client1">Client 1</option>
                                <option value="Client2">Client 2</option>
                            </select>
                            {formData.clientName && (
                                <button type="button" className="btn-remove" onClick={() => handleInputChange({ target: { name: 'clientName', value: '' } })}>
                                    &times;
                                </button>
                            )}
                            {formErrors.clientName && <div className="invalid-feedback">{formErrors.clientName}</div>}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="mb-2">
                        <label>Purchase Order Type<span style={{ color: 'red' }}>*</span></label>
                        <div className="input-container">
                            <select name="poType" className={`form-select ${formErrors.poType ? 'is-invalid' : ''}`} required onChange={handleChange} value={formData.poType}>
                                <option value="">Select Type</option>
                                <option value="Group PO">Group PO</option>
                                <option value="Individual PO">Individual PO</option>
                            </select>
                            {formData.poType && (
                                <button type="button" className="btn-remove" onClick={() => handleInputChange({ target: { name: 'poType', value: '' } })}>
                                    &times;
                                </button>
                            )}
                            {formErrors.poType && <div className="invalid-feedback">{formErrors.poType}</div>}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="mb-2">
                        <label>Purchase Order No.<span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="text"
                            className={`form-control ${formErrors.poNumber ? 'is-invalid' : ''}`}
                            placeholder="PO Number"
                            name="poNumber"
                            required
                            onChange={handleChange}
                            value={formData.poNumber}
                        />
                        {formErrors.poNumber && <div className="invalid-feedback">{formErrors.poNumber}</div>}
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="mb-3">
                        <label>Received On <span style={{ color: 'red' }}>*</span></label><br />
                        <input
                            type="date"
                            className={`form-control ${formErrors.receivedOn ? 'is-invalid' : ''}`}
                            name="receivedOn"
                            value={formData.receivedOn ? formData.receivedOn.toISOString().substr(0, 10) : ''}
                            onChange={(e) => handleDateChange('receivedOn', e.target.value)}
                        />
                        {formErrors.receivedOn && <div className="invalid-feedback">{formErrors.receivedOn}</div>}
                    </div>
                </div>
            </div>

            <div className="row mx-2">
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="mb-2">
                        <label>Received From <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" placeholder="Received From Name" className={`form-control ${formErrors.receivedFromName ? 'is-invalid' : ''}`} name="receivedFromName" required onChange={handleChange} value={formData.receivedFromName} />
                        {formErrors.receivedFromName && <div className="invalid-feedback">{formErrors.receivedFromName}</div>}
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="mb-2">
                        <label>Email ID</label>
                        <input type="email" placeholder="Received From Email ID" className={`form-control ${formErrors.receivedFromEmail ? 'is-invalid' : ''}`} name="receivedFromEmail" required onChange={handleChange} value={formData.receivedFromEmail} />
                        {formErrors.receivedFromEmail && <div className="invalid-feedback">{formErrors.receivedFromEmail}</div>}
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="mb-2">
                        <label>PO Start Date <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="date"
                            className={`form-control ${formErrors.poStartDate ? 'is-invalid' : ''}`}
                            name="poStartDate"
                            value={formData.poStartDate ? formData.poStartDate.toISOString().substr(0, 10) : ''}
                            onChange={(e) => handleDateChange('poStartDate', e.target.value)}
                        />
                        {formErrors.poStartDate && <div className="invalid-feedback">{formErrors.poStartDate}</div>}
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="mb-2">
                        <label>PO End Date <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="date"
                            className={`form-control ${formErrors.poEndDate ? 'is-invalid' : ''}`}
                            name="poEndDate"
                            value={formData.poEndDate ? formData.poEndDate.toISOString().substr(0, 10) : ''}
                            onChange={(e) => handleDateChange('poEndDate', e.target.value)}
                        />
                        {formErrors.poEndDate && <div className="invalid-feedback">{formErrors.poEndDate}</div>}
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="mb-2">
                        <label>Budget<span style={{ color: 'red' }}>*</span></label>
                        <input type="number" placeholder="Budget" className={`form-control ${formErrors.budget ? 'is-invalid' : ''}`} name="budget" required onChange={handleChange} value={formData.budget} max="99999" />
                        {formErrors.budget && <div className="invalid-feedback">{formErrors.budget}</div>}
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="mb-2">
                        <label>Currency<span style={{ color: 'red' }}>*</span></label>
                        <div className="input-container">
                            <select name="currency" className={`form-select ${formErrors.currency ? 'is-invalid' : ''}`} required onChange={handleChange} value={formData.currency}>
                                <option value="">Select Currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">Euro</option>
                                <option value="INR">INR</option>
                            </select>
                            {formData.currency && (
                                <button type="button" className="btn-remove" onClick={() => handleInputChange({ target: { name: 'currency', value: '' } })}>
                                    &times;
                                </button>
                            )}
                            {formErrors.currency && <div className="invalid-feedback">{formErrors.currency}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientDetails;
