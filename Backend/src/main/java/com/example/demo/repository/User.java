package com.example.demo.repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "associates" )
public class User {

    public User(String name) {
        this.name = name;
    }

    public User() {
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

    public String getLeftConnectionName() {
        return leftConnectionName;
    }

    public void setLeftConnectionName(String leftConnectionName) {
        this.leftConnectionName = leftConnectionName;
    }

    public String getRightConnectionName() {
        return rightConnectionName;
    }

    public void setRightConnectionName(String rightConnectionName) {
        this.rightConnectionName = rightConnectionName;
    }

    public String getTopConnectionName() {
        return topConnectionName;
    }

    public void setTopConnectionName(String topConnectionName) {
        this.topConnectionName = topConnectionName;
    }

    public String getDownConnectionName() {
        return downConnectionName;
    }

    public void setDownConnectionName(String downConnectionName) {
        this.downConnectionName = downConnectionName;
    }

    public String getLeftConnectionPassword() {
        return leftConnectionPassword;
    }

    public void setLeftConnectionPassword(String leftConnectionPassword) {
        this.leftConnectionPassword = leftConnectionPassword;
    }

    public String getRightConnectionPassword() {
        return rightConnectionPassword;
    }

    public void setRightConnectionPassword(String rightConnectionPassword) {
        this.rightConnectionPassword = rightConnectionPassword;
    }

    public String getTopConnectionPassword() {
        return topConnectionPassword;
    }

    public void setTopConnectionPassword(String topConnectionPassword) {
        this.topConnectionPassword = topConnectionPassword;
    }

    public String getDownConnectionPassword() {
        return downConnectionPassword;
    }

    public void setDownConnectionPassword(String downConnectionPassword) {
        this.downConnectionPassword = downConnectionPassword;
    }

    public LocalDateTime getCreated_time() {
        return created_time;
    }

    public void setCreated_time(LocalDateTime created_time) {
        this.created_time = created_time;
    }

    public LocalDateTime getUpdated_time() {
        return updated_time;
    }

    public void setUpdated_time(LocalDateTime updated_time) {
        this.updated_time = updated_time;
    }


    @Id
    @Column(name = "name")
    private String name;

    @Column(name = "supporting_name")
    private String supportingName;

    @Column(name = "left_connection_name")
    private String leftConnectionName;

    @Column(name = "right_connection_name")
    private String rightConnectionName;

    @Column(name = "up_connection_name")
    private String topConnectionName;

    @Column(name = "down_connection_name")
    private String downConnectionName;

    @Column(name = "left_connection_password")
    private String leftConnectionPassword;

    @Column(name = "right_connection_password")
    private String rightConnectionPassword;

    @Column(name = "up_connection_password")
    private String topConnectionPassword;

    @Column(name = "down_connection_password")
    private String downConnectionPassword;

    @Column(name = "created_time")
    private LocalDateTime created_time;

    @Column(name = "updated_time")
    private LocalDateTime updated_time;

}
