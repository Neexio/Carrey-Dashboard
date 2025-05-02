import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const faqSections = {
    general: [
      {
        q: "What is Carrey.ai?",
        a: "Carrey.ai is an AI-powered SEO platform that helps you optimize your website and improve your search engine rankings through automated analysis and recommendations."
      },
      {
        q: "How do I get started?",
        a: "Simply sign up for an account, enter your website URL, and our system will automatically analyze your site and provide recommendations for improvement."
      },
      {
        q: "What features are included in the free trial?",
        a: "The free trial includes basic SEO analysis, website health check, task manager, and access to the simple mode interface for 14 days."
      }
    ],
    pricing: [
      {
        q: "What are the different subscription plans?",
        a: "We offer Free Trial, Basic ($29/mo), Business ($99/mo), and Enterprise ($499/mo) plans, each with different features and capabilities."
      },
      {
        q: "How many team members can I add?",
        a: "Free Trial: 1 member, Basic: 2 members, Business: 10 members, Enterprise: Unlimited team members."
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle."
      }
    ],
    technical: [
      {
        q: "How often is the website analysis updated?",
        a: "Website analysis is updated daily for all paid plans. Free trial users get weekly updates."
      },
      {
        q: "What technologies do you use for analysis?",
        a: "We use a combination of AI algorithms, real-time crawling, and industry-standard SEO metrics to analyze websites."
      },
      {
        q: "Is the platform suitable for multiple websites?",
        a: "Yes, depending on your plan. Basic allows 3 websites, Business 10 websites, and Enterprise unlimited websites."
      }
    ],
    support: [
      {
        q: "How can I get help?",
        a: "We offer email support for all users. Business and Enterprise plans include priority support and dedicated account managers."
      },
      {
        q: "Do you offer training?",
        a: "Yes, we provide video tutorials, documentation, and webinars. Enterprise customers get personalized training sessions."
      },
      {
        q: "What's the response time for support?",
        a: "Basic: 24-48 hours, Business: 12 hours, Enterprise: 4 hours guaranteed response time."
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        {Object.entries(faqSections).map(([section, questions]) => (
          <div key={section} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <button
              onClick={() => setOpenSection(openSection === section ? null : section)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <h2 className="text-lg font-semibold capitalize">{section}</h2>
              {openSection === section ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {openSection === section && (
              <div className="px-6 pb-6 space-y-4">
                {questions.map((faq, index) => (
                  <div key={index} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="font-medium mb-2">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;