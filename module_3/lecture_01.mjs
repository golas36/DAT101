import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));
printOut("Test");

function sum( number1, number2){
    const result = number1 + number2;
    printOut("result = " + result.toString());
}

function sum(){
const result = 10 + 20;
printOut(“result 0 ‘ + result.toString());
