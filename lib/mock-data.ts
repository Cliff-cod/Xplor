export interface Host {
  id: string;
  name: string;
  avatar: string;
  responseRate: number;
  joinedDate: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
  };
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  host: Host;
  amenities: string[];
  included: string[];
  maxGuests: number;
  duration: {
    value: number;
    unit: 'hours' | 'days';
  };
  reviews: Review[];
  availability: {
    startDate: string;
    endDate: string;
  };
}

export interface Review {
  id: string;
  experienceId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  experienceId: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  stripePaymentId?: string;
  travelerDetails?: {
    name: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
  createdAt: string;
}

export interface Listing {
  id: string;
  hostId: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
  };
  category: string;
  price: number;
  images: string[];
  amenities: string[];
  included: string[];
  maxGuests: number;
  duration: {
    value: number;
    unit: 'hours' | 'days';
  };
  status: 'draft' | 'active' | 'inactive';
  createdAt: string;
  views: number;
  bookings: number;
}

// Mock hosts
const mockHosts: Record<string, Host> = {
  host1: {
    id: 'host1',
    name: 'Marco Rossi',
    avatar: '/placeholder-user.jpg',
    responseRate: 98,
    joinedDate: '2022-01-15',
  },
  host2: {
    id: 'host2',
    name: 'Sophia Chen',
    avatar: '/placeholder-user.jpg',
    responseRate: 100,
    joinedDate: '2021-06-20',
  },
  host3: {
    id: 'host3',
    name: 'James O\'Connor',
    avatar: '/placeholder-user.jpg',
    responseRate: 97,
    joinedDate: '2023-03-10',
  },
  host4: {
    id: 'host4',
    name: 'Amara Okonkwo',
    avatar: '/placeholder-user.jpg',
    responseRate: 99,
    joinedDate: '2022-08-05',
  },
  host5: {
    id: 'host5',
    name: 'Sofia Garcia',
    avatar: '/placeholder-user.jpg',
    responseRate: 96,
    joinedDate: '2023-01-22',
  },
};

// Mock reviews
const mockReviews: Record<string, Review[]> = {
  exp1: [
    {
      id: 'review1',
      experienceId: 'exp1',
      userId: 'user1',
      userName: 'Alex Johnson',
      userAvatar: '/placeholder-user.jpg',
      rating: 5,
      comment:
        'Absolutely incredible experience! Marco was an amazing guide. The food was authentic and delicious.',
      createdAt: '2024-05-10',
    },
    {
      id: 'review2',
      experienceId: 'exp1',
      userId: 'user2',
      userName: 'Emma Wilson',
      userAvatar: '/placeholder-user.jpg',
      rating: 4,
      comment: 'Great tour, very informative. Highly recommend!',
      createdAt: '2024-04-28',
    },
  ],
  exp2: [
    {
      id: 'review3',
      experienceId: 'exp2',
      userId: 'user3',
      userName: 'Michael Brown',
      userAvatar: '/placeholder-user.jpg',
      rating: 5,
      comment: 'Best hiking experience ever. Sophia knows all the hidden gems.',
      createdAt: '2024-06-01',
    },
  ],
  exp3: [
    {
      id: 'review4',
      experienceId: 'exp3',
      userId: 'user4',
      userName: 'Lisa Park',
      userAvatar: '/placeholder-user.jpg',
      rating: 5,
      comment: 'Loved the cooking class! Learned so much from James.',
      createdAt: '2024-05-15',
    },
    {
      id: 'review5',
      experienceId: 'exp3',
      userId: 'user5',
      userName: 'David Santos',
      userAvatar: '/placeholder-user.jpg',
      rating: 4,
      comment: 'Fun experience, well organized.',
      createdAt: '2024-05-08',
    },
  ],
};

// Mock experiences
export const mockExperiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Italian Cooking Class in Rome',
    description:
      'Learn to cook authentic Italian dishes from a local chef in a traditional Roman kitchen. We will prepare 3 courses including homemade pasta, risotto, and tiramisu. All ingredients are locally sourced from the morning market.',
    location: {
      city: 'Rome',
      country: 'Italy',
    },
    category: 'Food',
    price: 89,
    rating: 4.8,
    reviewCount: 156,
    images: ['/exp1.png', 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80'],
    host: mockHosts.host1,
    amenities: ['Kitchen provided', 'All ingredients', 'Wine pairing', 'Recipe cards'],
    included: [
      'All ingredients and cooking equipment',
      '3-course meal preparation',
      'Wine or beverages',
      'Recipe cards to take home',
    ],
    maxGuests: 8,
    duration: {
      value: 3,
      unit: 'hours',
    },
    reviews: mockReviews.exp1 || [],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-12-31',
    },
  },
  {
    id: 'exp2',
    title: 'Mountain Hiking Adventure in Swiss Alps',
    description:
      'Experience breathtaking alpine scenery on this guided hiking tour through the Swiss Alps. Perfect for all fitness levels with stunning views of glaciers and mountain peaks.',
    location: {
      city: 'Interlaken',
      country: 'Switzerland',
    },
    category: 'Adventure',
    price: 120,
    rating: 4.9,
    reviewCount: 234,
    images: ['/exp2.png', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'],
    host: mockHosts.host2,
    amenities: ['Hiking boots provided', 'Packed lunch', 'Mountain guide', 'Safety equipment'],
    included: [
      'Professional mountain guide',
      'All safety equipment',
      'Packed lunch and beverages',
      'Transportation from town center',
    ],
    maxGuests: 10,
    duration: {
      value: 6,
      unit: 'hours',
    },
    reviews: mockReviews.exp2 || [],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-09-30',
    },
  },
  {
    id: 'exp3',
    title: 'French Pastry Making in Paris',
    description:
      'Master the art of French pastries from a professional pastry chef. Create croissants, éclairs, and macarons in our boutique kitchen in the heart of Paris.',
    location: {
      city: 'Paris',
      country: 'France',
    },
    category: 'Food',
    price: 105,
    rating: 4.7,
    reviewCount: 189,
    images: ['/exp3.png', 'https://images.unsplash.com/photo-1556206079-747a7a424d3d?auto=format&fit=crop&w=800&q=80'],
    host: mockHosts.host3,
    amenities: ['All ingredients', 'Pastry tools', 'Take-home box', 'Coffee and tea'],
    included: [
      'All ingredients and tools',
      'Take-home box for your creations',
      'Coffee, tea, and pastries',
      'Recipe booklet',
    ],
    maxGuests: 6,
    duration: {
      value: 3,
      unit: 'hours',
    },
    reviews: mockReviews.exp3 || [],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-12-31',
    },
  },
  {
    id: 'exp4',
    title: 'Safari in Serengeti, Tanzania',
    description:
      'Experience the magnificent wildlife of Serengeti National Park with an expert guide. Spot lions, elephants, giraffes, and more in their natural habitat.',
    location: {
      city: 'Serengeti',
      country: 'Tanzania',
    },
    category: 'Wildlife',
    price: 350,
    rating: 4.9,
    reviewCount: 412,
    images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80'],
    host: mockHosts.host4,
    amenities: ['Binoculars', 'Vehicle with roof opening', 'Meals', 'Professional guide'],
    included: [
      '4x4 safari vehicle',
      'Professional wildlife guide',
      'All meals and beverages',
      'Binoculars provided',
      'Park entrance fees',
    ],
    maxGuests: 6,
    duration: {
      value: 5,
      unit: 'days',
    },
    reviews: [],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-12-31',
    },
  },
  {
    id: 'exp5',
    title: 'Flamenco Dance Class in Barcelona',
    description:
      'Learn authentic flamenco dancing from a passionate instructor in the vibrant city of Barcelona. No prior experience needed.',
    location: {
      city: 'Barcelona',
      country: 'Spain',
    },
    category: 'Cultural',
    price: 65,
    rating: 4.6,
    reviewCount: 98,
    images: ['https://images.unsplash.com/photo-1504609774528-69473fb4f0fd?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'],
    host: mockHosts.host5,
    amenities: ['Dance studio', 'Music', 'Refreshments', 'Certificate'],
    included: ['Professional instruction', 'Dance studio use', 'Refreshments', 'Completion certificate'],
    maxGuests: 12,
    duration: {
      value: 2,
      unit: 'hours',
    },
    reviews: [],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-12-31',
    },
  },
  {
    id: 'exp6',
    title: 'Wine Tasting in Tuscany',
    description:
      'Discover the finest wines of Tuscany at a family-owned vineyard. Tour the vineyards and taste premium wines paired with local cheeses and meats.',
    location: {
      city: 'Chianti',
      country: 'Italy',
    },
    category: 'Food',
    price: 95,
    rating: 4.8,
    reviewCount: 267,
    images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'],
    host: mockHosts.host1,
    amenities: ['Wine tasting', 'Local cheese', 'Vineyard tour', 'Food pairing'],
    included: [
      'Guided vineyard tour',
      '5 wine tastings',
      'Local cheese and charcuterie board',
      'Souvenir wine glass',
    ],
    maxGuests: 20,
    duration: {
      value: 3,
      unit: 'hours',
    },
    reviews: [],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-12-31',
    },
  },
  {
    id: 'exp7',
    title: 'Kakum Canopy Walk Adventure',
    description:
      'Experience the breathtaking views of Kakum National Park from above! Walk on suspended bridges 40 meters above the rainforest floor, spotting rare birds, monkeys, and lush vegetation. This is a unique opportunity to witness the canopy ecosystem like never before. Our experienced guides will share fascinating insights about the forest\'s biodiversity and conservation efforts.',
    location: {
      city: 'Cape Coast',
      country: 'Ghana',
    },
    category: 'Adventure',
    price: 149,
    rating: 4.9,
    reviewCount: 312,
    images: [
      '/ghana-village.png',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390467-339e1455d35d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80',
    ],
    host: {
      id: 'host_ama',
      name: 'Ama Owusu',
      avatar: '/placeholder-user.jpg',
      responseRate: 99,
      joinedDate: '2021-03-15',
    },
    amenities: [
      'Professional guide',
      'Safety harness',
      'Bridge access',
      'Bird watching binoculars',
      'Photography stops',
      'Refreshments',
    ],
    included: [
      'Expert naturalist guide (speaks English, French, German)',
      'Safety equipment and harness',
      'Full park entry and canopy access',
      'Complimentary water and tropical fruits',
      'Official photography at viewpoints',
      'Conservation information pamphlet',
    ],
    maxGuests: 12,
    duration: {
      value: 3,
      unit: 'hours',
    },
    reviews: [
      {
        id: 'review_kakum_1',
        experienceId: 'exp7',
        userId: 'user_safari',
        userName: 'John Mitchell',
        userAvatar: '/placeholder-user.jpg',
        rating: 5,
        comment:
          'Absolutely breathtaking! Walking among the canopy was a surreal experience. Ama is an exceptional guide with incredible knowledge about the wildlife. Highly recommend for anyone visiting Ghana!',
        createdAt: '2024-06-15',
      },
      {
        id: 'review_kakum_2',
        experienceId: 'exp7',
        userId: 'user_adventure',
        userName: 'Sarah Chen',
        userAvatar: '/placeholder-user.jpg',
        rating: 5,
        comment:
          'Best adventure I had in West Africa! The bridges are well-maintained and the views are unbelievable. We saw so many birds and even spotted monkeys in the distance. Worth every penny!',
        createdAt: '2024-06-10',
      },
      {
        id: 'review_kakum_3',
        experienceId: 'exp7',
        userId: 'user_nature',
        userName: 'David Mensah',
        userAvatar: '/placeholder-user.jpg',
        rating: 5,
        comment:
          'Incredible experience with a passionate guide. Learned so much about the rainforest ecosystem and conservation work. The canopy walk is thrilling but safe. Would definitely book again!',
        createdAt: '2024-06-05',
      },
      {
        id: 'review_kakum_4',
        experienceId: 'exp7',
        userId: 'user_traveler',
        userName: 'Maria Rodriguez',
        userAvatar: '/placeholder-user.jpg',
        rating: 4,
        comment:
          'Amazing experience overall. The guide was very knowledgeable and safety was taken seriously. Only minor issue was the crowds, but that didn\'t diminish the experience. Highly recommended!',
        createdAt: '2024-05-28',
      },
    ],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-12-31',
    },
  },
];

export const categories = ['All', 'Food', 'Adventure', 'Cultural', 'Wildlife', 'Wellness'];

export const cities = [
  'Rome',
  'Paris',
  'Barcelona',
  'Florence',
  'Interlaken',
  'Serengeti',
  'Chianti',
  'London',
  'Amsterdam',
  'Tokyo',
];

export const getCurrentUser = () => {
  return {
    id: 'user_current',
    name: 'You',
    email: 'user@example.com',
    avatar: '/placeholder-user.jpg',
  };
};

export const getMockBookings = (): Booking[] => {
  return [
    {
      id: 'booking1',
      experienceId: 'exp1',
      userId: 'user_current',
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-15',
      guestCount: 2,
      status: 'confirmed',
      totalPrice: 178,
      travelerDetails: {
        name: 'You',
        email: 'user@example.com',
        phone: '+1 (555) 123-4567',
      },
      createdAt: '2024-06-01',
    },
    {
      id: 'booking2',
      experienceId: 'exp2',
      userId: 'user_current',
      checkInDate: '2024-08-20',
      checkOutDate: '2024-08-20',
      guestCount: 1,
      status: 'confirmed',
      totalPrice: 120,
      travelerDetails: {
        name: 'You',
        email: 'user@example.com',
        phone: '+1 (555) 123-4567',
      },
      createdAt: '2024-05-15',
    },
  ];
};

export const getMockHostListings = (hostId: string): Listing[] => {
  return [
    {
      id: 'listing1',
      hostId,
      title: 'Italian Cooking Class in Rome',
      description: 'Learn to cook authentic Italian dishes',
      location: { city: 'Rome', country: 'Italy' },
      category: 'Food',
      price: 89,
      images: ['/exp1.png'],
      amenities: ['Kitchen provided', 'All ingredients', 'Wine pairing'],
      included: ['All ingredients', '3-course meal', 'Wine'],
      maxGuests: 8,
      duration: { value: 3, unit: 'hours' },
      status: 'active',
      createdAt: '2024-01-15',
      views: 1234,
      bookings: 45,
    },
    {
      id: 'listing2',
      hostId,
      title: 'Wine Tasting in Tuscany',
      description: 'Premium wine tasting at family vineyard',
      location: { city: 'Chianti', country: 'Italy' },
      category: 'Food',
      price: 95,
      images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80'],
      amenities: ['Wine tasting', 'Food pairing', 'Vineyard tour'],
      included: ['5 wine tastings', 'Cheese board', 'Glass'],
      maxGuests: 20,
      duration: { value: 3, unit: 'hours' },
      status: 'active',
      createdAt: '2024-02-10',
      views: 892,
      bookings: 32,
    },
  ];
};
