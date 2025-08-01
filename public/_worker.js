// Simple router for handling requests
function createRouter() {
  const routes = new Map();
  
  return {
    post: (path, handler) => routes.set(`POST:${path}`, handler),
    all: (path, handler) => routes.set(`ALL:${path}`, handler),
    handle: async (request, env, ctx) => {
      const url = new URL(request.url);
      const method = request.method;
      const path = url.pathname;
      
      // Check for exact match first
      const exactKey = `${method}:${path}`;
      if (routes.has(exactKey)) {
        return await routes.get(exactKey)(request, env, ctx);
      }
      
      // Check for wildcard match
      const wildcardKey = `ALL:${path}`;
      if (routes.has(wildcardKey)) {
        return await routes.get(wildcardKey)(request, env, ctx);
      }
      
      // Default: serve static files
      return env.ASSETS.fetch(request);
    }
  };
}

// Create router
const router = createRouter();

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

    // Send email to both addresses using Cloudflare Email API
    const emailData = {
      personalizations: [
        {
          to: [
            { email: 'rockstarshomeservices@gmail.com', name: 'Rockstar Home Services' },
            { email: 'mistwindowcleaning@gmail.com', name: 'Mist Window Cleaning' }
          ],
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
    // You can configure email sending later with Cloudflare Email API or SendGrid
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
    return router.handle(request, env, ctx);
  }
}; 