VidyaVerse frontend structure

components/  Shared interface pieces: navigation, footer, layouts, and room cards
context/     Authentication, favourites persistence, and light/dark theme state
data/        Demo room data used if the API is unavailable
pages/       One file per route or screen for easy redesign
services/    API client and authorization interceptor
App.jsx      Central route configuration
main.jsx     Application providers and React bootstrap
styles.css   Shared responsive VidyaVerse design system
