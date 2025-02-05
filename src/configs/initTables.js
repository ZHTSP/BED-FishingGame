const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

      const SQLSTATEMENT = `
      DROP TABLE IF EXISTS User;

      DROP TABLE IF EXISTS FitnessChallenge;

      DROP TABLE IF EXISTS UserCompletion;
      DROP TABLE IF EXISTS Rods;
      DROP TABLE IF EXISTS userRods;
      DROP TABLE IF EXISTS Fish;
      DROP TABLE IF EXISTS UserFishRelationship;
      DROP TABLE IF EXISTS Backpack;
      DROP TABLE IF EXISTS Reviews;

      CREATE TABLE Reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        review_amt INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      INSERT INTO Reviews (review_amt, user_id) VALUES
        (5, 1),
        (4, 2),  
        (3, 3);

        
      CREATE TABLE User (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username TEXT,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        skillpoints INT NOT NULL DEFAULT 0
        );

        CREATE TABLE UserFishRelationship (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          fish_id INT NOT NULL
          );

      CREATE TABLE FitnessChallenge (
        challenge_id INT AUTO_INCREMENT PRIMARY KEY,
        creator_id INT NOT NULL,
        challenge TEXT NOT NULL,
        skillpoints INT NOT NULL
      );

      CREATE TABLE UserCompletion (
        complete_id INT AUTO_INCREMENT PRIMARY KEY,
        challenge_id INT NOT NULL,
        user_id INT NOT NULL,
        completed BOOL NOT NULL,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT
      );

      INSERT INTO FitnessChallenge (challenge_id, creator_id, challenge, skillpoints) VALUES
      (1, 1, "Complete 2.4km within 15 minutes", 50),
      (2, 1, "Cycle around the island for at least 50km", 100),
      (3, 2, "Complete a full marathon (42.2km)", 200),
      (4, 2, "Hold a plank for 5 minutes", 50),
      (5, 2, "Perform 100 push-ups in one session", 75),
      (6, 3, "Touch grass for 30 minutes", 150);


      CREATE TABLE Rods (
        rod_id INT AUTO_INCREMENT PRIMARY KEY,
        rod_name TEXT,
        durability INT DEFAULT 100,
        required_skillpoints INT NOT NULL
      );

      CREATE TABLE Fish (
        fish_id INT AUTO_INCREMENT PRIMARY KEY,
        fish_name TEXT,
        size INT
      );

      CREATE TABLE UserRods (
        user_rod_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        rod_id INT NOT NULL,
        durability INT NOT NULL
      );

      CREATE TABLE Backpack (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        fish_id INT NOT NULL
      );

      INSERT INTO User (username, email, password, skillpoints) VALUES
      ('admin', 'a@a.com', '${hash}', 999999),
      ('sai yong', 'saiyong@hotmail.com', '${hash}', 230),
      ('john doe', 'john@joemail.com', '${hash}', 666),
      ('scouser123', 'scouser@scousermail.com', '${hash}', 0);

      INSERT INTO Rods (rod_id, rod_name, durability, required_skillpoints) VALUES
      (1, "Basic Rod", 50, 0),
      (2, "Advanced Rod", 150, 50),
      (3, "Master Rod", 200, 100),
      (4, "Steady Rod", 300, 150),
      (5, "Nocturnal Rod", 700, 250),
      (6, "Mythical Rod", 1000, 300);

      INSERT INTO Fish (fish_id, fish_name, size) VALUES
      -- Common Fish
      (1, "Golden Carp", 15),
      (2, "Silver Trout", 10),
      (3, "Black Bass", 20),
      (4, "Greenwater Shiner", 5),
      (5, "Rustscale Tilapia", 13),
      (6, "Silverstream Minnow", 6),
      (7, "Blueback Herring", 11),
      (8, "Spotted Sand Goby", 7),
      (9, "Redtail Sunfish", 10),
      (10, "Plainscale Carp", 18),

      -- Uncommon Fish
      (11, "Amber Pufferfish", 8),
      (12, "Dusky River Bream", 14),
      (13, "Goldencrest Barb", 12),
      (14, "Azure Dartfish", 7),
      (15, "Twilight Loach", 11),
      (16, "Emerald Trout", 12),
      (17, "Pebbletooth Catfish", 14),
      (18, "Bristleback Pike", 20),
      (19, "Marbled Rainbowfish", 9),
      (20, "Striped Pond Catfish", 22),

      -- Epic Fish
      (21, "Stormscale Barracuda", 300),
      (22, "Crimson Tideray", 275),
      (23, "Shadowscale Pike", 350),
      (24, "Blazewing Manta", 500),
      (25, "Frostfin Orca", 450),
      (26, "Luminous Reefshark", 400),

      -- Legendary Fish
      (27, "Celestial Abyssangler", 999),
      (28, "Titanshadow Leviathan", 1500),
      (29, "Sphyrna mokarran", 1800),

      -- Mythical fish(best fish)
      (30, "Grandpa's Carp", 1952);

      INSERT INTO Backpack (user_id, fish_id) VALUES
      (1, 30),
      (2, 15),
      (2, 26),
      (3, 14),
      (3, 17),
      -- random fish for john doe(userid3)
      ((SELECT user_id FROM User WHERE username = 'john doe'), FLOOR(1 + (RAND() * 30)));
      
      INSERT INTO UserRods (user_id, rod_id, durability) VALUES
      (1, 1, 50),
      (1, 2, 0),
      (1, 3, 200),
      (1, 4, 300),
      (1, 5, 700),
      (1, 6, 9999),
      (2, 1, 0),
      (2, 3, 180),
      (3, 1, 20),
      (3, 2, 10);

      `;

pool.query(SQLSTATEMENT, callback);
}
});

