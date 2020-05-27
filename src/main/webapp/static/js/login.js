$(function () {
    $("#btn_sub").click(function () {
         var username = $("#username").val();
         var password = $("#password").val();
        $.ajax({
            url:"http://localhost:8080/user/login",
            type:"POST",
            data:{username,password},

            success:function (result) {
             var msg =result.Msg;
               if(msg == "true"){
                   window.location.href="/pages/index.html";
               }else {
                   alert(msg);
               }
            }
        })
    })
})