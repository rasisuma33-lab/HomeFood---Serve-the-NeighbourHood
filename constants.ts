
import { Chef, CommunityRequest } from './types';

export const MOCK_CHEFS: Chef[] = [
  {
    id: '1',
    name: 'Aisha Khan',
    bio: 'Cooking traditional Hyderabadi recipes passed down from my grandmother. Using organic spices only!',
    location: 'Greenwood Ave, 0.5km',
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://picsum.photos/200/200?random=1',
    specialty: 'Hyderabadi Biryani',
    isOnline: true,
    distance: '0.5 km',
    distanceValue: 0.5,
    badges: ['Hygiene Verified', 'Top Rated'],
    menu: [
      {
        id: 'd1',
        name: 'Home-Style Chicken Biryani',
        description: 'Slow-cooked with saffron and pure ghee. Served with raita.',
        price: 12.50,
        image: 'https://picsum.photos/400/300?random=10',
        isVeg: false,
        availableQty: 10,
        ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Ghee', 'Spices'],
        prepTime: '45 mins',
        calories: 650,
        portionSize: 'Serves 1-2',
        isDailySpecial: true
      },
      {
        id: 'd2',
        name: 'Mirchi Ka Salan',
        description: 'Tangy and spicy chili curry, perfect side dish.',
        price: 5.00,
        image: 'https://picsum.photos/400/300?random=11',
        isVeg: true,
        availableQty: 15,
        ingredients: ['Green Chilies', 'Peanuts', 'Sesame', 'Tamarind'],
        prepTime: '30 mins',
        calories: 200,
        portionSize: 'Bowl'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    bio: 'Baking fresh sourdough and comfort pies every morning. Warm your heart with my baking.',
    location: 'Maple Street, 1.2km',
    rating: 4.9,
    reviewsCount: 89,
    image: 'https://picsum.photos/200/200?random=2',
    specialty: 'Artisan Breads',
    isOnline: true,
    distance: '1.2 km',
    distanceValue: 1.2,
    badges: ['Community Favorite'],
    menu: [
      {
        id: 'd3',
        name: 'Rustic Shepherd’s Pie',
        description: 'Ground lamb with vegetables topped with creamy mashed potatoes.',
        price: 15.00,
        image: 'https://picsum.photos/400/300?random=12',
        isVeg: false,
        availableQty: 5,
        ingredients: ['Lamb', 'Potatoes', 'Carrots', 'Peas', 'Butter'],
        prepTime: '60 mins',
        calories: 550,
        portionSize: 'Large Slice'
      },
      {
        id: 'd4',
        name: 'Classic Apple Pie Slice',
        description: 'Warm, cinnamon-spiced apples in a flaky crust.',
        price: 6.50,
        image: 'https://picsum.photos/400/300?random=13',
        isVeg: true,
        availableQty: 8,
        ingredients: ['Apples', 'Flour', 'Butter', 'Cinnamon', 'Sugar'],
        prepTime: '15 mins',
        calories: 350,
        portionSize: 'Slice',
        isDailySpecial: true
      }
    ]
  },
  {
    id: '3',
    name: 'Mrs. Gupta',
    bio: 'Pure vegetarian North Indian thalis. Bringing the taste of Varanasi to your plate.',
    location: 'Elm Drive, 0.8km',
    rating: 4.7,
    reviewsCount: 210,
    image: 'https://picsum.photos/200/200?random=3',
    specialty: 'Veg Thali',
    isOnline: false,
    distance: '0.8 km',
    distanceValue: 0.8,
    badges: ['Hygiene Verified', 'Pure Veg'],
    menu: [
      {
        id: 'd5',
        name: 'Deluxe Veg Thali',
        description: 'Paneer butter masala, dal tadka, 2 rotis, rice, and sweet.',
        price: 14.00,
        image: 'https://picsum.photos/400/300?random=14',
        isVeg: true,
        availableQty: 20,
        ingredients: ['Paneer', 'Lentils', 'Wheat Flour', 'Rice', 'Spices'],
        prepTime: '40 mins',
        calories: 800,
        portionSize: 'Full Meal',
        isDailySpecial: true
      }
    ]
  },
  {
    id: '4',
    name: 'Marco Rossi',
    bio: 'Authentic Italian pastas made from scratch. Simple ingredients, incredible flavor.',
    location: 'Highland Park, 4.5km',
    rating: 4.6,
    reviewsCount: 45,
    image: 'https://picsum.photos/200/200?random=4',
    specialty: 'Fresh Pasta',
    isOnline: true,
    distance: '4.5 km',
    distanceValue: 4.5,
    badges: ['Authentic Italian'],
    menu: [
      {
        id: 'd6',
        name: 'Spaghetti Carbonara',
        description: 'Classic Roman recipe with egg, pecorino cheese, guanciale, and black pepper.',
        price: 16.00,
        image: 'https://picsum.photos/400/300?random=15',
        isVeg: false,
        availableQty: 8,
        ingredients: ['Spaghetti', 'Eggs', 'Pecorino', 'Guanciale', 'Pepper'],
        prepTime: '20 mins',
        calories: 700,
        portionSize: 'Plate'
      }
    ]
  }
];

export const MOCK_REQUESTS: CommunityRequest[] = [
  {
    id: 'r1',
    requesterName: 'Elderly Couple (Unit 4B)',
    location: 'Maple St',
    message: 'Unable to cook tonight due to illness. Any warm soup/bread would be appreciated.',
    urgency: 'HIGH',
    distance: '0.2 km',
    tags: ['Soup', 'Soft Food'],
    postedAt: '1h ago'
  },
  {
    id: 'r2',
    requesterName: 'New Mom (Sarah)',
    location: 'Oak Lane',
    message: 'Just back from hospital. Craving a healthy veg meal, no energy to cook.',
    urgency: 'MEDIUM',
    distance: '1.5 km',
    tags: ['Veg', 'Healthy'],
    postedAt: '3h ago'
  }
];
