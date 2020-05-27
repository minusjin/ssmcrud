$(function () {
    $("#reg_sub").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var email = $("#email").val();
        var verify  =  $("#verify").val();

        $.ajax({
            url:"http://localhost:8080/user/register",
            type:"POST",
            data:{username,password,email,verify},
            success:function (result) {
                var msg =result.Msg;
                if(msg == "true"){
                    window.location.href="login.html";
                }else {
                    alert(msg);
                }
            }
        })
    })

    $("#getverify").click(function(){
        var email = $("#email").val();
        $.ajax({
            url:"http://localhost:8080/user/active",
            data: {email},
            type: "POST",
            success:function (result) {
                var msg =result.Msg;
                if(msg == "true"){
                    alert("请前往邮箱获取验证码");
                }else {
                   alert("邮箱注册失败");

                }

            }
        })


    })

})