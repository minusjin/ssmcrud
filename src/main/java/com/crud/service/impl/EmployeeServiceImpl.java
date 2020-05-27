package com.crud.service.impl;

import com.crud.mapper.EmployeeMapper;
import com.crud.pojo.Employee;
import com.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeMapper employeeMapper;


    //员工分页查询
    @Override
    public List<Employee> getAll() {
        return employeeMapper.selectByExampleWithDept(null);
    }

    @Override
    public void saveEmp(Employee employee) {

    }

    @Override
    public boolean checkUser(String empName) {
        return false;
    }

    @Override
    public Employee getEmp(Integer id) {
        return null;
    }

    @Override
    public void updateEmp(Employee employee) {

    }

    @Override
    public void deleteBatch(List<Integer> del_ids) {

    }

    @Override
    public void deleteEmp(Integer id) {

    }
}
