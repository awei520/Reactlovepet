const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/api", {
            target: "http://formywei.club:8999/",
            changeOrigin: true
        })
    );
};