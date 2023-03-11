"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function search() {
    return __awaiter(this, void 0, void 0, function* () {
        const nameInput = document.querySelector('#name');
        const amountInput = document.querySelector('#amount');
        const validation = isValid(nameInput, amountInput);
        if (validation.error)
            return alert(validation.message);
        const response = yield request(validation.message);
        console.log(response);
        if (response[0].message === "item not found")
            return alert("item not found");
        showResponse(response);
    });
}
function isValid(nameInput, amountInput) {
    var _a;
    const hasDigit = new RegExp(/[0-9]/ig);
    const isDifferentFormDigit = new RegExp(/[^0-9]/ig);
    const hasWord = new RegExp(/[a-z]/ig);
    if (nameInput == null || !nameInput.value || hasDigit.test(nameInput.value))
        return { message: "Invalid Name", error: true };
    if (amountInput == null || !amountInput.value || hasWord.test(amountInput.value) || isDifferentFormDigit.test(amountInput.value))
        return { message: "Invalid Amount", error: true };
    const name = nameInput.value.replace(/\s/ig, '-');
    const amount = Number((_a = amountInput.value.match(/[0-9]/ig)) === null || _a === void 0 ? void 0 : _a.join(''));
    return { message: `https://empyrion-calculator.onrender.com/calculate?name=${name}&amount=${amount}`, error: false };
}
function request(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseJson = yield fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        });
        const response = yield responseJson.json();
        return response;
    });
}
function showResponse(response) {
    const table = document.querySelector('table');
    if (table === null)
        return;
    table.innerHTML = `
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Yield</th>
    </tr>
    `;
    response.forEach(ell => {
        table.innerHTML += `
        <tr>
            <td><img src="./img/${ell.name.replace(' ', '-')}.webp" width="50" height="50"></td>
            <td>${ell.name}</td>
            <td>${ell.yields}</td>
        </tr>
        `;
    });
}
