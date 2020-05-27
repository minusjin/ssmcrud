package com.crud.service;

import com.crud.pojo.User;



public interface UserService {
    public User selectByPrimaryKey(User user);

    public void insert(User user);

    public void updateByPrimaryKey(User user);

}
