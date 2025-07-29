javascript:(
    function (){
        const oURLparam = new URLSearchParams(window.location.search);
        oURLparam.set('q', oURLparam.get('q') + ' 従業員数');
        window.location.search = oURLparam.toString();
    }
)()


javascript:window.location = 'https://www.google.com/search?q=' + encodeURIComponent(window.getSelection().toString()) + '+従業員数';


javascript:(
    function (){
        const sSearchedText = '従業員数';
        const sHighlightBkgrnd = 'SteelBlue';

        document.designMode = "on";
        const sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find(sSearchedText)) {
            document.execCommand('HiliteColor', false, sHighlightBkgrnd);
            sel.collapseToEnd();
        }
        document.designMode = "off";
    }
)()