-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/6Nt9UH
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "top_20_companies" (
    "id" int   NOT NULL,
    "timestamp" int   NOT NULL,
    "company" varchar   NOT NULL,
    "level" varchar   NOT NULL,
    "title" varchar   NOT NULL,
    "totalyearlycompensation" int   NOT NULL,
    "location" varchar   NOT NULL,
    "yearsofexperience" float   NOT NULL,
    "yearsatcompany" float   NOT NULL,
    "tag" varchar   NOT NULL,
    "gender" varchar   NOT NULL,
    "cityid" int   NOT NULL,
    "dmaid" float   NOT NULL,
    "rownumber" int   NOT NULL,
    "mastersdegree" int   NOT NULL,
    "bachelorsdegree" int   NOT NULL,
    "doctoratedegree" int   NOT NULL,
    "raceasian" int   NOT NULL,
    "racewhite" int   NOT NULL,
    "racetwoormore" int   NOT NULL,
    "raceblack" int   NOT NULL,
    "racehispanic" int   NOT NULL,
    CONSTRAINT "pk_top_20_companies" PRIMARY KEY (
        "id"
     )
);

