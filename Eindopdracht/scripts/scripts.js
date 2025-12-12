const print = (x) => console.log(x);

main()

function getCurrentFileName() {
    const pagePathName = window.location.pathname;
    // The substring method gets the part of the string after the last '/'
    let file = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
    
    // Remove the .html at the end of the string
    const endValForSlice = file.length - 5;
    const filename = file.slice(0, endValForSlice);
    return filename;
}
function getCurrentPage(capatalize = false) {
    const filename = getCurrentFileName();
    if (filename == "index") {
        if (capatalize) {return "Thuispagina"}
        else {return "thuispagina"}
    } else {
        if (capatalize) {return filename.charAt(0).toUpperCase() + filename.slice(1)}
        else {return filename}
    }
}

function medianofthree(a,b,c) {
    if (c <= a >= b || b <= a >= c) {
        return a
    } else if (a <= b >= c || c <= b >= a) {
        return b
    } else {
        return c
    }
}
function quicksort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    const pivot = medianofthree(arr.at(0), arr.at(Math.floor(arr.length/2)), arr.at(-1))
    let left = arr.filter(x => x < pivot)
    let center = arr.filter(x => x == pivot)
    let right = arr.filter(x => x > pivot)

    return [...quicksort(left), ...center, ...quicksort(right)]
}

function setPageTitle() {
    document.getElementById("page-title").innerHTML = getCurrentPage(true)
}

function main() {
    setPageTitle()
}