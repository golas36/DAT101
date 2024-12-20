"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const AccountType = {
    NORMAL: "Normal",
    SAVING: "Saving",
    PENSION: "Pension"
};

printOut(Object.values(AccountType).join(", "));
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
class TAccount {
    constructor(type) {
        this.type = type;
    }

    setType(newType) {
        this.type = newType;
        printOut(`Account type changed to: ${newType}`);
    }

    toString() {
        return this.type;
    }
}

const myAccount = new TAccount(AccountType.NORMAL);
printOut(myAccount.toString());
myAccount.setType(AccountType.SAVING);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
class TAccountWithBalance extends TAccount {
    constructor(type) {
        super(type);
        this.balance = 0;
    }

    getBalance() {
        return this.balance.toFixed(2);
    }

    deposit(amount) {
        this.balance += amount;
        printOut(`Deposited: ${amount}, New Balance: ${this.getBalance()}`);
    }

    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            printOut(`Withdrew: ${amount}, New Balance: ${this.get