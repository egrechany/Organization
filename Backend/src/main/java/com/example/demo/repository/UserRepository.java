package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = "SELECT u.name FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT(:letters, '%'))")
    List<String> findLikeThree(@Param("letters") String letters);

    @Query(value = """
            WITH RECURSIVE supporters AS (
                SELECT name AS supportersid FROM associates WHERE supporting_name = :input_name
                    UNION ALL
                SELECT a.name
                FROM supporters s
                JOIN associates a ON s.supportersid = a.supporting_name
                WHERE s.supportersid != :input_name
            )
            SELECT COUNT(*) FROM supporters;
            """, nativeQuery = true)
    Integer getVotes(@Param("input_name") String input_name);

    @Query(value = "SELECT VERSION()")
    String getV();

    @Query(value = """
            SELECT name, leader_votes(name) AS votes
            FROM associates
            WHERE name = supporting_name
            ORDER BY votes DESC;
            """,nativeQuery = true)
    List<Object[]> getLeaders();

    @Query(value = """
            SELECT name, leader_votes(name) AS votes
            FROM associates
            WHERE supporting_name = :input_name
            ORDER BY votes DESC;
            """,nativeQuery = true)
    public List<Object[]> getSupporters(@Param("input_name") String input_name);

    @Query(value = """
            SELECT name , leader_votes(name) AS votes FROM associates
                WHERE name = :connection_name
                AND
                :parent_name IN(left_connection_name)
                AND
                :connection_password IN(left_connection_password);
            """,nativeQuery = true)
    public List<Object[]> getRightConnection(@Param("connection_name") String connection_name,
                                          @Param("parent_name") String parent_name,
                                          @Param("connection_password") String connection_password);

    @Query(value = """
            SELECT name , leader_votes(name) AS votes FROM associates
                WHERE name = :connection_name
                AND
                :parent_name IN(right_connection_name)
                AND
                :connection_password IN(right_connection_password);
            """,nativeQuery = true)
    public List<Object[]> getLeftConnection(@Param("connection_name") String connection_name,
                                             @Param("parent_name") String parent_name,
                                             @Param("connection_password") String connection_password);

    @Query(value = """
            SELECT name , leader_votes(name) AS votes FROM associates
                WHERE name = :connection_name
                AND
                :parent_name IN(up_connection_name)
                AND
                :connection_password IN(up_connection_password);
            """,nativeQuery = true)
    public List<Object[]> getUpConnection(@Param("connection_name") String connection_name,
                                            @Param("parent_name") String parent_name,
                                            @Param("connection_password") String connection_password);

    @Query(value = """
            SELECT name , leader_votes(name) AS votes FROM associates
                WHERE name = :connection_name
                AND
                :parent_name IN(down_connection_name)
                AND
                :connection_password IN(down_connection_password);
            """,nativeQuery = true)
    public List<Object[]> getDownConnection(@Param("connection_name") String connection_name,
                                          @Param("parent_name") String parent_name,
                                          @Param("connection_password") String connection_password);

    @Query(value = """
            SELECT name , supporting_name , left_connection_name , right_connection_name , up_connection_name , down_connection_name , leader_votes(name) AS votes FROM associates
                WHERE name = :input_name
            """,nativeQuery = true)
    public List<Object[]> getUser(@Param("input_name") String input_name);

    @Query(value = """
            SELECT 'down' AS connection , down_connection_name AS c_name , leader_votes(down_connection_name) AS score ,
            (SELECT
                CASE
                    WHEN a.down_connection_password = b.up_connection_password THEN 1
                    ELSE 0
                END AS mutual
            FROM associates a
            JOIN associates b ON a.name != b.name
            WHERE a.name = :input_name AND b.name = associates.down_connection_name)
            FROM associates WHERE name = :input_name
            UNION
            SELECT 'up' AS connection , up_connection_name AS name , leader_votes(up_connection_name) AS score ,
            (SELECT
                CASE
                    WHEN a.up_connection_password = b.down_connection_password THEN 1
                    ELSE 0
                END AS mutual
            FROM associates a
            JOIN associates b ON a.name != b.name
            WHERE a.name = :input_name AND b.name = associates.up_connection_name)
            FROM associates WHERE name = :input_name
            UNION
            SELECT 'right' AS connection , right_connection_name AS name , leader_votes(right_connection_name) AS score ,
            (SELECT
                CASE
                    WHEN a.right_connection_password = b.left_connection_password THEN 1
                    ELSE 0
                END AS mutual
            FROM associates a
            JOIN associates b ON a.name != b.name
            WHERE a.name = :input_name AND b.name = associates.right_connection_name)
            FROM associates WHERE name = :input_name
            UNION
            SELECT 'left' AS connection , left_connection_name AS name , leader_votes(left_connection_name) AS score ,
            (SELECT
                CASE
                    WHEN a.left_connection_password = b.right_connection_password THEN 1
                    ELSE 0
                END AS mutual
            FROM associates a
            JOIN associates b ON a.name != b.name
            WHERE a.name = :input_name AND b.name = associates.left_connection_name)
            FROM associates WHERE name = :input_name;
            """,nativeQuery = true)
    public List<Object[]> getUserConnections(@Param("input_name") String input_name);

    @Query(value = """
            SELECT name , supporting_name , leader_votes(name) AS votes , created_time FROM associates
            WHERE name = :input_name;
            """,nativeQuery = true)
    public List<Object[]> getUserBase(@Param("input_name") String input_name);

    @Query(value = """
            SELECT 'down' AS connection , down_connection_name AS c_name ,
                        (SELECT
                            CASE
                                WHEN :input_down_password = b.up_connection_password AND :input_down_name = b.name THEN 1
                                ELSE 0
                            END AS mutual
                        FROM associates a
                        JOIN associates b ON a.name != b.name
                        WHERE a.name = :input_name AND b.name = associates.down_connection_name)
                        FROM associates WHERE name = :input_name
                        UNION
            SELECT 'up' AS connection , up_connection_name AS name ,
                        (SELECT
                            CASE
                                WHEN :input_up_password = b.down_connection_password AND :input_up_name = b.name THEN 1
                                ELSE 0
                            END AS mutual
                        FROM associates a
                        JOIN associates b ON a.name != b.name
                        WHERE a.name = :input_name AND b.name = associates.up_connection_name)
                        FROM associates WHERE name = :input_name
                        UNION
            SELECT 'right' AS connection , right_connection_name AS name ,
                        (SELECT
                            CASE
                                WHEN :input_right_password = b.left_connection_password AND :input_right_name = b.name THEN 1
                                ELSE 0
                            END AS mutual
                        FROM associates a
                        JOIN associates b ON a.name != b.name
                        WHERE a.name = :input_name AND b.name = associates.right_connection_name)
                        FROM associates WHERE name = :input_name
                        UNION
            SELECT 'left' AS connection , left_connection_name AS name ,
                        (SELECT
                            CASE
                                WHEN :input_left_password = b.right_connection_password AND :input_left_name = b.name THEN 1
                                ELSE 0
                            END AS mutual
                        FROM associates a
                        JOIN associates b ON a.name != b.name
                        WHERE a.name = :input_name AND b.name = associates.left_connection_name)
                        FROM associates WHERE name = :input_name;
        """,nativeQuery = true)
    public List<Object[]> getUserMatching(@Param("input_name") String input_name,
                                          @Param("input_down_password") String input_down_password,
                                          @Param("input_up_password") String input_up_password,
                                          @Param("input_right_password") String input_right_password,
                                          @Param("input_left_password") String input_left_password,
                                          @Param("input_down_name") String input_down_name,
                                          @Param("input_up_name") String input_up_name,
                                          @Param("input_right_name") String input_right_name,
                                          @Param("input_left_name") String input_left_name);

    @Query(value = """
            UPDATE associates SET supporting_name = :input_supporting_name WHERE name = :input_name;
            """,nativeQuery = true)
    public void setSupportingName(@Param("input_name") String input_name,@Param("input_supporting_name") String input_supporting_name);

    @Query(value = """
            UPDATE associates SET name = :input_new_name WHERE name = :input_name;
            """,nativeQuery = true)
    public void setNewName(@Param("input_name") String input_name,@Param("input_new_name") String input_new_name);

    @Query(value = """
            SELECT * FROM associates WHERE name = :input_name
            """,nativeQuery = true)
    public User getUserAll(@Param("input_name") String input_name);



    @Query(value = """
            INSERT INTO associates (name,supporting_name,:column_name,:column_password)
            VALUES (:input_name,:input_supporting_name,:input_conn_name,:input_conn_password)
            """,nativeQuery = true)
    public User createNewUser(@Param("input_name") String input_name,
                              @Param("column_name") String column_name,
                              @Param("column_password") String column_password,
                              @Param("input_supporting_name") String input_supporting_name,
                              @Param("input_conn_name") String input_conn_name,
                              @Param("input_conn_password") String input_conn_password);
}
