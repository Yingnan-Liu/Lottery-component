import React from 'react';
import '../index.css';

const Item = ({ num, prize,active }) => {
	console.log(active,num,'test')
	return (
		<div className={(num-1)===active?'item itemActivate' : 'item'}>
				{prize.name}
		</div>
	)
}

export default Item
