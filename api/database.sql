CREATE TABLE public."Promo"
(
    "anneePromo" integer,
    PRIMARY KEY ("anneePromo")
);

ALTER TABLE public."Promo"
    OWNER to postgres;

CREATE TABLE public."Etudiants"
(
    "numEtudiant" integer NOT NULL,
    "nomEtudiant" VARCHAR(30),
    "prenomEtudiant" VARCHAR(30),
    "mailEtudiant" VARCHAR(64),
    "mdpEtudiant" VARCHAR(255),
    "promoEtudiant" integer,
    PRIMARY KEY ("numEtudiant"),
    CONSTRAINT fk_promo FOREIGN KEY ("promoEtudiant")
        REFERENCES public."Promo" ("anneePromo") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public."Etudiants"
    OWNER to postgres;
	
CREATE TABLE public."Professeurs"
(
    "idProf" SERIAL NOT NULL,
    "nomProf" VARCHAR(30),
    "prenomProf" VARCHAR(30),
    PRIMARY KEY ("idProf")
);

ALTER TABLE public."Professeurs"
    OWNER to postgres;
	
CREATE TABLE public."Groupe"
(
    "idGroupe" SERIAL,
    "tuteurGroupe" integer,
    "nomTutEnt" VARCHAR(30),
    "prenomTutEnt" VARCHAR(30),
    "nomEntreprise" VARCHAR(64),
    PRIMARY KEY ("idGroupe"),
    CONSTRAINT fk_tuteur FOREIGN KEY ("tuteurGroupe")
        REFERENCES public."Professeurs" ("idProf") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public."Groupe"
    OWNER to postgres;
	
CREATE TABLE public."Composer"
(
    "numEtudiant" integer,
    "idGroupe" integer,
    PRIMARY KEY ("numEtudiant", "idGroupe"),
    CONSTRAINT fk_etu FOREIGN KEY ("numEtudiant")
        REFERENCES public."Etudiants" ("numEtudiant") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT fk_grp FOREIGN KEY ("idGroupe")
        REFERENCES public."Groupe" ("idGroupe") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public."Composer"
    OWNER to postgres;
	
CREATE TABLE public."Evenement"
(
    "numEvenement" SERIAL,
    promo integer,
    "nomEvenement" VARCHAR(64),
    "dateDebut" date,
    duree integer,
    "dateLimiteRes" date,
    "dureeCreneau" time without time zone,
    PRIMARY KEY ("numEvenement"),
    CONSTRAINT fk_promo FOREIGN KEY (promo)
        REFERENCES public."Promo" ("anneePromo") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public."Evenement"
    OWNER to postgres;
	
CREATE TABLE public."Creneau"
(
    "idCreneau" SERIAL,
    date date,
    "heureDebut" time without time zone,
    salle VARCHAR(10),
    "idGroupe" integer,
    "idEvent" integer,
    PRIMARY KEY ("idCreneau"),
    CONSTRAINT fk_grp FOREIGN KEY ("idGroupe")
        REFERENCES public."Groupe" ("idGroupe") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT fk_event FOREIGN KEY ("idEvent")
        REFERENCES public."Evenement" ("numEvenement") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public."Creneau"
    OWNER to postgres;
	
CREATE TABLE public."Participier"
(
    "idProf" integer NOT NULL,
    "idCreneau" integer NOT NULL,
    PRIMARY KEY ("idProf", "idCreneau"),
    CONSTRAINT fk_prof FOREIGN KEY ("idProf")
        REFERENCES public."Professeurs" ("idProf") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT fk_cren FOREIGN KEY ("idCreneau")
        REFERENCES public."Creneau" ("idCreneau") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE public."Participier"
    OWNER to postgres;

INSERT INTO public."Promo" ("anneePromo") VALUES (2020),(2019),(2018);

INSERT INTO public."Professeurs" ("nomProf", "prenomProf") VALUES ('Berry', 'Vincent'), ('Bourdon', 'Isabelle'), ('Buisson-Lopez', 'Lysiane'), ('Castelltort', 'Arnaud'), ('Chapellier', 'Philippe'), ('Fiorio', 'Christophe'), ('Guerrini', 'Eléonora'), ('Laurent', 'Anne'), ('Pacitti', 'Esther'), ('Stratulat', 'Tibériu'), ('Tibermacine', 'Chouki'), ('Toulemonde', 'Gwladys'), ('Villaret', 'Anne-Laure');