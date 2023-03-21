var host = "raoyc.com";
if ((host == window.location.host) && (window.location.protocol != "https:")) {
    window.location.protocol = "https";
}