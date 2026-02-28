import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
    const codeString = `
/**
 * About me
 * 
 * Hello! I'm Joseph Johnson, a Computer Science student 
 * at Riga Technical University in Latvia and an aspiring 
 * web developer.
 * 
 * I’ve been working with HTML, CSS, JavaScript, React, 
 * Node.js, Express, PostgreSQL, and authentication systems, 
 * always curious about how everything works behind the scenes.
 * 
 * Lately, I’ve developed a strong interest in Artificial 
 * Intelligence and I’m excited to dive deeper into how 
 * intelligent systems learn, think, and evolve.
 * 
 * I love building, learning, and turning curiosity into 
 * real-world projects.
 */
`;

    return (
        <div className="about-container">
            <div className="about-left">
                <h2 className="section-title">{'// about-me'}</h2>
                <div className="code-pane">
                    <div className="line-numbers">
                        {codeString.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
                    </div>
                    <div className="code-content">
                        <pre>
                            <code className="comment-block">
                                {codeString}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
            <div className="about-right">
                {/* Placeholder for 3D avatar or image */}
                <div className="avatar-glass-effect">
                    <img
                        src="https://avatars.githubusercontent.com/u/106512212?v=4"
                        alt="Joseph Johnson"
                        className="profile-img"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
