package com.example.demo.repository;

import java.util.List;

public class AssociateModified
{
    private String name;
    private String supports;
    private List<ConnectionModified> connections;
    private Integer modifiedIndex;
    private Boolean isIncreased;

    public Boolean getIncreased() {
        return isIncreased;
    }

    public void setIncreased(Boolean increased) {
        isIncreased = increased;
    }

    public Integer getModifiedIndex() {
        return modifiedIndex;
    }

    public void setModifiedIndex(Integer modifiedIndex) {
        this.modifiedIndex = modifiedIndex;
    }

    public AssociateModified() {
    }

    public List<ConnectionModified> getConnections() {
        return connections;
    }

    public void setConnections(List<ConnectionModified> connections) {
        this.connections = connections;
    }

    public String getSupports() {
        return supports;
    }

    public void setSupports(String supports) {
        this.supports = supports;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
