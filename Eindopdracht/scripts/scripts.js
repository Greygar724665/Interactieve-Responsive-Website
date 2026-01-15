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
        // Een sort for loop die door elk element gaat
        const svg = link.querySelector("svg");
        if (svg) {
            const existingSpan = link.querySelector("span");
            // Als het een <svg> is na de anchor
            // Kijkt of het telefoon maat is
            if (window.matchMedia("(max-width: 767px)").matches) {
                // Kijkt of er al een suffix is.
                if (!existingSpan) {
                    const pageName = getCurrentPage(link.href, true); // Krijgt de pagina van waar de svg staat
                    let span = link.querySelector("span");
                    span = document.createElement("span");
                    span.style.marginLeft = "5px";
                    link.appendChild(span);
                    span.textContent = `${pageName}`;
                }
            } else {
                // Remove any existing span elements for larger screens
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
    emailFieldColor();
    inputLabels();
}

function printInput(id) {
    written = document.getElementById(id).value;
    print(written);
}

emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// E-mail check
function emailFieldColor() {
    emailField = document.getElementById("email-input");
    // if (emailField.length == 0) { emailField.style.setProperty("color", valid ? "#252525" : "#FF4040", "important"); return; }

    emailField.addEventListener("input", () => {
        fieldValue = emailField.value.trim();
        valid = emailValid(fieldValue);
        // print(emailField)
        emailField.style.setProperty(
            "color",
            valid ? "#252525" : "#FF4040",
            "important"
        );
    });
}

function inputLabels() {
    ids = {
        "email-input": "Email",
        "name-input": "Name",
        "subject-input": "Subject",
        "content-input": "Content",
    };
    // console.log(Object.keys(ids));
    console.log(ids);
    for (const id of Object.keys(ids)) {
        let field = document.getElementById(id);
        field.addEventListener("input", () => {
            if (field.value.length > 0) {
                document
                    .getElementById(ids[id])
                    .style.setProperty("display", "flex", "important");
            } else {
                document
                    .getElementById(ids[id])
                    .style.setProperty("display", "none", "important");
            }
        });
    }
}

function sendEmail() {
    email = document.getElementById("email-input").value;
    userName = document.getElementById("name-input").value;
    subject = document.getElementById("subject-input").value;
    content = document.getElementById("content-input").value;
    print(
        `Name: ${userName}\nEmail: ${email}\nSubject: ${subject}\n\nContent:\n${content}`
    );
}
