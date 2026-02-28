import React from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaJsSquare, FaPython, FaJava, FaBootstrap, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiExpress, SiCplusplus, SiEjs, SiPostgresql, SiSupabase } from 'react-icons/si';
import './Skills.css';

const skillsData = [
    { name: 'React', icon: <FaReact size={50} />, color: 'var(--syntax-blue)' },
    { name: 'JavaScript', icon: <FaJsSquare size={50} />, color: 'var(--accent-orange)' },
    { name: 'Node.js', icon: <FaNodeJs size={50} />, color: 'var(--syntax-coral)' },
    { name: 'HTML', icon: <FaHtml5 size={50} />, color: 'var(--syntax-mint)' },
    { name: 'CSS', icon: <FaCss3Alt size={50} />, color: '#4D5BCE' },
    { name: 'Bootstrap', icon: <FaBootstrap size={50} />, color: '#7952B3' },
    { name: 'Express', icon: <SiExpress size={50} />, color: '#aaa' },
    { name: 'Python', icon: <FaPython size={50} />, color: '#3776AB' },
    { name: 'C++', icon: <SiCplusplus size={50} />, color: '#00599C' },
    { name: 'Java', icon: <FaJava size={50} />, color: '#007396' },
    { name: 'EJS', icon: <SiEjs size={50} />, color: '#B4CA65' },
    { name: 'Git', icon: <FaGitAlt size={50} />, color: '#F05032' },
    { name: 'GitHub', icon: <FaGithub size={50} />, color: '#ffffff' },
    { name: 'PostgreSQL', icon: <SiPostgresql size={50} />, color: '#4169E1' },
    { name: 'Supabase', icon: <SiSupabase size={50} />, color: '#3ECF8E' }
];

const Skills = () => {
    return (
        <div className="skills-container">
            <h2 className="section-title">{'// skills'}</h2>
            <div className="skills-grid">
                {skillsData.map((skill, index) => (
                    <div className="skill-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="skill-icon-container" style={{ color: skill.color }}>
                            {skill.icon}
                        </div>
                        <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                        </div>
                        <div className="skill-backdrop" style={{ background: skill.color }}></div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Skills;
