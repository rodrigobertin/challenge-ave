const result = document.getElementById('result');

function searchPokemon(event) {
	event.preventDefault();
	const searchValue = document.getElementById('search').value.toLowerCase();
	fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
		.then(response => response.json())
		.then(data => {
			let typesRender = '';
			data.types.forEach(t => {
				typesRender += `<span class="btn btn-outline-primary btn-sm mx-1" style="cursor:revert">${t.type.name}</span>`;
			})

			result.innerHTML = `
            <div class="card mt-3">
                <div class="card-body text-center">
                    <h2 class="card-title">${data.name} #${data.id}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <div class="my-1">
                    	${typesRender}
										</div>
                    <p class="m-0 card-text">Peso: ${data.weight}</p>
                    <p class="m-0 card-text">Altura: ${data.height}</p>
                </div>
            </div>
            `;
		})
		.catch(err => {
			console.log(err);
			result.innerHTML = `<h2 class="text-center">Pokemon not found</h2>`;

		});
}

document.getElementById('form-search').addEventListener('submit', searchPokemon);
