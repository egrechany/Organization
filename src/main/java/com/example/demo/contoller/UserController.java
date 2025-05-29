package com.example.demo.contoller;

import com.example.demo.repository.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/associates")
public class UserController {

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private final UserService userService;

    @GetMapping("/getAll")
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/lt/{three}")
    public List<String> findLikeThree(@PathVariable("three") String three){
        return userService.findLikeThree(three);
    }

    @GetMapping("/votes/{name}")
    public Integer getVotes(@PathVariable("name") String name){
        return userService.getVotes(name);
    }

    @GetMapping("/version")
    public String getV(){
        return userService.getV();
    }

    @GetMapping("/leaders")
    public String getLeaders(){
        return userService.getLeaders();
    }
}
