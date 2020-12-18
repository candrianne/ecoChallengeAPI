DROP TABLE IF EXISTS "User" CASCADE;
CREATE TABLE "User"
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
  firstName varchar NOT NULL,
  lastName varchar NOT NULL,
  photo varchar,
  password varchar NOT NULL,
  birthYear integer NOT NULL
);

DROP TABLE IF EXISTS Friendship CASCADE;

CREATE TABLE Friendship
(
  idUser1 integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE,
  idUser2 integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE,
  PRIMARY KEY (idUser1, idUser2)
);

DROP TABLE IF EXISTS FriendRequest CASCADE;
CREATE TABLE FriendRequest
(
  sender integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE,
  receiver integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE,
  PRIMARY KEY (sender, receiver)
);

DROP TABLE IF EXISTS DifficultyLevel CASCADE;

CREATE TABLE DifficultyLevel
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar UNIQUE NOT NULL,
  nbDaysBronze integer NOT NULL,
  nbDaysSilver integer NOT NULL,
  nbDaysGold integer NOT NULL,
  nbDaysDiamond integer NOT NULL,
  score integer NOT NULL
);

DROP TABLE IF EXISTS Challenge CASCADE;

CREATE TABLE Challenge
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar UNIQUE NOT NULL,
  description varchar NOT NULL,
  photo varchar NOT NULL,
  difficultyLevelId integer NOT NULL REFERENCES DifficultyLevel(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS UserChallenge CASCADE;

CREATE TABLE UserChallenge
(
  startDate DATE NOT NULL CHECK (startDate <= endDate and startDate <= CURRENT_DATE),
  endDate DATE CHECK (endDate >= startDate and endDate <= CURRENT_DATE),
  nbPauseDays integer CHECK (nbPauseDays >= 0) DEFAULT 0,
  userId integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE,
  challengeId integer REFERENCES Challenge(id) DEFERRABLE INITIALLY IMMEDIATE,
	PRIMARY KEY(userId, challengeId)
);

DROP TABLE IF EXISTS ChallengeProposition;

CREATE TABLE ChallengeProposition
(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	description varchar NOT NULL,
	name varchar NOT NULL,
	photo varchar NOT NULL,
	"column" integer NOT NULL,
	userId integer NOT NULL REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS Admin;

CREATE TABLE Admin
(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	email varchar NOT NULL,
	password varchar NOT NULL
);