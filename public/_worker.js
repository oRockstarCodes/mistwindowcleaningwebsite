// Cloudflare Worker for contact form handling
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle contact form POST requests
    if (path === '/contact' && request.method === 'POST') {
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
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          });
        }

        // Log the form data (for debugging)
        console.log('Contact form submission:', {
          firstName,
          lastName,
          email,
          phone,
          subject,
          message
        });

        // For now, just return success
        // TODO: Add email sending functionality later
        return new Response(JSON.stringify({
          success: true,
          message: 'Thank you for contacting us! We will get back to you soon.'
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });

      } catch (error) {
        console.error('Error processing contact form:', error);
        return new Response(JSON.stringify({
          success: false,
          message: 'Sorry, there was an error processing your request. Please try again.'
        }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // Serve static files for all other routes
    try {
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error('Error serving static assets:', error);
      return new Response('Page not found', { status: 404 });
    }
  }
}; 