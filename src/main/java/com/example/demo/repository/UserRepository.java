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
            SELECT name AS supportersid FROM associates WHERE supporting_name = :name
            UNION ALL
            SELECT name FROM supporters , associates WHERE supporters.supportersid = associates.supporting_name AND supporters.supportersid != :name
            )
            SELECT COUNT(*) FROM supporters;
            """, nativeQuery = true)
    Integer getVotes(@Param("name") String name);

    @Query(value = "SELECT VERSION()")
    String getV();

    @Query(value = "SELECT VERSION()")
    String getLeaders();
}
