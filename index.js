var express = require("express");
var app = express();

var handlebars = require("express3-handlebars")
			.create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));

// 路由
app.get("/", function (req, res) {
	res.render("home");
});

var girls = [
	"金泰妍",
	"安吉丽娜朱莉",
	"少女时代",
	"Girl's Day",
	"Apink"
];

app.get("/about", function (req, res) {
	var selected = girls[Math.floor(Math.random() * girls.length)];
	res.render("about", {who: selected});
});


// 404 catch-all 处理器(中间件)
app.use(function (req, res, next) {
	res.status(404);
	res.render("404");
});

// 500 错误处理器 (中间件)
app.use(function (req, res, next) {
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function () {
	console.log("Site Start； Listen port: " + app.get("port"));
});
