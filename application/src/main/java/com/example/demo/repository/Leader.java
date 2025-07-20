package com.example.demo.repository;

public class Leader {
    private String name;
    private Integer votes;

    public Leader(String name, Integer votes) {
        this.name = name;
        this.votes = votes;
    }

    // геттеры и сеттеры
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getVotes() { return votes; }
    public void setVotes(Integer votes) { this.votes = votes; }
}
