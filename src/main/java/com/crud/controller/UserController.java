package com.crud.controller;

import com.crud.pojo.User;
import com.crud.service.UserService;
import com.crud.util.EMail;
import com.crud.util.VerifyCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
   private UserService userService;
    //登录
    @ResponseBody
    @RequestMapping("/login")
    public Map<String,Object> login(User user){
        Map<String, Object> model = new HashMap<>();

        User uu = userService.selectByPrimaryKey(user);

        if(uu==null){
            model.put("Msg","用户名不存在");
        }else {
            model.put("Msg","true");
        }
        return  model;
    }
    //注册
    @ResponseBody
    @RequestMapping("/register")
    public Map<String,Object> register (User user,HttpSession session,String verify){
        Map<String,Object> model = new HashMap<>();
      user.setState("1");
        //添加用户名
        if (session.getAttribute("verifyCode").equals(verify)){
            userService.insert(user);

            model.put("Msg","true");
        }
        return model;
    }
    @ResponseBody
    @RequestMapping("/active")
    public Map<String,Object> active(User user,HttpSession session, VerifyCode verifyCode, EMail eMail){
        HashMap<String, Object> model = new HashMap<>();
        String code = verifyCode.createVerifyCode();
        eMail.setSubject("验证码激活邮件");
        String str ="点用如下验证码，激活账号<br> "
                + code;
        eMail.setContent(str);
        eMail.setTo(new String[] {user.getEmail()});
        //发送邮件
        try {
            eMail.sendMessage();
            System.out.println("发送邮件成功！");
        } catch (Exception e) {
            System.out.println("发送邮件失败！");
            e.printStackTrace();
        }
        session.setAttribute("verifyCode",code);
        session.setMaxInactiveInterval(120);
        model.put("Msg","true");
        return model;
    }





}
