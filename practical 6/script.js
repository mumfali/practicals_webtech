// Shoe Shopping Cart

let cart = [
    { id: 1, name: "Nike", price: 5000, quantity: 1 },
    { id: 2, name: "Adidas", price: 3500, quantity: 2 },
    { id: 3, name: "Puma Sport", price: 2800, quantity: 1 }
];


// Display Cart

function display() {

    let output = "";

    cart.forEach(shoe => {

        output += `
            <tr>
                <td>${shoe.id}</td>
                <td>${shoe.name}</td>
                <td>${shoe.price}</td>
                <td>${shoe.quantity}</td>
            </tr>`;
    });

    document.getElementById("cart").innerHTML = output;


    // map() - get shoe names

    document.getElementById("names").innerText =
        cart.map(shoe => shoe.name).join(", ");


    // reduce() - calculate total

    document.getElementById("total").innerText =
        cart.reduce(
            (total, shoe) =>
                total + shoe.price * shoe.quantity, 0
        );
}


// Add Shoe using push()

function addShoe() {

    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("qty").value);

    cart.push({
        id: cart.length + 1,
        name: name,
        price: price,
        quantity: quantity
    });

    display();
}


// Remove Shoe using filter()

function removeShoe() {

    let id = Number(document.getElementById("removeId").value);

    cart = cart.filter(shoe => shoe.id !== id);

    display();
}


// Initial display

display();
