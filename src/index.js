
const { getObject, getModule } = require('./ncbi_module');

let currentObject = null;
let currentFileName = null;
let currentVersion = 1;

function FileData(fileInfo) 
{
    currentFileName = fileInfo.name;
    getObject(fileInfo.content).then(obj => {
        const view = document.getElementById('view');
        currentObject = obj;
        view.innerHTML = obj.getView();
    });
}

document.getElementById('file-selector').addEventListener('change', event => {
    const status = document.getElementById('status');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const fr = e.target;
        var result = fr.result;
        FileData({
            name: file.name,
            size: file.size,
            content: result
         });
    };
    reader.readAsText(file);
}); 

document.getElementById('download').addEventListener('click', event => {
    if (!currentObject)
        return;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(currentObject.getText()));
    element.setAttribute('download', currentFileName);
      element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

document.getElementById('macro').addEventListener('click', event => {
    if (currentObject) {
        let macro_text = document.getElementById('macro_text').value;
        if (macro_text !== "") {
            try {
                console.log(currentObject.applyMacro('MACRO Macro_name "Macro"\n' + macro_text));
                const view = document.getElementById('view');
                view.innerHTML = currentObject.getView();
            } catch (e) {
                alert(getModule().getExceptionMessage(e));
            }
        }
    }
});

document.getElementById('undo').addEventListener('click', event => {
    if (currentObject) {
        currentObject.undoLast();
        const view = document.getElementById('view');
        view.innerHTML = currentObject.getView();
}
});

document.getElementById('new').addEventListener('click', event => {
    currentFileName = 'new.asn1';
    const asn_template = "Seq-entry ::=\
    seq {\
        id { \
          other { \
            accession \"dummy\", \
            version %VER% \
          } \
        }, \
        inst { \
          repr raw, \
          mol rna, \
          length 4, \
          seq-data iupacna \"ATGC\" \
        } \
    }";
    
    getObject(asn_template.replace('%VER%', currentVersion)).then(obj => {
        ++currentVersion;
        const view = document.getElementById('view');
        currentObject = obj;
        view.innerHTML = obj.getView();
    });
});

