import { Router } from 'itty-router';

// Create a new router
const router = Router();

// Handle contact form submission
router.post('/contact', async (request) => {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please fill in all required fields.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send email using Cloudflare Email API
    const emailData = {
      personalizations: [
        {
          to: [{ email: 'rockstarshomeservices@gmail.com', name: 'Mist Window Cleaning' }],
          subject: `Contact Form: ${subject}`
        }
      ],
      from: { email: 'noreply@mistwindowcleaning.ca', name: 'Mist Window Cleaning Contact Form' },
      reply_to: { email: email, name: `${firstName} ${lastName}` },
      content: [
        {
          type: 'text/html',
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        }
      ]
    };

    // For now, we'll return success without actually sending email
    // You'll need to configure Cloudflare Email API or use a service like SendGrid
    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Handle all other routes - serve static files
router.all('*', async (request, env) => {
  return env.ASSETS.fetch(request);
});

// Export default handler
export default {
  async fetch(request, env, ctx) {
    return router.handle(request, env, ctx).catch(() => {
      // Fallback to serving static assets directly
      return env.ASSETS.fetch(request);
    });
  }
}; 