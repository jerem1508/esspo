-- =========================================
-- INSERTION DES CLUBS
-- =========================================
-- D'abord, insérer les clubs (ignorer si déjà existants)
-- INSERT INTO clubs (name) VALUES ('CORDammartin') ON CONFLICT DO NOTHING;
-- INSERT INTO clubs (name) VALUES ('ACIP Le Plessis-Belleville') ON CONFLICT DO NOTHING;
-- INSERT INTO clubs (name) VALUES ('US CREPY-EN-VALOIS') ON CONFLICT DO NOTHING;
-- INSERT INTO clubs (name) VALUES ('ES SAINT PATHUS-OISSERY') ON CONFLICT DO NOTHING;
-- INSERT INTO clubs (name) VALUES ('ACPO') ON CONFLICT DO NOTHING;

-- =========================================
-- INSERTION DES PARTICIPANTS
-- =========================================
-- Les participants sont insérés avec une sous-requête pour récupérer l'UUID du club

-- CORDammartin (077042)
INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('AMBRE', 'ALDINI', 'F', '2017-09-04', '2773666', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('LISA-ROSE', 'CHLEPKO', 'F', '2017-12-10', '2672343', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('CHARLOTTE', 'DENIS', 'F', '2018-12-31', '2773668', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('NOA', 'DHALLUIN MBANGUE EKINDI', 'F', '2019-10-24', '2769774', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('JOYCE', 'ELOY', 'F', '2018-05-29', '2629914', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('LEONORA', 'FOCHESATO', 'F', '2018-10-04', '2663351', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('ALICIA', 'MARCOS', 'F', '2017-05-10', '2643169', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('AIYA', 'RAHMOUNI', 'F', '2019-03-01', '2799005', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('THIBOR', 'BLANCHARD', 'M', '2018-09-08', '2666504', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('JAHID', 'CHAKRI', 'M', '2017-01-16', '2773659', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('HENRI', 'DEDET', 'M', '2018-11-15', '2743936', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('MILAN', 'DUMIOT DURIEUX', 'M', '2017-08-25', '2630313', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('BAPTISTE', 'HIDALGO-PACE', 'M', '2017-07-07', '2598614', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('LYLIAN', 'JARRY', 'M', '2018-08-08', '2671072', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Samuel', 'MANSOUR', 'M', '2018-07-21', '2743932', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('TIMOTHEE', 'MERCIER', 'M', '2017-10-17', '2632778', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('JESSIE', 'ELOY', 'F', '2016-03-12', '2591467', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('JEANNE', 'FURTAK', 'F', '2015-03-14', '2773657', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('TIAGO', 'DA SILVA', 'M', '2015-02-05', '2773669', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('GABRIEL', 'DHALLUIN MBANGUE EKINDI', 'M', '2015-10-28', '2693081', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('MATHEO', 'FLEURISCA', 'M', '2016-11-16', '2748875', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('JAHYAN', 'GERME', 'M', '2015-08-19', '2655601', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('LOUIS', 'HACHANI', 'M', '2015-10-19', '2641400', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('JAYDEN', 'JOSEPH NOEL', 'M', '2015-10-10', '2743990', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('BAMO', 'MEITE', 'M', '2016-12-02', '2626994', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('ANIS', 'OUKIL', 'M', '2015-05-31', '2672434', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('DAN', 'SCHERENNE', 'M', '2016-08-31', '2459840', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('LIAM DAVI', 'XAVIER BORGES', 'M', '2015-01-23', '2692967', (SELECT id FROM clubs WHERE name = 'CORDammartin'), 'POM');

-- ACIP Le Plessis-Belleville (60053)
INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Jade', 'RAPITEAU', 'F', '2017-01-03', '2801858', (SELECT id FROM clubs WHERE name = 'ACIP Le Plessis-Belleville'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Valentin', 'FOURNIER', 'M', '2017-10-09', '2779890', (SELECT id FROM clubs WHERE name = 'ACIP Le Plessis-Belleville'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Aaron', 'RAPITEAU', 'M', '2017-01-03', '2801856', (SELECT id FROM clubs WHERE name = 'ACIP Le Plessis-Belleville'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Léana', 'MALBERG', 'F', '2016-07-05', '2782199', (SELECT id FROM clubs WHERE name = 'ACIP Le Plessis-Belleville'), 'POF');

-- US CREPY-EN-VALOIS (060048)
INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('JENNA', 'DESCAT', 'F', '2017-12-11', '2737011', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('AMANDA', 'RAPINO', 'F', '2018-01-23', '2644167', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('INAYA', 'OTMANI', 'F', '2019-02-02', '2740850', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('ELEA', 'VIGOUROUX', 'F', '2017-05-01', '2737010', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('LESLY', 'FRAILLON', 'F', '2017-07-23', '2743048', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('MELLINA', 'BENYAHIA', 'F', '2017-09-10', '2650334', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('DJELISSA', 'HENDRICKX HELLENIS', 'F', '2019-01-13', '2753219', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('HOULEYE', 'LY', 'F', '2017-12-29', '2737012', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('HAYDEN', 'MOULIN', 'M', '2019-07-07', '2743037', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('LEON', 'RAPINO', 'M', '2019-09-13', '2739261', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('ANTOINE', 'REY GREFFET', 'M', '2019-11-24', '2737013', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('NAOMIE SAVANNAH', 'HOUNTO-HOTEGBE', 'F', '2016-02-09', '2737028', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('MARGOT', 'RAPINO', 'F', '2016-03-07', '2644168', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('SELMA', 'HAMEL', 'F', '2016-01-30', '2739555', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('CAMILLE', 'PREVOT', 'F', '2016-04-06', '2757397', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('CANDICE', 'KASSEL', 'F', '2016-08-21', '2631315', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('MAXENCE', 'LE MEUR', 'M', '2015-08-27', '2759134', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('ROMEO', 'BEAUDEQUIN', 'M', '2015-08-19', '2778413', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('NAEL', 'RENAR', 'M', '2016-05-16', '2442196', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('ARSENE', 'CERONI', 'M', '2016-05-24', '2743044', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('EDEN', 'MARTEL', 'M', '2015-04-14', '2632081', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('AYMERIC', 'HERBAIN', 'M', '2016-03-11', '2554535', (SELECT id FROM clubs WHERE name = 'US CREPY-EN-VALOIS'), 'POM');

-- ES SAINT PATHUS-OISSERY (77072)
INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Jelyssa', 'FERNANDES', 'F', '2017-04-03', '2773094', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Khelia', 'MÉAUDE', 'F', '2017-07-04', '2643076', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Mina', 'DIAWARA', 'F', '2017-07-06', '2698846', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Ines', 'MORELL', 'F', '2017-10-03', '2756475', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Dalia', 'KHALFI', 'F', '2018-03-28', '2765315', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Léana', 'CARIDADE', 'F', '2018-04-20', '2760129', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Louise', 'BOUE', 'F', '2018-05-18', '2773102', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Melwan', 'DABAGH', 'F', '2019-02-13', '2755963', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Kelyana', 'LE BONHOM', 'F', '2019-10-10', '2798421', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Malcom', 'BALI', 'M', '2017-01-06', '2782818', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Lenny', 'GARNOT', 'M', '2017-01-07', '2752968', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Ismael', 'BENHAMMA', 'M', '2017-03-28', '2758324', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Martin', 'LE GOFF', 'M', '2017-04-14', '2781911', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Lucas', 'BETOULE', 'M', '2017-04-15', '2753032', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Lucas', 'LINOT', 'M', '2017-08-09', '2648109', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Mohamed', 'NIANG', 'M', '2018-05-15', '2648106', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Diego', 'ABELA', 'M', '2018-06-22', '2712511', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Maël', 'BONTURI', 'M', '2018-12-25', '2760083', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Johan', 'BONTURI', 'M', '2018-12-25', '2760044', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Aïdan', 'CABEU', 'M', '2019-04-15', '2739888', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Sara', 'YIGIT', 'F', '2015-04-13', '2765307', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Farah', 'CAUX', 'F', '2015-06-09', '2765283', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Nawrece', 'VICTOR', 'F', '2015-07-07', '2781903', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Feryel', 'BENHAMMA', 'F', '2015-08-13', '2758325', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Louna', 'DUMEZ', 'F', '2015-10-14', '2447557', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Giulia', 'ABELA', 'F', '2015-10-14', '2641384', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Flavie', 'CHANSEAUME', 'F', '2015-12-07', '2641386', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Abby', 'NIANG', 'F', '2016-01-17', '2641406', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Noémie', 'NARFIT', 'F', '2016-02-22', '2448821', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Harmonie', 'SIMON', 'F', '2016-06-16', '2760063', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Amandine', 'ABADIA', 'F', '2016-06-20', '2528402', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Lola', 'LEPAN NOURY', 'F', '2016-06-22', '2768531', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Neyla', 'LAOUEDJ', 'F', '2016-06-23', '2650885', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Layssa', 'DABAGH', 'F', '2016-12-14', '2644937', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Maël', 'DJAFRI', 'M', '2015-01-16', '2559554', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Luca', 'BONNAIRE', 'M', '2015-07-16', '2554433', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Thomas', 'FONTAINE', 'M', '2015-10-02', '2756711', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Lorick', 'JULIENNE EGOUY', 'M', '2015-10-11', '2765984', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Tiago', 'CARIDADE', 'M', '2015-12-24', '2760113', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Diego', 'MARIAULT', 'M', '2016-03-06', '2660059', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Théo', 'LEFORT', 'M', '2016-03-15', '2544409', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Gary', 'MARTIN', 'M', '2016-06-15', '2457097', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Babacar', 'DIOP', 'M', '2016-07-10', '2565458', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Romain', 'MALET', 'M', '2016-09-13', '2440841', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Ethan', 'REGNIER', 'M', '2016-12-22', '2544418', (SELECT id FROM clubs WHERE name = 'ES SAINT PATHUS-OISSERY'), 'POM');

-- ACPO (077125)
INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Manëlle', 'SERRURIER', 'F', '2018-01-22', '2779105', (SELECT id FROM clubs WHERE name = 'ACPO'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Maxine', 'GOLEC', 'F', '2018-02-25', '2752568', (SELECT id FROM clubs WHERE name = 'ACPO'), 'EAF');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Ewenn', 'CARRE GARNIER', 'M', '2019-01-16', '2752571', (SELECT id FROM clubs WHERE name = 'ACPO'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Rafael', 'CHAPELET', 'M', '2018-10-22', '2637023', (SELECT id FROM clubs WHERE name = 'ACPO'), 'EAM');

INSERT INTO participants (firstname, lastname, gender, birthdate, licensenumber, clubid, category)
VALUES ('Charlotte', 'CHAPELET', 'F', '2016-11-12', '2637038', (SELECT id FROM clubs WHERE name = 'ACPO'), 'POF');

-- =========================================
-- Total: 104 participants insérés
-- =========================================
