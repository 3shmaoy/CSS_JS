// already in a goole query result page searching for that company name
javascript:(
    function (){
        const oURLparam = new URLSearchParams(window.location.search);
        oURLparam.set('q', oURLparam.get('q') + ' 従業員数');
        window.location.search = oURLparam.toString();
    }
)()

// after selecting the company name
javascript:window.open('https://www.google.com/search?q=' + encodeURIComponent(window.getSelection().toString()) + '+従業員数')

// highlight all 従業員数 in the page
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

// SR 日報 today's date
javascript:$('input[name="selDate"]').focus().datepicker('setDate', 'now')