package com.example.demo.service;

import com.example.demo.repository.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public List<String> findLikeThree(String three){
        return userRepository.findLikeThree(three);
    }

    public Integer getVotes(String name){
        return userRepository.getVotes(name);
    }

    public String getV(){
        return userRepository.getV();
    }

    public String getLeaders(){
        return userRepository.getLeaders();
    }
}
