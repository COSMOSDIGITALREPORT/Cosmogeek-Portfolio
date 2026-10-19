/**
 * Inquiry Submission Service
 * Dispatches project inquiry email messages to the official company email: cosmosdigital44@gmail.com
 *
 * Supported delivery mechanisms:
 * 1. Custom backend webhook (VITE_CONTACT_API_URL if configured)
 * 2. FormSubmit AJAX direct email dispatch to cosmosdigital44@gmail.com
 * 3. Client mailto protocol fallback
 */
export async function submitProjectInquiry(inquiryData) {
  const targetEmail = 'cosmosdigital44@gmail.com'
  const customEndpoint = import.meta.env.VITE_CONTACT_API_URL
  const endpoint = customEndpoint || `https://formsubmit.co/ajax/${targetEmail}`

  try {
    const payload = {
      name: inquiryData.fullName,
      email: inquiryData.email,
      phone: inquiryData.phone || 'Not provided',
      service: inquiryData.service,
      budget: inquiryData.budget || 'Not specified',
      message: inquiryData.details,
      _subject: `New Project Inquiry from ${inquiryData.fullName} [${inquiryData.service}]`,
      _template: 'table',
      _captcha: 'false',
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Service returned HTTP status ${response.status}`)
    }

    const result = await response.json().catch(() => ({}))

    return {
      success: true,
      deliveredTo: targetEmail,
      data: result,
      message: `Your inquiry has been successfully sent to ${targetEmail}. Our team will review your project details and get back to you shortly!`,
    }
  } catch (err) {
    return {
      success: false,
      deliveredTo: targetEmail,
      message:
        err.message ||
        `Unable to dispatch inquiry automatically. Please send directly to ${targetEmail} using the button below.`,
    }
  }
}

/**
 * Newsletter Subscription
 * Uses the same delivery endpoint as project inquiries, so each sign-up arrives
 * at the official company inbox as a "Newsletter Subscription" email.
 */
export async function subscribeToNewsletter(email) {
  const targetEmail = 'cosmosdigital44@gmail.com'
  const endpoint = import.meta.env.VITE_CONTACT_API_URL || `https://formsubmit.co/ajax/${targetEmail}`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        type: 'newsletter',
        email,
        _subject: `Newsletter Subscription: ${email}`,
        _template: 'table',
        _captcha: 'false',
      }),
    })

    if (!response.ok) {
      throw new Error(`Service returned HTTP status ${response.status}`)
    }

    return { success: true }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
