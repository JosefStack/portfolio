import React from 'react';
import TiltedCard from './TiltedCard';
import './Projects.css';

const projectsData = [
    {
        title: 'Nod - Real time chat', 
        description: 'Real-time chat with JWT auth, WebSocket messaging, optimistic updates, online presence, image sharing, and MongoDB persistence.',
        tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Zustand', 'TailwindCSS', 'JWT', 'Cloudinary'],
        link: 'https://nod-chat.onrender.com',
        github: 'https://github.com/JosefStack/nod-chat',
        imageSrc: 'https://www.shutterstock.com/image-vector/happy-kids-texting-each-other-600nw-2188380125.jpg' 
    },
    {
    title: 'Studify',
    description: 'Student productivity platform with Supabase auth, CRUD operations, PostgreSQL database, and responsive React UI.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Express'],
    link: 'https://studify-josefstack.vercel.app/',
    github: 'https://github.com/JosefStack/studify',
    imageSrc: 'https://img.freepik.com/free-vector/hand-drawn-flat-case-study-illustration_52683-70848.jpg?semt=ais_hybrid&w=740&q=80' 
},
    // {
    //     title: 'Crypto',
    //     description: 'Another project I built to learn how to integrate third-party APIs and fetch/handle complex JSON data streams.',
    //     tech: ['Node.js', 'PostgreSQL', 'REST API'],
    //     link: 'https://crypto-cwsl.onrender.com/',
    //     github: '#',
    //     imageSrc: 'https://cdn.prod.website-files.com/678fb0f1c3f23bcf01f8cff8/67af58c6a39dade48848808b_67a68d6a29be757dfc907003_67a22fdb3625a5ce9f7c16e5_Cup_and_Handle.png'
    // }
];

const Projects = () => {
    return (
        <div className="projects-container">
            <h2 className="section-title">{'// projects'}</h2>
            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <div key={index} style={{ animationDelay: `${index * 0.2}s` }} className="project-wrapper">
                        <TiltedCard
                            imageSrc=""
                            containerHeight="auto"
                            containerWidth="100%"
                            imageHeight="auto"
                            imageWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent={true}
                            overlayContent={
                                <div className="project-card">
                                    {project.imageSrc ? (
                                        <div className="project-image">
                                            <img src={project.imageSrc} alt={project.title} />
                                        </div>
                                    ) : (
                                        <div className="project-image-placeholder">
                                            <span className="image-tag">{'<Image />'}</span>
                                        </div>
                                    )}
                                    <div className="project-content">
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-desc">{project.description}</p>
                                        <div className="project-tech">
                                            {project.tech.map((t, i) => (
                                                <span className="tech-badge" key={i}>{t}</span>
                                            ))}
                                        </div>
                                        <div className="project-actions">
                                            <a href={project.link} target="_blank" rel="noreferrer" className="btn-secondary">live-demo</a>
                                            <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary outline">github</a>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Projects;
