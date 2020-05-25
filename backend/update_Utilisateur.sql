alter table utilisateur
modify date_naissance date null;

alter table utilisateur
add column mdp varchar(20) not null;

alter table utilisateur
modify tel varchar(45) null;

alter table medecin
add column imageUrl varchar(300) after autre;

alter table patient
add column imageUrl varchar(300) after autre;

CREATE TABLE IF NOT EXISTS `takecare`.`consultation` (
consId int not null auto_increment,
patId int not null,
medId int not null,
room varchar(50),
etat varchar(50),
primary key(consId),
foreign key(patId) references patient(userId),
foreign key(medId) references medecin(userId));




