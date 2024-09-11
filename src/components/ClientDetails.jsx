import React from 'react';

function ClientDetails({ formData, handleInputChange, handleDateChange }) {
    return (
        <div>
            <div className="row mx-2">
                <div className="col-md-3">
                    <div className="mb-2">
                        <label>Client Name<span style={{ color: 'red' }}>*</span></label>
                        <select name="clientName" className="form-select" required onChange={handleInputChange} value={formData.clientName}>
                            <option value="">Select Client</option>
                            <option value="Client1">Client 1</option>
                            <option value="Client2">Client 2</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-2">
                        <label>Purchase Order Type<span style={{ color: 'red' }}>*</span></label>
                        <select name="poType" className="form-select" required onChange={handleInputChange} value={formData.poType}>
                            <option value="">Select Type</option>
                            <option value="Group PO">Group PO</option>
                            <option value="Individual PO">Individual PO</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-2">
                        <label>Purchase Order No.<span style={{ color: 'red' }}>*</span></label>
                        <input type="text" className="form-control" placeholder="PO Number" name="poNumber" required onChange={handleInputChange} value={formData.poNumber} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label>Received On <span style={{ color: 'red' }}>*</span></label><br />
                        <input
                            type="date"
                            className="form-control"
                            name="receivedOn"
                            value={formData.receivedOn ? formData.receivedOn.toISOString().substr(0, 10) : ''}
                            onChange={(e) => handleDateChange('receivedOn', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mx-2">
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>Received From <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" placeholder="Received From Name" className="form-control" name="receivedFromName" required onChange={handleInputChange} value={formData.receivedFromName} />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>Received From Email ID</label>
                        <input type="email" placeholder="Received From Email ID" className="form-control" name="receivedFromEmail" onChange={handleInputChange} value={formData.receivedFromEmail} />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>PO Start Date <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="date"
                            className="form-control"
                            name="poStartDate"
                            value={formData.poStartDate ? formData.poStartDate.toISOString().substr(0, 10) : ''}
                            onChange={(e) => handleDateChange('poStartDate', e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>PO End Date <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="date"
                            className="form-control"
                            name="poEndDate"
                            value={formData.poEndDate ? formData.poEndDate.toISOString().substr(0, 10) : ''}
                            onChange={(e) => handleDateChange('poEndDate', e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>Budget<span style={{ color: 'red' }}>*</span></label>
                        <input type="number" placeholder="Budget" className="form-control" name="budget" required onChange={handleInputChange} value={formData.budget} max="99999" />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-2">
                        <label>Currency<span style={{ color: 'red' }}>*</span></label>
                        <select name="currency" className="form-select" required onChange={handleInputChange} value={formData.currency}>
                            <option value="USD">USD - Dollars($)</option>
                            <option value="EUR">Euro</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientDetails;

