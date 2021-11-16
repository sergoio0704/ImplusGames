IF NOT EXISTS(SELECT * FROM master.dbo.sysdatabases WHERE name = 'Impuls')
BEGIN
    CREATE DATABASE Impuls
END

IF NOT EXISTS(SELECT * FROM sys.tables WHERE name = 'account' AND type = 'U')
BEGIN
    CREATE TABLE account (
        [id_account] BIGSERIAL IDENTITY(1,1) PRIMARY KEY NOT NULL,
        [email] VARCHAR(100) UNIQUE NOT NULL,
        [pass] VARCHAR(100) NOT NULL,
        [name] VARCHAR(MAX) NOT NULL
    );
END

IF NOT EXISTS(SELECT * FROM sys.tables WHERE name = 'role' AND type = 'U')
BEGIN
    CREATE TABLE role (
        [id_role] TINYINT IDENTITY(1,1) PRIMARY KEY NOT NULL,
        [name] VARCHAR(30) NOT NULL,
    );
END

IF NOT EXISTS(SELECT * FROM sys.tables WHERE name = 'account_role' AND type = 'U')
BEGIN
    CREATE TABLE account_role (
        [id_account] BIGSERIAL PRIMARY KEY NOT NULL,
        [id_role] TINYINT PRIMARY KEY NOT NULL,
        CONSTRAINT FK_account_role_account FOREIGN KEY (id_account)
        REFERENCES account(id_account)
    );
END

IF NOT EXISTS(SELECT * FROM sys.tables WHERE name = 'game' AND type = 'U')
BEGIN
    CREATE TABLE game (
        [id_game] TINYINT IDENTITY(1,1) PRIMARY KEY NOT NULL,
        [name] VARCHAR(100) NOT NULL,
        [description] VARCHAR(MAX)
    );
END

IF NOT EXISTS(SELECT * FROM sys.tables WHERE name = 'game_result' AND type = 'U')
BEGIN
    CREATE TABLE game_result (
        [id_game_result] BIGSERIAL IDENTITY(1,1) PRIMARY KEY NOT NULL,
        [id_account] BIGSERIAL NOT NULL,
        [id_game] TINYINT  NOT NULL,
        [quantity_tasks] INT NOT NULL,
        [quantity_true_answers] INT NOT NULL,
        CONSTRAINT FK_game_result_game FOREIGN KEY (id_game)
        REFERENCES game(id_game)
        CONSTRAINT FK_game_result_account FOREIGN KEY (id_account)
        REFERENCES account(id_account)
    );
END

IF NOT EXISTS(SELECT * FROM sys.tables WHERE name = 'complexity' AND type = 'U')
BEGIN
    CREATE TABLE complexity (
        [id_complexity] TINYINT IDENTITY(1,1) PRIMARY KEY NOT NULL,
        [complexity_kind] TINYINT NOT NULL
    );
END

IF NOT EXISTS(SELECT * FROM sys.tables WHERE name = 'game_complexity' AND type = 'U')
BEGIN
    CREATE TABLE game_complexity (
        [id_game_complexity] BIGSERIAL IDENTITY(1,1) PRIMARY KEY NOT NULL,
        [id_game] TINYINT  NOT NULL,
        [id_complexity] TINYINT NOT NULL,
        CONSTRAINT FK_game_complexity_game FOREIGN KEY (id_game)
        REFERENCES game(id_game)
    );
END