import {data} from "./data.min.js";
class GlobalSlider {
    constructor(data) {
        this.slider([data.prev, data.next, data.slide, data.unit, data.value_1, data.breakpoint]);
    };
    slider([prev, next, slide, unitOfMeasurement, value_1, valueBreakpoint]) {
        const prevBtn = document.querySelector(prev);
        const nextBtn = document.querySelector(next);
        const slideWrap = document.querySelector(slide);
        let value = 0;
        class FlipThrough {
            constructor(button, orientation) {
                this.flipThrough(button, orientation);
            };
            flipThrough(button, orientation) {
                button.addEventListener("click", () => {
                    if (orientation === "prev") value = value + value_1;
                    if (orientation === "next") value = value - value_1;
                    slideWrap.style.cssText = `transform: translateX(${value + unitOfMeasurement}); transition: all ease 0.5s;`;
                    if (value < valueBreakpoint) value = 0; slideWrap.style.cssText = `transform: translateX(${value + unitOfMeasurement}); transition: all ease 0.5s;`;
                    if (value > 0) value = valueBreakpoint; slideWrap.style.cssText = `transform: translateX(${value + unitOfMeasurement}); transition: all ease 0.5s;`;
                });
            };
        };
        class FlipThroughNext extends FlipThrough {
            constructor(options) {
                super(options.button, options.orientation);
            };
        };
        class FlipThroughPrev extends FlipThrough {
            constructor(options) {
                super(options.button, options.orientation);
            };
        };
        const flipThroughNext = new FlipThroughNext({button: nextBtn, orientation: "next"});
        const flipThroughPrev = new FlipThroughPrev({button: prevBtn, orientation: "prev"});
    };
};
class OtherFunctions {
    constructor(data) {
        this.workWithForm(data.variables.otherFunctions.Form);
        this.workWithMenu(data.variables.otherFunctions.Menu);
    };
    workWithForm(form) {
        const contactInputs = document.querySelectorAll(form.contactInputs);
        const processClickOutsideInputs = (input, infoItem) => {
            document.addEventListener("click", function(event) {
                if (event.target.className !== input.className && input.value < 1) {
                    infoItem.style.display = "flex"; 
                    setTimeout(() => infoItem.removeAttribute("style"), 0);
                };
            });
        };
        contactInputs.forEach(input => {
            const inputInfo = document.querySelectorAll(form.inputInfo);
            input.addEventListener("click", () => {
                inputInfo.forEach(infoItem => {
                    if (infoItem.id === input.className) {
                        infoItem.style.display = "none"; 
                        processClickOutsideInputs(input, infoItem);
                    };
                });
            });
        });
    };
    workWithMenu(menu) {
        const open = document.querySelector(menu.openButton);
        const openWrap = document.querySelector(menu.openWrap);
        const close = document.querySelector(menu.closeButton);
        const closeWrap = document.querySelector(menu.closeWrap);
        const menuItem = document.querySelector(menu.menuItem);
        const servicesIcons = document.querySelectorAll(menu.servicesIcon);
        const servicesItems_1 = document.querySelector(menu.servicesItems_1);
        const servicesItems_2 = document.querySelector(menu.servicesItems_2);
        const servicesItemsArr = [servicesItems_1, servicesItems_2];
        open.addEventListener("click", () => {
            menuItem.classList.add("active-1", "animation-ended");
            setTimeout(() => openWrap.classList.add("not-active-2"), 500); 
            closeWrap.classList.add("active-2");
        });
        close.addEventListener("click", () => {
            menuItem.classList.remove("active-1", "animation-ended");
            setTimeout(() => closeWrap.classList.remove("active-2"), 500); 
            openWrap.classList.remove("not-active-2");
        });
        const dropDownLists = (icons, listsArr) => {
            const iterateLists = (listsArr) => listsArr.forEach(list => dropDownIconsWithLists(list));
            const dropDownIconsWithLists = (list) => {
                icons.forEach(icon => {
                    icon.addEventListener("click", (event) => {
                        event.preventDefault();
                        if (icon.dataset.value === list.dataset.value) {
                            icon.classList.toggle("fa-chevron-down");
                            icon.classList.toggle("fa-chevron-up");
                            list.classList.toggle("active-2");
                        };
                    });
                });
            };
            iterateLists(listsArr);
        };
        dropDownLists(servicesIcons, servicesItemsArr);
    };
};
function createDerivedClassesFromGlobalSlider(data) {
    const sliders = Object.values(data.variables.sliders);
    sliders.forEach(slider => {
        const sliderVariables = Object.values(slider);
        const [sliderName, prev, next, slide] = sliderVariables;
        class AnotherSlider extends GlobalSlider {
            constructor(data) {
                super(data);
            };
        };
        const slidesItems = document.querySelectorAll(`${slide} > div`);
        const slideLength = slidesItems.length;
        let value_1 = 100;
        let breakpoint = -value_1 * slideLength + value_1;
        let unit = "%";
        const optionsForSlider = {
            nameOfSlider: sliderName,
            prev: prev,
            next: next,
            slide: slide,
            unit: unit,
            value_1: value_1,
            breakpoint: breakpoint
        };
        if (optionsForSlider.nameOfSlider === "clientsSlider") {
            value_1 = 202;
            breakpoint = -value_1 * slideLength + value_1 * 6;
            unit = "px";
            optionsForSlider.value_1 = value_1;
            optionsForSlider.breakpoint = breakpoint;
            optionsForSlider.unit = unit;
            const Class = new AnotherSlider(optionsForSlider);
        };
        const Class = new AnotherSlider(optionsForSlider);
    });
};
createDerivedClassesFromGlobalSlider(data);
const otherFunctions = new OtherFunctions(data);