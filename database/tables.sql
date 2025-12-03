
CREATE  TABLE IF NOT EXISTS `seminario-final`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nickname` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(55) NOT NULL ,
  `uuid` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `idusuarios_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `group`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `seminario-final`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `idgroup_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`user_group`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `seminario-final`.`user_has_group` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `id_user` INT NOT NULL ,
  `id_group` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id-user_idx` (`id_user` ASC) ,
  INDEX `id-group_idx` (`id_group` ASC) ,
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) ,
  CONSTRAINT `id-user`
    FOREIGN KEY (`id_user` )
    REFERENCES `seminario-final`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `id-group`
    FOREIGN KEY (`id_group` )
    REFERENCES `seminario-final`.`group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`data`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `seminario-final`.`data` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(55) NULL DEFAULT NULL ,
  `surname` VARCHAR(55) NULL DEFAULT NULL ,
  `NID` INT NULL ,
  `email` VARCHAR(80) NULL ,
  `phone` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `iddata_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `NID_UNIQUE` (`NID` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_data`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `seminario-final`.`user_has_data` (
  `id_user` INT NOT NULL ,
  `id_data` INT NOT NULL ,
  PRIMARY KEY (`id_user`, `id_data`) ,
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) ,
  UNIQUE INDEX `id_data_UNIQUE` (`id_data` ASC) ,
  CONSTRAINT `id-user_idx`
    FOREIGN KEY (`id_user` )
    REFERENCES `seminario-final`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `id-data`
    FOREIGN KEY (`id_data` )
    REFERENCES `seminario-final`.`data` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`access`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `seminario-final`.`access` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `description` VARCHAR(255) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `idacces_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `accessname_UNIQUE` (`name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`group_access`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `seminario-final`.`group_has_access` (
  `id_group` INT NOT NULL ,
  `id_access` INT NOT NULL ,
  PRIMARY KEY (`id_group`, `id_access`) ,
  CONSTRAINT `id-group_idx`
    FOREIGN KEY (`id_group` )
    REFERENCES `seminario-final`.`group` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `id-access_idx`
    FOREIGN KEY (`id_access` )
    REFERENCES `seminario-final`.`access` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE  TABLE IF NOT EXISTS `seminario-final`.`token` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `token` VARCHAR(255) NOT NULL ,
  `expiration` DATE NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `token_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


CREATE  TABLE IF NOT EXISTS `seminario-final`.`user_has_token` (
  `id` INT NOT NULL,
  `id_user` INT NOT NULL ,
  `id_token` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) ,
  UNIQUE INDEX `id_token_UNIQUE` (`id_token` ASC) ,
  CONSTRAINT `uht_iduser_idx`
    FOREIGN KEY (`id_user` )
    REFERENCES `seminario-final`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `uht_idtoken_idx`
    FOREIGN KEY (`id_token` )
    REFERENCES `seminario-final`.`token` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
