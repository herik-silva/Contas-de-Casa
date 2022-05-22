function fullscreen() {
    if(window.innerWidth<800){
        document.querySelector('html').onclick = ()=>{
            var document = window.document;
            var documentElement = document.documentElement;
    
            var requestFullScreen = documentElement.requestFullscreen;
            if(!document.fullscreenElement){
                requestFullScreen.call(documentElement);
            }
        }
    }
}