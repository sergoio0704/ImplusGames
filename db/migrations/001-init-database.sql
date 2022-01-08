CREATE DATABASE Impuls

CREATE TABLE IF NOT EXISTS account (
    id_account BIGSERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
    id_role SMALLINT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS account_role (
    id_account BIGSERIAL NOT NULL,
    id_role SMALLINT NOT NULL,
    PRIMARY KEY (id_account, id_role),
    CONSTRAINT FK_account_role_account FOREIGN KEY (id_account)
    REFERENCES account(id_account)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS game (
    id_game SMALLINT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS game_result (
    id_game_result BIGSERIAL PRIMARY KEY NOT NULL,
    id_account BIGSERIAL NOT NULL,
    id_game SMALLINT  NOT NULL,
    quantity_tasks INT NOT NULL,
    quantity_true_answers INT NOT NULL,
    CONSTRAINT FK_game_result_game FOREIGN KEY (id_game)
    REFERENCES game(id_game),
    CONSTRAINT FK_game_result_account FOREIGN KEY (id_account)
    REFERENCES account(id_account)
);

CREATE TABLE IF NOT EXISTS complexity (
    id_complexity SMALLINT PRIMARY KEY NOT NULL,
    complexity_kind SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS game_complexity (
    id_game_complexity BIGSERIAL PRIMARY KEY NOT NULL,
    id_game SMALLINT NOT NULL,
    id_complexity SMALLINT NOT NULL,
    CONSTRAINT FK_game_complexity_game FOREIGN KEY (id_game)
    REFERENCES game(id_game)
);
