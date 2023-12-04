function request(key, defaultValue) {
    var params = new URLSearchParams(window.location.search);
    return params.has(key) ? params.get(key) : defaultValue;
}


let urls = request('urls')
if (urls != null && urls != undefined) {
    urlsArr = urls.split(',');
    previewEl = document.getElementById('preview-container');
    urlsArr.forEach(url => {
        let img = document.createElement('img');
        img.src = url;
        previewEl.appendChild(img);
    });
}