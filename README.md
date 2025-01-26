# Fishing Game

Welcome to the **Fishing Game**! This project simulates a fishing game where users can create accounts, buy fishing rods, complete challenges to earn skillpoints, and purchase better rods as they progress.

## Table of Contents
1. [Setup](#setup)
2. [Endpoints](#endpoints)
   - [Create User](#create-user)
   - [View Rods Shop](#view-rods-shop)
   - [Complete Challenges](#complete-challenges)
   - [Purchase Rod](#purchase-rod)
   - [Start Fishing](#start-fishing)
   - [View Fishes](#view-fishes)
   - [View owned rods](#view-owned-rods)
   - [View Fishes owned](#view-fishes-owned)
3. [Gameplay Overview](#gameplay-overview)
4. [Example Usage](#example-usage)

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
   npm start
   ```
5. The game will be available at `http://localhost:3000`.

---

## Endpoints

### Create User
**POST** `http://localhost:3000/users`

Create a new user with a unique username.

#### Request Body:
```json
{
  "username": "socuser321"
}
```

#### Response:
- **Success**: 201 Created
- **Error**: Username already exists

---

### Complete Challenges
**POST** `http://localhost:3000/challenges/:challenge_id`

Complete challenges to earn skillpoints.

#### Request Body:
```json
{
  "user_id": 1,
  "completed": true,
  "creation_date": "2024-11-30",
  "notes": "A fitter me!"
}
```

#### Response:
- **Success**: 200 OK - Skillpoints awarded
- **Error**: 404 Not Found - User or Challenge does not exist

---
### View Rods Shop
**GET** `http://localhost:3000/rods`

Retrieve the list of available rods in the shop.

#### Example Response:
```json
[
  {"rod_id": 1, "rod_name": "Basic Rod", "durability": 50, "required_skillpoints": 0},
  {"rod_id": 2, "rod_name": "Advanced Rod", "durability": 150, "required_skillpoints": 100},
  {"rod_id": 3, "rod_name": "Master Rod", "durability": 200, "required_skillpoints": 150},
  {"rod_id": 4, "rod_name": "Steady Rod", "durability": 300, "required_skillpoints": 200},
  {"rod_id": 5, "rod_name": "Nocturnal Rod", "durability": 700, "required_skillpoints": 400},
  {"rod_id": 6, "rod_name": "Mythical Rod", "durability": 1000, "required_skillpoints": 500}
]
```

---

### Purchase Rod
**POST** `http://localhost:3000/rods/purchase/:rod_id`

Purchase a rod by providing the username and specifying the rod ID.

#### Request Body:
```json
{
  "username": "socuser321"
}
```

#### Response:
- **Success**: 201 Created - `"Rod successfully purchased"`
- **Error**: 402 Payment Required - Not enough skillpoints
- **Error**: 404 Not Found - Rod does not exist or already owned

---

### View Fishes
**GET** `http://localhost:3000/backpack`

View all fishes in the database.

#### Example Response:
```json
[
    {
        "fish_id": 1,
        "fish_name": "Golden Carp",
        "size": 15
    },
    {
        "fish_id": 2,
        "fish_name": "Silver Trout",
        "size": 10
    },
    {
        "fish_id": 3,
        "fish_name": "Black Bass",
        "size": 20
    },
    {
        "fish_id": 4,
        "fish_name": "Greenwater Shiner",
        "size": 5
    },
    {
        "fish_id": 5,
        "fish_name": "Rustscale Tilapia",
        "size": 13
    },
    {
        "fish_id": 6,
        "fish_name": "Silverstream Minnow",
        "size": 6
    }
]
```

---

### View owned rods
**GET** `http://localhost:3000/userrods`

View all rods that users own

#### Example Response:
```json
[
    {
        "user_rod_id": 1,
        "user_id": 1,
        "username": "socuser321",
        "rod_id": 2,
        "rod_name": "Advanced Rod",
        "durability": 120
    }
]
```
---

### Start fishing
**POST** `http://localhost:3000/fishing/:user_id/:rod_id`

Start fishing by selecting the user that is fishing and the rod that is used to fish

#### Response:
- **Success**: 201 Created - `"message: You have caught a fish! Fish caught:[fish_name]"`
- **Error**: 404 Not Found - You don't own a rod, go buy one.

---

### View Fishes owned
**GET** `http://localhost:3000/backpack`

View fishes that the user had caught

#### Example Response:
```json
[
    {
        "id": 1,
        "user_id": 1,
        "username": "socuser321",
        "fish_id": 2,
        "fish_name": "Silver Trout",
        "size": 10
    },
    {
        "id": 2,
        "user_id": 1,
        "username": "socuser321",
        "fish_id": 18,
        "fish_name": "Bristleback Pike",
        "size": 20
    },
    {
        "id": 3,
        "user_id": 1,
        "username": "socuser321",
        "fish_id": 13,
        "fish_name": "Goldencrest Barb",
        "size": 12
    }
]
```


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

## Example Usage

### 1. Create a User
**POST** `http://localhost:3000/users`
```json
{
  "username": "user123"
}
```

### 2. Complete a Challenge
**POST** `http://localhost:3000/challenges/1`
```json
{
  "user_id": 1,
  "completed": true,
  "creation_date": "2024-11-30",
  "notes": "Caught my first fish!"
}
```

### 3. View Rods Shop
**GET** `http://localhost:3000/rods`


### 4. Purchase a Rod
**POST** `http://localhost:3000/rods/purchase/1`
```json
{
  "username": "socuser321"
}
```

### 5. View rods owned(userrods)
**GET** 
`http://localhost:3000/userrods`


### 5. Start fishing
**POST** 
`http://localhost:3000/fishing/:user_id/:rod_id`

### 5. View fishes caught
**GET**
`http://localhost:3000/backpack`
---


## Notes
- Ensure all data sent matches the expected structure to avoid errors.
- The `skillpoints` system is vital for progression; complete challenges to earn more points.

Enjoy the fishing game!


