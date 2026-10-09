# 🛒 Bazar Dor — Daily Market Price Tracker

Bazar Dor is a web application that helps users explore daily market prices of essential commodities in Bangladesh. Users can browse products, compare price changes, search for items, and explore market-related information through a simple and responsive interface.

## ✨ Features

* **Daily Market Prices:** Explore prices of essential daily commodities.
* **Price Change Tracking:** View products with increased or decreased prices.
* **Product Search:** Search for products by name.
* **Category Navigation:** Browse products by category.
* **Market Information:** Explore market-wise price details where available.
* **Product Statistics:** View summaries of products, included markets, and categories.
* **Responsive Design:** Access the application on desktop, tablet, and mobile devices.
* **Authentication:** Includes sign-in and user menu functionality.
* **Bangla Interface:** Provides a user-friendly experience for Bangla-speaking users.

## 🛠️ Tech Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **UI:** React, Tailwind CSS, DaisyUI
* **Routing:** Next.js App Router
* **Database ORM:** Drizzle ORM
* **Data Source:** Bazar Dor API
* **Package Manager:** npm
* **Version Control:** Git and GitHub

## 📁 Project Structure

```text
bazar-dor/
├── app/              # Pages and application routes
├── components/       # Reusable UI components
├── drizzle/          # Database-related files
├── lib/              # API utilities and shared helpers
├── public/           # Static assets
├── package.json      # Dependencies and scripts
├── next.config.ts    # Next.js configuration
└── README.md         # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/najmuntushi-hue/bazar-dor.git
```

**2. Navigate to the project directory**

```bash
cd bazar-dor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and add the environment variables required by your API, authentication, and database configuration.

Use the variable names specified in your project configuration. Never commit passwords, API secrets, or database credentials.

**5. Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📜 Available Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start the development server                |
| `npm run build` | Build the application for production        |
| `npm run start` | Start the production server                 |
| `npm run lint`  | Run lint checks if the script is configured |

## 🎯 Project Goals

* Make daily commodity prices easier to explore.
* Help users compare market prices and price changes.
* Organize essential products into accessible categories.
* Provide a clean, responsive, and user-friendly interface.

## 👩‍💻 Author

**Najmun Nahar**

* GitHub: [@najmuntushi-hue](https://github.com/najmuntushi-hue)

## 📄 License

This project was developed for educational and project-learning purposes. Add a specific open-source license if you intend to distribute it under one.
