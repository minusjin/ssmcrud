package com.crud.service;

import com.crud.pojo.Department;

import java.util.List;

public interface DepartmentService {

    public List<Department> getDepts();

    public void deletedept(Integer id);

    public void saveDept(Department department);

}
