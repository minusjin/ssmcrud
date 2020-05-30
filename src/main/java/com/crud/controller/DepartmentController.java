package com.crud.controller;

import com.crud.pojo.Department;
import com.crud.service.DepartmentService;
import com.crud.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Description: 处理部门有关的请求
 * @Author: jpj
 * @Date: 2020/5/29
 */
@RestController
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;
    /*
    * 返回所有的部门信息*/
    @ResponseBody
    @RequestMapping("/depts")
    public Msg getDepts(){
        //查询显示部门消息
        List<Department> list = departmentService.getDepts();
        return Msg.success().add("depts",list);
    }
    //保存部门
    @ResponseBody
    @RequestMapping("/savedept")
    public Msg savedept(Department department){
        System.out.println(department.getDeptName());
        departmentService.saveDept(department);
        return Msg.success();
    }

    //删除部门信息
    @ResponseBody
    @RequestMapping(value = "/depts/{id}",method = RequestMethod.DELETE)
    public Msg delDepts(@PathVariable("id")Integer id){
        //根据id删除一个部门
        departmentService.deletedept(id);
        return Msg.success();
    }

}
