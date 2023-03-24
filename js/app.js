/* Start Array */

// portfolio img
const portImgArr = [
    {path: "./assets/imgs/portfolio/gallery/g-tulips.jpg", title: "Coffee & Tultips" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},
    
    {path: "./assets/imgs/portfolio/gallery/g-minimalismo.jpg", title: "Minimalismo" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},

    {path: "./assets/imgs/portfolio/gallery/g-skaterboy.jpg", title: "Skaterboy" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},

    {path: "./assets/imgs/portfolio/gallery/g-rucksack.jpg", title: "Rucksack" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},

    {path: "./assets/imgs/portfolio/gallery/g-woodcraft.jpg", title: "Woodcraft" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},

    {path: "./assets/imgs/portfolio/gallery/g-lamp.jpg", title: "Lamp" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},
    
    {path: "./assets/imgs/portfolio/gallery/g-grayscale.jpg", title: "Grayscale" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},

    {path: "./assets/imgs/portfolio/gallery/g-shutterbug.jpg", title: "Shutterbug" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},

    {path: "./assets/imgs/portfolio/gallery/g-fuji.jpg", title: "Retro Cam" , para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, quia!"},
];

/* End Array */

$(document).ready(function(){
    // for tooltip
    const tooltips = $("[data-bs-toggle='tooltip']");
    tooltips.each((idx,tooltip) => new bootstrap.Tooltip(tooltip));

    // for Swiper
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        grabCursor: true,
        mousewheel: true,
      
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        
        slidesPerView: 4,
        spaceBetween: 5,
        breakpoints: {
            768: {
              slidesPerView: 5
            },
            1024: {
              slidesPerView: 6
            }
        },

        // auto play
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }
    });

    // for to make text individual
    function toMakeTxtIdi(toCall,property){
        const tagArr = $(toCall);
        tagArr.each((idx,tag) => {
            const textArr = $(tag).text().split("");

            $(tag).text("");
            textArr.forEach((value,idx) => {
                const newSpanTag = $($.parseHTML("<span></span>"));
                newSpanTag.attr("style", `${property}: ${0.03 * idx}s`);
                newSpanTag.css("display","inline-block");
                newSpanTag.text(value);

                if(value === " ") newSpanTag.addClass("mx-1")

                $(newSpanTag).appendTo(tag);
            });
        })
    }   
    toMakeTxtIdi("#banner-section .my-scroll-tag","animation-delay");
    toMakeTxtIdi("#contact-us-section .my-contact-us-list a","animation-delay");

    // for touch slider
    let tsCanDraggable = true,
        tsIsDragging = false,
        tsStartX = 0,
        tsAniId = 0;

    function toMakeTS(tss){
        tss.each((idx,ts) => {
            ts.addEventListener("dragstart", (e) => e.preventDefault());

            ts.addEventListener("touchstart", (e) => tsStart(e,idx,ts));
            ts.addEventListener("touchend", (e) => tsEnd(e,ts,tss));
            ts.addEventListener("touchmove", (e) => tsMove(e,ts));
    
            ts.addEventListener("mousedown", (e) => tsStart(e,idx,ts));
            ts.addEventListener("mouseup", (e) => tsEnd(e,ts,tss));
            ts.addEventListener("mouseleave", (e) => tsEnd(e,ts,tss));
            ts.addEventListener("mousemove", (e) => tsMove(e,ts));
        });
    }

    function tsStart(e,idx,ts){
        if(!tsCanDraggable) return;

        tsIsDragging = true;
        const myTSCon = $(ts.closest(".my-touch-slider-con"))
        myTSCon.addClass("my-cr-grabbing");

        tsStartX = tsToGetX(e);

        tsAniId = requestAnimationFrame(function(){
            tsAni(idx,ts);
        });     
    }

    function tsEnd(e,ts,tss){
        if(!tsCanDraggable) return;

        tsIsDragging = false;
        const myTSCon = $(ts.closest(".my-touch-slider-con"));
        myTSCon.removeClass("my-cr-grabbing");

        cancelAnimationFrame(tsAniId);

        const diff = myTSCon.data().myCurrent - myTSCon.data()["myPrev"];
        let idx = myTSCon.data().myIdx;
        if(diff < -100 && idx < tss.length - 1) idx++;
        if(diff > 100 && idx > 0) idx--;
        myTSCon.data()["myIdx"] = idx;

        tsCalcX(ts,idx);    
    }

    function tsMove(e,ts){
        if(!tsCanDraggable) return;

        if(tsIsDragging){
            const moveX = tsToGetX(e);

            const myTSCON = $(ts.closest(".my-touch-slider-con"));
            const prevTran = myTSCON.data("my-prev");
            myTSCON.data("my-current", prevTran + moveX - tsStartX);
        }
    }

    function tsToGetX(e){
        return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    }

    function tsAni(idx,ts){
        tsSetX(ts);
        if(tsIsDragging){
            requestAnimationFrame(function(){
                tsAni(idx,ts);
            });
        }
    }

    function tsSetX(ts){
        const tsCon = $(ts.closest(".my-touch-slider-con")),
            tsMove = $(ts.closest(".my-touch-slider-move"));
        tsMove.attr("style", `transform: translateX(${tsCon.data()["myCurrent"]}px)`)
    }

    function tsCalcX(ts,idx){
        const tsCon = $(ts.closest(".my-touch-slider-con"));
        // const disXMove = -tsCon.innerWidth() * idx;

        eval(tsCon.data("my-fun"));
    }

    // for draggable
    let dgIsDragging = false;
    function toMakeDraggable(dgs,move){
        dgs.each((idx,dg) => {
            dg.addEventListener("dragstart", (e) => e.preventDefault());

            dg.addEventListener("touchstart", (e) => dgStart(dg));
            dg.addEventListener("touchend", (e) => dgEnd(dg));
            dg.addEventListener("touchmove", (e) => dgMove(e,dg,move));
    
            dg.addEventListener("mousedown", (e) => dgStart(dg));
            dg.addEventListener("mouseup", (e) => dgEnd(dg));
            dg.addEventListener("mouseleave", (e) => dgEnd(dg));
            dg.addEventListener("mousemove", (e) => dgMove(e,dg,move));
        });
    }

    function dgStart(dg){
        if(!tsCanDraggable){
            dgIsDragging = true;
            $(dg).addClass("my-cr-grabbing");
        }
    }

    function dgEnd(dg){
        if(!tsCanDraggable){
            dgIsDragging = false;
            $(dg).removeClass("my-cr-grabbing");
        }
    }

    function dgMove(e,dg,move){
        if(dgIsDragging){
            let xyArr = dgToGetXY(e);
            move.css({
                left: xyArr.x,
                top: xyArr.y
            });
        }
    }

    function dgToGetXY(e){
        let xyArr = {};
        if(e.type.includes("mouse")){
            xyArr.x = e.clientX;
            xyArr.y = e.clientY;
        }else{
            xyArr.x = e.touches[0].clientX;
            xyArr.y = e.touches[0].clientY;
        }
        return xyArr;
    }

    // for fullscreen
    function toMakeFullscreen(btn,wantEle,addClassEle){
        $(btn).click(function(){
            if(!document.fullscreenElement){
                let de = !wantEle ? document.documentElement : wantEle;
                if(de.requestFullscreen){
                    de.requestFullscreen();
                }else if(de.msRequestFullscreen){
                    de.msRequestFullscreen();
                }else if(de.wekitRequestFullscreen){
                    de.webkitRequestFullscreen();
                }
            }else{
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }else if(document.msExitFullscreen){
                    document.msExitFullscreen();
                }else if(document.webkitExitFullscreen){
                    document.wekitExitFullscreen();
                }
            }
        });
        
        document.addEventListener("fullscreenchange", ()=>{
            $(addClassEle).toggleClass("fullscreen", document.fullscreenElement);
        });
    };

    // for mini-mode
    function toMakeMiniMode(btn,wantEle,addClassEle){
        $(btn).click(function(){
            if(!$(addClassEle).hasClass("mini-mode")){
                wantEle.requestPictureInPicture();
            }else{
                document.exitPictureInPicture();
            }
        });

        wantEle.addEventListener("enterpictureinpicture", () => $(addClassEle).addClass("mini-mode"));
        wantEle.addEventListener("leavepictureinpicture", () => $(addClassEle).removeClass("mini-mode"));
    }

    // for video
    let canVdKeyDown = false;
    $("#video-block-section .my-vd-block-btn").click(() => canVdKeyDown = true);

    $(".my-vd-con").each((idx,value) => {
        const vd = value.querySelector("video");
        const vdPlayPause = value.querySelector(".my-vd-playpause-btn");
        const vdMiniMode = value.querySelector(".my-vd-mini-mode-btn");
        const vdFullscreen = value.querySelector(".my-vd-fullscreen-btn");
        const vdSpeed = value.querySelector(".my-vd-speed-btn");
        const vdVolume = value.querySelector(".my-vd-volume-btn");
        const vdVolumeRange = value.querySelector(".my-vd-volume-range");
        const vdCurrentDur = value.querySelector(".my-vd-current-dur");
        const vdTotalDur = value.querySelector(".my-vd-total-dur");
        const vdProgressBar = value.querySelector(".my-vd-progress-bar");
        const vdPretendProgress = value.querySelector(".my-vd-pretend-progress");
        const vdRealProgress = value.querySelector(".my-vd-real-progress");

        // for add class enter
        value.addEventListener("touchstart", vdToggleEnter);
        value.addEventListener("mouseenter", vdToggleEnter);
        value.addEventListener("mouseleave", vdToggleEnter);

        function vdToggleEnter(e){
            if(e.type.includes("leave")){
                this.classList.remove("enter");
            }else{
                this.classList.add("enter");
            }
        }

        // for keydown in document
        document.onkeydown = (e) => {
            if(!canVdKeyDown) return;

            const key = e.key.toLowerCase();
            const tagName = document.activeElement.tagName.toLowerCase();

            if(tagName === "input" || tagName === "button") return;

            switch(key){
                case " ":
                case "k":
                    vdTogglePlayPause();
                    break;
                case "f":
                    $(vdFullscreen).click();
                    break;
                case "i":
                    $(vdMiniMode).click();
                    break;
                case "m":
                    vdToggleMute();
                    break;
                case "arrowleft":
                case "j":
                    vdSkip(-5);
                    break;
                case "arrowright":
                case "l":
                    vdSkip(+5);
                    break;
            }
        };
        
        // for play & pause
        function vdTogglePlayPause(){
            vd.paused ? vd.play() : vd.pause();
        }

        vd.addEventListener("click", () => vdTogglePlayPause());
        vdPlayPause.addEventListener("click", () => vdTogglePlayPause());

        vd.addEventListener("play", () => value.classList.remove("paused"));
        vd.addEventListener("pause", () => value.classList.add("paused"));

        // for fullscreen
        toMakeFullscreen(vdFullscreen,value,value);

        // for mini-mode
        toMakeMiniMode(vdMiniMode,vd,value);

        // for speed
        vdSpeed.onclick = () => {
            vd.playbackRate += 0.25;
            if(vd.playbackRate > 2) vd.playbackRate = 0.25;
            $(vdSpeed).text(vd.playbackRate + "x");
        }

        // for volume
        function vdToggleMute(){
            vd.muted = !vd.muted;
            vd.volume = vd.muted ? 0 : 1;
        }

        vdVolume.addEventListener("click", () => vdToggleMute());

        $(vdVolumeRange).slider({
            min: 0,
            max: 1,
            value: 0.5,
            step: 0.1,

            orientation: "vertical",
            range: "max",

            slide: function(e,ui){
                vd.volume = 1 - ui.value;
            }
        });
    
        vd.addEventListener("volumechange", () => {
            $(vdVolumeRange).slider({
                value: 1 - vd.volume
            });

            if(vd.volume > 0) vd.muted = false;
            
            let volumeLvl;
            if(vd.volume === 0){
                volumeLvl = "none";
            }else if(vd.volume < 0.5){
                volumeLvl = "low";
            }else{
                volumeLvl = "high";
            }

            value.dataset.myVolumeLvl = volumeLvl;
        });

        // for duration
        const vdToFixDur =  new Intl.NumberFormat(undefined, {
            minimumIntegerDigits: 2
        });

        function vdToCalcDur(dur){
            const sec = Math.floor(dur % 60);
            const min = Math.floor(dur / 60) % 60;
            const h = Math.floor(dur / 3600);

            if(h === 0){
                return `${min} : ${vdToFixDur.format(sec)}`
            }else{
                return `${h} : ${vdToFixDur.format(min)} : ${vdToFixDur.format(sec)}`
            }
        }

        vd.onloadeddata = () => {
            $(vdTotalDur).text(vdToCalcDur(vd.duration));
        };

        vd.addEventListener("timeupdate", () => {
            const totalWidth = vdProgressBar.clientWidth;
            const totalDur = vd.duration;
            const currentDur = vd.currentTime;

            $(vdCurrentDur).text(vdToCalcDur(currentDur));
            vdRealProgress.style.width = ((totalWidth / totalDur) * currentDur) + "px";
        });

        // for progress
        vdProgressBar.onmousemove = (e) => {
            vdPretendProgress.style.width = Math.max(0, e.offsetX) + "px";
        }

        vdProgressBar.onmousedown = (e) => {
            const totalWidth = vdProgressBar.clientWidth;
            const totalDur = vd.duration;
            vd.currentTime = (e.offsetX * totalDur) / totalWidth;
        }

        // for skip
        function vdSkip(dur){
            vd.currentTime += dur;
        }
    });

    const vdBlockModal = $("#video-block-modal");
    const vdBlockModalClose = vdBlockModal.find(".btn-close");
    vdBlockModalClose.click(function(){
        // for vd keydown
        canVdKeyDown = false;

        // for music pause
        vdBlockModal.find(".my-vd").get(0).pause();

        // for exit mini mode
        const myVdCon = vdBlockModal.find(".my-vd-con");
        if(myVdCon.hasClass("mini-mode")){
            document.exitPictureInPicture();
        }
    });

    // for scroll ani
    let pageScrollingRs;
    $(window).scroll(function(){
        const scrollTopVal = $(this).scrollTop();

        // for page scroll check
        clearInterval(headerNavResult);
        $(".my-page-scroll-check").each((pageIdx,page) => {
            if(Math.floor(page.getBoundingClientRect().top) <= 0) {
                headerNavLinks.each((linkIdx,link) => {
                    if(link.getAttribute("href").replace("#","") === page.id){
                        headerNavToMovePointer(linkIdx,link,false);
                    }
                }); 
            }
        });

        // for page scroll progress
        clearInterval(pageScrollingRs);
        $(".my-page-scroll-progress").addClass("scrolling");
        pageScrollingRs = setTimeout(() => {
            $(".my-page-scroll-progress").removeClass("scrolling");
        },5000);

        const currentPer = Math.floor((scrollTopVal * 100) / ($(document).height() - $(window).height()));
        $(".my-page-scroll-progress-text").text(currentPer + "%");
        $(".my-page-scroll-progress-liquid").css("--current-per", currentPer + "%");

        // for go up btn
        if(scrollTopVal > 500){
            $(".my-go-up-btn").removeClass("d-none");
        }else{
            $(".my-go-up-btn").addClass("d-none");
        }

        // for to add scrolled-active
        $(".my-scroll-con").each((idx,tag) => {
            const topVal = tag.getBoundingClientRect().top;
            const windowH = window.innerHeight;
            const revealPoint = 80;

            if(topVal < (windowH - revealPoint)){
                tag.classList.add("scrolled-active");

                // for scroll num counter
                const myScrollNumCounter = $(tag).find(".my-scroll-num-counter");
                if(myScrollNumCounter.length > 0){
                    let scrollNumCounterRes = setInterval(() => {
                        const totalCount = myScrollNumCounter.data("myCounter");
                        const currentCount = +myScrollNumCounter.text().split("+")[0];
                        const insc = 1;

                        if(currentCount < totalCount){
                            myScrollNumCounter.text((currentCount + insc) + "+");
                        }else{
                            clearInterval(scrollNumCounterRes);
                        }
                    },150);
                }
            }
        });
    });

    /* Start Intro Section */

    /* start navbar section */

    const headerNavSec = $(".my-header-nav-section");
    const headerNavLinks = headerNavSec.find(".nav-link");
    const headerNavPointer = headerNavSec.find(".nav-pointer");

    // for hamburger btn
    const hamburgerBtn = $(".my-hamburger-con");
    hamburgerBtn.bind('click', ()=>{
        hamburgerBtn.toggleClass("clicked-active");
        
        if(hamburgerBtn.hasClass("clicked-active")){
            // clearInterval(headerNavResult);
            headerNavLinks.each((idx,link) => {
                if($(link).hasClass("clicked-active")){
                    $(link).removeClass("clicked-active");
                    headerNavToMovePointer(idx,link,false)
                };
            });
        }
    });

    headerNavLinks.each((idx,tag) => $(tag).click(function(e){
        e.preventDefault();
        headerNavToMovePointer(idx,tag,true);
    }));

    let headerNavResult;
    function headerNavToMovePointer(idx,tag,linkChange){
        clearInterval(headerNavResult);
        headerNavResult = setInterval(function(){
            const clickedActive = headerNavSec.find(".clicked-active").get(0); 
            let clickedIdx = Array.from(headerNavLinks).findIndex(value => clickedActive === value); 

            if(clickedIdx === idx){
                clearInterval(headerNavResult);
                if(linkChange) window.location.href = tag.href;
                return;
            }
            
            if(clickedIdx < idx){ 
                clickedIdx++;
            }else if(clickedIdx > idx){
                clickedIdx--;
            }

            // to defined valueName & value AND to check mobile or laptop
            let val1Name, val2Name, val1, val2 = 0;
            let x = clickedIdx;

            const getStyles = window.getComputedStyle(headerNavSec.get(0));
            const getFlexDir = getStyles.getPropertyValue("flex-direction");
            
            if(getFlexDir === "row"){
                val1Name = "left";
                val2Name = "right";

                val1 = headerNavLinks[clickedIdx].offsetLeft;
                while(x < headerNavLinks.length - 1){
                    x++;
                    val2 += headerNavLinks.eq(x).innerWidth();
                }
            }else if(getFlexDir === "column"){
                val1Name = "top";
                val2Name = "bottom";

                val1 = headerNavLinks[clickedIdx].offsetTop;
                while(x < headerNavLinks.length - 1){
                    x++;
                    val2 += headerNavLinks.eq(x).innerHeight();
                }
            }

            // console.log(val1Name,val1);
            // console.log(val2Name,val2)

            // to make move ani
            if(clickedIdx < idx + 1){
                headerNavPointer.css(val2Name, val2 + "px");
                setTimeout(()=>{
                    headerNavPointer.css(val1Name, val1 + "px");
                },80);
            }else if(clickedIdx > idx - 1){ 
                headerNavPointer.css(val1Name, val1 + "px");
                setTimeout(()=>{
                    headerNavPointer.css(val2Name, val2 + "px");
                },80);
            }

            // to toggle clicked-active
            if(clickedActive) clickedActive.classList.remove("clicked-active");
            headerNavLinks.eq(clickedIdx).addClass("clicked-active");
        },100);
    }

    headerNavLinks.eq(0).click();

    /* end navbar section */

    /* start banner section */

    // for scroll down btn
    $(".my-scroll-down-btn").click(function(){
        const currentTag = $($(this).data()["myGo"]);
        $(this).attr("href", "#" + currentTag.next().attr("id"));
    });

    /* end banner section */

    /* End Intro Section */

    /* Start Our Works Section */

    /* start portfolio section */

    // for hover
    $(".my-port-box").hover(
        function(){
            $(this).addClass("hovered-active")
            $(this).append(` 
                <div class="my-port-ani-con">
                    <div class="my-port-title-con">
                        <h6 class="my-port-title">${$(this).data("myTitle")}</h6>
                        <h5 class="my-port-subtitle">${$(this).data()["mySubtitle"]}</h5>
                    </div>

                    <div class="my-port-dot-con">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>

                    <a href="${$(this).data().myLink}" class="btn my-port-btn">Project Link</a>
                </div>`);
        },function(){
            $(this).removeClass("hovered-active");
            $(this).children(".my-port-ani-con").detach();
        }
    );

    /* end portfolio section */

    /* End Our Works Section */

    /* Start Show Img Section */

    const myShowImgBg = $(".my-show-img-bg"),
        myShowImgCon = myShowImgBg.find(".my-show-img-con"),
        myShowImgMove = myShowImgBg.find(".my-show-img-move"),
        myShowImgFullscreenBtn = myShowImgBg.find(".my-fullscreen-btn"),
        myShowImgZoomBtn = myShowImgBg.find(".my-zoom-btn"),
        myShowImgTitle = myShowImgBg.find(".my-third-con .my-show-img-title"),
        myShowImgPara = myShowImgBg.find(".my-third-con .my-show-img-para"),
        myShowImgPrev = myShowImgBg.find(".my-show-img-prev-btn"),
        myShowImgNext = myShowImgBg.find(".my-show-img-next-btn");

    $(".my-port-box").click(function(){
        toOpenShowImg($(".my-port-box"),this,portImgArr)
    });

    // for open
    function toOpenShowImg(all,current,arr){
        myShowImgBg.removeClass("d-none");
        const targetIdx = Array.from(all).findIndex(value => value === current);
    
        myShowImgMove.html("");
        arr.forEach((value,idx) => {
            const newShowImgBox = $($.parseHTML("<div></div>"));
            newShowImgBox.addClass("my-show-img-box my-touch-slider-box");

            const newShowImg = $($.parseHTML("<img/>"));
            newShowImg.attr({
                src: value.path,
                alt: value.title
            });
            newShowImg.addClass("my-show-img");

            newShowImgBox.append(newShowImg);
            $(newShowImgBox).appendTo(myShowImgMove);
        });

        myShowImgCon.data().myIdx = targetIdx;

        finalShowImg(targetIdx);
        toMakeTS($(".my-show-img-bg .my-touch-slider-box"));
    }

    // for close
    myShowImgBg.find(".my-close-btn").click(function(){
        myShowImgBg.addClass("d-none");
        myShowImgMove.html("");

        // for exit fullsreen
        if(document.fullscreenElement) document.exitFullscreen();
        
        // for zoom-out
        myShowImgBg.removeClass("zoom-in");
        tsCanDraggable = true;
    });

    // for change (prev & next)
    function toChangeShowImg(dir){
        if(!tsCanDraggable) return;

        const activeShowImgBox = $(".my-show-img-box.active");

        let changeShowImgBox;
        if(dir === 1){
            changeShowImgBox = activeShowImgBox.next();
        }else if(dir === -1){
            changeShowImgBox = activeShowImgBox.prev();
        }
        
        const changeIdx = Array.from($(".my-show-img-box")).findIndex(value => value === changeShowImgBox.get(0));

        myShowImgCon.data().myIdx = changeIdx;

        finalShowImg(changeIdx);
    }

    myShowImgPrev.click(() => toChangeShowImg(-1));
    myShowImgNext.click(() => toChangeShowImg(+1));

    // main function for show img
    function finalShowImg(idx){
        // for prev & next position
        const showImgBox = $(".my-show-img-box");
        const activeImg = showImgBox.eq(idx).find("img");
        const disXBtn = (myShowImgCon.innerWidth() - activeImg.innerWidth()) / 4;
        myShowImgPrev.css("left", disXBtn + "px");
        myShowImgNext.css("right", disXBtn + "px");

        if(idx === showImgBox.length - 1){
            myShowImgPrev.removeClass("d-none");
            myShowImgNext.addClass("d-none");
        }else if(idx === 0){
            myShowImgPrev.addClass("d-none");
            myShowImgNext.removeClass("d-none");
        }else{
            myShowImgPrev.removeClass("d-none");
            myShowImgNext.removeClass("d-none");
        }

        // for show img num
        myShowImgBg.find(".my-num-con").text(`${idx + 1} / ${showImgBox.length}`);

        // for show img title & para
        myShowImgTitle.text(portImgArr[idx].title);
        myShowImgPara.text(portImgArr[idx].para);

        // for show img box toggle active
        showImgBox.removeClass("active");
        showImgBox.eq(idx).addClass("active");

        // for move
        myShowImgCon.data({
            myCurrent: -myShowImgCon.innerWidth() * idx,
            myPrev: -myShowImgCon.innerWidth() * idx
        });
        tsSetX(showImgBox.eq(idx));
    }

    // for size (plus & minus)
    myShowImgZoomBtn.click(function(){
        const activeShowImgBox = $(".my-show-img-box.active");
        const activeShowImg = activeShowImgBox.find("img");

        if(!myShowImgBg.hasClass("zoom-in")){
            myShowImgBg.addClass("zoom-in");
            tsCanDraggable = false;
            toMakeDraggable(activeShowImgBox,activeShowImg);
        }else{
            myShowImgBg.removeClass("zoom-in");
            tsCanDraggable = true;
            activeShowImg.css({
                left: "50%",
                top: "50%"
            });
        }
    });
    
    // for fullscreen
    toMakeFullscreen(myShowImgFullscreenBtn.get(0),null,myShowImgBg.get(0));

    /* End Show Img Section */

    // to add copyright year
    $("#copyright-year").text(new Date().getUTCFullYear());

    // to add display: none; for loading
    $(".my-loading").addClass("d-none");
});