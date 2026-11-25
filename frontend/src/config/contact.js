/**
 * Centralized Contact Configuration for Keystone Realty Advisor.
 * Single source of truth for corporate desk telephone, advisory hotlines, email channels, and office hours.
 */
export const CONTACT_INFO = {
  companyName: 'Keystone Realty Advisor',
  tagline: 'Verified Real Estate Advisory & Premium Property Consultation',
  email: 'keystonexhelpdesk@gmail.com',

  // Corporate Office Landline (Delhi NCR Board)
  landline: {
    raw: '+911145636766',
    formatted: '+91 11 4563 6766',
    display: '011-45636766',
    tel: 'tel:+911145636766',
    label: 'Corporate Office Desk',
    location: 'Delhi NCR Corporate Office',
  },

  // Advisory & Client Support Mobile
  mobile: {
    raw: '+919911956274',
    formatted: '+91 9911956274',
    tel: 'tel:+919911956274',
    whatsapp: '919911956274',
    label: 'Direct Advisory Hotline',
  },

  address: {
    suite: 'Executive Suite, Financial District',
    locality: 'Gurugram',
    region: 'Haryana / Delhi NCR',
    country: 'IN',
    postalCode: '122002',
  },

  hours: {
    days: 'Monday – Saturday',
    time: '9:30 AM – 6:30 PM IST',
    display: 'Mon – Sat: 9:30 AM to 6:30 PM',
  },

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61594316288306',
    instagram: 'https://www.instagram.com/keystonerealty_advisors',
    linkedin: 'https://www.linkedin.com/company/keyston-realty-advisor/',
  },
};
