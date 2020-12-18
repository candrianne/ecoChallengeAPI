INSERT INTO "User"(email, firstname, lastname, password, birthyear)
	VALUES ('charly.andrianne@hotmail.com', 'Charly', 'Andrianne', '$2a$10$ZpAAgc2qtD6jbuixIUIpnuiFgY6UU6.PCG9LO8Q2e2eUuO9HRzjCu', 1998);
INSERT INTO "User"(email, firstname, lastname, password, birthyear)
	VALUES ('florent.weiten@gmail.com', 'Florent', 'Weiten', '$2a$10$mks01N0sR0yAbQBeeMVZHe7/WRGkjqQGBJb6B0tLCUByC35g2nIEC', 1998);


INSERT INTO friendship(iduser1, iduser2)
	VALUES (1, 2);


INSERT INTO difficultylevel(name, nbdaysbronze, nbdayssilver, nbdaysgold, nbdaysdiamond, score)
	VALUES ('easy', 7, 14, 30, 90, 10);
INSERT INTO difficultylevel(name, nbdaysbronze, nbdayssilver, nbdaysgold, nbdaysdiamond, score)
	VALUES ('medium', 14, 30, 60, 180, 20);
INSERT INTO difficultylevel(name, nbdaysbronze, nbdayssilver, nbdaysgold, nbdaysdiamond, score)
	VALUES ('hard', 30, 60, 120, 365, 30);


INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('tri', 'trier ses déchets','https://res.cloudinary.com/dq4qdktus/image/upload/v1607646177/6afaa0587fa436ccd5ac75871a4ec45c_kq0w4w.jpg',1);
INSERT INTO challenge(name, description, photo, difficultylevelid)
    VALUES ('fait maison', 'fabriquer soi mêmes ses propres produits ménagers','https://res.cloudinary.com/dq4qdktus/image/upload/v1607646372/Cut-wildflower-soap_grknta.jpg',3);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('fruits et légumes', 'manger des fruits et légumes de saison','https://res.cloudinary.com/dq4qdktus/image/upload/v1607645868/csm_20200601_fruits-legumes_9761d0da5c_dhwmzv.jpg',2);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('recylage', 'acheter ou utiliser de préférence des produits recyclés','https://res.cloudinary.com/dq4qdktus/image/upload/v1607646071/picto-reutilisable_h6btm7.jpg',2);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('sac de course', 'utiliser un sac réutilisable pour faire ses courses','https://res.cloudinary.com/dq4qdktus/image/upload/v1607645937/reusable-shopping-bag-full-groceries-600w-235351681_d8hsrx.jpg',1);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('composte', 'installer et utiliser un composte','https://res.cloudinary.com/dq4qdktus/image/upload/v1607645836/recycling-bin-with-vegetable-scraps-inside-to-turn-to-composte-picture-id493247379_trfdhb.jpg',2);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('biocap', 'privilégier les boutiques alimentaires bio','https://res.cloudinary.com/dq4qdktus/image/upload/v1607645911/e57827f2-32a4-4057-ad4f-71cc1678e107_w7uq3z.png',2);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('ramassage déchets', 'participer à des évenements de ramassage de déchets','https://res.cloudinary.com/dq4qdktus/image/upload/v1607645959/Photo_06-1170x759_h1rtm2.jpg',3);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('gourde réutilisable', 'utiliser une gourde réutilisable au quotidien','https://res.cloudinary.com/dq4qdktus/image/upload/v1607646137/Gourde_en_aluminium_mcsrtb.jpg',1);
INSERT INTO challenge(name, description, photo, difficultylevelid)
	VALUES ('vélo', 'se déplacer au maximum à pied, en vélo, trottinette etc..','https://res.cloudinary.com/dq4qdktus/image/upload/v1607646113/veloshopper_van_04097_1_gk16jv.jpg',2);


INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2019-09-20', '2020-05-15', 1, 1);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2019-09-20', NULL, 1, 2);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2020-01-20', '2020-04-16', 1, 3);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2020-01-20', NULL, 1, 4);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2020-01-20', '2020-12-15', 1, 5);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2020-01-20', '2020-12-15', 2, 6);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2020-01-20', NULL, 2, 7);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2019-05-20', '2020-02-28', 2, 8);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2019-05-20', NULL, 2, 9);
INSERT INTO userchallenge(startdate, enddate, userid, challengeid)
	VALUES ('2020-09-30', NULL, 2, 10);


INSERT INTO admin(email, password)
	VALUES ('admin1@gmail.com', '$2a$10$KYt2qQdz.zvKj1crdQbzju94M4t1IxNM7BOfM6hSgmYiOttl1qvP.');