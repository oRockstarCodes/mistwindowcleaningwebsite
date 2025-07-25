const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes - serve static HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve static HTML for each service
app.get('/service-residential', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-residential.html'));
});
app.get('/service-commercial', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-commercial.html'));
});
app.get('/service-gutter', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-gutter.html'));
});
app.get('/service-screen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-screen.html'));
});
app.get('/service-deep', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-deep.html'));
});
app.get('/service-maintenance', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-maintenance.html'));
});
app.get('/service-postconstruction', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-postconstruction.html'));
});

// Contact form POST handler
app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;
  const mailOptions = {
    from: 'info@mistwindowcleaning.ca',
    to: 'info@mistwindowcleaning.ca',
    subject: `Contact Form: ${subject || 'No Subject'}`,
    text: `Name: ${firstName || ''} ${lastName || ''}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    replyTo: email
  };

  // Configure your SMTP transport (update with your real SMTP credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: 'info@mistwindowcleaning.ca', // update with your real email
      pass: 'YOUR_EMAIL_PASSWORD' // update with your real password or app password
    }
  });

  try {
    await transporter.sendMail(mailOptions);
    res.send('<h2>Thank you for contacting us! We will get back to you soon.</h2><a href="/">Return Home</a>');
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).send('<h2>Sorry, there was an error sending your message. Please try again later.</h2><a href="/contact">Back to Contact</a>');
  }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 