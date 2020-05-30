package com.crud.service.impl;

import com.crud.mapper.DepartmentMapper;
import com.crud.pojo.Department;
import com.crud.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description: 部门实现类
 * @Author: jpj
 * @Date: 2020/5/29
 */
@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentMapper departmentMapper;
//查询获取所有部门信息
    @Override
    public List<Department> getDepts() {
        List<Department> list = departmentMapper.selectByExample(null);
        return list;
    }
//删除一个部门
    @Override
    public void deletedept(Integer id) {
        departmentMapper.deleteByPrimaryKey(id);
    }
//保存一个部门
    @Override
    public void saveDept(Department department) {
        departmentMapper.insert(department);
    }


}
