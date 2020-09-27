"use strict"


let russianUpload = document.getElementsByClassName("uploadAnImage")[0]
let tatarUpload = document.getElementsByClassName("uploadAnImage")[1]

//console.log(document.getElementById("buttonUploadTatar"))

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    russianUpload.addEventListener(eventName, preventDefaults, false)
    tatarUpload.addEventListener(eventName, preventDefaults, false)
  })
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  ;['dragenter', 'dragover'].forEach(eventName => {
    russianUpload.addEventListener(eventName, highlightRussian, false)
    tatarUpload.addEventListener(eventName, highlightTatar, false)
  })
  ;['dragleave', 'drop'].forEach(eventName => {
    russianUpload.addEventListener(eventName, unhighlightRussian, false)
    tatarUpload.addEventListener(eventName, unhighlightTatar, false)
  })
  function highlightRussian(e) {
    russianUpload.classList.add('highlight')
  }
  function highlightTatar(e) {
    tatarUpload.classList.add('highlight')
  }
  function unhighlightRussian(e) {
    russianUpload.classList.remove('highlight')
  }
  function unhighlightTatar(e) {
    tatarUpload.classList.remove('highlight')
  }

  russianUpload.addEventListener('drop', handleDropRussian, false)
  tatarUpload.addEventListener('drop', handleDropTatar, false)
function handleDropRussian(e) {
    let dt = e.dataTransfer
    let files = dt.files
    console.log("HANDLE FILES")
    translateFunction(true)
    //handleFiles(files)
}
function handleDropTatar(e) {
    let dt = e.dataTransfer
    let files = dt.files
    console.log("HANDLE FILES")
    translateFunction(false)
    //handleFiles(files)
}

function readTextFile(originLang) {
    var rawFile = new XMLHttpRequest();
    if(!originLang) {
        rawFile.open("GET", "static/tat.txt", true);
        console.log("GOT TATAR TEXT")
    } else {
        rawFile.open("GET", "static/rus.txt", true);
        console.log("GOT RUSSIAN TEXT")
    }
    
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        var allText = rawFile.responseText;
        if(!originLang) {
            document.getElementsByClassName("textInput")[0].innerHTML = allText;
            console.log("SENT TATAR TEXT")
        } else {
            document.getElementsByClassName("textInput")[1].innerHTML = allText;
            console.log("SENT RUSSIAN TEXT")
        }
      }
    }
    rawFile.send()
    //rawFile.wr
}

var file

function saveData(data, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var json = JSON.stringify(data),
        blob = new Blob([data], {type: "text/plain;charset=utf-8"}),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    //Здесь файл скачивается на локальную машину, надо выгружать на сервак
    a.click();
    window.URL.revokeObjectURL(url);
}
  
  
  function saveFileTatar(e) {
    var input = document.getElementById("buttonUploadTatar")
    saveData(file, "tatar.jpg");
    
    //e.preventDefault()
  }
  function saveFileRussian(e) {
    var input = document.getElementById("buttonUploadRussian")
    saveData(file, "russian.jpg");
    
    //e.preventDefault()
  }

  var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
        callback(null, xhr.response);
    } else {
        callback(status, xhr.response);
    }
    };
    xhr.send();
};

var sendJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: value
    }));
}

function goPython(){
    $.ajax({
    url: "o.py",
    context: document.body
    }).done(function() {
    alert('finished python script');;
    });
}

function saveTextAsFileTatar() {
    var textToWrite = document.getElementsByClassName("textInput")[1].value;
    console.log(document.getElementsByClassName("textInput")[1].value)
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "untranslatedTatar";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

function saveTextAsFileRussian() {
    var textToWrite = document.getElementsByClassName("textInput")[0].value;
    console.log(textToWrite)
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "untranslatedRussian";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}


function translateFunction(originLang) {
    console.log(originLang)

    //saveTextAsFileTatar()

    if(originLang) {
        file = document.getElementById("buttonUploadTatar").files[0]
    } else {
        file = document.getElementById("buttonUploadRussian").files[0]
    }

    if(document.getElementById("buttonUploadTatar").value == '' || document.getElementById("buttonUploadRussian").value == '') {
        if(!originLang) {
            saveTextAsFileTatar()
        } else {
            saveTextAsFileRussian()
        }
    } else {
        if(!originLang) {
            saveFileTatar()
        } else {
            saveFileRussian()
        }
    }

    
    
    document.getElementById("buttonUploadTatar").value = ''
    document.getElementById("buttonUploadRussian").value = ''

    console.log(document.getElementById("buttonUploadTatar").files[0])
    console.log(document.getElementById("buttonUploadRussian").files[1])

    readTextFile(originLang)
    //goPython()
}