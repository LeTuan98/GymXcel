import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Calculator, Heart, Users, Utensils } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'nutrition' | 'fitness' | 'community' | 'technical';
}

const FAQ: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I calculate my BMI?',
      answer: 'BMI (Body Mass Index) is calculated using the formula: BMI = weight(kg) ÷ height(m)². For example, if you weigh 70kg and are 1.75m tall, your BMI would be 70 ÷ (1.75 × 1.75) = 22.9. This puts you in the "normal weight" category (18.5-24.9).',
      category: 'general'
    },
    {
      id: '2',
      question: 'What is TDEE and how is it calculated?',
      answer: 'TDEE (Total Daily Energy Expenditure) is the total calories you burn in a day. It\'s calculated by multiplying your BMR (Basal Metabolic Rate) by an activity factor: Sedentary (1.2), Lightly active (1.375), Moderately active (1.55), Very active (1.725), or Extremely active (1.9).',
      category: 'nutrition'
    },
    {
      id: '3',
      question: 'How do I track my daily calorie intake?',
      answer: 'Use the meal tracking feature on your dashboard. Add foods by clicking "Add Meal" and enter the food name, standard amount, and nutritional values. The system will automatically calculate subtotals based on your portion size.',
      category: 'nutrition'
    },
    {
      id: '4',
      question: 'How do I set up fitness goals?',
      answer: 'Go to the Goals page and click "Add New Goal". Choose a goal type (weight loss, muscle gain, etc.), set your target, current status, deadline, and description. You can track progress and update your current status anytime.',
      category: 'fitness'
    },
    {
      id: '5',
      question: 'What is body fat percentage and how is it estimated?',
      answer: 'Body fat percentage is the proportion of your body weight that is fat tissue. GymExcel uses the U.S. Navy method for estimation, which uses measurements of waist, neck, and hip (for women) along with height to estimate body fat percentage.',
      category: 'general'
    },
    {
      id: '6',
      question: 'How do I connect with other users?',
      answer: 'Visit the Community page to see posts from other users. You can like, comment, and share posts. Click on user profiles to follow them and see their fitness journey. Use the "People You May Know" section to discover new connections.',
      category: 'community'
    },
    {
      id: '7',
      question: 'Can I change the app language?',
      answer: 'Yes! Use the language switcher in the footer to toggle between Japanese (日本語) and Vietnamese (Tiếng Việt). Your language preference is automatically saved.',
      category: 'technical'
    },
    {
      id: '8',
      question: 'How do I edit or delete a meal entry?',
      answer: 'In the meal tracking table, each meal entry has Edit and Delete buttons. Click Edit to modify the details, or Delete to remove the entry. You can also adjust quantities directly in the quantity field.',
      category: 'nutrition'
    },
    {
      id: '9',
      question: 'What should I do if I reach my goal?',
      answer: 'Congratulations! When you reach your goal, you can mark it as completed. Consider setting new, more challenging goals to continue your fitness journey. Share your achievement with the community for motivation and support.',
      category: 'fitness'
    },
    {
      id: '10',
      question: 'How do meal calculations work?',
      answer: 'Meal calculations use the formula: (Your quantity ÷ Standard amount) × Nutritional value. For example, if standard chicken breast (100g) has 165 calories and you eat 150g, the calculation is: (150 ÷ 100) × 165 = 247.5 calories.',
      category: 'nutrition'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Categories', icon: HelpCircle },
    { key: 'general', label: 'General', icon: Calculator },
    { key: 'nutrition', label: 'Nutrition', icon: Utensils },
    { key: 'fitness', label: 'Fitness', icon: Heart },
    { key: 'community', label: 'Community', icon: Users },
    { key: 'technical', label: 'Technical', icon: HelpCircle }
  ];

  const filteredFAQ = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleExpanded = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gold-text mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-400">Find answers to common questions about GymExcel</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-gold text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="mr-2 h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.map(item => (
              <div key={item.id} className="card">
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full flex items-center justify-between text-left hover:bg-white/5 transition-colors rounded-lg p-4 -m-4"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                  {expandedItem === item.id ? (
                    <ChevronUp className="h-5 w-5 text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gold flex-shrink-0" />
                  )}
                </button>
                
                {expandedItem === item.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    <div className="mt-3">
                      <span className="inline-block px-2 py-1 bg-gold/20 text-gold rounded text-xs font-medium">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No FAQs found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}

          {/* Contact Support */}
          <div className="card mt-12 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Support
              </button>
              <button className="btn-secondary">
                Join Community
              </button>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="card text-center">
              <Calculator className="mx-auto h-8 w-8 text-gold mb-3" />
              <h4 className="font-bold text-white mb-2">BMI Calculator</h4>
              <p className="text-sm text-gray-400">Use your height and weight measurements from your profile</p>
            </div>
            
            <div className="card text-center">
              <Utensils className="mx-auto h-8 w-8 text-gold mb-3" />
              <h4 className="font-bold text-white mb-2">Meal Tracking</h4>
              <p className="text-sm text-gray-400">Log your meals daily for accurate calorie tracking</p>
            </div>
            
            <div className="card text-center">
              <Heart className="mx-auto h-8 w-8 text-gold mb-3" />
              <h4 className="font-bold text-white mb-2">Goal Setting</h4>
              <p className="text-sm text-gray-400">Set SMART goals with specific targets and deadlines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;