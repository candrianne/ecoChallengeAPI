DROP TABLE IF EXISTS ScoreLevel CASCADE;

CREATE TABLE ScoreLevel
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL,
  scoreToReach integer NOT NULL
);

DROP TABLE IF EXISTS "User" CASCADE;

CREATE TABLE "User"
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar UNIQUE NOT NULL,
  firstName varchar NOT NULL,
  lastName varchar NOT NULL,
  photo varchar,
  photoExtension varchar,
  password varchar NOT NULL,
  birthYear integer NOT NULL,
  scoreLevelId integer REFERENCES ScoreLevel(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS Friendship CASCADE;

CREATE TABLE Friendship
(
  idUser1 integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE,
  idUser2 integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE,
  PRIMARY KEY (idUser1, idUser2)
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
  difficultyLevelId integer NOT NULL REFERENCES DifficultyLevel(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS UserChallenge CASCADE;

CREATE TABLE UserChallenge
(
  startDate DATE NOT NULL,
  endDate DATE,
  nbDays integer NOT NULL,
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
	"column" integer NOT NULL,
	userId integer REFERENCES "User"(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS Admin;

CREATE TABLE Admin
(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	login varchar NOT NULL,
	password varchar NOT NULL
);