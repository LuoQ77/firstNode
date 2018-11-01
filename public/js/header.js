define(["jquery"], function ($) {
    function Header() {
        this.load();
        this.getCode();
    }

    Header.prototype = {
        load: function () {
            $.get("/html/include/header.html", $.proxy(this.headerHandler, this))
                .done($.get("/html/include/loginMoudle.html", $.proxy(this.loginMoudle, this)))
                .done($.get("/html/include/registerMoudle.html", $.proxy(this.registerMoudle, this)));

        },

        addListener: function () {
            $(".btn-login").on("click", $.proxy(this.loginHandler,this));
            $(".btn-register").on("click", this.registerHandler);
            $(".link-logout").on("click", this.logoutHandler);
            $(".input-code").on("blur",this.codeHandler);
            $(".code").on("click",this.getCode);
        },

        loginHandler: function () {
            console.log(1);
            const data = $(".form-login").serialize();
            const url = "/api/users/login";
            $.post(url, data, function (data) {
                if (data.res_body.status === 1) {
                    sessionStorage.username = data.res_body.data.username;
                    location.reload();
                } else {
                    $(".alert-danger").removeClass("hidden");
                }
            })
            
            return false;
        },
        registerHandler: function () {
            const data = $(".form-register").serialize();
            const url = "/api/users/register";
            $.post(url, data, function (data) {
                if (data.res_body.status === 1) {
                    sessionStorage.username = data.res_body.data.username;
                    location.reload();
                } else {
                    $(".alert-danger").removeClass("hidden");
                }
            })
        },

        loadUser: function () {
            const user = sessionStorage.username;
            // console.log(user);
            if (user) {
                $(".login-success").removeClass("hidden").prev("ul").remove();
                $(".login-success a:first").html("欢迎：" + user);
            }
        },
        logoutHandler: function () {
            $.getJSON("/api/users/logout",function(data){
                if(data.res_body.status === 1){
                    sessionStorage.removeItem("username");
                    location.reload();
                }    
            })
        },
        headerHandler: function (data) {
            $("nav").html(data);
            this.loadUser();
        },
        loginMoudle: function (data) {
            $(".loginMoudle").html(data);
        },
        registerMoudle: function (data) {
            $(".registerMoudle").html(data);
            this.addListener()
        },
        getCode: function(){
            $.getJSON("/api/captcha",(data)=>{
                $(".code").html(data.res_body.data);
            })
        },
        codeHandler: function(event){
            var code = $(event.target).val();

            $.getJSON("api/captcha/vertify",{code},(data)=>{
                if(data.res_body.vaild){
                    alert("正确");
                }else{
                    alert("错误");
                }

            })
        }
    }

    new Header();

})