require.config({
    baseUrl:"/",
    paths: {
        "jquery": "lib/jquery/jquery-1.12.4.min",
        "template": "lib/art-template/template-web",
        "cookie": "lib/jquery-plugins/jquery.cookie",
        "bootstrap":"/lib/bootstrap/js/bootstrap.min",
        "header":"js/header"
    },
    shim: {
        "bootstrap":{
			deps: ["jquery"]
		}
    }
});