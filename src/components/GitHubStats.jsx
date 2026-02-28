import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SiGithub } from 'react-icons/si';
import { VscRepo, VscAccount, VscOrganization, VscHistory, VscChevronDown } from 'react-icons/vsc';
import './GitHubStats.css';

const ContributionGrid = ({ contributions, year, onYearChange, totalContributions }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };

    // Correct for the starting day of the year (Sunday offset)
    const firstDate = contributions.length > 0 ? new Date(contributions[0].date) : new Date(year, 0, 1);
    const dayOfWeek = firstDate.getDay(); // 0 (Sun) to 6 (Sat)

    // Create leading placeholders
    const placeholders = Array.from({ length: dayOfWeek }, (_, i) => ({
        placeholder: true,
        id: `empty-${i}`
    }));

    const allCells = [...placeholders, ...contributions];

    return (
        <div className="contribution-heat-map">
            <div className="grid-header">
                <div className="total-stats">
                    <span className="total-count">{totalContributions || 0} contributions</span>
                    <span className="total-year">in {year}</span>
                </div>
                <div className="year-selector">
                    <select value={year} onChange={(e) => onYearChange(e.target.value)}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <VscChevronDown className="select-icon" />
                </div>
            </div>

            <div className="scroll-wrapper">
                <div className="month-labels">
                    {months.map(m => <span key={m}>{m}</span>)}
                </div>

                <div className="grid-body">
                    <div className="day-labels">
                        <span className="small-day">Mon</span>
                        <span className="small-day">Wed</span>
                        <span className="small-day">Fri</span>
                    </div>
                    <div className="squares-grid">
                        {allCells.map((day, i) => (
                            <div
                                key={i}
                                className={`square ${day.placeholder ? 'placeholder' : `level-${day.level}`}`}
                                title={day.placeholder ? "" : `${day.count} ${day.count === '1' ? 'contribution' : 'contributions'} on ${formatDate(day.date)}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid-footer">
                <span>Less</span>
                <div className="square level-0" title="No contributions"></div>
                <div className="square level-1" title="1-3 contributions"></div>
                <div className="square level-2" title="4-6 contributions"></div>
                <div className="square level-3" title="7-9 contributions"></div>
                <div className="square level-4" title="10+ contributions"></div>
                <span>More</span>
            </div>
        </div>
    );
};

const GitHubStats = () => {
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [totalContributions, setTotalContributions] = useState('0');
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
    const [contributionsLoading, setContributionsLoading] = useState(false);
    const [error, setError] = useState(null);
    const username = 'JosefStack';

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                setLoading(true);
                const [userRes, eventsRes] = await Promise.all([
                    axios.get(`https://api.github.com/users/${username}`),
                    axios.get(`https://api.github.com/users/${username}/events/public?per_page=5`)
                ]);

                setStats(userRes.data);
                setEvents(eventsRes.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError('Failed to load GitHub data');
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                setContributionsLoading(true);
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const response = await axios.get(`${baseUrl}/api/github-contributions/${username}/${year}`);
                setContributions(response.data.contributions);
                setTotalContributions(response.data.totalContributions);
                setContributionsLoading(false);
            } catch (err) {
                console.error('Error fetching contributions:', err);
                setContributionsLoading(false);
            }
        };

        fetchContributions();
    }, [year]);

    if (loading) {
        return (
            <div className="stats-container">
                <h2 className="section-title">{'// github-stats'}</h2>
                <div className="stats-loading">Loading live data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="stats-container">
                <h2 className="section-title">{'// github-stats'}</h2>
                <div className="stats-error">{error}</div>
            </div>
        );
    }

    return (
        <div className="stats-container">
            <h2 className="section-title">{'// github-stats'}</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper blue">
                        <VscRepo size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.public_repos}</span>
                        <span className="stat-label">Public Repos</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper orange">
                        <VscAccount size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.followers}</span>
                        <span className="stat-label">Followers</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper mint">
                        <VscOrganization size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.following}</span>
                        <span className="stat-label">Following</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper coral">
                        <SiGithub size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.login}</span>
                        <span className="stat-label">Username</span>
                    </div>
                </div>
            </div>

            <div className="contribution-section">
                <h3 className="sub-title">{'// contribution-grid'}</h3>
                {contributionsLoading ? (
                    <div className="contributions-loading">Updating grid...</div>
                ) : (
                    <ContributionGrid
                        contributions={contributions}
                        year={year}
                        onYearChange={setYear}
                        totalContributions={totalContributions}
                    />
                )}
            </div>

            <div className="activity-section">
                <h3 className="sub-title">{'// recent-push-events'}</h3>
                <div className="events-list">
                    {events.length > 0 ? events.map(event => (
                        <div key={event.id} className="event-item">
                            <VscHistory className="event-icon" />
                            <div className="event-details">
                                <span className="event-type">{event.type.replace('Event', '')}</span>
                                <span className="event-repo">{event.repo.name.split('/')[1]}</span>
                                <span className="event-date">{new Date(event.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    )) : (
                        <div className="no-events">No recent activity found.</div>
                    )}
                </div>
            </div>

            <div className="github-profile-link">
                <a href={stats.html_url} target="_blank" rel="noreferrer" className="btn-secondary">
                    View Full Profile
                </a>
            </div>
        </div>
    );
};

export default GitHubStats;
