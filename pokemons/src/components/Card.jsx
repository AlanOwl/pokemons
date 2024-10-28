import '../styles/card.css'
import crest from '../img/crest2.png'
import { memo } from 'react';
import React from 'react';

export default React.memo(function Card({ info, setPokemon, }) {


	return (
		<div className='card-wrapper'>

			{info.map((el, id) => (
				<div className='card-container' key={el[0]}>
					<div className="card__info">
						<p className="item" >{el[0]} {"=>"} {el[2]} {el[3] !== '' && "=>"} {el[3]}</p>
						<img src={el[4]} alt="" />
					</div>
					<button className="card__close" onClick={() => setPokemon(info.filter((a) => a[0] !== el[0]))}>
						<img className="crest" src={crest} alt="img" />
					</button>
				</div>

			))}
		</div>
	)
})