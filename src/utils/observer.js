import styles from '@/app/[slug]/styles.module.css';

function observer(iframe, modelInfo, uniqueUrl){

    /** ====== help modal on > tag list off ======= */
    const innerIframe = iframe.contentWindow.document;
    const helpModalCon = innerIframe.querySelector('.modal-background');

    let config = {
        attributes: true,	// observe target's attribute change
    };
    // let customDropdown = document.querySelector('.dropdown_custom')
    const listToggle = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
        //console.log(mutation.target.childElementCount)

            if (mutation.target.childElementCount === 1) {
                /** ======== share modal change! =============== */
                let modalBody = innerIframe.querySelector('dialog');
                let input = innerIframe.querySelectorAll('input'); //mobile no input
                let mobiModi = innerIframe.querySelector('.share-controls');

                // console.log(input)
                // console.log(mobiModi)
                console.log(window.navigator.canShare)

                /** ======= using mutation observer > share modal change ======== */
                if(modalBody && input.length>=1){
                    input[0].remove();
                    let inputGroup = innerIframe.querySelectorAll('.input-group');
                    let newinput = document.createElement('input');
                    newinput.setAttribute('class', 'input');
                    newinput.setAttribute('type', 'text');
                    newinput.setAttribute('value', uniqueUrl);
                    
                    inputGroup[0].insertAdjacentElement('afterbegin', newinput);
                    let newinputSel = innerIframe.querySelector('.input');

                    function copyTo(){
                        window.navigator.clipboard.writeText(uniqueUrl);
                    };

                    let copybttn = innerIframe.querySelectorAll('button');
                    copybttn[0].onclick = copyTo;

                    let social = innerIframe.querySelector('.social-icons');
                    if(social){social.remove();}
                    let checkbox = innerIframe.querySelector('.checkbox-element');
                    if(checkbox){checkbox.remove();}
                    let modalbody = innerIframe.querySelector('.modal-body');

                    function modalstylechange() {
                        modalbody.style.paddingBottom = '5px';
                        modalbody.style.height = '75px';
                        modalbody.style.overflow = 'hidden';
                    };
                    if(modalbody){ modalstylechange()};

                } else if (modalBody && mobiModi){            
                    let modalbody = innerIframe.querySelector('.modal-body');
                        function modalstylechange() {
                        modalbody.style.paddingBottom = '5px';
                        modalbody.style.height = '75px';
                        modalbody.style.overflow = 'hidden';
                        modalbody.style.textAlign = "center";
                        };
                    if(modalbody){ modalstylechange()};

                    let mobiBttn = innerIframe.querySelectorAll('.share-modal-button')
                        mobiBttn[0].remove();
                        mobiBttn[1].remove();
                    
                    let newtxxt = document.createElement('p');
                    newtxxt.innerText = "Link Copied!" ;
                    mobiModi.insertAdjacentElement('beforeend', newtxxt);
                    /** ==== when mobile auto open share api ==== */
                    if (window.navigator.canShare) {

                        window.navigator.share({
                            title: modelInfo.name,
                            text: modelInfo.summary,
                            url: uniqueUrl,
                        }).then(() => {
                        console.log('Thanks for sharing!');
                        })
                        .catch(err => console.log(err));

                    } else {
                        /** ==== when desktop write Url to clipbaord ==== */
                        window.navigator.clipboard.writeText(uniqueUrl);
                    }
                };
                let customDropdown = document.querySelector(`.${styles.dropdown_custom}`)
                customDropdown.style.display = 'none';
            } else {
                let customDropdown = document.querySelector(`.${styles.dropdown_custom}`)
                customDropdown.style.display = 'block';
            }
        }
    };

    let observer = new MutationObserver(listToggle);
    observer.observe(helpModalCon, config);
}
export default observer;