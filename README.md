# 🌍 Weather Dashboard

A comprehensive, feature-rich weather dashboard built with Next.js 14, TypeScript, and modern web technologies that provides real-time weather data, forecasts, and environmental information for any city worldwide. The application features a beautiful, responsive design with multilingual support, location services, extensive weather analytics, and intelligent state persistence for seamless user experience.

## ✨ Features

### 🌤️ Core Weather Information

- **Real-time Weather Data**: Current temperature, humidity, wind speed, and detailed weather conditions
- **Feels Like Temperature**: Perceived temperature based on humidity and wind factors
- **Weather Icons**: Dynamic weather icons that change based on current conditions and time of day
- **Comprehensive Weather Details**: Pressure, visibility, cloud coverage, and atmospheric conditions

### 📅 Forecasting & Predictions

- **5-Day Weather Forecast**: Detailed hourly and daily weather predictions
- **Daily Forecast Widget**: Quick overview of upcoming weather patterns
- **Temperature Extremes**: Daily minimum and maximum temperature tracking
- **Precipitation Probability**: Rain and snow forecast with probability percentages

### 🌍 Location & Search

- **Global City Search**: Search for any city worldwide with autocomplete functionality
- **Geolocation Services**: Automatic location detection with user permission
- **Popular Cities**: Quick access to major cities (Istanbul, Ankara, London, Rome, Paris)
- **Search History**: Persistent storage of last 5 searched locations with clickable re-access
- **Last Selected City Persistence**: Remembers your last selected city across page refreshes
- **Smart Location Priority**: Prioritizes user's last choice over automatic geolocation

### 🌬️ Environmental Data

- **Air Quality Index**: Real-time air quality data with health recommendations
- **UV Index**: Current UV radiation levels with protection guidelines
- **Wind Information**: Wind speed, direction, and gust data with compass visualization
- **Atmospheric Pressure**: Current pressure readings with trend indicators

### 🌅 Astronomical Data

- **Sunrise & Sunset Times**: Daily solar events with countdown timers
- **Day Length Calculation**: Automatic calculation of daylight hours
- **Golden Hour Information**: Optimal photography and outdoor activity times

### 📊 Additional Metrics

- **Population Data**: City population information provided by UN data
- **Visibility Conditions**: Current visibility with descriptive classifications
- **Humidity Analysis**: Detailed humidity levels with comfort indicators

### 🎨 User Experience & Design

- **Fully Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dark/Light Theme Toggle**: Seamless theme switching with persistent preferences
- **Unit System Toggle**: Switch between Celsius (°C) and Fahrenheit (°F) with automatic conversion
- **Multilingual Support**: English and Turkish language support with easy switching
- **Smooth Animations**: Fluid transitions and loading states throughout the application
- **Modern UI Components**: Clean, intuitive interface with excellent information hierarchy
- **Weather Background**: Dynamic background that changes based on weather conditions and time
- **Persistent User Preferences**: All user choices are saved and restored on page reload

### �� Advanced Features

- **Error Handling**: Comprehensive error states for API failures and invalid searches
- **Loading States**: Skeleton loaders and progress indicators for better UX
- **Data Persistence**: Local storage for user preferences, search history, and last selected city
- **API Rate Limiting**: Intelligent handling of API rate limits and timeouts
- **Offline Support**: Graceful degradation when network connectivity is limited
- **State Management**: Advanced state persistence with Zustand and localStorage integration

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 14**: Latest version with App Router for optimal performance
- **React 18**: Modern React with concurrent features and hooks
- **TypeScript**: Full type safety throughout the application

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible, unstyled UI components
- **Lucide React**: Beautiful, customizable icons
- **Tailwind Merge**: Utility for merging Tailwind classes efficiently
- **Tailwind CSS Animate**: Smooth animations and transitions

### State Management & Data Fetching

- **Zustand**: Lightweight state management with persistence middleware
- **SWR**: Data fetching library with caching and revalidation
- **Axios**: HTTP client for API requests
- **localStorage Integration**: Persistent storage for user preferences and data

### Date & Time Handling

- **Moment.js**: Comprehensive date manipulation library
- **date-fns**: Modern date utility library

### Maps & Visualization

- **Leaflet**: Interactive maps for location visualization
- **React Leaflet**: React components for Leaflet integration

### Development Tools

- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefixing

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**: Required for Next.js 14 compatibility
- **npm, yarn, or pnpm**: Package manager of your choice
- **OpenWeatherMap API Key**: Free API key for weather data

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SinanUlusan/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
   ```

   **To get an API key:**

   1. Visit [OpenWeatherMap](https://openweathermap.org/)
   2. Sign up for a free account
   3. Navigate to your API keys section
   4. Copy your API key

   **Important:** The API key is required for the application to function. Without it, weather data will not load.

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 📱 Usage Guide

### Basic Navigation

1. **Search for a City**: Use the search bar in the top navigation to find any city worldwide
2. **View Current Weather**: See real-time temperature, humidity, wind speed, and conditions
3. **Toggle Units**: Switch between Celsius and Fahrenheit using the unit toggle
4. **Switch Themes**: Toggle between dark and light modes using the theme dropdown
5. **Change Language**: Switch between English and Turkish using the language selector

### Advanced Features

1. **Check Forecast**: View the 5-day weather forecast with hourly details
2. **Access History**: Click on recent searches to quickly access previous locations
3. **Location Services**: Allow location access for automatic weather data
4. **Environmental Data**: Monitor air quality, UV index, and other environmental metrics
5. **Popular Cities**: Quick access to major cities from the sidebar
6. **Persistent Experience**: Your last selected city is remembered across page refreshes

### Data Interpretation

- **Air Quality**: Color-coded indicators with health recommendations
- **UV Index**: Protection guidelines based on radiation levels
- **Wind Direction**: Compass visualization showing wind direction
- **Pressure Trends**: Indicators for weather pattern changes
- **Humidity Comfort**: Descriptive comfort levels for humidity

### Smart Persistence Features

- **Last Selected City**: The app remembers your last selected city and shows it on page refresh
- **Search History**: Your recent searches are saved and easily accessible
- **User Preferences**: Theme, language, and unit preferences are automatically saved
- **Location Priority**: Your manual city selection takes priority over automatic geolocation

## 🏗️ Project Architecture

### Directory Structure

```
weather-dashboard/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── weather/              # Current weather data endpoint
│   │   ├── fiveday/              # 5-day forecast endpoint
│   │   ├── geocoded/             # City search/geocoding endpoint
│   │   ├── pollution/            # Air quality data endpoint
│   │   └── uv/                   # UV index data endpoint
│   ├── Components/               # React Components
│   │   ├── AirPollution/         # Air quality display component
│   │   ├── DailyForecast/        # Daily forecast widget
│   │   ├── FeelsLike/            # Feels like temperature component
│   │   ├── FiveDayForecast/      # 5-day forecast component
│   │   ├── Humidity/             # Humidity display component
│   │   ├── LanguageSelector/     # Language switching component
│   │   ├── LocationPermission/   # Location permission handling
│   │   ├── Mapbox/               # Map integration component
│   │   ├── Navbar/               # Main navigation component
│   │   ├── Population/           # Population data component
│   │   ├── Pressure/             # Atmospheric pressure component
│   │   ├── SearchDialog/         # City search dialog
│   │   ├── SearchHistory/        # Search history component
│   │   ├── Sunset/               # Sunrise/sunset component
│   │   ├── Temperature/          # Main temperature display
│   │   ├── ThemeDropdown/        # Theme switching component
│   │   ├── UnitToggle/           # Unit system toggle
│   │   ├── UvIndex/              # UV index component
│   │   ├── UvProgress/           # UV progress visualization
│   │   ├── Visibility/           # Visibility conditions component
│   │   ├── WeatherBackground/    # Dynamic weather background
│   │   └── Wind/                 # Wind information component
│   ├── context/                  # React context providers
│   ├── hooks/                    # Custom React hooks
│   │   ├── useGeolocation.ts     # Geolocation hook
│   │   ├── useTranslation.ts     # Translation hook
│   │   └── useWeatherData.ts     # Weather data fetching hook
│   ├── locales/                  # Internationalization
│   │   ├── en.ts                 # English translations
│   │   ├── tr.ts                 # Turkish translations
│   │   └── index.ts              # Translation utilities
│   ├── Providers/                # App providers
│   │   ├── SWRProvider.tsx       # SWR configuration
│   │   └── ThemeProvider.tsx     # Theme context provider
│   ├── store/                    # State management
│   │   └── weatherStore.ts       # Zustand store with persistence
│   ├── types/                    # TypeScript type definitions
│   │   └── weather.ts            # Weather data types
│   ├── utils/                    # Utility functions
│   │   ├── defaultStates.tsx     # Popular cities data
│   │   ├── Icons.tsx             # Weather icon components
│   │   └── misc.tsx              # Miscellaneous utilities
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main page component
├── components/                   # Shared UI components
│   └── ui/                       # Radix UI components
├── lib/                          # Library configurations
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
└── Configuration files           # Various config files
```

### Key Components

#### Weather Components

- **Temperature**: Main temperature display with feels-like temperature
- **FiveDayForecast**: Comprehensive 5-day weather forecast
- **DailyForecast**: Quick daily weather overview
- **AirPollution**: Air quality index with health recommendations
- **UvIndex**: UV radiation levels with protection guidelines
- **Wind**: Wind speed, direction, and gust information
- **Humidity**: Humidity levels with comfort indicators
- **Pressure**: Atmospheric pressure with trend analysis
- **Visibility**: Current visibility conditions
- **Sunset**: Sunrise and sunset times with countdown
- **Population**: City population data from UN sources

#### UI Components

- **Navbar**: Main navigation with search, theme, language, and unit toggles
- **SearchDialog**: Advanced city search with autocomplete and persistence
- **SearchHistory**: Recent searches with clickable access and persistence
- **WeatherBackground**: Dynamic background based on weather and time
- **LocationPermission**: Geolocation permission handling

#### State Management

- **Zustand Store**: Centralized state management with localStorage persistence
- **SWR Hooks**: Data fetching with caching and revalidation
- **Custom Hooks**: Geolocation, translation, and weather data hooks
- **Persistence Layer**: Automatic saving of user preferences and selections

### API Integration

The application integrates with OpenWeatherMap API through Next.js API routes:

#### API Endpoints

- **`/api/weather`**: Current weather data for a location
- **`/api/fiveday`**: 5-day weather forecast
- **`/api/geocoded`**: City search and geocoding
- **`/api/pollution`**: Air quality data
- **`/api/uv`**: UV index information

#### Data Types

- **WeatherData**: Current weather information
- **FiveDayForecast**: Extended forecast data
- **AirQualityData**: Air quality metrics
- **UvIndexData**: UV radiation levels
- **GeoCodedCity**: City search results
- **SearchHistoryItem**: Search history entries

### Internationalization

The application supports multiple languages with a comprehensive translation system:

#### Supported Languages

- **English (en)**: Default language
- **Turkish (tr)**: Full Turkish translation

#### Translation Features

- **Dynamic Language Switching**: Real-time language changes
- **Comprehensive Coverage**: All UI elements translated
- **Contextual Translations**: Weather-specific terminology
- **Persistent Preferences**: Language choice saved locally

### State Persistence System

The application features a sophisticated state persistence system:

#### Persisted Data

- **Search History**: Last 5 searched cities with timestamps
- **Last Selected City**: The city the user last viewed weather for
- **User Preferences**: Theme (dark/light), language, and unit system
- **Location Permission**: User's geolocation permission status

#### Persistence Features

- **Automatic Saving**: All user interactions are automatically saved
- **Page Refresh Recovery**: Complete state restoration on page reload
- **Priority System**: Manual selections take priority over automatic geolocation
- **Error Handling**: Graceful fallback when localStorage is unavailable

## 🎨 Design System

### Color Scheme

- **Light Theme**: Clean, modern interface with subtle shadows
- **Dark Theme**: Dark backgrounds with high contrast text
- **Weather-Based Colors**: Dynamic color schemes based on weather conditions

### Typography

- **Responsive Font Sizes**: Scalable typography for all devices
- **Clear Hierarchy**: Well-defined text hierarchy for information
- **Readable Fonts**: Optimized for weather data display

### Component Design

- **Card-Based Layout**: Information organized in clear cards
- **Consistent Spacing**: Uniform spacing throughout the application
- **Interactive Elements**: Hover states and smooth transitions
- **Loading States**: Skeleton loaders and progress indicators

## 🔧 Configuration

### Environment Variables

```env
OPENWEATHERMAP_API_KEY=your_api_key_here
```

### Build Configuration

- **Next.js 14**: Latest features and optimizations
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling approach

### Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Optimized weather icons and images
- **API Caching**: SWR provides intelligent caching
- **Lazy Loading**: Components load only when needed
- **Bundle Optimization**: Minimal bundle size with tree shaking
- **State Persistence**: Efficient localStorage usage with error handling

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Set Environment Variables**: Add your OpenWeatherMap API key
3. **Deploy**: Vercel automatically builds and deploys on every push

### Other Deployment Options

- **Netlify**: Similar deployment process with environment variables
- **Railway**: Container-based deployment
- **Docker**: Containerized deployment option

## 🤝 Contributing

We welcome contributions to improve the Weather Dashboard!

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Set up environment variables
5. Make your changes
6. Test thoroughly
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Contribution Guidelines

- **Code Style**: Follow existing TypeScript and React patterns
- **Testing**: Ensure all features work across different devices
- **Documentation**: Update documentation for new features
- **Accessibility**: Maintain accessibility standards
- **Performance**: Consider performance implications of changes
- **State Management**: Follow existing persistence patterns for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap**: Weather data API provider
- **Radix UI**: Accessible UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Next.js Team**: Amazing React framework
- **React Community**: Continuous improvements and support
- **Zustand**: Lightweight state management library

## 📞 Support

For support, questions, or feature requests:

- **GitHub Issues**: Create an issue in the repository
- **Email**: Contact the development team
- **Documentation**: Check the inline code documentation

---

**Developed with ❤️ by Sinan Ulusan**

_Built with Next.js 14, TypeScript, and modern web technologies_
