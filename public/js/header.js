
define(["jquery"],function($){
    function Header(){
        this.load();
    }

    Header.prototype = {
        load : function(){
            $.get("/html/include/header.html",$.proxy(this.headerHandler,this));
            $(".moudle").load("/html/include/moudle.html");
        },
        
        headerHandler: function(data){
            $("nav").html(data);
        }
    }

    new Header();
    
})