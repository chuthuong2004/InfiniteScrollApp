# Infinite Scroll App

## Installation & Setup

### Prerequisites

* Node.js (>= 16.x)
* npm (>= 8.x) or yarn (>= 1.x)
* React Native CLI

### Steps to Install

1. Clone the repository:
   ```sh
   git clone https://github.com/chuthuong2004/InfiniteScrollApp.git
   cd InfiniteScrollApp
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   cd ios && pod install
   cd ..
   ```
3. Run the project on an emulator or physical device:
   ```sh
   npm run android # or yarn android  # For Android
   npm run ios # or yarn ios      # For iOS
   ```

## Additional Libraries Used

### **MMKV** (for local storage)

* Instead of using AsyncStorage, we use **MMKV** because:
  * **Faster** : MMKV is written in C++ and provides significantly better performance than AsyncStorage.
  * **Efficient memory usage** : Data is stored in memory and persists across app restarts.
  * **Supports encryption** : Provides better security for sensitive data.

### **SWR** (for API data fetching)

* SWR is used for handling API requests because:
  * **Automatic revalidation** : It keeps data fresh by refetching automatically.
  * **Performance optimization** : Caches data efficiently and avoids redundant requests.
  * **Built-in support for pagination & infinite loading** .

## Approach to State Management & API Calls

### **State Management**

* We use **local state** for UI-related interactions (e.g., toggling modals, button states).
* **MMKV** is used to persist user preferences (e.g., favorite products).
* **SWR** is used to manage server-side state and cache API responses.

### **Handling API Calls**

* API requests are handled using **SWR** combined with a custom `usePagination` hook.
* This approach ensures:
  * **Efficient caching** : Avoids unnecessary API calls.
  * **Real-time updates** : Uses background revalidation to keep data fresh.
  * **Automatic pagination handling** .

### **Performance Optimizations**

* **FlatList optimizations** :
* Uses `keyExtractor` for efficient rendering.
* Implements `onEndReachedThreshold` to fetch more data only when necessary.
* **Memoization & useCallback** :
* Components like `ProductItem` use `React.memo()` to prevent unnecessary re-renders.
* `useCallback` ensures functions are not recreated on each render.
* **Efficient re-rendering** :
* `useFavorite` hook ensures only necessary UI updates occur when toggling favorites.

## Custom Hooks

### useDebounce

* Debounces a value change over a given delay to prevent unnecessary function calls (e.g., API requests on every keystroke).

### useSearch

* Manages the search state and debounced search value for handling search input efficiently.

### useFavorite

* Stores and manages favorite products using MMKV for fast and efficient data storage.

### `useNetworkInternet`

* Detects and manages internet connectivity status using `react-native-net-info` to handle offline scenarios effectively.

## Features

- Displays a **list of products** with image, title, and price.
- Supports **pagination and infinite scrolling**.
- Users can **search** for products using a debounced search field.

### ❤️ Favorite Products

- Users can **add/remove favorite products**.
- Favorites are stored using **MMKV for faster access**.

### 🎭 Swipe to Favorite/Unfavorite

- **New Feature**: Swipe **left or right** on a product to toggle favorite status.
  - If **already favorited** → Swipe removes from favorites (red background).
  - If **not favorited** → Swipe adds to favorites (green background).
- Implemented using `react-native-gesture-handler` for **smooth swipe interactions**.

## Running Tests

To run unit tests:

```sh
npm test  # or yarn test
```

---

This README provides a quick overview of the project setup, dependencies, state management approach, and performance optimizations. 🚀
