# Travel Planner Website

## 🌐 Overview

Welcome to the  **Travel Planner Website** ! This project is a web-based application that helps users plan their trips effortlessly. By using the user's location as input, it interacts with the backend through the Gemini API to suggest exciting destinations and places of interest. Additionally, the Google Maps API is utilized to provide route guidance, ensuring a smooth and enjoyable travel experience.

### 🛠️ Tech Stack

* **Frontend** : HTML, CSS, JavaScript
* **Backend** : Node.js, Express.js
* **APIs Used** :
  * **Gemini API** : For suggesting travel destinations and plans.
  * **Google Maps API** : For route guidance and navigation assistance.

### ⚙️ Sample Architecture

![Sample Architecture](https://i.postimg.cc/L5hKZ9s1/architecture.jpg)

## 📋 Features

* **User Location Input** : Automatically detects or allows manual entry of the user's current location.
* **Travel Suggestions** : Fetches recommended places and destinations using the Gemini API based on the user's location.
* **Trip Planning** : Provides detailed trip plans including points of interest, estimated times, and travel advice.
* **Route Guidance** : Uses Google Maps API to guide users with the best routes to their desired destinations.
* **Interactive Map** : Displays selected routes and destinations on an interactive Google Map.
* **Responsive Design** : A clean and intuitive interface that works across various devices.

## 🚀 Getting Started

### Prerequisites

To run this project locally, ensure you have:

* **Node.js** installed (for a simple HTTP server setup if needed).
* **API Keys** for:
  * [Gemini API]()
  * [Google Maps API]()

### Installation

1. Clone the repository:

```shell
  git clone https://github.com/psidh/travel-planner.git
```

2. Navigate to the Project Directory:

```shell
  cd travel-planner
```

3. Set Up API Keys:

* Add your API keys:

  ```shell

  ```

4. Run the Project:

```shell

```

## 🗺️ Usage

1. **Get User Location** :
   * The website will attempt to get the user's current location using the browser.
   * Alternatively, users can manually input their location.
2. **Fetch Travel Suggestions** :
   * The user's location will be sent to the backend using the Gemini API to get suggestions for destinations.
3. **View Routes** :
   * Suggested locations will be shown on the map, and users can get step-by-step route guidance through Google Maps.

## 📂 Project Structure

```
📁 travel-planner
|-- 📁 Frontend
|   |-- 📁 .github
|       |-- 📁 workflows
|           |__ static.yml
|   |-- index.html
|   |-- about.html
|   |-- styles.css
|   |__ script.js
|-- 📁 Backend
|   |-- server.js
|   |-- package-lock.json
|   |-- package.json
|__ README.md
```

## 💻 API Integration

## 📸 Screenshots

### Home Page

### About Page

## 👥 Team

* [P. Sidharth](https://github.com/psidh)
* [Pradeep Varma](https://github.com/pvarma-05)
* [U. Jayadhar](https://github.com/U-Jayadhar)
* [Bokang Mosikare](https://github.com/mosikareB)
