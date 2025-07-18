package com.example.demo.service;

import com.example.demo.repository.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.ArrayList;
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

    public List<Leader> getLeaders(){
        List<Object[]> results = userRepository.getLeaders();
        List<Leader> leaders = new ArrayList<>();
        for(Object[] row : results){
            String name = (String) row[0];
            Integer votes = ((Number) row[1]).intValue();
            leaders.add(new Leader(name, votes));
        }
        return leaders;
    }

    public List<Leader> getSupporters(String input_name){
        List<Object[]> results = userRepository.getSupporters(input_name);
        List<Leader> leaders = new ArrayList<>();
        for(Object[] row : results){
            String name = (String) row[0];
            Integer votes = ((Number) row[1]).intValue();
            leaders.add(new Leader(name, votes));
        }
        return leaders;
    }

    public UserFrontEnd getUserFrontEnd(String input_name){
        UserFrontEnd userfrontend = new UserFrontEnd();
        List<Object[]> object_c = userRepository.getUserConnections(input_name);
        List<Object[]> object = userRepository.getUserBase(input_name);
        userfrontend.setSupportingName((String)object.get(0)[1]);
        userfrontend.setVotes((Integer)object.get(0)[2]);
        userfrontend.setName((String)object.get(0)[0]);
        userfrontend.setRegisterDate((Instant) object.get(0)[3]);
        List<Connection> connections = new ArrayList<Connection>();
        for(Object[] row: object_c)
        {
            String name = (String)row[1];
            Integer score = (Integer)row[2];
            Integer mutual = (Integer)row[3];
            if (name == null)
            {
                connections.add(null);
            }else{
                connections.add(new Connection(name,score,mutual));
            }
        }

        userfrontend.setConnections(connections);
        return userfrontend;
    }

    public Boolean postUserFrontEnd(AssociateModified body)
    {
        User userRow = userRepository.getUserAll(body.getName());
        if (userRow == null)
        {
            if((body.getIncreased() != true) ||(body.getModifiedIndex() != -1))
                return false;

            User partnerRow = userRepository.getUserAll(body.getConnections().get(body.getModifiedIndex()).getName());

            if(partnerRow == null)
                return false;

            ConnectionModified conn = new ConnectionModified();

            switch (body.getModifiedIndex()){
                case 0:
                    conn.setName(partnerRow.getDownConnectionName());
                    conn.setPassword(partnerRow.getDownConnectionPassword());
                case 1:
                    conn.setName(partnerRow.getLeftConnectionName());
                    conn.setPassword(partnerRow.getLeftConnectionPassword());
                case 2:
                    conn.setName(partnerRow.getTopConnectionName());
                    conn.setPassword(partnerRow.getTopConnectionPassword());
                case 3:
                    conn.setName(partnerRow.getRightConnectionName());
                    conn.setPassword(partnerRow.getRightConnectionPassword());
            }

            if((body.getConnections().get(body.getModifiedIndex()).getPassword()==conn.getPassword()) && (body.getConnections().get(body.getModifiedIndex()).getName()==conn.getName())){
                //insert into
                switch(body.getModifiedIndex()){
                    case 0:
                        userRepository.createNewUser(body.getName(),"up_connection_name","up_connection_password",body.getSupports(),body.getConnections().get(0).getName(),body.getConnections().get(0).getPassword());
                    case 1:
                        userRepository.createNewUser(body.getName(),"right_connection_name","right_connection_password",body.getSupports(),body.getConnections().get(1).getName(),body.getConnections().get(1).getPassword());
                    case 3:
                        userRepository.createNewUser(body.getName(),"down_connection_name","down_connection_password",body.getSupports(),body.getConnections().get(2).getName(),body.getConnections().get(2).getPassword());
                    case 4:
                        userRepository.createNewUser(body.getName(),"left_connection_name","left_connection_password",body.getSupports(),body.getConnections().get(3).getName(),body.getConnections().get(3).getPassword());
                }

            }

        }else {
            List<ConnectionModified> connections = body.getConnections();
            List<Object[]> object = userRepository.getUserMatching(body.getName(), connections.get(0).getPassword(), connections.get(1).getPassword(),
                    connections.get(2).getPassword(), connections.get(3).getPassword(), connections.get(0).getName(), connections.get(1).getName(),
                    connections.get(2).getName(), connections.get(3).getName());


            int needMutual = 0;
            int mutual = 0;
            for (int i = 0; i < 4; i++) {
                if (object.get(i)[1] != null) {
                    if (body.getModifiedIndex() == i)
                    {

                    } else {
                        needMutual++;
                    }

                    if ((Integer) object.get(i)[2] == 1) {
                        mutual++;
                    }
                }
            }



            if (body.getModifiedIndex() == -1) {

            } else {
                if (mutual < needMutual) {
                    return false;
                } else {
                    //update connection
                    //recursive search

                    userRepository.setSupportingName(body.getName(), body.getSupports());
                    return true;
                }
            }

            return true;
        }
        return false;
    }
}
