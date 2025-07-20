package com.example.demo.repository;

import java.time.Instant;
import java.util.List;
import java.time.OffsetDateTime;

public class UserFrontEnd
{
    private Integer votes;

    private String name;

    private String supportingName;

    private Instant registerDate;

    private List<Connection> connections;

    public List<Connection> getConnections() {
        return connections;
    }

    public void setConnections(List<Connection> connections) {
        this.connections = connections;
    }

    public Instant getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Instant registerDate) {
        this.registerDate = registerDate;
    }

    public UserFrontEnd() {
    }

    public Integer getVotes() {
        return votes;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSupportingName() {
        return supportingName;
    }

    public void setSupportingName(String supportingName) {
        this.supportingName = supportingName;
    }

}
