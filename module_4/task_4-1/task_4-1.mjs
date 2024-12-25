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
            printOut(`Withdrew: ${amount}, New Balance: ${this.getBalance()}`);
        } else {
            printOut("Insufficient funds!");
        }
    }
}

const accountWithBalance = new TAccountWithBalance(AccountType.SAVING);
accountWithBalance.deposit(100);
accountWithBalance.withdraw(50);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
class TAccountWithLimits extends TAccountWithBalance {
    constructor(type) {
        super(type);
        this.withdrawalCount = 0;
    }
    withdraw(amount) {
        switch (this.type) {
            case AccountType.SAVING:
                if (this.withdrawalCount >= 3) {
                    printOut("Withdrawal limit reached for savings account.");
                    return;
                }
                this.withdrawalCount++;
                break;
            case AccountType.PENSION:
                printOut("Withdrawals not allowed for pension accounts.");
                return;
        }
        super.withdraw(amount);
    }
    setType(newType) {
        super.setType(newType);
        this.withdrawalCount = 0; // Reset count
    }
    deposit(amount) {
        super.deposit(amount);
        this.withdrawalCount = 0; // Reset count
    }
}

const limitedAccount = new TAccountWithLimits(AccountType.SAVING);
limitedAccount.deposit(100);
limitedAccount.withdraw(30);
limitedAccount.withdraw(30);
limitedAccount.withdraw(30);
limitedAccount.withdraw(10);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
const Currency = {
    NOK: "NOK",
    USD: "USD",
    GBP: "GBP"
};

class TAccountWithCurrency extends TAccountWithLimits {
    constructor(type) {
        super(type);
        this.currency = Currency.NOK;
    }

    setCurrencyType(newCurrency) {
        if (this.currency === newCurrency) {
            printOut("Currency is already set to this type.");
            return;
        }
        this.currency = newCurrency;
        printOut(`Currency set to ${newCurrency}`);
    }
}
const currencyAccount = new TAccountWithCurrency(AccountType.NORMAL);
currencyAccount.setCurrencyType(Currency.USD);
currencyAccount.deposit(150);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
class TAccountWithConversion extends TAccountWithCurrency {
    constructor(type) {
        super(type);
        this.exchangeRates = {
            [Currency.NOK]: 1,
            [Currency.USD]: 0.1,
            [Currency.GBP]: 0.08
        };
    }

    convertCurrency(amount, fromCurrency, toCurrency) {
        const rateFrom = this.exchangeRates[fromCurrency];
        const rateTo = this.exchangeRates[toCurrency];
        return (amount / rateFrom) * rateTo;
    }
    setCurrencyType(newCurrency) {
        if (this.currency !== newCurrency) {
            const newBalance = this.convertCurrency(this.balance, this.currency, newCurrency);
            this.balance = newBalance;
            super.setCurrencyType(newCurrency);
        }
    }
}

const conversionAccount = new TAccountWithConversion(AccountType.NORMAL);
conversionAccount.deposit(100);
conversionAccount.setCurrencyType(Currency.GBP);
conversionAccount.setCurrencyType(Currency.USD);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */
class TAccountWithMultiCurrency extends TAccountWithConversion {
    deposit(amount, currency = this.currency) {
        const convertedAmount = this.convertCurrency(amount, currency, this.currency);
        this.balance += convertedAmount;
        printOut(`Deposited: ${amount} ${currency}, New Balance: ${this.getBalance()} ${this.currency}`);
    }

    withdraw(amount, currency = this.currency) {
        const convertedAmount = this.convertCurrency(amount, currency, this.currency);
        if (convertedAmount <= this.balance) {
            this.balance -= convertedAmount;
            printOut(`Withdrew: ${amount} ${currency}, New Balance: ${this.getBalance()} ${this.currency}`);
        } else {
            printOut("Insufficient funds!");
        }
    }
}
const multiCurrencyAccount = new TAccountWithMultiCurrency(AccountType.NORMAL);
multiCurrencyAccount.deposit(12, Currency.USD);
multiCurrencyAccount.withdraw(10, Currency.GBP);
multiCurrencyAccount.setCurrencyType(Currency.NOK);
multiCurrencyAccount.withdraw(50, Currency.NOK);
printOut(newLine);

