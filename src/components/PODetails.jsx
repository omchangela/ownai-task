import React from 'react';

function PODetails({ formData, handleInputChange, handleDateChange }) {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="mb-3">
                    <label>Purchase Order Type<span style={{ color: 'red' }}>*</span></label>
                    <select name="poType" className="form-select" required onChange={handleInputChange} value={formData.poType}>
                        <option value="">Select Type</option>
                        <option value="Group PO">Group PO</option>
                        <option value="Individual PO">Individual PO</option>
                    </select>
                </div>
            </div>
            <div className="col-md-3">
                <div className="mb-3">
                    <label>Purchase Order No.<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control" name="poNumber" required onChange={handleInputChange} value={formData.poNumber} />
                </div>
            </div>
            <div className="col-md-3">
                <div className="mb-3">
                    <label>Received On <span style={{ color: 'red' }}>*</span></label><br />
                    <DatePicker selected={formData.receivedOn} onChange={(date) => handleDateChange('receivedOn', date)} className="form-control" />
                </div>
            </div>
        </div>
    );
}

export default PODetails;
