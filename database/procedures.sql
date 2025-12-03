SHOW PROCEDURE STATUS WHERE Db = 'seminario-final';
SHOW FUNCTION STATUS WHERE Db = 'seminario-final';

SHOW CREATE PROCEDURE `mp_CreateGroup`;
SHOW CREATE FUNCTION `authorizeCredential`;


CREATE FUNCTION authorizeCredential(
    userUUID CHAR(36),
    accessName VARCHAR(45)
)
RETURNS BIT(1)
READS SQL DATA
BEGIN
    DECLARE result BIT(1);

    SELECT 
        CASE 
            WHEN COUNT(*) > 0 THEN 1
            ELSE 0
        END
    INTO result
    FROM group_has_access gha
    LEFT JOIN access a ON a.id = gha.id_access
    LEFT JOIN `group` g ON g.id = gha.id_group
    LEFT JOIN user_has_group uhg ON uhg.id_group = g.id
    LEFT JOIN `user` u ON u.id = uhg.id_user
    WHERE u.uuid = userUUID
      AND a.name = accessName;

    RETURN result;
END

-- --------------------------------------------------
-- --------------------------------------------------
-- --------------GROUPS CRUD--------------------------
-- --------------------------------------------------
-- --------------------------------------------------

CREATE PROCEDURE `mp_CreateGroup`(IN groupName VARCHAR(45), IN userUUID CHAR(36) )
BEGIN
	DECLARE isAuthorized BIT(1);

  SET isAuthorized = authorizeCredential(userUUID, 'CREATEGROUP');
  
  IF isAuthorized = 1 THEN
		INSERT INTO `group` (`name`) VALUES (groupName);
  END IF;
END

CREATE PROCEDURE `mp_UpdateGroup`(
    IN groupId INT, 
    IN userUUID CHAR(36),
    IN newGroupName VARCHAR(45))
BEGIN
	DECLARE isAuthorized BIT(1);
    DECLARE count_groups INT;

  SET isAuthorized = authorizeCredential(userUUID, 'UPDATEGROUP');
  
  IF isAuthorized = 1 THEN
    SELECT COUNT(*) INTO count_groups FROM `group` WHERE `name` = newGroupName AND `id` <> groupId;

    IF count_groups > 0 THEN
        SELECT 0 AS updated, 1 AS authorized, 1 AS duplicate;
    ELSE
        UPDATE `group` 
        SET `name` = newGroupName
        WHERE `id` = groupId;
            
        SELECT 1 AS updated, 1 AS authorized, 0 AS duplicate;
    END IF;
  ELSE
      SELECT 0 AS updated, 0 AS authorized, NULL AS duplicate;
  END IF;
END

CREATE PROCEDURE `mp_DeleteGoup`(IN groupId INT, IN userUUID CHAR(36) )
BEGIN
	DECLARE isAuthorized BIT(1);
    DECLARE count_users INT;

  SET isAuthorized = authorizeCredential(userUUID, 'DELETEGROUP');
  
  IF isAuthorized = 1 THEN
	SELECT COUNT(*) INTO count_users FROM user_has_group WHERE id_group = groupId;
    
    IF count_users = 0 THEN
        DELETE FROM `group` WHERE `id` = groupId;
        SELECT 1 AS deleted, 1 AS authorized, 0 AS users;
    ELSE
        SELECT 0 AS deleted, 1 AS authorized, users AS users;
    END IF; 
  ELSE
      SELECT 0 AS deleted, 0 AS authorized, NULL AS users;
  END IF;
END

CREATE PROCEDURE `mp_ReadGroups`(IN userUUID CHAR(36))
BEGIN
    DECLARE isAuthorized BIT(1);

  SET isAuthorized = authorizeCredential(userUUID, 'READGROUP');
  
  IF isAuthorized = 1  THEN
      SELECT 
      `group`.`id` AS `id`,
      `group`.`name` AS `name`
       FROM `group` ;
  ELSE
      SELECT 0 AS authorized;
  END IF;
END


-- --------------------------------------------------
-- --------------------------------------------------
-- --------------USERS CRUD--------------------------
-- --------------------------------------------------
-- --------------------------------------------------

CREATE PROCEDURE `mp_CreateUser`(
    IN userNickName VARCHAR(45), 
    userPassword VARCHAR(55), 
    userName VARCHAR(55), 
    userSurname VARCHAR(55), 
    userNID INT, 
    userEmail VARCHAR(255), 
    userPhone VARCHAR(45), 
    userUUID CHAR(36), 
    userGroup VARCHAR(45))
BEGIN
	DECLARE aux_user_id INT;
	DECLARE aux_data_id INT;
  DECLARE new_uuid    CHAR(36);
  DECLARE isAuthorized BIT(1);

  SET isAuthorized = authorizeCredential(userUUID, 'CREATEUSER');
  
  IF isAuthorized = 1  THEN

      START TRANSACTION;

      SET aux_user_id = 0;
      SET aux_data_id = 0;
      SET new_uuid = UUID();

      INSERT INTO `user` (`nickname`, `password`, `uuid`) VALUES (userNickName, userPassword, new_uuid);
      
      SET aux_user_id = LAST_INSERT_ID();

      IF aux_user_id > 0 THEN
        INSERT INTO `user_has_group` (`id_user`, `id_group`) 
          VALUES (aux_user_id, userGroup);
          
        INSERT INTO `data` (`name`, `surname`, `NID`, `email`, `phone`) 
          VALUES (userName, userSurname, userNID, userEmail, userPhone);
          
        SET aux_data_id = LAST_INSERT_ID();

        IF aux_data_id > 0 THEN
          INSERT INTO `user_has_data` (`id_user`, `id_data`)
            VALUES (aux_user_id, aux_data_id);

          COMMIT;
          -- OK
          SELECT 1 AS created, 1 AS authorized, aux_user_id AS user;  
        ELSE
        -- fallo al crear data
          ROLLBACK;
          SELECT 0 AS created, 1 AS authorized;
        END IF;
      ELSE
      -- fallo al crear user
        ROLLBACK;
        SELECT 0 AS created, 1 AS authorized;
      END IF;
  ELSE
      -- No autorizado
      SELECT 0 AS created, 0 AS authorized;
  END IF;
END

CREATE PROCEDURE `mp_UpdateUser`(
    IN pUserUUID     CHAR(36), 
    IN pUserUpdateId INT,
    IN pNickName     VARCHAR(45), 
    IN pName         VARCHAR(55), 
    IN pSurname      VARCHAR(55), 
    IN pNID          INT, 
    IN pEmail        VARCHAR(255), 
    IN pPhone        VARCHAR(45), 
    IN pGroupName    VARCHAR(45)
)
BEGIN
    DECLARE vUserExists     INT DEFAULT 0;
    DECLARE vNickTaken      INT DEFAULT 0;
    DECLARE vDataId         INT;
    DECLARE vGroupId        INT;
    DECLARE vCallerGroup    VARCHAR(45);
    DECLARE vCallerUserId   INT;
    DECLARE vAuthorized     BIT(1);

    SET vAuthorized = authorizeCredential(pUserUUID, 'UPDATEUSER');

    SELECT COUNT(*)
    INTO vUserExists
    FROM `user`
    WHERE id = pUserUpdateId;

    SELECT COUNT(*)
    INTO vNickTaken
    FROM `user`
    WHERE nickname = pNickName
      AND id <> pUserUpdateId;

    SELECT id_data
    INTO vDataId
    FROM user_has_data
    WHERE id_user = pUserUpdateId;

    SELECT id
    INTO vGroupId
    FROM `group`
    WHERE name = pGroupName
    LIMIT 1;


    SELECT g.name, u.id
    INTO vCallerGroup, vCallerUserId
    FROM user_has_group uhg
    JOIN `group` g ON g.id = uhg.id_group
    JOIN `user`  u ON u.id = uhg.id_user
    WHERE u.uuid = pUserUUID
    LIMIT 1;



    IF vAuthorized = 0
       OR vUserExists = 0
       OR vDataId IS NULL
       OR vGroupId IS NULL
       OR vNickTaken > 0
       OR (vCallerGroup = 'USER' AND pUserUpdateId <> vCallerUserId)
    THEN
        SELECT 
            0           AS updated,
            vAuthorized AS authorized,
            vNickTaken  AS duplicateNick,
            vUserExists AS userExists,
            vDataId IS NOT NULL  AS dataExists,
            vGroupId IS NOT NULL AS groupExists;
    ELSE
        START TRANSACTION;

        UPDATE `user`
        SET nickname = pNickName
        WHERE id = pUserUpdateId;

        UPDATE `data`
        SET name    = pName,
            surname = pSurname,
            NID     = pNID,
            email   = pEmail,
            phone   = pPhone
        WHERE id = vDataId;

        UPDATE user_has_group
        SET id_group = vGroupId
        WHERE id_user = pUserUpdateId;

        COMMIT;

        SELECT 1 AS updated, 1 AS authorized;
    END IF;
END

-----
-----
-- Deberia el user borrar solo su cuenta 
-----
-----
CREATE PROCEDURE `mp_DeleteUser`(
    IN userUUID CHAR(36), 
    IN deleteUserId INT)
BEGIN
    DECLARE aux_user INT;
    DECLARE isAuthorized BIT(1);

  SET isAuthorized = authorizeCredential(userUUID, 'DELETEUSER');
  
  SELECT COUNT(*) INTO aux_user FROM `user` WHERE `id` = deleteUserId AND `uuid` <> userUUID;

  IF isAuthorized = 1  AND aux_user = 1 THEN
      DELETE FROM `user` WHERE `id` = deleteUserId ;

      SELECT 1 AS deleted, 1 AS authorized;
  ELSE
      SELECT 0 AS deleted, isAuthorized AS authorized;
  END IF;
END

CREATE PROCEDURE `mp_ReadUser`(
    IN userUUID CHAR(36), 
    IN readUserId INT)
BEGIN
    DECLARE aux_user INT;
    DECLARE isAuthorized BIT(1);

  SET isAuthorized = authorizeCredential(userUUID, 'READUSER');
  
  SELECT COUNT(*) INTO aux_user FROM `user` WHERE `id` = readUserId;    

  IF isAuthorized = 1  AND aux_user = 1 THEN
      SELECT 
      `user`.`id` AS `id`,
      `user`.`uuid` AS `uuid`, 
      `user`.`nickname` AS `nickname`,
      `data`.`name` AS `name`,
      `data`.`surname` AS `surname`,
        `data`.`NID`    AS `NID`,
        `data`.`email` AS `email`,
        `data`.`phone` AS `phone`,
        `group`.`name` AS `group_name`
       FROM `user` 
       LEFT JOIN `user_has_group` ON `user`.`id` = `user_has_group`.`id_user` 
       LEFT JOIN `group` ON `group`.`id` = `user_has_group`.`id_group`
       LEFT JOIN `user_has_data` ON `user_has_data`.`id_user` = `user`.`id`
       LEFT JOIN `data` ON `data`.`id` = `user_has_data`.`id_data` 
       WHERE `user`.`id` = readUserId;
  ELSE
      SELECT 0 AS readed, isAuthorized AS authorized;
  END IF;
END

CREATE PROCEDURE `mp_ReadAllUsers`(IN userUUID CHAR(36))
BEGIN
    DECLARE isAuthorized BIT(1);

  SET isAuthorized = authorizeCredential(userUUID, 'READALLUSER');
  
  IF isAuthorized = 1  THEN
      SELECT 
      `user`.`id` AS `id`, 
      `user`.`nickname` AS `nickname`,
      `data`.`name` AS `name`,
      `data`.`surname` AS `surname`,
      `group`.`name` AS `group`,
        `data`.`NID`    AS `dni`,
        `data`.`email` AS `email`,
        `data`.`phone` AS `phone`
       FROM `user` 
       LEFT JOIN `user_has_group` ON `user`.`id` = `user_has_group`.`id_user` 
       LEFT JOIN `group` ON `group`.`id` = `user_has_group`.`id_group`
       LEFT JOIN `user_has_data` ON `user_has_data`.`id_user` = `user`.`id`
       LEFT JOIN `data` ON `data`.`id` = `user_has_data`.`id_data` ;

  ELSE
      SELECT 0 AS authorized;
  END IF;
END


-----------------
------- Auth -------------
-------------

CREATE PROCEDURE mp_GetUserByCredentials(
    IN p_nickname VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT 
        u.id,
        u.uuid,
        u.nickname,
        CASE WHEN g.name = 'ADMIN' THEN 1 ELSE 0 END AS isAdmin
    FROM `user` u
    LEFT JOIN `user_has_group` uhg ON uhg.id_user = u.id
    LEFT JOIN `group` g ON g.id = uhg.id_group
    WHERE u.nickname = p_nickname
      AND u.password = p_password
    LIMIT 1;
END;



