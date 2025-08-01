const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
  const { firstName, lastName, email, phone, subject, message } = req.body;
  
  // Basic validation
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields.' 
    });
  }

  const mailOptions = {
    from: 'rockstarshomeservices@gmail.com',
    to: ['rockstarshomeservices@gmail.com', 'mistwindowcleaning@gmail.com'],
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    replyTo: email
  };

  // Configure your SMTP transport (update with your real SMTP credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: 'rockstarshomeservices@gmail.com',
      pass: 'pxix natr qpkt dnsd' // Replace with your Gmail app password
    }
  });

  try {
    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please try again later.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 