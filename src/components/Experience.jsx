import React from 'react';
import './Experience.css';

const experienceData = [
    {
        role: 'Open to Opportunities',
        company: '',
        period: 'Present',
        description: 'I’m currently looking for internship opportunities and collaborative projects where I can apply the skills I’ve developed, contribute meaningfully, and continue growing as a developer. If you’re building something exciting, I’d love to be part of it.',
    }
];

const Experience = () => {
    return (
        <div className="experience-container">
            <h2 className="section-title">{'// experience'}</h2>
            <div className="timeline">
                {experienceData.map((exp, index) => (
                    <div className="timeline-item" key={index} style={{ animationDelay: `${index * 0.3}s` }}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="role-company">
                                <span className="timeline-role">{exp.role}</span>
                                {exp.company && <span className="timeline-company">@ {exp.company}</span>}
                            </div>
                            <div className="timeline-period">{exp.period}</div>
                            <div className="timeline-desc">
                                <p>
                                    <span className="const-keyword">const</span> <span className="var-name">status</span> = <span className="string-val">"{exp.description}"</span>;
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Experience;
