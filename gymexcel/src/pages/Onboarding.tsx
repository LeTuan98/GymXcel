import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowRight, SkipForward } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';

const Onboarding: React.FC = () => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    waist: '',
    neck: '',
    hip: ''
  });
  
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseFloat(formData.weight),
      waist: parseFloat(formData.waist),
      neck: parseFloat(formData.neck),
      hip: formData.hip ? parseFloat(formData.hip) : undefined
    };

    updateUser(userData);
    
    addNotification({
      type: 'success',
      title: 'Profile Updated!',
      message: 'Your body measurements have been saved successfully.'
    });
    
    navigate('/');
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Dumbbell className="h-12 w-12 text-gold" />
            </div>
            <h1 className="text-3xl font-bold gold-text mb-2">Tell us about yourself</h1>
            <p className="text-gray-400">Help us personalize your fitness journey</p>
          </div>

          {/* Onboarding Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('age')} (年)
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="25"
                    min="1"
                    max="120"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('height')} (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="170"
                    min="100"
                    max="250"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('weight')} (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="65.5"
                    min="30"
                    max="300"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="waist" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('waist')} (cm)
                  </label>
                  <input
                    type="number"
                    id="waist"
                    name="waist"
                    value={formData.waist}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="80"
                    min="40"
                    max="200"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="neck" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('neck')} (cm)
                  </label>
                  <input
                    type="number"
                    id="neck"
                    name="neck"
                    value={formData.neck}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="35"
                    min="20"
                    max="60"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="hip" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('hip')} (cm) - Optional
                  </label>
                  <input
                    type="number"
                    id="hip"
                    name="hip"
                    value={formData.hip}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="95"
                    min="60"
                    max="200"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center flex-1"
                >
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                <button
                  type="button"
                  onClick={handleSkip}
                  className="btn-secondary flex items-center justify-center"
                >
                  <SkipForward className="mr-2 h-4 w-4" />
                  Skip for now
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
              <h4 className="text-gold font-medium mb-2">Why do we need this information?</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Calculate your BMI and body fat percentage</li>
                <li>• Determine your daily calorie needs (TDEE)</li>
                <li>• Provide personalized nutrition recommendations</li>
                <li>• Track your fitness progress accurately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;