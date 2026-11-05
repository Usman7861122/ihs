export interface LegalSection { title: string; paragraphs?: string[]; bullets?: string[] }
export interface LegalDoc { slug: string; title: string; eyebrow: string; text: string; updated: string; seo: string; sections: LegalSection[] }

const updated = 'November 5, 2026';
const contact = 'You can contact us any time through the "Get Started" form on our website, or by phone at the number shown in our site header and footer.';

export const privacy: LegalDoc = {
  slug: 'privacy-policy', eyebrow: 'Legal', title: 'Privacy Policy', updated,
  text: 'We respect your privacy. This page explains what information we collect, why we collect it and the choices you have.',
  seo: 'How Iron Health Solutions collects, uses and protects your information.',
  sections: [
    { title: 'Who we are', paragraphs: ['Iron Health Solutions ("IHS", "we", "us") provides website design, SEO, reputation, advertising and AI services for private medical practices. This policy covers our website and the forms, tools and scanners we run on it.'] },
    { title: 'Information we collect', paragraphs: ['We collect only what we need to answer you and to run our business.'], bullets: ['Details you give us, such as your name, email, phone number, practice name and message', 'Details you enter in our Practice Scanner, such as your practice name and contact information', 'Technical data, such as your browser, device, pages viewed and approximate location, collected with cookies when you allow them', 'Records of our emails and calls with you'] },
    { title: 'Patient and health information', paragraphs: ['Our website is for practice owners and managers. Please do not send us patient names, medical records or other protected health information (PHI) through our public forms. If we later work with PHI for a client, we do it under a signed Business Associate Agreement and the rules of HIPAA.'] },
    { title: 'How we use your information', bullets: ['To reply to your questions and send quotes', 'To run the Practice Scanner and send you your report', 'To provide, support and improve our services and website', 'To send helpful updates, which you can stop at any time', 'To keep our site secure and prevent fraud', 'To follow the law'] },
    { title: 'Cookies and tracking', paragraphs: ['We use cookies and similar tools. Strictly necessary cookies are always on. Preferences, analytics and marketing cookies are used only if you allow them. You can change your choice at any time with the "Cookie Settings" link in the footer. Learn more in our Cookie Policy.'] },
    { title: 'Who we share it with', paragraphs: ['We do not sell your personal information. We share it only with trusted providers who help us run the business, such as hosting, email, analytics, scheduling and payment tools, and only as needed. We may also share information if the law requires it or to protect our rights.'] },
    { title: 'How long we keep it', paragraphs: ['We keep your information only as long as we need it for the reasons above, or as the law requires. After that we delete it or make it anonymous.'] },
    { title: 'How we protect it', paragraphs: ['We use security tools such as encrypted connections (HTTPS), access controls and trusted providers. No system is perfectly safe, so we cannot promise absolute security, but we work hard to protect your data.'] },
    { title: 'Your choices and rights', paragraphs: ['Depending on where you live, such as California, you may have the right to:'], bullets: ['Know what personal information we hold about you', 'Ask us to correct or delete it', 'Opt out of the sale or sharing of personal information (we do not sell it)', 'Opt out of marketing emails', 'Not be treated unfairly for using these rights'] },
    { title: 'Children', paragraphs: ['Our services are for businesses and are not meant for children under 13. We do not knowingly collect information from children.'] },
    { title: 'Changes to this policy', paragraphs: ['We may update this policy from time to time. We will change the date at the top of the page when we do.'] },
    { title: 'Contact us', paragraphs: [contact] },
  ],
};

export const terms: LegalDoc = {
  slug: 'terms-condition', eyebrow: 'Legal', title: 'Terms & Conditions', updated,
  text: 'These terms explain the rules for using our website and services. Please read them carefully.',
  seo: 'The terms and conditions for using the Iron Health Solutions website and services.',
  sections: [
    { title: 'Agreeing to these terms', paragraphs: ['By using our website or services, you agree to these terms. If you do not agree, please do not use the site. If you sign a separate service agreement with us, that agreement controls where it differs from this page.'] },
    { title: 'Our services', paragraphs: ['We offer website design, medical SEO, content, reputation management, paid advertising, AI chat tools and related marketing services. The exact scope, price and timeline of each project are set out in your proposal or service agreement.'] },
    { title: 'Using the website', bullets: ['Use the site only for lawful purposes', 'Do not try to break, overload or gain unauthorized access to the site', 'Do not copy or scrape our content without our written permission', 'Do not submit false information or patient health information through our public forms'] },
    { title: 'Your responsibilities as a client', bullets: ['Give us accurate information and content on time', 'Make sure you own, or have the right to use, the text, photos and logos you give us', 'Follow the laws and professional rules for your practice, including medical advertising rules', 'Review and approve final work before it goes live'] },
    { title: 'Payments', paragraphs: ['Fees, billing dates and payment methods are listed in your proposal or agreement. Late payments may pause our services. Third party costs, such as ad spend, domains or stock images, may be billed separately unless the agreement says otherwise.'] },
    { title: 'Intellectual property', paragraphs: ['Our website, brand, designs, code and content belong to Iron Health Solutions or its licensors. When a project is fully paid, the final custom deliverables that we agree to hand over become yours, except for third party tools, fonts, plug ins and stock media, which stay under their own licenses.'] },
    { title: 'No guarantee of results', paragraphs: ['Search rankings, ad results, reviews and patient numbers depend on many things outside our control, such as search engine changes and competition. We work hard to get you the best results, but we cannot promise specific rankings, traffic or revenue.'] },
    { title: 'Third party links and tools', paragraphs: ['Our site may link to other websites and tools, such as our Practice Scanner. We are not responsible for the content or privacy practices of third party sites.'] },
    { title: 'Limit of liability', paragraphs: ['To the fullest extent the law allows, Iron Health Solutions is not liable for indirect, incidental or consequential damages, such as lost profits or lost data, that come from using our website or services. Our total liability for any claim is limited to the amount you paid us for the service in the three months before the claim.'] },
    { title: 'Ending the relationship', paragraphs: ['You may stop using the site at any time. We may suspend or end access if these terms are broken. How to cancel a paid service is explained in your service agreement.'] },
    { title: 'Changes to these terms', paragraphs: ['We may update these terms from time to time. Using the site after a change means you accept the new terms.'] },
    { title: 'Governing law', paragraphs: ['These terms are governed by the laws of the State of California, United States, without regard to conflict of law rules.'] },
    { title: 'Contact us', paragraphs: [contact] },
  ],
};

export const cookies: LegalDoc = {
  slug: 'cookie-policy', eyebrow: 'Legal', title: 'Cookie Policy', updated,
  text: 'This page explains which cookies we use, why we use them and how you can control them.',
  seo: 'Which cookies Iron Health Solutions uses and how to change your cookie choices.',
  sections: [
    { title: 'What are cookies?', paragraphs: ['Cookies are small text files that a website saves on your device. They help a site work, remember your choices and understand how it is used. Similar tools, such as local storage and pixels, work in the same way and are covered by this policy.'] },
    { title: 'The cookies we use', paragraphs: ['We group cookies into four types.'], bullets: ['**Strictly necessary:** keep the site secure and remember your cookie choice. These are always on and cannot be switched off.', '**Preferences:** remember settings and form details so the site is easier to use.', '**Analytics:** show us how visitors use the site, such as pages viewed and load times, so we can improve it.', '**Marketing:** help us show relevant ads and measure how well our ads work.'] },
    { title: 'Your choices', paragraphs: ['When you first visit, we ask which cookies you allow. Only strictly necessary cookies run until you say yes to the others. You can change your mind at any time using the "Cookie Settings" link in the footer of every page.', 'You can also block or delete cookies in your browser settings. If you do, some parts of the site may not work as well.'] },
    { title: 'How long your choice lasts', paragraphs: ['We save your choice for about six months. After that we will ask you again.'] },
    { title: 'Third party cookies', paragraphs: ['Some cookies come from tools we use, such as analytics and advertising providers. These companies have their own privacy policies. They only run if you allow the matching category.'] },
    { title: 'Do Not Track and Global Privacy Control', paragraphs: ['Where the law requires it, we treat a Global Privacy Control signal from your browser as a request to opt out of marketing cookies.'] },
    { title: 'Changes to this policy', paragraphs: ['We may update this policy when we add or remove tools. The date at the top shows when it was last changed.'] },
    { title: 'Contact us', paragraphs: [contact] },
  ],
};
