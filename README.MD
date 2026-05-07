# Unit Converter

A modern and responsive Unit Converter application built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

The application provides fast and accurate real-time conversions across multiple categories with a clean UI, responsive layout, and robust validation handling.

---

# Features

- Real-time unit conversion
- 7 conversion categories
  - Length
  - Weight
  - Temperature
  - Volume
  - Speed
  - Area
  - Data
- Responsive mobile-first UI
- Same-unit prevention logic
- Swap units functionality
- Copy-to-clipboard support
- Formula preview bar
- Input validation and error handling
- Scientific notation for very large/small values
- Accessible UI with keyboard navigation support

---

# Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

---

# Folder Structure

```txt
.
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── converter
│   ├── ui
│   └── theme-provider.tsx
│
├── hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib
│   ├── converter
│   └── utils.ts
│
├── public
├── styles
│   └── globals.css
│
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd unit-converter
```

Install dependencies:

```bash
npm install
```

---

# Available Scripts

## Run Development Server

```bash
npm run dev
```

Starts the application in development mode.

---

## Build Production App

```bash
npm run build
```

Creates an optimized production build.

---

## Start Production Server

```bash
npm run start
```

Runs the production build locally.

---

## Run ESLint

```bash
npm run lint
```

Checks the project for linting issues.

---

# Validation Rules

- Multiple decimal values are rejected
- Leading zeros are restricted
- Same-unit conversion is prevented
- Extremely large values are validated
- Negative values are restricted for non-temperature categories
- Temperature supports negative values down to absolute zero (-273.15°C)

---

# Temperature Handling

Negative temperature values are supported because temperatures can exist below the freezing point of water (0°C).

The application supports:
- Celsius
- Fahrenheit
- Kelvin

Absolute zero validation is included to prevent invalid temperature calculations below:
- `-273.15°C`
- `0K`

---

# Performance Optimizations

- Memoized calculations using `useMemo`
- Optimized callbacks using `useCallback`
- Reusable conversion engine
- Lightweight component architecture
- System font stack for improved build stability

---

# Deployment

The application can be deployed easily using:

- Vercel

---

# License

This project is developed for educational and assessment purposes.