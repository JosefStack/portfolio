import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
    const codeString = `@developer Joseph Johnson
@location Riga, Latvia
@since 2024

Computer Science student at Riga Technical University.
I love building stuff and learning new things.

CURRENT STACK:
• Frontend: React, TailwindCSS, Zustand
• Backend: Node.js, Express, Socket.io
• Database: MongoDB, PostgreSQL, Supabase
• Tools: Git,GitHub, Postman, Render, Vercel

CURRENTLY EXPLORING:
Artificial Intelligence - fascinated by how 
systems learn, think, and evolve.

Always building, always learning.


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
