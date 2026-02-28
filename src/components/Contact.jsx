import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            await axios.post(`${baseUrl}/api/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 5000); // reset status
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="contact-container">
            <h2 className="section-title">{'// contact-me'}</h2>
            <div className="contact-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>_name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group">
                        <label>_email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>_message:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="Hello!"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                        {status === 'sending' ? 'sending...' : 'submit-message'}
                    </button>
                </form>

                <div className="contact-json-preview">
                    <div className="json-line">
                        <span className="const-keyword">const</span> <span className="var-name">message</span> = {'{'}
                    </div>
                    <div className="json-line indent">
                        <span className="syntax-blue">name</span>: <span className="string-val">"{formData.name}"</span>,
                    </div>
                    <div className="json-line indent">
                        <span className="syntax-blue">email</span>: <span className="string-val">"{formData.email}"</span>,
                    </div>
                    <div className="json-line indent">
                        <span className="syntax-blue">message</span>: <span className="string-val">"{formData.message}"</span>
                    </div>
                    <div className="json-line">
                        {'}'}
                    </div>
                    <div className="json-status">
                        {status === 'success' && <span className="syntax-mint">{'// Message sent successfully!'}</span>}
                        {status === 'error' && <span className="syntax-coral">{'// Failed to send message.'}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
