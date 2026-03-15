# tripp

Animated travel onboarding flow built in React Native. Three slides, scroll-driven transitions, and a custom dot indicator that interpolates size and opacity based on scroll position. No third-party animation library — just the React Native Animated API.

[![React Native](https://img.shields.io/badge/React%20Native-0.71-61DAFB?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org/)

---

## What's in it

Single onboarding screen with:
- Horizontal scroll between 3 full-screen slides
- `scrollX` Animated value driving dot indicator interpolation per frame
- Dots expand and contract proportionally as you scroll, no snap required
- CTA button switches from "Skip" to "Let's Go" on the last slide

```tsx
const dotWidth = scrollX.interpolate({
  inputRange: [(index - 1) * width, index * width, (index + 1) * width],
  outputRange: [8, 20, 8],
  extrapolate: 'clamp',
})
```

## Stack

React Native 0.71, TypeScript, React Navigation (Stack), React Native Reanimated, react-native-safe-area-context

## Structure

```
tripp/
├── app/
│   └── screens/
│       └── Onboarding/
│           └── Onboarding.tsx
├── constants/
│   └── theme.ts
├── App.tsx
└── package.json
```

## Run it

```bash
git clone https://github.com/ifeanyimuogbo/tripp.git
cd tripp
npm install

# iOS
npx pod-install && npx react-native run-ios

# Android
npx react-native run-android
```
