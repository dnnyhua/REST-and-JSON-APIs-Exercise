const BASE_URL = "http://127.0.0.1:5000/api";

// Generate the Html for each cupcake
function generateCupcakeHTML(cupcake) {
	return `
    <div data-cupcake-id= ${cupcake.id} class="mt-3">
        <li>
            Flavor: ${cupcake.flavor} / Size: ${cupcake.size} / Rating: ${cupcake.rating} 
            <button class="delete-button btn btn-sm btn-danger">X</button>
        </li>
        <img class="cupcake-img" src="${cupcake.image}">
    </div>    
    `;
}

// Show current cupcakes that have been added so far
async function showCurrentCupcakes() {
	const resp = await axios.get(`${BASE_URL}/cupcakes`);
	for (let cupcakeData of resp.data.cupcakes) {
		let newCupcake = $(generateCupcakeHTML(cupcakeData));
		$("#cupcakes-list").append(newCupcake);
	}
}

// Handle form submission

$("#cupcake-form").on("submit", async function (evt) {
	evt.preventDefault();

	let flavor = $("#form-flavor").val();
	let size = $("#form-size").val();
	let rating = $("#form-rating").val();
	let image = $("#form-image").val();

	const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
		flavor,
		size,
		rating,
		image
	});

	let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
	$("#cupcakes-list").prepend(newCupcake);
	$("#cupcake-form").trigger("reset");
});

// Handle delete

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
	evt.preventDefault()

	let $cupcake = $(evt.target).closest("div");
	let id = $cupcake.attr("data-cupcake-id");
	await axios.delete(`${BASE_URL}/cupcakes/${id}`);
	$cupcake.remove();
});




// $(".delete-button").click(deleteCupcake);
	
// async function deleteCupcake() {

// 	const $cupcake = $(this).closest("div");

// 	const id = $cupcake.attr("data-cupcake-id");

// 	await axios.delete(`${BASE_URL}/cupcakes/${id}`);
// 	$cupcake.remove();
// };



$(showCurrentCupcakes);
