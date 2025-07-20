CREATE TABLE associates (name varchar(25) PRIMARY KEY,supporting_name varchar(25),
left_connection_name varchar(25),right_connection_name varchar(25),
up_connection_name varchar(25),down_connection_name varchar(25),
left_connection_password varchar(25),right_connection_password varchar(25),
up_connection_password varchar(25),down_connection_password varchar(25),
created_time TIMESTAMP WITH TIME ZONE,updated_time TIMESTAMP WITH TIME ZONE);

CREATE OR REPLACE FUNCTION set_updated_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_time := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_update_associates
BEFORE UPDATE ON associates
FOR EACH ROW
EXECUTE FUNCTION set_updated_time();

INSERT INTO associates(name,supporting_name) VALUES('Stepan','Stepan'),
('Ivan','Stepan'),('Adolf Hitler','Adolf Hitler'),
('Adolf','Adolf Hitler'),('Jacky','Adolf'),('Svetlana','Jacky'),
('Sveta','Jacky') , ('Jack Vorobei','Jacky'),('Jack Hacker','Jacky');

INSERT INTO associates(name,supporting_name) VALUES('Avdei','Jacky'),
('Anton','Avdei'),('Adolf Hitler','Jacky'),
('Gordon','Jacky'),('Gebbels','Jacky'),('Putin','Jacky'),
('Trump','Jacky') , ('Obama','Jacky'),('Sergei','Jacky');


DROP FUNCTION IF EXISTS leader_votes(VARCHAR);

CREATE OR REPLACE FUNCTION leader_votes(input_name VARCHAR)
RETURNS INTEGER AS $$
DECLARE
    votes_count INTEGER;
BEGIN
    WITH RECURSIVE supporters AS (
        SELECT name AS supportersid FROM associates WHERE supporting_name = input_name
        UNION ALL
        SELECT a.name
        FROM supporters s
        JOIN associates a ON s.supportersid = a.supporting_name
        WHERE s.supportersid != input_name
    )
    SELECT COUNT(*) INTO votes_count FROM supporters;

    RETURN votes_count;
END;
$$ LANGUAGE plpgsql STABLE;


