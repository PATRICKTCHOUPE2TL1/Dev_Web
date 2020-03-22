alter table utilisateur
modify date_naissance date null;

alter table utilisateur
add column mdp varchar(20) not null;

alter table utilisateur
modify tel varchar(45) null;




