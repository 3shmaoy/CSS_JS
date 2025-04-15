class SYSTEM_ROAD {
    static Formatted_NUMBER_CURRENCY = {
        options : {
            style: 'decimal',  // Other options: 'currency', 'percent', etc.
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    };

    static Formatted_NUMBER_FLOAT = {
        options : {
            style: 'decimal',
            minimumFractionDigits: 1,
        }
    };

    static formatDate ( sDate ) {
        let sRet = '';
        if ( (sDate.trim() != '') && (sDate.length == 8) && /^\d+$/.test(sDate) ) {
            sRet = sDate.slice(0, 4) + '/' + sDate.slice(4, 6) + '/' + sDate.slice(6);
        } else {}
        return sRet;
    }

    static UI = {
        setSelects ( arySelects, aryValues ) {
            const iSelectsCount = arySelects.length;
            const iValuesCount  = aryValues.length;
            if ( iSelectsCount == iValuesCount ) {
                for ( let iLoopIndex=0; iLoopIndex<iSelectsCount;  iLoopIndex++ ) {
                    arySelects[iLoopIndex].value = aryValues[iLoopIndex];
                }
            } else if ( iValuesCount == 1 ){
                const sValue = aryValues[0];     // 一つ
                for ( let iLoopIndex=0; iLoopIndex<iSelectsCount;  iLoopIndex++ ) {
                    arySelects[iLoopIndex].value = sValue;
                }
            }  else {}  // できない
        },

        scrollToBottom ( oHTMLelement_JQ ) {
            //oHTMLelement_JQ.scrollTop( oHTMLelement_JQ.prop('scrollHeight') - oHTMLelement_JQ.prop('clientHeight') );
            oHTMLelement_JQ.animate(
                { scrollTop: oHTMLelement_JQ.prop('scrollHeight') - oHTMLelement_JQ.prop('clientHeight') },
                500
            );
        },

        replayTopMessage ( sMsg = '' ) {
            const oMsg = $('#divSRtopMsg div.SR-disappearing');
            if ( sMsg != '' ) {
                oMsg.text(sMsg);
            } else {}
            oMsg.css('animation', 'none')   // override the animation from class
            oMsg[0].offsetHeight;           // trigger re-flow to restart the animation
            oMsg.css('animation', '');      // reinherit the animation from class
        },
    }
}

function chkKeyCode ( oEvent ) {
    // バックスペース：ブラウザが「navigation history back action」に割り当てた場合に、バックスペースをブロックするため
    // INPUTフィールドとTEXTAREA内にのみ使用可能
    if ( oEvent && oEvent.keyCode && (oEvent.keyCode == 8) ) {     // BKSP
        if ( oEvent.srcElement && (oEvent.srcElement.tagName == 'INPUT' || oEvent.srcElement.tagName == 'TEXTAREA') ) {
            if ( oEvent.srcElement.disabled || oEvent.srcElement.readOnly ) {
                return cancelEvent(oEvent);
            } else {}       // INPUTフィールドやTEXTAREA：有効（CTRLとも良い）
        } else {
            // INPUTでもTEXTAREAでもない
            return cancelEvent(oEvent);
        }
    } else {}               // バックスペース以外
}

function submitStop ( oEvent ) {
    //if ( !oEvent ) { oEvent = window.oEvent; } else {}     // property already dropped from browsers
    if ( oEvent && oEvent.keyCode == 13 ) {
        return cancelEvent(oEvent);
    } else {
        return true;
    }
}

function cancelEvent ( oEvent ) {
    // Edgeでは動作するが、最近のChromeでは動作しない場合がある
    if ( oEvent ) {
        oEvent.stopImmediatePropagation();
        //oEvent.stopPropagation();
        oEvent.preventDefault();
    } else {}
    return false;
}

// 0~9のみ
function onlyNumeralInputs ( oEvent ) {
    //this.value = this.value.match(/\d{0,4}/)[0];
    if ( this && (this.value !== undefined) ) {
        if (this.value != '') {
            const sAllowedLength = (this.maxLength != -1) ? '{0,' + this.maxLength + '}' : '*' ;
            const oRegExpr = new RegExp('\\d' + sAllowedLength);
            this.value = this.value.match(oRegExpr);
        } else {}
    } else {
        console.log ('onlyNumeralInputs: Wrong object parameter');
    }
}

// 電話番号
function onlyPhoneNumber ( oEvent ) {
    if ( this && (this.value !== undefined) ) {
        if (this.value != '') {
            const sAllowedLength = (this.maxLength != -1) ? '{0,' + this.maxLength + '}' : '*' ;
            const oRegExpr = new RegExp('[\-\\d]' + sAllowedLength);
            this.value = this.value.match(oRegExpr);
        } else {}
    } else {
        console.log ('onlyNumeralInputs: Wrong object parameter');
    }
}

// [0-9]*.[0-9]*
function onlyDecimalInput ( oEvent ) {
    if ( this && (this.value !== undefined) ) {
        if (this.value != '') {
            this.value = this.value.match(/\d*(\.\d*)?/)[0];
        } else {}
    } else {
        console.log ('onlyDecimalInput: Wrong object parameter');
    }
}


//    1 =>  1:00
//   13 => 13:00
//  300 =>  3:00
// 1300 => 13:00
// 他の文字は削除され、戻ってくる可能性がある
// Input a direct string or an object with value property to modify
function stringToTimeFormat ( vTxt ) {
    let sTmp;
    let oTxtInput;
    if ( (typeof vTxt === 'string') || (vTxt instanceof String) ) {
        sTmp = vTxt;
        oTxtInput = null;
    } else {
        if ( (vTxt instanceof Event) || (vTxt.originalEvent instanceof Event) ) {
            oTxtInput = this;
        } else {
            oTxtInput = vTxt;
        }
        if ( (oTxtInput instanceof HTMLInputElement) && (oTxtInput.tagName.toLowerCase() == 'input') ) {
            sTmp = oTxtInput.value;
        } else {
            return;     // 不明な入力タイプ
        }
    }
    if ( sTmp != '' ) {
        sTmp = sTmp.replace(/[^0-9]/g, '');
    } else {
        return;         // 何もすることがない
    }
    if (parseInt(sTmp) == '0') {
        sTmp = '';
    } else {}
    if ( sTmp != '' ) {
        switch (sTmp.length) {
            case 1:
            case 2:
                sTmp += ':00';
                break;
            case 3:
                saryTmp = sTmp.split('');
                sTmp    = saryTmp[0] + ':' + saryTmp[1] + saryTmp[2];
                break;
            case 4:
                saryTmp = sTmp.split('');
                sTmp    = parseInt(saryTmp[0] + saryTmp[1]) + ':' + saryTmp[2] + saryTmp[3];
                break;
            default:
                sTmp = '';
        }
    } else {}
    if (oTxtInput) {
        oTxtInput.value = sTmp;
        return true;    // イベントハンドラの場合
    } else {
        return sTmp;
    }
}

// 00*  => *    先頭ゼロ
// *.*0 => *.*  ポイント後の末尾ゼロ
// *    => *.0
// .*   => 0.*
function stringToFPformat ( vTxt ) {
    let sTmp;
    let oTxtInput;
    if ( (typeof vTxt === 'string') || (vTxt instanceof String) ) {
        sTmp = vTxt;
        oTxtInput = null;
    } else {
        if ( (vTxt instanceof Event) || (vTxt.originalEvent instanceof Event) ) {
            oTxtInput = this;
        } else {
            oTxtInput = vTxt;
        }
        if ( (oTxtInput instanceof HTMLInputElement) && (oTxtInput.tagName.toLowerCase() == 'input') ) {
            sTmp = oTxtInput.value;
        } else {
            return;     // 不明な入力タイプ
        }
    }
    if ( sTmp != ''  ) {
        sTmp = sTmp.replace(/[^0-9.]/g, '');
        if ( (sTmp != '') && (sTmp != '.') ) {
            sTmp = parseFloat(sTmp);
        } else {
            sTmp = '';
        }
    } else {}
    if (oTxtInput) {
        oTxtInput.value = sTmp;
        return true;    // イベントハンドラの場合
    } else {
        return sTmp;
    }
}

function closeThisPopup () {
    if ( window !== top ) {
        parent.$.fancybox.close();
    } else {} // 派手なポップアップウィンドウではない。
}

// AJAX関数呼出ラッパー
function ajaxCall ( sURL, oParams, fCallBack ) {    // JSON encoding
    const oPostData = $(this).serializeArray();
    for (var sKey in oParams) {
        oPostData.push({
            name: sKey,
            value: JSON.stringify(oParams[sKey])
        });
    }
    $.ajax({
        type     : 'POST',
        url      : sURL,
        data     : oPostData,
        dataType : "text",
        success  : function ( oRet )             { oRetProcessed = ( oRet ) ? jQuery.parseJSON(oRet) : []; },
        error    : function ( xhr, status, err ) { oRetProcessed = [] },
        complete : function ( xhr, status )      { fCallBack(oRetProcessed); },
    });
    return;
}
function ajaxCallForm ( oJQfrm, fCallBack ) {       // Form parameters encoding
    $.ajax({
        type     : 'POST',
        url      : oJQfrm.prop('action'),
        data     : oJQfrm.serialize(),
        success  : function ( oRet )             { oRetProcessed = ( oRet ) ? jQuery.parseJSON(oRet) : []; },
        error    : function ( xhr, status, err ) { oRetProcessed = []; },
        complete : function ( xhr, status )      { fCallBack(oRetProcessed); },
    });
    return;
}