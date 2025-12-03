
CREATE DATABASE IF NOT EXISTS `seminario-final`;





INSERT INTO `group` (`name`) VALUES ('ADMIN'), ('USER'), ('GUEST');

INSERT INTO `access` (`name`) VALUES ('CREATEGROUP'),('CREATEUSER'),
 ('DELETEGROUP'),('DELETEUSER'),
 ('UPDATEGROUP'),('UPDATEUSER'),
 ('READGROUP'),('READUSER'), ('READALLUSER');


INSERT INTO `seminario-final`.`user` (`nickname`,`password`,`uuid`)
VALUES ("santipili", "casa4565", "577ce2c7-7fb6-477b-a1b9-c40d8f6c753b");

INSERT INTO `seminario-final`.`user_has_group` (`id_user`,`id_group`)
VALUES (1,1);

INSERT INTO `seminario-final`.`data` (`name`,`surname`,`NID`,`email`,`phone`)
VALUES ("Santiago Tomas","Pili",37011358,"santi.tomas.pili@gmail.com",2235254045);

INSERT INTO `seminario-final`.`user_has_data` (`id_user`,`id_data`)
VALUES (1,1);