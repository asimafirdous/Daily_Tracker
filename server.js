const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Importing cookie-parser
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Using cookie-parser middleware

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Set a cookie for task status
app.get('/set-cookie', (req, res) => {
    const taskStatus = req.query.status || 'pending';
    res.cookie('taskStatus', taskStatus, { maxAge: 24 * 60 * 60 * 1000 }); // Expires in 1 day
    res.send(`Task status cookie set to: ${taskStatus}`);
});

// Get the current cookie value
app.get('/get-cookie', (req, res) => {
    const taskStatus = req.cookies.taskStatus || 'No status set';
    res.send(`Task Status: ${taskStatus}`);
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`Daily Tracker running at http://localhost:${port}`);
});