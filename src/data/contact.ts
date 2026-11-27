export const contact = {
  // Where the form sends messages: an AWS Lambda function (ihs-contact-form) that emails
  // justin@ironhealthsolutions.com through SES, sent from noreply@ironhealthsolutions.com.
  endpoint: 'https://bbefycjse7glzutjpznk74s7mm0jbtty.lambda-url.us-east-1.on.aws/',
  seo: {
    title: 'Get Started | Contact Iron Health Solutions',
    description: 'Talk to Iron Health Solutions about a new website, SEO or AI search for your practice. Based in Pasadena, CA. Send us a message and get a clear plan.',
  },
  interests: ['Website design', 'Medical SEO & local optimization', 'Onsite content production', 'Reputation management', 'Paid ads & AI chat bot', 'AEO (AI search)', 'Starter package', 'Premium package', 'Premium Plus package', 'Not sure yet'],
  steps: [
    { title: 'Tell us about your practice', text: 'Fill in the short form. It takes about two minutes.' },
    { title: 'We review your online presence', text: 'We check your website, listings and reviews before we call.' },
    { title: 'Free consultation', text: 'We share what we found and a simple plan that fits your goals.' },
    { title: 'Clear quote, no pressure', text: 'You get a clear price. You decide when you are ready.' },
  ],
};
