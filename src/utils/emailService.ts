// EmailJS fallback service for contact form
// This can be used if Node.js server is not available

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType?: string;
  message: string;
}

export const sendEmailViaService = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Option 1: Use EmailJS (free service)
    // You'll need to sign up at https://www.emailjs.com/
    // and replace these with your actual service details
    
    const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

    // Uncomment and configure this if you want to use EmailJS
    /*
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || '',
          organization: formData.organization || '',
          inquiry_type: formData.inquiryType || 'General Inquiry',
          message: formData.message,
          to_email: 'contact@afeworkpharmaet.com'
        }
      })
    });

    if (response.ok) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      throw new Error('Failed to send email via EmailJS');
    }
    */

    // For now, return a helpful error message
    return {
      success: false,
      message: 'Email service not configured. Please contact us directly at contact@afeworkpharmaet.com'
    };

  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or contact us directly.'
    };
  }
};

// Alternative: Direct email link fallback
export const createEmailLink = (formData: ContactFormData): string => {
  const subject = encodeURIComponent(`Website Inquiry: ${formData.inquiryType || 'General Inquiry'}`);
  const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Organization: ${formData.organization || 'Not specified'}
Inquiry Type: ${formData.inquiryType || 'General Inquiry'}

Message:
${formData.message}
  `);
  
  return `mailto:contact@afeworkpharmaet.com?subject=${subject}&body=${body}`;
};
