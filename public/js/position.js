require(["config"],function(){
    require(["jquery","template","bootstrap","header","ejs"],function($,template){

        function Position(){
            // var id = '';
            this.addListener();
            this.loadData(1);
        }

        $.extend(Position.prototype,{
            addListener(){
                $(".btn-add-pos").on("click",this.addPosHandler);
                $(".pagination").on("click","a",$.proxy(this.loadDataHandler,this));
                $(".items-list").on("click",".delete",$.proxy(this.deleteHandler,this));
                $(".items-list").on("click",".update",$.proxy(this.updateform,this));
                $(".btn-up-pos").on("click",$.proxy(this.upPosHandler,this));
            },

            upPosHandler: function(){
                const url = "/api/positions/update";

                const data = new FormData($(".form-up-pos").get(0));
                for(var key of data.keys()) {
                    console.log(key)
                }
                for(var val of data.values()){
                    console.log(val)
                }
                // const data = new FormData($(".form-add-pos").get(0));
                // const data =$(".form-add-pos").serialize();
                // console.log(data);
                $.ajax({
                    type: "post",
                    url,
                    data,
                    datatype:"json",
                    processData:false,
                    contentType:false,

                    success: function(data){
                        if(data.res_body.status === 1){
                            location.reload();
                        }
                    }
                })

            },
            deleteHandler: function(e){
                const $src = $(e.target);
                // console.log($src);
                var _id = $src.parents("tr").find(".id").text();
                // console.log(_id);
                $.post("/api/positions/delete",{_id},function(data){
                    if(data.res_body.status === 1){
                        $src.parents("tr").remove();
                    }
                },"json")
            },

            updateform: function(e){
                const $src = $(e.target);
                // console.log($src);
                $("#_id").val($src.parents("tr").find(".id").text());
                // console.log(this.id);

                $("#updateworkName").val($src.parents("tr").find(".wn").text());
                $("#updatecompanyName").val($src.parents("tr").find(".cn").text());
                $("#updateworkExp").val($src.parents("tr").find(".we").text());
                $("#updateworkType").val($src.parents("tr").find(".wt").text());
                $("#updateworkspace").val($src.parents("tr").find(".ws").text());
                $("#updatesalary").val($src.parents("tr").find(".sa").text());

            },
            loadDataHandler :function(e){
                const $src = $(e.target);
                const page = Number($src.text());
                this.loadData(page);

                $src.parent("li").addClass("active").siblings("li").removeClass("active");
            },
            addPosHandler: function(){
                const url = "/api/positions/add";

                const data = new FormData($(".form-add-pos").get(0));

                console.log(data);
                $.ajax({
                    type: "post",
                    url,
                    data,
                    datatype:"json",
                    processData:false,
                    contentType:false,

                    success: function(data){
                        if(data.res_body.status === 1){
                            
                            var data = {list:
                                            [{data: data.res_body.data}]
                                        };
                            console.log(data);
                            console.log(data.list[0].data.salary);
                            var html = template("position_template",data);

                            
                            $(".items-list").append(html);
                        }
                    }
                })

                
                // console.log();
                $(".addModal").addClass("hidden");
                $(".modal-backdrop").addClass("hidden");
            },

            loadData(page){
                page = page || 1;
                const url = "/api/positions/find_by_page?page=" + page;

                $.getJSON(url,(data)=>{
                    if(data.res_code === 1){
                        let html = "";
                        
                        var data = {list:data.res_body.list};
                        // console.log(data);
                        html = template("positions_template",data);
                        $(".items-list").html(html);

                    }
                })
            }
        })

        new Position();
    })
})