HNSpecial.settings.registerModule("save_for_later", function () {
    function addSaveButtons() {
        var subtexts = document.getElementsByClassName('subtext');
        for(var i = 0; i < subtexts.length; i++) {
            if(!subtexts[i].getElementsByClassName('save').length) {
                var flag = subtexts[i].getElementsByTagName('a')[1];
                var link = document.createElement('a');
                function configureLink() {
                    link.href = 'javascript:void(0)';
                    link.innerHTML = 'save';
                    link.className = 'save';
                    link.onclick = changeSave;
                }
                configureLink();
                subtexts[i].insertBefore(link, flag);
                subtexts[i].insertBefore(document.createTextNode(' | '), flag);
            }
        }
    }

    function changeSave(e) {
        var id = e.srcElement.parentNode.getElementsByTagName('a')[3].href;
        var id = id.split('id=').pop();

        _.sendMessage("save_for_later#toggle", {id: id});
        console.log('done');
    }

    // Add the saved link to the header
    var pagetop = document.getElementsByClassName('pagetop')[0];
    pagetop.innerHTML += '<a href="saved">saved</a>';
    // Add the first page of save buttons
    addSaveButtons();
    // Add save buttons every time new links are loaded
    HNSpecial.settings.subscribe("new links", addSaveButtons);
});
