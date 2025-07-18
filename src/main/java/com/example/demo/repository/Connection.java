package com.example.demo.repository;

public class Connection {
    private String name;
    private Integer score;
    private Integer mutual;

    public Connection(String name, Integer score, Integer mutual) {
        this.name = name;
        this.score = score;
        this.mutual = mutual;
    }

    public Integer getMutual() {
        return mutual;
    }

    public void setMutual(Integer mutual) {
        this.mutual = mutual;
    }

    public Connection() {
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
