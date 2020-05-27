package com.crud.service;

import com.crud.pojo.Employee;

import java.util.List;

/**
 * @Description: 员工的service层
 * @Author: jpj
 * @Date: 2020/5/26
 */
public interface EmployeeService {

    //获取所有信息
    public List<Employee> getAll();
    //保存信息
    void saveEmp(Employee employee);
    //选择员工
    boolean checkUser(String empName);
    //获取员工
    Employee getEmp(Integer id);
    //更行员工信息
    void updateEmp(Employee employee);
    //删除员工信息
    void deleteBatch(List<Integer> del_ids);
    //根据id删除
    void deleteEmp(Integer id );


}
