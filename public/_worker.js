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
            headers: { 'Content-Type': 'application/json' }
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
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Error processing contact form:', error);
        return new Response(JSON.stringify({
          success: false,
          message: 'Sorry, there was an error processing your request. Please try again.'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Serve static files for all other routes
    return env.ASSETS.fetch(request);
  }
}; 