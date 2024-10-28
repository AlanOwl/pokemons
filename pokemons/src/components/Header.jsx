import '../styles/header.css'
import Card from "./Card";
import { useState, useEffect } from 'react';
let url = 'https://pokeapi.co/api/v2/pokemon'

export default  function Header () {

	const [inputOne, setInputOne] = useState('');
	let [pokemons, setPokemon] = useState([]);
	let name1 = '';
	let name2 = '';
	useEffect(() => {
		console.log(pokemons)
	}, [pokemons])

	async function handleSubmit(event) {
		event.preventDefault();
		const name = inputOne;
		setInputOne('')
		const responce = await fetch(url)
		const data = await responce.json()
		for (const i in data.results) {
			let flag = true
			if (name === data.results[i].name) {
				pokemons.map((el, id) => {
					if (el[0] === name) flag = false
				})
				if (flag) {

					const responce2 = await fetch(data.results[i].url)
					const data2 = await responce2.json()
					const sprite = data2.sprites.front_default
					const species = data2.species.url

					const responce3 = await fetch(species)
					const data3 = await responce3.json()


					const responce4 = await fetch(data3.evolution_chain.url)
					const forms = await responce4.json()

				
					if (forms.chain.evolves_to[0]) {
						name1 = forms.chain.evolves_to[0].species.name;
						if (forms.chain.evolves_to[0].evolves_to[0]) {
							name2 = forms.chain.evolves_to[0].evolves_to[0].species.name
						}
					}
					setPokemon(pokemons => [...pokemons, [name, data.results[i].url,name1,name2,sprite]])
					console.log("gotcha")
				break
				}


			}
		}

	};
return (
	<div className='header'>
		<div className="header__top">
			<form className='form' onSubmit={handleSubmit}>
				<label>
					Имя:
					<input className='input-text' value={inputOne} onChange={(e) => setInputOne(e.target.value)} type="text" name="name" />
				</label>
				<input className='input-btn' type="submit" value="Отправить" />
			</form>
		</div>
		<div className="header__content">
			
			<Card setPokemon={setPokemon} info={pokemons}></Card>
		</div>
	</div>
)
}