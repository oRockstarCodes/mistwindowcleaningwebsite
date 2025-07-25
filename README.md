# Mist Window Cleaning Website

A professional window cleaning business website built with Node.js, Express, and modern web technologies. Designed for deployment on Cloudflare Workers.

## 🏢 About

Mist Window Cleaning is a locally owned and operated window cleaning service serving the Greater Toronto Area. This website showcases our services, provides contact information, and allows customers to request quotes.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Service Pages**: Detailed information for each cleaning service
- **Contact Form**: Email integration for customer inquiries
- **Interactive Map**: Service area visualization using Leaflet.js
- **Modern Animations**: Smooth scroll effects and transitions
- **SEO Optimized**: Clean URLs and semantic HTML

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design patterns
- **Fonts**: Inter font family (Google Fonts)
- **Maps**: Leaflet.js for service area visualization
- **Deployment**: Cloudflare Workers
- **Email**: Nodemailer for contact form

## 📁 Project Structure

```
rockstarhomeservices/
├── app.js                 # Express server
├── worker.js             # Cloudflare Workers script
├── wrangler.toml         # Cloudflare deployment config
├── package.json          # Dependencies and scripts
├── public/               # Static assets
│   ├── index.html        # Homepage
│   ├── services.html     # Services overview
│   ├── contact.html      # Contact page
│   ├── css/
│   │   └── main.css      # Main stylesheet
│   ├── js/
│   │   └── main.js       # Client-side JavaScript
│   ├── images/           # Images and logos
│   └── service-*.html    # Individual service pages
└── views/                # EJS templates (alternative)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Cloudflare account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mistwindowcleaning.git
cd mistwindowcleaning
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add your email credentials for the contact form

4. Start the development server:
```bash
npm start
```

The website will be available at `http://localhost:3000`

## 📧 Email Configuration

To enable the contact form functionality, update the email settings in `app.js`:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email provider
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
```

## 🌐 Deployment

### Cloudflare Workers

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy to Cloudflare Workers:
```bash
wrangler publish
```

### Alternative Deployment

You can also deploy to other platforms like:
- Vercel
- Netlify
- Heroku
- DigitalOcean

## 🎨 Customization

### Colors
The main color scheme is defined in `public/css/main.css`:
```css
:root {
  --primary-blue: #00b4e6;
  --accent-blue: #0093c9;
  --dark-gray: #444444;
  --light-gray: #f8f9fa;
}
```

### Business Information
Update the following files with your business details:
- `public/index.html` - Hero section and contact info
- `public/contact.html` - Contact details
- All service pages in the `public/` directory

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Available Scripts

- `npm start` - Start the development server
- `npm run dev` - Start the development server (alias)
- `npm test` - Run tests (placeholder)

### Code Style

- Use consistent indentation (2 spaces)
- Follow modern JavaScript conventions
- Maintain responsive design principles
- Optimize images for web use

## 📞 Contact Information

**Mist Window Cleaning**
- **Phone**: (647) 559-4222
- **Email**: info@mistwindowcleaning.ca
- **Service Area**: Greater Toronto Area

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🤝 Contributing

This is a private business website. For support or questions, please contact the business directly.

---

Built with ❤️ for Mist Window Cleaning 