import React, { useState } from 'react';
import { Search, Plus, Clock, Users, Flame, Star, Filter } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  calories: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'smoothie';
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  rating: number;
  author: string;
}

const Recipes: React.FC = () => {
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Grilled Chicken & Quinoa Bowl',
      description: 'High-protein, nutrient-dense meal perfect for post-workout recovery',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      prepTime: 25,
      servings: 2,
      calories: 485,
      difficulty: 'Easy',
      category: 'lunch',
      protein: 42,
      carbs: 38,
      fat: 18,
      ingredients: [
        '200g chicken breast',
        '100g quinoa',
        '1 cup mixed vegetables',
        '2 tbsp olive oil',
        '1 avocado',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Season and grill chicken breast until cooked through',
        'Steam mixed vegetables',
        'Slice avocado',
        'Combine all ingredients in a bowl and serve'
      ],
      tags: ['high-protein', 'gluten-free', 'healthy'],
      rating: 4.8,
      author: 'Chef Yamada'
    },
    {
      id: '2',
      title: 'Berry Protein Smoothie',
      description: 'Refreshing breakfast smoothie packed with antioxidants and protein',
      image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=600',
      prepTime: 5,
      servings: 1,
      calories: 320,
      difficulty: 'Easy',
      category: 'smoothie',
      protein: 25,
      carbs: 35,
      fat: 8,
      ingredients: [
        '1 scoop vanilla protein powder',
        '1 cup mixed berries',
        '1 banana',
        '1 cup almond milk',
        '1 tbsp almond butter',
        'Ice cubes'
      ],
      instructions: [
        'Add all ingredients to a blender',
        'Blend until smooth',
        'Pour into glass and serve immediately'
      ],
      tags: ['protein', 'antioxidants', 'quick', 'breakfast'],
      rating: 4.6,
      author: 'Fitness Chef'
    },
    {
      id: '3',
      title: 'Salmon Teriyaki with Brown Rice',
      description: 'Omega-3 rich salmon with flavorful teriyaki glaze',
      image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
      prepTime: 30,
      servings: 2,
      calories: 520,
      difficulty: 'Medium',
      category: 'dinner',
      protein: 35,
      carbs: 45,
      fat: 20,
      ingredients: [
        '200g salmon fillet',
        '100g brown rice',
        '3 tbsp teriyaki sauce',
        '1 cup broccoli',
        '1 tbsp sesame oil',
        'Green onions for garnish'
      ],
      instructions: [
        'Cook brown rice according to package instructions',
        'Pan-fry salmon until cooked through',
        'Glaze salmon with teriyaki sauce',
        'Steam broccoli until tender',
        'Serve salmon over rice with broccoli',
        'Garnish with green onions'
      ],
      tags: ['omega-3', 'japanese', 'heart-healthy'],
      rating: 4.9,
      author: 'Chef Tanaka'
    },
    {
      id: '4',
      title: 'Greek Yogurt Parfait',
      description: 'Layered parfait with Greek yogurt, berries, and granola',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
      prepTime: 10,
      servings: 1,
      calories: 280,
      difficulty: 'Easy',
      category: 'breakfast',
      protein: 20,
      carbs: 32,
      fat: 8,
      ingredients: [
        '200g Greek yogurt',
        '1/2 cup mixed berries',
        '30g granola',
        '1 tbsp honey',
        '1 tbsp chia seeds'
      ],
      instructions: [
        'Layer half of yogurt in glass',
        'Add half of berries and granola',
        'Repeat layers',
        'Drizzle with honey',
        'Top with chia seeds'
      ],
      tags: ['probiotics', 'fiber', 'antioxidants'],
      rating: 4.7,
      author: 'Nutrition Expert'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Recipes' },
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'dinner', label: 'Dinner' },
    { key: 'snack', label: 'Snacks' },
    { key: 'smoothie', label: 'Smoothies' }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToMealPlan = (recipe: Recipe) => {
    addNotification({
      type: 'success',
      title: 'Added to Meal Plan!',
      message: `${recipe.title} has been added to your dashboard.`
    });
  };

  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Hard: 'bg-red-500/20 text-red-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gold-text mb-2">Healthy Recipes</h1>
            <p className="text-gray-400">Discover nutritious meals to fuel your fitness journey</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-gold text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="card hover:scale-105 transition-transform duration-300">
                <div
                  className="relative h-48 rounded-lg mb-4 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span className="text-white text-xs">{recipe.rating}</span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{recipe.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{recipe.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{recipe.prepTime} min</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center">
                    <Flame className="h-4 w-4 mr-1" />
                    <span>{recipe.calories} cal</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                  <div>
                    <div className="text-green-400 font-bold">{recipe.protein}g</div>
                    <div className="text-gray-500">Protein</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold">{recipe.carbs}g</div>
                    <div className="text-gray-500">Carbs</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">{recipe.fat}g</div>
                    <div className="text-gray-500">Fat</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="flex-1 btn-secondary text-sm"
                  >
                    View Recipe
                  </button>
                  <button
                    onClick={() => addToMealPlan(recipe)}
                    className="btn-primary text-sm px-3"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <Search className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No recipes found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recipe Image */}
              <div>
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gold" />
                      <span>{selectedRecipe.prepTime} min</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gold" />
                      <span>{selectedRecipe.servings} servings</span>
                    </div>
                    <div className="flex items-center">
                      <Flame className="h-4 w-4 mr-1 text-gold" />
                      <span>{selectedRecipe.calories} cal</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white">{selectedRecipe.rating}</span>
                  </div>
                </div>
              </div>

              {/* Recipe Details */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedRecipe.title}</h2>
                <p className="text-gray-400 mb-4">{selectedRecipe.description}</p>
                <p className="text-sm text-gold mb-4">By {selectedRecipe.author}</p>

                {/* Nutrition Info */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedRecipe.protein}g</div>
                    <div className="text-sm text-gray-400">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{selectedRecipe.carbs}g</div>
                    <div className="text-sm text-gray-400">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{selectedRecipe.fat}g</div>
                    <div className="text-sm text-gray-400">Fat</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedRecipe.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gold/20 text-gold rounded text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ingredients and Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-300">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Instructions</h3>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => addToMealPlan(selectedRecipe)}
                className="btn-primary flex items-center flex-1"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Meal Plan
              </button>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;