import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Camera, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    waist: user?.waist || '',
    neck: user?.neck || '',
    hip: user?.hip || ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedData = {
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : undefined,
        height: formData.height ? parseInt(formData.height) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        waist: formData.waist ? parseFloat(formData.waist) : undefined,
        neck: formData.neck ? parseFloat(formData.neck) : undefined,
        hip: formData.hip ? parseFloat(formData.hip) : undefined
      };

      updateUser(updatedData);

      addNotification({
        type: 'success',
        title: 'Profile Updated!',
        message: 'Your profile information has been saved successfully.'
      });

      navigate('/profile');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6 text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold gold-text">Edit Profile</h1>
              <p className="text-gray-400">Update your personal information</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gold"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-2 bg-gold text-black rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">Click to change profile photo</p>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <User className="mr-2 h-5 w-5 text-gold" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

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
                      min="1"
                      max="120"
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
                      min="100"
                      max="250"
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
                      min="30"
                      max="300"
                      step="0.1"
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
                      min="40"
                      max="200"
                      step="0.1"
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
                      min="20"
                      max="60"
                      step="0.1"
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
                      min="60"
                      max="200"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Calculated Metrics Preview */}
              {formData.height && formData.weight && (
                <div className="p-4 bg-gold/10 rounded-lg border border-gold/20">
                  <h4 className="text-gold font-medium mb-3">Calculated Metrics Preview:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">BMI</div>
                      <div className="text-gold font-bold">
                        {(parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(2)}
                      </div>
                    </div>
                    
                    {formData.age && (
                      <>
                        <div>
                          <div className="text-gray-400">BMR (estimated)</div>
                          <div className="text-gold font-bold">
                            {Math.round(
                              88.362 + (13.397 * parseFloat(formData.weight)) + 
                              (4.799 * parseFloat(formData.height)) - 
                              (5.677 * parseFloat(formData.age))
                            )} cal
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-gray-400">TDEE (estimated)</div>
                          <div className="text-gold font-bold">
                            {Math.round(
                              (88.362 + (13.397 * parseFloat(formData.weight)) + 
                               (4.799 * parseFloat(formData.height)) - 
                               (5.677 * parseFloat(formData.age))) * 1.55
                            )} cal
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center justify-center flex-1"
                >
                  {isLoading ? (
                    <div className="loading-spinner w-5 h-5"></div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {t('save')} Changes
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="btn-secondary"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;