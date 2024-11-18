export const CATEGORIES = [
  { id: 'bars', label: 'Bars & Pubs' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'attractions', label: 'Tourist Attractions' },
  { id: 'activities', label: 'Activities' },
  { id: 'shopping', label: 'Shopping' },
] as const;

export type Category = typeof CATEGORIES[number]['id'];

export const INITIAL_MESSAGE = "Hi! I'm your local guide. What would you like to discover today?";