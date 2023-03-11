


async function search() {
    const nameInput: HTMLInputElement | null = document.querySelector('#name')
    const amountInput: HTMLInputElement | null = document.querySelector('#amount')
    const validation = isValid(nameInput, amountInput)
    if (validation.error)
        return alert(validation.message)
    const response = await request(validation.message)
    console.log(response)
    if (response[0].message === "item not found")
        return alert("item not found")
    showResponse(response)


}

function isValid(nameInput: HTMLInputElement | null, amountInput: HTMLInputElement | null): { message: string, error: boolean } {
    const hasDigit = new RegExp(/[0-9]/ig)    
    const hasWord = new RegExp(/[a-z]/ig)
    if (nameInput == null || !nameInput.value || hasDigit.test(nameInput.value))
        return { message: "Invalid Name", error: true }
    if (amountInput == null || !amountInput.value || hasWord.test(amountInput.value))
        return { message: "Invalid Amount", error: true }

    console.log(RegExp(/[^0-9]/ig).test(amountInput.value))
    const name = nameInput.value.replace(/\s/ig, '-')
    const amount = Number(amountInput.value.match(/[0-9]/ig)?.join(''))
    return { message: `https://empyrion-calculator.onrender.com/calculate?name=${name}&amount=${amount}`, error: false }
}

async function request(url: string) {
    const responseJson: Response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json"
        }
    })
    const response = await responseJson.json()
    return response
}

function showResponse(response: Array<{ name: string, yields: number }>) {
    const table: HTMLTableElement | null = document.querySelector('table')
    if (table === null)
        return

    table.innerHTML = `
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Yield</th>
    </tr>
    `
    response.forEach(ell => {
        table.innerHTML += `
        <tr>
            <td><img src="./img/${ell.name.replace(' ', '-')}.webp" width="50" height="50"></td>
            <td>${ell.name}</td>
            <td>${ell.yields}</td>
        </tr>
        `
    })
}