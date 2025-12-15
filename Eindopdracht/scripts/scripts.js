main();

const print = (x) => console.log(x);

function getCurrentFileName(pagePathName = window.location.pathname) {
    // const pagePathName = window.location.pathname;
    // The substring method gets the part of the string after the last '/'
    let file = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);

    // Remove the .html at the end of the string
    const endValForSlice = file.length - 5;
    const filename = file.slice(0, endValForSlice);
    return filename;
}
function getCurrentPage(path = window.location.pathname, capitalize = false) {
    // Returns the current page name based on the filename
    const filename = getCurrentFileName(path);
    // Special case for index page
    if (filename == "index") {
        if (capitalize) {
            return "Thuispagina";
        } else {
            return "thuispagina";
        }
        // Other pages
    } else {
        if (capitalize) {
            // Capitalize the first letter
            return filename.charAt(0).toUpperCase() + filename.slice(1);
        } else {
            return filename;
        }
    }
}

function setPageTitle() {
    // Sets the page title based on the current page
    document.getElementById("page-title").innerHTML = getCurrentPage(
        window.location.pathname,
        true
    );
}

function togglePageTitleDisplay() {
    document.addEventListener("DOMContentLoaded", () => {
        const pageTitle = document.getElementById("page-title");
        const navItemsContainer = document.getElementById("navitems-container");

        navItemsContainer.addEventListener("show.bs.collapse", () => {
            pageTitle.style.display = "none";
        });

        navItemsContainer.addEventListener("hide.bs.collapse", () => {
            setTimeout(() => {
                pageTitle.style.display = "flex";
            }, 350);
        });
    });
}

function updateNavSVGS() {
    const navLinks = document.querySelectorAll("#navitems-container a");

    navLinks.forEach((link) => {
        const svg = link.querySelector("svg");
        if (svg) {
            if (window.matchMedia("(max-width: 767px)").matches) {
                const pageName = getCurrentPage(link.href, true);
                let span = link.querySelector("span");
                if (!span) {
                    span = document.createElement("span");
                    span.style.marginLeft = "5px";
                    link.appendChild(span);
                }
                span.textContent = `${pageName}`;
            } else {
                // Remove any existing span elements for larger screens
                const existingSpan = link.querySelector("span");
                if (existingSpan) {
                    link.removeChild(existingSpan);
                }
            }
        }
    });
}

function suffixNavSVGs() {
    document.addEventListener("DOMContentLoaded", () => {
        updateNavSVGS();
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateNavSVGS, 100);
        });
    });
}
// print(window.location.pathname);
function main() {
    setPageTitle();
    togglePageTitleDisplay();
    suffixNavSVGs();
}

function getInputFieldValue(id) {
    value = document.getElementById(id).value;
    print(value);
}
