CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contrasena varchar(255) NOT NULL,
    fecha date
);

INSERT INTO users (username, email, contrasena, fecha) VALUES ('Miles Davis', 'miles@outlook.com', 'miles1234', (current_date));
INSERT INTO users (username, email, contrasena, fecha) VALUES ('John Coltrane', 'coltrane@outlook.com', 'coltrane1234', (current_date));
INSERT INTO users (username, email, contrasena, fecha) VALUES ('Charles Mingus', 'mingus@outlook.com', 'mingus1234', (current_date));