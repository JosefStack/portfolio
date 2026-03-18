import './Skills.css';

import {
    FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaJsSquare, FaPython, FaJava,
    FaBootstrap, FaGitAlt, FaGithub, FaLock
} from 'react-icons/fa';

import {
    SiExpress, SiCplusplus, SiEjs, SiPostgresql, SiSupabase, SiMongodb,
    SiSocketdotio, SiTailwindcss, SiJsonwebtokens, SiCloudinary,
    SiVite, SiRender, SiPostman
} from 'react-icons/si';

const skillsData = [
    // Original skills (these work)
    { name: 'React', icon: <FaReact size={50} />, color: 'var(--syntax-blue)' },
    { name: 'JavaScript', icon: <FaJsSquare size={50} />, color: 'var(--accent-orange)' },
    { name: 'Node.js', icon: <FaNodeJs size={50} />, color: 'var(--syntax-coral)' },
    { name: 'Express', icon: <SiExpress size={50} />, color: '#aaa' },
    { name: 'Socket.io', icon: <SiSocketdotio size={50} />, color: '#010101' },
    { name: 'PostgreSQL', icon: <SiPostgresql size={50} />, color: '#4169E1' },
    { name: 'MongoDB', icon: <SiMongodb size={50} />, color: '#47A248' },
    { name: 'Mongoose', icon: <SiMongodb size={50} />, color: '#880000' },
    { name: 'TailwindCSS', icon: <SiTailwindcss size={50} />, color: '#06B6D4' },
    { name: 'JWT', icon: <SiJsonwebtokens size={50} color="#FF3E6C" />, color: '#FF3E6C' },
    { name: 'Supabase', icon: <SiSupabase size={50} />, color: '#3ECF8E' },
    { name: 'Git', icon: <FaGitAlt size={50} />, color: '#F05032' },
    { name: 'GitHub', icon: <FaGithub size={50} />, color: '#ffffff' },
    { name: 'Zustand', icon: <FaReact size={50} />, color: '#443e38' },
    { name: 'HTML', icon: <FaHtml5 size={50} />, color: 'var(--syntax-mint)' },
    { name: 'CSS', icon: <FaCss3Alt size={50} />, color: '#4D5BCE' },
    { name: 'Bootstrap', icon: <FaBootstrap size={50} />, color: '#7952B3' },
    { name: 'Python', icon: <FaPython size={50} />, color: '#3776AB' },
    { name: 'Java', icon: <FaJava size={50} />, color: '#007396' },
    { name: 'C++', icon: <SiCplusplus size={50} />, color: '#00599C' },
    { name: 'EJS', icon: <SiEjs size={50} />, color: '#B4CA65' },

    { name: 'bcrypt', icon: <FaLock size={50} />, color: '#4CAF50' },
    { name: 'Cloudinary', icon: <SiCloudinary size={50} />, color: '#3448C5' },
    { name: 'Vite', icon: <SiVite size={50} />, color: '#646CFF' },
    { name: 'Render', icon: <SiRender size={50} />, color: '#46E3B7' },
    { name: 'Postman', icon: <SiPostman size={50} />, color: '#FF6C37' },
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
