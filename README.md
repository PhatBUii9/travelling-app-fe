# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## 🗓️ Week 2 – Select Cities & Places

### Goals

Build out the city + place selection flows and wire up our global planning context, then polish with skeleton loaders and consistent UI components.

### Day 1: `SelectCitiesScreen.tsx`

- **UI**: Full-screen list of mock cities
- **Selection**: Tapping a card highlights & stores in context
- **Nav**: “Continue” pushes to Pick Places screen

### Day 2: `SelectPlacesScreen.tsx`

- **Data**: Filter `mockPlaces` by name
- **UI**: Scrollable list of `PlaceCard`s
- **Selection**: Multi-select with checkmarks, stored in context
- **Nav**: “Continue” pushes to Date-range screen

### Day 3: State Management & Debugging

- **Persistence**: Verify selections survive screen hops
- **Context**: Refactored shape to include `currentCityId`, `places[]`
- **Debug**: (Planned) JSON dump screen for rapid QA
- **Loading**: Added `PlaceLoadingSkeleton` with fade-in animation

### Day 4: Component Polishing

- **Components**: Extracted `CityCard`, `PlaceCard`
- **Styling**: Unified spacing, borders, typography
- **UX**: Fade-in skeletons for polish
- **Docs**: ✔️ _This README section_

---
