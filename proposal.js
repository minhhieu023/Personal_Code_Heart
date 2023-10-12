var divElement;
    const cssStyle = 
            `<style>
                     * {
                        box-sizing: border-box;
                    }
                    :root {
                        --switches-bg-color: #1976d2;
                        --switches-label-color: white;
                        --switch-bg-color: white;
                        --switch-text-color: #1976d2;
                    }
                    button {
                        margin: 20px;
                    }
                    .sticky-button {
                        position: fixed !important;
                        bottom: 0;
                        margin: 20px !important;
                    }
                    .button-container {
                        display: flex;
                        justify-content: center;
                        justify-items: center;
                        align-items: center;
                    }
                    .check-off-btn{
                        width: 30vw;
                        min-width:425px;
                        height: fit-content;
                        border-radius: 55px;
                        padding: 8px;
                        padding-left: 24px;
                        border-width: 0px;
                        background-color: rgb(163 164 165 / 90%);
                        font-size: 17px;
                        font-weight: bold;
                        justify-content: space-between;
                        align-items: center;
                        display: flex
                    }
                    .switches-container {
                        width: 14.7rem;
                        position: relative;
                        display: flex;
                        padding: 0;
                        position: relative;
                        background: var(--switches-bg-color);
                        line-height: 2.7rem;
                        border-radius: 5.7rem;
                        margin-left: auto;
                        margin-right: auto;
                        opacity:0.8
                    }
                    .switches-container input {
                        visibility: hidden;
                        position: absolute;
                        top: 0;
                    }
                    .switches-container label {
                        width: 50%;
                        padding: 0;
                        margin: 0;
                        text-align: center;
                        cursor: pointer;
                        color: var(--switches-label-color);
                    }
                    .switch-wrapper {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        width: 50%;
                        padding: 0.15rem;
                        z-index: 3;
                        transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
                    }
                    .switch {
                        border-radius: 3rem;
                        background: var(--switch-bg-color);
                        height: 100%;
                    }
                    .switch div {
                        width: 100%;
                        text-align: center;
                        opacity: 0;
                        display: block;
                        color: var(--switch-text-color);
                        transition: opacity 0.2s cubic-bezier(0.77, 0, 0.175, 1) 0.125s;
                        will-change: opacity;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .switches-container input:nth-of-type(1):checked ~ .switch-wrapper {
                        transform: translateX(0%);
                    }
                    .switches-container input:nth-of-type(2):checked ~ .switch-wrapper {
                        transform: translateX(100%);
                    }
                    .switches-container input:nth-of-type(1):checked ~ .switch-wrapper .switch div:nth-of-type(1) {
                        opacity: .8;
                        background-color: green !important;
                        border-radius: 3rem;
                    }
                    .switches-container input:nth-of-type(2):checked ~ .switch-wrapper .switch div:nth-of-type(2) {
                        opacity: .8;
                        background-color: red !important;
                        border-radius: 3rem;
                    }
                    @media only screen and (max-width: 600px) {
                        .artist-name {
                            display: none;
                        }
                        .check-off-btn {
                            padding: 8px;
                            min-width: fit-content; 
                        }
                        .button-container {
                            padding-top: 8px;
                            padding-bottom: 8px;
                        }
                    }
            </style>`;
    
    const buttonDefaultClass = "check-off-btn";
    const buttonStickyClass =`${buttonDefaultClass} sticky-button`

    document.addEventListener("DOMContentLoaded", function (event) {
        const body = document.getElementsByTagName("body")[0];
        body.innerHTML += cssStyle;

        divElement = document.getElementsByClassName("section-area-body");
        if (divElement) {
            for (var i = 0; i < divElement.length; ++i) {
                if (divElement[i]) {
                    const artistInfo = divElement[i].getElementsByClassName("element-label")[0];
                    if (artistInfo) {
                        const displayName = artistInfo.textContent?.replace("- FORMAL QUOTE", '').trim();
                        const id = divElement[i].id;
                        if (id) {
                            const buttonStyle = 
                            `<div class="button-container">
                                    <button class="booking-btn btn-6" id='${id}' onclick="onClickButton('${id}')"">${displayName}</button>
                            </div>`;

                            const checkOffButton  = `
                            <div class="button-container">
                                    <div class="${buttonDefaultClass}" id='${id}'>
                                        
                                        <div class="artist-name">Book ${displayName}</div>
                                        <div >
                                            <div class="switches-container">
                                                <input type="radio" id="${id}__true" name="${id}" value="true" checked="checked" />
                                                <input type="radio" id="${id}__false" name="${id}" value="false" />
                                                <label for="${id}__true" onclick="onClickButton('${id}', true)">Accept</label>
                                                <label for="${id}__false" onclick="onClickButton('${id}', false)">Deny</label>
                                                <div class="switch-wrapper">
                                                <div class="switch">
                                                    <div style="color:white">Accept</div>
                                                    <div style="color:white">Deny</div>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                            </div>`;                           
                            divElement[i].innerHTML += checkOffButton;
                        }
                    }
                }
            }
        }
    });
    window.addEventListener("scroll", function () {
        for (var i = 0; i < divElement.length; ++i) {
            const elementArtist = divElement[i].getElementsByClassName("container element-artist")[0];
            const id = divElement[i].id

            if (elementArtist) {

                const artistOffsetTop = elementArtist.offsetTop;
                const artistHeight = elementArtist.offsetHeight;
                const windowHeight1 = window.innerHeight;
                const windowScrollTop1 = window.scrollY;

                if(windowScrollTop1 >= artistOffsetTop - windowHeight1) {
                    if (id) {
                        var btn = document.getElementsByClassName(buttonDefaultClass);
                        for (var idx = 0; idx < btn.length; ++idx) {
                            if (btn[idx].id == id) {
                                btn[idx].className = buttonDefaultClass;
                            }
                        }
                    }
                }
                if (windowScrollTop1 >= artistOffsetTop + 200 - windowHeight1) {
                    if (id) {
                        var btn = document.getElementsByClassName(buttonDefaultClass);
                        for (var idx = 0; idx < btn.length; ++idx) {
                            if (btn[idx].id == id) {
                                btn[idx].className = buttonStickyClass;
                            }
                            else {
                                btn[idx].className = buttonDefaultClass;
                            }
                        }
                    }
                }
               
            }
            const elementQuote = divElement[i].getElementsByClassName("container")[0];
            if (elementQuote) {

                const element = elementQuote.getElementsByClassName("element-label");
                if (element.length != 0) {
                    const elementQuoteOffsetTop = elementQuote.offsetTop;
                    const elementQuoteHeight = elementQuote.offsetHeight;
                    const windowHeight = window.innerHeight;
                    const windowScrollTop = window.scrollY;

                    if (windowScrollTop >= elementQuoteOffsetTop + elementQuoteHeight - windowHeight) {
                        if (id) {
                            var btn = document.getElementsByClassName(buttonDefaultClass);
                            for (var idx = 0; idx < btn.length; ++idx) {
                                if (btn[idx].id == id) {
                                    btn[idx].className = buttonDefaultClass;
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    function onClickButton(data, option) {
        console.log(data, option);
    } 