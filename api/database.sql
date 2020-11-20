CREATE TABLE public."Promo"
(
    "anneePromo" integer,
    PRIMARY KEY ("anneePromo")
);

ALTER TABLE public."Promo"
    OWNER to postgres;

CREATE TABLE public."Etudiants"
(
    "numEtudiant" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    "nomEtudiant" character(255),
    "prenomEtudiant" character(255),
    "mailEtudiant" character(255),
    "mdpEtudiant" character(255),
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
    "idProf" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    "nomProf" character(255),
    "prenomProf" character(255),
    PRIMARY KEY ("idProf")
);

ALTER TABLE public."Professeurs"
    OWNER to postgres;
	
CREATE TABLE public."Groupe"
(
    "idGroupe" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    "tuteurGroupe" integer,
    "nomTutEnt" character(255),
    "prenomTutEnt" character(255),
    "nomEntreprise" character(255),
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
    "numEvenement" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    promo integer,
    "nomEvenement" character(255),
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
    "idCreneau" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    date date,
    "heureDebut" time without time zone,
    salle character(10),
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