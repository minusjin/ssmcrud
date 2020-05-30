package com.crud.service.impl;

import com.crud.mapper.EmployeeMapper;
import com.crud.pojo.Employee;
import com.crud.pojo.EmployeeExample;
import com.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/** 
 * @Description: 员工实现类 
 * @Author: jpj
 * @Date: 2020/5/30 
 */
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
    //员工保存
    @Override
    public void saveEmp(Employee employee) {
        employeeMapper.insertSelective(employee);
    }
    //检查用户名是否可用
    @Override
    public boolean checkUser(String empName) {
        EmployeeExample example = new EmployeeExample();
        EmployeeExample.Criteria criteria = example.createCriteria();
        criteria.andEmailEqualTo(empName);
        //记录数
        long count = employeeMapper.countByExample(example);
        return count == 0;
    }
    //根据id查询员工信息
    @Override
    public Employee getEmp(Integer id) {
        Employee employee = employeeMapper.selectByPrimaryKey(id);

        return employee;
    }
    //员工更新
    @Override
    public void updateEmp(Employee employee) {
        employeeMapper.updateByPrimaryKeySelective(employee);
    }
    //批量删除
    @Override
    public void deleteBatch(List<Integer> del_ids) {
        EmployeeExample example = new EmployeeExample();
        EmployeeExample.Criteria criteria = example.createCriteria();
        criteria.andEmpIdIn(del_ids);
        employeeMapper.deleteByExample(example);
    }
    //员工删除
    @Override
    public void deleteEmp(Integer id) {
        employeeMapper.deleteByPrimaryKey(id);
    }
}
