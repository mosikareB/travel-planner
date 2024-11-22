# Travel Planner

## 🌐 Overview

Welcome to the **Travel Planner Website** ! This project is a web-based application that helps users plan their trips effortlessly. By using the user's location as input, it interacts with the backend through the Gemini API to suggest exciting destinations and places of interest. Additionally, the Google Maps API is utilized to provide route guidance, ensuring a smooth and enjoyable travel experience.

### 🛠️ Tech Stack

- **Frontend** : React
- **Backend** : Next.js + Mongoose
- **APIs Used** :
  - **Gemini API** : For suggesting travel destinations and plans.
  - **Google Maps API** : For route guidance and navigation assistance.

### ⚙️ Sample Architecture

![Sample Architecture](https://i.postimg.cc/L5hKZ9s1/architecture.jpg)

## 📋 Features

- **User Location Input** : Automatically detects or allows manual entry of the user's current location.
- **Travel Suggestions** : Fetches recommended places and destinations using the Gemini API based on the user's location.
- **Trip Planning** : Provides detailed trip plans including points of interest, estimated times, and travel advice.
- **Route Guidance** : Uses Google Maps API to guide users with the best routes to their desired destinations.
- **Interactive Map** : Displays selected routes and destinations on an interactive Google Map.
- **Responsive Design** : A clean and intuitive interface that works across various devices.

## 🚀 Getting Started

### Prerequisites

To run this project locally, ensure you have:

- **Node.js** installed (for a simple HTTP server setup if needed).
- **API Keys** for:
  - [Gemini API]()
  - [Google Maps API]()
  - [NextAuth Secret]()
  - [Google Client ID]()
  - [Google Client Secret]()

### Installation

1. Clone the repository:

```shell
  git clone https://github.com/psidh/travel-planner.git
```

2. Navigate to the Project Directory:

```shell
  cd travel-planner
```

3. Install the required dependencies:

```shell
  npm install
```

4. Move environment variables to `.env.local`:

```shell
  mv .env.EXAMPLE .env.local
```

## 👥 Team

- [P. Sidharth](https://github.com/psidh)
- [Pradeep Varma](https://github.com/pvarma-05)
- [U. Jayadhar](https://github.com/U-Jayadhar)
- [Bokang Mosikare](https://github.com/mosikareB)
