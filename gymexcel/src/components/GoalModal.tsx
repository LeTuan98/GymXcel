import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Goal {
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
}

interface GoalModalProps {
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

const GoalModal: React.FC<GoalModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Goal>({
    title: '',
    description: '',
    target: 0,
    current: 0,
    unit: 'kg',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'target' || name === 'current' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.target > 0 && formData.deadline) {
      onSave(formData);
    }
  };

  // Set minimum date to tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gold">Add New Goal</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Goal Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Weight Loss, Muscle Gain"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input min-h-[80px] resize-none"
              placeholder="Describe your goal in detail..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="current" className="block text-sm font-medium text-gray-300 mb-2">
                Current *
              </label>
              <input
                type="number"
                id="current"
                name="current"
                value={formData.current || ''}
                onChange={handleChange}
                className="form-input"
                step="0.1"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-2">
                Target *
              </label>
              <input
                type="number"
                id="target"
                name="target"
                value={formData.target || ''}
                onChange={handleChange}
                className="form-input"
                step="0.1"
                min="0.1"
                required
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-300 mb-2">
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="form-input"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
                <option value="cm">cm</option>
                <option value="inches">inches</option>
                <option value="reps">reps</option>
                <option value="minutes">minutes</option>
                <option value="days">days</option>
                <option value="times">times</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">
              Deadline *
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-input"
              min={minDateString}
              required
            />
          </div>

          {/* Goal Preview */}
          {formData.title && formData.target > 0 && (
            <div className="p-4 bg-gold/10 rounded-lg border border-gold/20">
              <h4 className="text-gold font-medium mb-2">Goal Preview:</h4>
              <p className="text-sm text-gray-300">
                <strong>{formData.title}:</strong> {formData.current} → {formData.target} {formData.unit}
                {formData.deadline && (
                  <span> by {new Date(formData.deadline).toLocaleDateString('ja-JP')}</span>
                )}
              </p>
              {formData.description && (
                <p className="text-sm text-gray-400 mt-1">{formData.description}</p>
              )}
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={!formData.title || formData.target <= 0 || !formData.deadline}
            >
              Create Goal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;