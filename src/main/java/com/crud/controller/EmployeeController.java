package com.crud.controller;

import com.crud.pojo.Employee;
import com.crud.service.EmployeeService;
import com.crud.util.Msg;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.CredentialException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    //员工信息保存
@RequestMapping(value = "/emps",method = RequestMethod.POST)
    public Msg saveEmp(@Valid Employee employee, BindingResult result){
    if (result.hasErrors()){
        //如果校验失败，应该返回失败在模态框中显示校验失败的错误信息
        Map<String, Object> map = new HashMap<>();
        List<FieldError> errors = result.getFieldErrors();
        for(FieldError fieldError:errors){
            //错误信息添加到map中
            map.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        return Msg.fail().add("errorFields",map);
    }else {
        employeeService.saveEmp(employee);
        return Msg.success();
    }
}
//检查用户名是否可用
 @RequestMapping("/checkuser")
public Msg checkYser(@RequestParam("empName") String empName){
    //先判断用户名是否是合法的表达式
     String regName = "(^[a-zA-Z0-9_-]{6,16}$)|(^[\u2E80-\u9FFF]{2,5})";
     if (!empName.matches(regName)){
         return Msg.fail().add("va_msg","用户名必须是6-16位数字和字母的组合或者2-5位中文");

     }
     //数据库用户名重复校验
     boolean b = employeeService.checkUser(empName);
     if (b){
         return Msg.success();
     }else {
         return Msg.fail().add("va_msg","用户名不可用");
     }
 }

 //根据id查询员工
    @RequestMapping(value = "/emp/{id}",method = RequestMethod.GET)
    public Msg getEmp(@PathVariable("id")Integer id){
        Employee employee = employeeService.getEmp(id);
        return Msg.success().add("emp",employee);
    }
 //更新员工信息
 @RequestMapping(value = "/emp/{empId}",method = RequestMethod.PUT)
 public Msg updateEmp(Employee employee){
    employeeService.updateEmp(employee);
    return Msg.success();
 }
    //员工删除
    @RequestMapping(value = "/emp/{ids}",method = RequestMethod.DELETE)
    public Msg deleteEmpById(@PathVariable("ids") String ids){
    if (ids.contains("-")){
        //创建集合删除批量id
        List<Integer> del_ids = new ArrayList<>();
        String[] str_ids = ids.split("-");
        //组装id集合
        for (String string : str_ids){
            del_ids.add(Integer.parseInt(string));
        }
        employeeService.deleteBatch(del_ids);
    }else {
        //单个删除
        Integer id  = Integer.parseInt(ids);
        employeeService.deleteEmp(id);
    }
    return Msg.success();
    }

}
