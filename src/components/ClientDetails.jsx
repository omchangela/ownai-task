import React from 'react';
import DatePicker from 'react-datepicker';

function ClientDetails({ formData, handleInputChange, handleDateChange }) {
    return (
        <div>
            <div className="row">
                <div className="col-md-3">
                    <div className="mb-3">
                        <label>Client Name<span style={{ color: 'red' }}>*</span></label>
                        <select name="clientName" className="form-select" required onChange={handleInputChange} value={formData.clientName}>
                            <option value="">Select Client</option>
                            <option value="Client1">Client 1</option>
                            <option value="Client2">Client 2</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label>Purchase Order Type<span style={{ color: 'red' }}>*</span></label>
                        <select name="poType" className="form-select"  required onChange={handleInputChange} value={formData.poType}>
                            <option value="">Select Type</option>
                            <option value="Group PO">Group PO</option>
                            <option value="Individual PO">Individual PO</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label>Purchase Order No.<span style={{ color: 'red' }}>*</span></label>
                        <input type="text" className="form-control" placeholder='PO Number' name="poNumber" required onChange={handleInputChange} value={formData.poNumber} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label>Received On <span style={{ color: 'red' }}>*</span></label><br />
                        <DatePicker  onChange={(date) => handleDateChange('receivedOn', date)} className="form-control" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <label>Received From <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" placeholder='Received From Name' className="form-control" name="receivedFromName" required onChange={handleInputChange} value={formData.receivedFromName} />
                </div>
                <div className="col-md-2">
                    <label></label>
                    <input type="email" placeholder='Received From Email ID' className="form-control" name="receivedFromEmail" onChange={handleInputChange} value={formData.receivedFromEmail} />
                </div>
                <div className="col-md-2">
                    <label>PO Start Date <span style={{ color: 'red' }}>*</span> </label>
                    <DatePicker placeholderText='Start Date'  onChange={(date) => handleDateChange('poStartDate', date)} className="form-control" />
                </div>
                <div className="col-md-2">
                    <label>PO End Date <span style={{ color: 'red' }}>*</span></label>
                    <DatePicker placeholderText='End Date'  onChange={(date) => handleDateChange('poEndDate', date)} minDate={formData.poStartDate} className="form-control" />
                </div>
                <div className="col-md-2">
                    <label>Budget<span style={{ color: 'red' }}>*</span></label>
                    <input type="number" placeholder='Bduget' className="form-control" name="budget" required onChange={handleInputChange} value={formData.budget} max="99999" />
                </div>
                <div className="col-md-2">
                    <label>Currency<span style={{ color: 'red' }}>*</span></label>
                    <select name="currency" className="form-select" required onChange={handleInputChange} value={formData.currency}>
                        <option value="USD">USD - Dollars($)</option>
                        <option value="EUR">Euro</option>
                        <option value="INR">INR</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default ClientDetails;
