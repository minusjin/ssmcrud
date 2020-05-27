$(function () {
// 定义全局变量，显示总记录数和当前页
    var totalRecord, currentPage;
// 页面加载完成以后，发送Ajax请求，要到分页数据
    $(function () {
        // 跳到首页
        to_page(1);
    });

    function to_page(pn) {
        $.ajax({
            url: "http://localhost:8080/emps",
            data: "pn=" + pn,
            type: "get",
            success: function (result) {
                //console.log(result)
                // 解析并显示员工数据
                build_emps_table(result);
                // 解析并显示分页信息
                build_page_info(result);
                // 解析并显示分页条
                build_page_nav(result);
            }
        })
    }

    function build_emps_table(result) {
        // 清空表格
        $("#emps_table tbody").empty();
        var emps = result.extend.pageInfo.list;
        // 遍历员工数据 index是索引，item是当前对象
        $.each(emps, function (index, item) {
            var checkBoxTd = $("<td><input type='checkbox' class='check_item'/></td>");
            var empIdTd = $("<td></td>").append(item.empId);
            var empNameTd = $("<td></td>").append(item.empName);
            var genderTd = $("<td></td>").append(item.gender == 'M' ? "男" : "女");
            var emailTd = $("<td></td>").append(item.email);
            var deptNameTd = $("<td></td>").append(item.department.deptName);
            var editBtn = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn")
                .append($("<span></span>").addClass("glyphicon glyphicon-pencil"))
                .append("编辑");
            // 为编辑按钮添加一个自定义的属性，来表示当前员工的id
            editBtn.attr("edit-id", item.empId);
            var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
                .append($("<span></span>").addClass("glyphicon glyphicon-trash"))
                .append("删除");
            // 为删除按钮添加一个自定义的属性，来表示当前需要删除员工的id
            delBtn.attr("del-id", item.empId)
            var btnTd = $("<td></td>").append(editBtn).append(" ").append(delBtn);
            // append 方法执行完成以后还是返回原来的元素
            $("<tr></tr>").append(checkBoxTd)
                .append(empIdTd)
                .append(empNameTd)
                .append(genderTd)
                .append(emailTd)
                .append(deptNameTd)
                .append(btnTd)
                .appendTo("#emps_table tbody");
        })
    }
// 解析显示分页信息
    function build_page_info(result) {
        $("#page_info_area").empty();
        $("#page_info_area").append("当前 " + result.extend.pageInfo.pageNum + " 页，" +
            "总 " + result.extend.pageInfo.pages + " 页，总 " + result.extend.pageInfo.total + " 条记录");
        totalRecord = result.extend.pageInfo.total;
        currentPage = result.extend.pageInfo.pageNum;
    }

// 解析显示分页导航条
    function build_page_nav(result) {
        $("#page_nav_area").empty();
        var ul = $("<ul></ul>").addClass("pagination")
        // 首页li
        var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
        // 前一页li
        var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));

        // 判断有没有前一页
        if (result.extend.pageInfo.hasPreviousPage == false) {
            firstPageLi.addClass("disabled");
            prePageLi.addClass("disabled");
        } else {
            // 为元素添加翻页的事件
            firstPageLi.click(function () {
                to_page(1)
            });
            prePageLi.click(function () {
                to_page(result.extend.pageInfo.pageNum - 1);
            });
        }

        // 后一页li
        var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
        // 末页li
        var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"));
        // 判断有没有下一页
        if (result.extend.pageInfo.hasNextPage == false) {
            nextPageLi.addClass("disabled");
            lastPageLi.addClass("disabled");
        } else {
            nextPageLi.click(function () {
                to_page(result.extend.pageInfo.pageNum + 1);
            });
            lastPageLi.click(function () {
                to_page(result.extend.pageInfo.pages);
            });
        }

        // 添加首页和前一页的提示
        ul.append(firstPageLi).append(prePageLi);
        // 遍历给ul中添加页码提示
        $.each(result.extend.pageInfo.navigatepageNums, function (index, item) {
            var numLi = $("<li></li>").append($("<a></a>").append(item));
            if (result.extend.pageInfo.pageNum == item) {
                numLi.addClass("active");
            }
            numLi.click(function () {
                to_page(item);
            })
            ul.append(numLi);
        });
        // 添加下一页和末页的提示
        ul.append(nextPageLi).append(lastPageLi);
        // 把ul加入到nav元素中
        var navEle = $("<nav></nav>").append(ul);
        navEle.appendTo("#page_nav_area");
    }

// 清空表单样式及内容
    function reset_form(ele) {
        $(ele)[0].reset();
        // 清空表单样式
        $(ele).find("*").removeClass("has-error has-success");
        $(ele).find(".help-block").text("");
    }

// 点击新增按钮，弹出模态框
    $("#emp_add_modal_btn").click(function () {

        // 点击新增弹出模态框之前，清空表单数据以及表单的样式
        reset_form("#empAddModal form");
        $("#empAddModal form");
        // [0].reset(); // Jquery没有reset方法，取出dom对象，调用reset方法
        // 发送Ajax请求，查出部门信息显示在下拉列表中
        getDepts("#empAddModal select");
        // 打开用于新增的模态框，并设置属性，点击其他地方时此模态框不会关闭
        $("#empAddModal").modal({
            backdrop: "static"
        })
    });

// 查出所有的部门信息并显示在下拉列表中
    function getDepts(ele) {
        // 清空之前下拉列表的值
        $(ele).empty();
        $.ajax({
            url: "http://localhost:8080/depts",
            type: "GET",
            success: function (result) {
                // 在下拉列表中显示部门信息
                // 遍历部门信息
                $.each(result.extend.depts, function () {
                    var optionEle = $("<option></option>").append(this.deptName).attr("value", this.deptId);
                    optionEle.appendTo(ele);
                });
            }
        });
    }

// 校验表单数据的方法
    function validate_add_form() {
        // 1.拿到需要校验的数据，使用Jquery里面的正则表达式
        var empName = $("#empName_add_input").val();
        // 允许出现a-z、A-Z、0-9、_、- ,长度为6-16位
        var regName = /(^[a-zA-Z0-9_-]{6,16}$)|(^[\u2E80-\u9FFF]{2,5})/;
        if (!regName.test(empName)) {
            //alert("用户名不正确，用户名可以是6-16位英文和数字的组合或者2-5位中文");
            // 错误信息显示
            show_validate_msg("#empName_add_input", "error", "用户名不正确，用户名可以是6-16位英文和数字的组合或者2-5位中文");

            return false;
        } else {

            show_validate_msg("#empName_add_input", "success", "");
        }
        ;

        // 2.校验邮箱信息
        var email = $("#email_add_input").val();
        var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!regEmail.test(email)) {
            // alert("邮箱格式不正确！请重新输入！")
            // 清空这个元素之前的样式
            show_validate_msg("#email_add_input", "error", "邮箱格式不正确！请重新输入！");
            // $("#email_add_input").parent().addClass("has-error");
            // $("#email_add_input").next("span").text("邮箱格式不正确！请重新输入！");
            return false;
        } else {
            show_validate_msg("#email_add_input", "success", "");
            // $("#email_add_input").parent().addClass("has-success");
            // // 清空span中的内容
            // $("#email_add_input").next("span").text("");
        }
        return true;
    }

// 显示校验结果的提示信息
    function show_validate_msg(ele, status, msg) {
        // 清空当前元素的校验状态
        $(ele).parent().removeClass("has-success has-error");
        $(ele).next("span").text("");
        if ("success" == status) {
            $(ele).parent().addClass("has-success");
            // 清空span中的内容
            $(ele).next("span").text(msg);
        } else if ("error" == status) {
            $(ele).parent().addClass("has-error");
            $(ele).next("span").text(msg);
        }
    };

// 校验用户名是否可用
    $("#empName_add_input").change(function () {
        // 发送Ajax请求校验用户名是否可用
        var empName = this.value;
        $.ajax({
            url: "http://localhost:8080/checkuser",
            data: "empName=" + empName,
            type: "POST",
            success: function (result) {
                if (result.code == 200) {
                    show_validate_msg("#empName_add_input", "success", "用户名可用");
                    $("#emp_save_btn").attr("ajax-va", "success");
                } else {
                    show_validate_msg("#empName_add_input", "error", result.extend.va_msg);
                    $("#emp_save_btn").attr("ajax-va", "error");
                }
            }
        })
    });

// 保存员工信息
    $("#emp_save_btn").click(function () {
        // 将模态框中提交的表单数据提交给服务器进行保存
        //1.需要给提交到服务器的数据进行校验
        if (!validate_add_form()) {
            return false;
        };
        // 2.判断之前的Ajax校验是否成功，如校验成功，继续走下一步
        if ($(this).attr("ajax-va") == "error") {
            return false;
        }

        // 3.发送Ajax请求保存员工
        $.ajax({
            url: "http://localhost:8080/emp",
            type: "POST",
            // $("#empAddModal form").serialize() 提取要提交的数据
            data: $("#empAddModal form").serialize(),
            success: function (result) {
                if (result.code == 200) {
                    // 当员工的数据保存成功以后，需要以下的步骤
                    // 1.关闭模态框
                    $("#empAddModal").modal('hide');
                    // 2.跳到最后一页，显示保存的数据
                    // 发送Ajax请求，显示最后一页数据即可
                    to_page(totalRecord);
                } else {
                    // 如果校验失败，显示失败信息
                    // console.log(result);
                    // 有那个字段的错误信息就显示那个字段的
                    if (undefined != result.extend.errorField.email) {
                        // 显示员工的邮箱错误信息
                        show_validate_msg("#email_add_input", "error", result.extend.errorField.email);
                    }
                    if (undefined != result.extend.errorField.empName) {
                        // 显示员工的名字错误信息
                        show_validate_msg("#empName_add_input", "error", result.extend.errorField.empName);
                    }
                }
            }
        });
    });

// 1.由于在创建按钮之前绑定了click事件，所以绑定不上
// 可以在创建按钮的时候绑定事件
    $(document).on("click", ".edit_btn", function () {
        // alert(1)
        // 查出部门信息，并显示
        getDepts("#empUpdateModal select");
        // 查出员工信息，并显示
        getEmp($(this).attr("edit-id"));
        // 把员工的id传给模态框的更新按钮
        $("#emp_update_btn").attr("edit-id", $(this).attr("edit-id"));
        $("#empUpdateModal").modal({
            backdrop: "static"
        })
    });

    function getEmp(id) {
        $.ajax({
            url: "http://localhost:8080/emp/" + id,
            type: "GET",
            success: function (result) {
                // console.log(result)
                // 员工数据
                var empData = result.extend.emp;
                $("#empName_update_static").text(empData.empName);
                $("#email_update_input").val(empData.email);
                $("#empUpdateModal input[name=gender]").val([empData.gender]);
                $("#empUpdateModal select").val([empData.dId]);
            }
        })
    }

// 点击更新按钮，更新员工信息
    $("#emp_update_btn").click(function () {
        // 1.验证邮箱是否合法
        var email = $("#email_update_input").val();
        var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!regEmail.test(email)) {
            show_validate_msg("#email_update_input", "error", "邮箱格式不正确！请重新输入！");
            return false;
        } else {
            show_validate_msg("#email_update_input", "success", "");
        }
        // 2.发送Ajax请求，更新保存数据
        $.ajax({
            url: "http://localhost:8080/emp/" + $(this).attr("edit-id"),
            type: "PUT",
            data: $("#empUpdateModal form").serialize(),
            success: function (result) {
                // 1.关闭模态框
                $("#empUpdateModal").modal("hide");
                // 2.返回到页面
                to_page(currentPage)
            }

        })
    });

// 单个删除
    $(document).on("click", ".delete_btn", function () {
        // 弹出是否删除的对话框
        var empName = $(this).parents("tr").find("td:eq(2)").text();
        // 获取需要删除员工的id
        var empId = $(this).attr("del-id");
        if (confirm("您确认要删除【" + empName + "】吗？")) {
            // 点击确认，发送ajax请求
            $.ajax({
                url: "http://localhost:8080/emp/" + empId,
                type: "DELETE",
                success: function (result) {
                    alert(result.msg);
                    // 回到当前页
                    to_page(currentPage);
                }
            })
        }
    });

// 完成多选框的全选和全不选
// 注意： attr获取checked是underfined, 应该使用dom原生的属性prop.   attr获取自定义的属性值
    $("#check_all").click(function () {
        $(this).prop("checked");
        $(".check_item").prop("checked", $(this).prop("checked"));
    });

// 给check_item绑定单击事件
    $(document).on("click", ".check_item", function () {
        // 判断当前选择的元素是否选满
        var flag = $(".check_item:checked").length == $(".check_item").length;
        $("#check_all").prop("checked", flag);
    });

// 点击全部删除，就批量删除
    $("#emp_delete_all_btn").click(function () {
        var empNames = "";
        var del_idstr = "";
        // 遍历每一个被选中的元素
        $.each($(".check_item:checked"), function () {
            // 组装员工名字和id的字符串
            empNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
            del_idstr += $(this).parents("tr").find("td:eq(1)").text() + "-";
        });

        // 去除empNames 多余的逗号
        empNames = empNames.substring(0,empNames.length-1);
        // 去除删除id时多余的“-”
        del_idstr = del_idstr.substring(0,del_idstr.length-1);
        if (confirm("确认删除【"+empNames+"】吗？")) {
            // 确认，发送Ajax请求
            $.ajax({
                url:"http://localhost:8080/emp/"+del_idstr,
                type:"DELETE",
                success:function (result) {
                    alert(result.msg);
                    // 回到当前页面
                    to_page(currentPage);
                }
            })
        }
    });
})


