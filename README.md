# Fishing Game

Welcome to the **Fishing Game**! This project simulates a fishing game where users can create accounts, buy fishing rods, complete challenges to earn skillpoints, and purchase better rods as they progress.

## Table of Contents
1. [Setup](#setup)
2. [Endpoints](#endpoints)
   - [Create User](#create-user)
   - [User login](#login)
   - [Profile](#profile)
   - [View Rods Shop](#view-rods-shop)
   - [Complete Challenges](#complete-challenges)
   - [Create Challenges](#create-challenges)
   - [Purchase Rod](#purchase-rod)
   - [Start Fishing](#start-fishing)
   - [View Fishes](#view-fishes)
   - [View owned rods](#view-owned-rods)
   - [View Fishes owned](#view-fishes-owned)
3. [Gameplay Overview](#gameplay-overview)

---

## Setup
Make sure you have the following installed:
- Node.js
- A MySQL database (to store users, rods, and challenges data)

### Installation
1. Clone this repository.
2. Install dependencies using:
   ```bash
   npm install
   ```
3. Set up your database with the appropriate schema (users, rods, userrods, challenges).
4. Run the server:
   ```bash
   npm run dev
   ```
5. The game will be available at `http://localhost:3000`.

---

## Endpoints

### Create User
`http://localhost:3000/register.html`

Create a new user with a unique username.

---

### Login
`http://localhost:3000/login.html`

Login to your user

---

### Profile
`http://localhost:3000/profile.html`

Basic information about your profile

---

### Complete Challenges
`http://localhost:3000/challenges.html`

Complete challenges to earn skillpoints.

---

### Create Challenges

`http://localhost:3000/createchallenge.html`

Create challenges for other users to complete and earn skillpoints

---
### View Rods Shop
`http://localhost:3000/rods.html`

View all the rods that could be purchased in the shop.

---

### Purchase Rod
`http://localhost:3000/rods.html`

Purchase a rod by clicking on the rod that you want to purchase.

---

### View Fishes
`http://localhost:3000/backpack.html`

View all fishes in the database.

---

### View owned rods
`http://localhost:3000/userrods.html`

View all the rods owned by each user

---

### Start fishing
`http://localhost:3000/fishing.html`

Start fishing by selecting the user that is fishing and the rod that is used to fish

---

### View Fishes owned
`http://localhost:3000/backpack.html`

View fishes that users caught.


## Gameplay Overview
1. **Create a User**:
   Start by creating a user account with a unique username.

2. **View Rods Shop**:
   Explore the available rods in the shop to decide your next purchase.

3. **Complete Challenges**:
   Earn skillpoints by completing challenges. Use these points to buy better rods.

4. **Buy Rods**:
   Spend your skillpoints on rods with higher durability to improve your fishing experience.

5. **View your rods**
   View rods that each user owns

6. **Start fishing**
   Fish using the rods that you own

6. **View fishes caught**
   View fishes that you have caught

7. **Get better rods**
   Complete more challenges to unlock better rods and catch more fishes!
---


## Notes
- The `skillpoints` system is vital for progression; complete challenges to earn more points.
- Read `http://localhost:3000/howtoplay.html` for general information about the game.

Enjoy the fishing game!


