package com.crud.controller;

import com.crud.pojo.Employee;
import com.crud.service.EmployeeService;
import com.crud.util.Msg;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Description: 处理员工crud请求
 * @Author: jpj
 * @Date: 2020/5/26
 */

@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    //查询员工数据，进行分页查询
@RequestMapping("/emps")
    public Msg getEmpsWith(@RequestParam(value = "pn",defaultValue = "1")Integer pn){
    //引入pageHelper 分页插件
    //在查询之前需要调用，传入页码以及每页的数目大小
    PageHelper.startPage(pn,5);
    List<Employee> emps = employeeService.getAll();
    //使用pagerinfo包装的查询后的结果，只需要将pageinfo交给页面就行了
    //封装了详细的分页信息，包括查询出来的数据，传入需要显示的页数
    PageInfo page = new PageInfo(emps, 5);
    return Msg.success().add("pageInfo",page);
    }
    //


}
