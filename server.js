import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GitHub Contributions Proxy
app.get('/api/github-contributions/:username/:year', async (req, res) => {
    const { username, year } = req.params;
    try {
        const url = `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`;
        const { data: html } = await axios.get(url, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        const $ = cheerio.load(html);
        const contributions = [];
        const totalText = $('.js-yearly-contributions h2').text().trim();
        // More specific regex: find number followed by "contribution"
        const totalCountMatch = totalText.match(/(\d+[,.]?\d*)\s+contribution/i);
        const totalCount = totalCountMatch ? totalCountMatch[1].replace(/[,.]/g, '') : '0';

        $('td.ContributionCalendar-day').each((_, el) => {
            const $el = $(el);
            const date = $el.attr('data-date');
            const level = parseInt($el.attr('data-level') || '0', 10);

            const label = $el.find('span.sr-only').text() || $el.attr('aria-label') || '';
            const count = label.match(/(\d+) contribution/)?.[1] || (level > 0 ? level : '0');

            if (date) {
                contributions.push({ date, level, count });
            }
        });

        // Sort contributions chronologically by date to ensure grid order
        contributions.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.status(200).json({ contributions, totalContributions: totalCount });
    } catch (error) {
        console.error('Error fetching contributions:', error.message);
        res.status(500).json({ error: 'Failed to fetch contribution data' });
    }
});

// Routes
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Log the event
    console.log(`New message from ${name} (${email}): ${message}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'josefstack.dev@gmail.com', // Your email
        subject: `New Message from Portfolio: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    const autoReplyOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for reaching out!',
        text: `Hi ${name},\n\nThank you for visiting my portfolio. I've received your message and will get back to you as soon as possible.\n\nBest regards,\nJoseph Johnson`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Sending notification to: josefstack.dev@gmail.com`);

        await transporter.sendMail(autoReplyOptions);
        console.log(`Sending auto-reply to: ${email}`);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Root route for status check
app.get('/', (req, res) => {
    res.json({ status: "Portfolio API is running", mode: "Split Hosting" });
});

// Clean catch-all middleware (no regex required)
app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint not found",
        hint: "Are you looking for the frontend? Visit your Vercel URL instead."
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
