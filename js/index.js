"use strict";
const outcome = document.getElementById("outcome");
const display = document.getElementById("display");
const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    //get pattern
    //pattern1 e.g. "30 %", "30 $", "23 h" but not "23 home"
    const pattern1 = "\\d\\s{1}(%(?!%|\\w)|\\$(?!\\w)|h$|h[\\s\\.,])";
    //pattern2 e.g. "blah !", "blah ?", "blah :"
    const pattern2 = "[a-zàâäèéêëîïôœùûüÿç!@#$%&+-]\\s{1}(\\!(?!\\w)|\\?(?!\\w)|:(?!\\w))";
    //pattern3 e.g. "Êtes-vous", "Allez-y"
    const pattern3 = "([a-zàâäèéêëîïôœùûüÿç])-([a-zàâäèéêëîïôœùûüÿç])";
    //pattern4 e.g. "« blah », « 100 », « terminé »"
    const pattern4 = "«\\s{1}[0-9a-zàâäèéêëîïôœùûüÿç!@#$%&+-]+\\s{1}»";
    //instantiate regex object
    const re = RegExp(pattern1 + "|" + pattern2 + "|" + pattern3 + "|" + pattern4, "ig");
    //get string
    const processString = document.getElementById("incoming").value;
    let matchArray, highlighting = "", first = 0, last = 0, target, className, counter = 0;
    //find each match
    while ((matchArray = re.exec(processString)) !== null) {
        last = matchArray.index;
        //get all of string up to match, concatenate
        highlighting += processString.substring(first, last);
        //insert &nbsp;
        target = matchArray[0].replace(/\s{1}/, "&nbsp;").replace(/\s{1}/, "&nbsp;").replace(/-/, "&#8209;");
        //add matched, with class
        className = target.indexOf("&nbsp;") > -1 ? "found" : "found-dash";
        highlighting += `<span class="${className}">${target}</span>`;
        first = re.lastIndex;
        counter++;
    }
    //finish off string
    highlighting += processString.substring(first, processString.length);
    //insert into page
    document.getElementById("counter").innerHTML = counter.toString();
    document.getElementById("showResult").innerHTML = highlighting;
    highlighting = highlighting.replace(/<\/?pre>/g, "").replace(/<\/?span.*?>/g, "").replace(/<\/?script.*?>/g, "");
    outcome.value = highlighting;
    display.style.display = "block";
});
//select text on focus
outcome.addEventListener("focus", () => {
    outcome.select();
});
const currentYear = new Date().getFullYear();
const year = document.getElementById("year");
year.innerHTML = currentYear.toString();
//# sourceMappingURL=index.js.map