package com.crud.util;

import java.util.Random;

/**
 * 用于生成随机验证码的工具类
 *
 * @author wjh
 * @create 2019-09-13 22:31
 */
public class VerifyCode {


    public static String createVerifyCode() {
        StringBuilder str = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            str.append(random.nextInt(10));
        }
        return str.toString();
    }


}
