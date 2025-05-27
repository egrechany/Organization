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
}
