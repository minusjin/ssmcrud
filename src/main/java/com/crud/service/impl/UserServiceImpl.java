package com.crud.service.impl;

import com.crud.mapper.UserMapper;
import com.crud.pojo.User;
import com.crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User selectByPrimaryKey(User user) {

        return userMapper.selectByPrimaryKey(user);
    }

    @Override
    public void insert(User user) {
        userMapper.insert(user);
    }

    @Override
    public void updateByPrimaryKey(User user) {
        userMapper.updateByPrimaryKey(user);
    }
}
