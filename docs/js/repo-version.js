var xhr = new XMLHttpRequest();
xhr.open('GET',  'https://api.github.com/repos/percona/pmm-doc');
xhr.onload = function () {
    var info = JSON.parse(this.responseText);

    __md_set("__source", {
        version: "v3.0.0-BETA",
        stars: info.stargazers_count,
        forks: info.forks_count,
    }, sessionStorage)
}

xhr.send();