# Critter Explorer Frontend - Original 2023 🦋

Welcome to **Critter Explorer**, the original version of a web app designed to enhance your Animal Crossing experience! 🌍✨ This documentation details the features, usage, and planned improvements for the original 2023 frontend.

---

## Table of Contents
1. [What is Critter Explorer?](#1-what-is-critter-explorer-)
2. [Features](#2-features-)
3. [How to Use the App](#3-how-to-use-the-app-)
4. [Design & Layout](#4-design--layout-)
5. [Planned Enhancements](#5-planned-enhancements-)
6. [Troubleshooting](#6-troubleshooting-)
7. [Links to the App](#7-links-to-the-app-)

---

### 1. What is Critter Explorer? 🐞
**Critter Explorer** is a simple app for Animal Crossing fans. It helps you find critters in the game like bugs based on the date and time for your selected city. You can also view real-life images of each critter 🌸.

---

### 2. Features 🌟
- **City-Based Availability**: Enter a city to check when critters are available based on real-world date and time.  
- **Real-Life Image Gallery**: Explore Flickr images of the critters you love.  
- **Interactive Critter Details**: View critter information, including availability and photos, in a responsive modal.  
- **Simple Design**: Easy to use, even on mobile devices.  

---

### 3. How to Use the App 💻
1. Search for a city using the search bar to set the location.  
2. Browse the list of available bugs for that location and time.  
3. Click on a critter to open a modal with its availability details and real-world images 🦋.  

---

### 4. Design & Layout 🎨
Critter Explorer’s design takes cues from Animal Crossing for a familiar look and feel. Key design features include:

- **Interactive Elements**: Includes modals for critter details, a city search bar, and a gallery of real-world images.  
- **Critter Modal**: Displays critter availability for both hemispheres, active times, and a gallery of Flickr images for each critter.  
- **Real-World Gallery**: Fetches and displays Flickr images to show real-life counterparts of in-game critters.  

---

### 5. Planned Enhancements 🚀
The following features were planned but not yet implemented in this version:

1. **Adding More Critter Types**  
   Expand critter data to include fish and sea creatures, with corresponding filtering options.  

2. **Improved Image Search**  
   Refine Flickr queries to reduce unrelated images in the gallery for critters with common names (e.g., "walking stick" showing mobility aids instead of the insect).  

3. **Dynamic Filtering**  
   Add the ability to filter critters by type (bug, fish, sea creature) and time of availability.  

4. **Availability Dial**  
   Introduce a time dial to visually represent critter availability hours.  

5. **Mobile-First Improvements**  
   Further refine the layout for smaller screens to ensure a consistent, user-friendly experience.  

---

### 6. Troubleshooting 🔧
- **Slow Loading**: The backend is on the free tier of Render, so it may take around 1 minute to start. If it loads slowly, check the [**Backend Link**](https://critter-explorer-backend.onrender.com/) to see if it’s active

---

### 6. Deployment & Hosting 🌍

The backend is currently hosted on [**Render**](https://render.com/), which is simple and free for small projects but can sometimes be slow, especially when scaling up. It takes approximately 50 seconds to scale up on the free tier.

Previously, the app used [**AWS**](https://aws.amazon.com/) with **S3** for the frontend and **Docker** on **EC2** for the backend. This setup was scalable but was retired when the university AWS account ended.

---

### 7. Links to the App 🔗
- **Frontend (2023)**: [Critter Explorer Frontend](https://critter-explorer-original2023.netlify.app/)
- **Backend (2023)**: [Critter Explorer Backend](https://critter-explorer-backend-original2023.onrender.com/)


Want to see current version? Check out the NEW frontend and backend:
- **NEW Frontend**: [Critter Explorer Frontend - New Version](https://critter-explorer.netlify.app/)
- **NEW Backend**: [Critter Explorer Backend - New Version](https://critter-explorer-backend.onrender.com/)

---

Thank you for exploring the **Critter Explorer Backend - Original 2023**! 🦋✨
