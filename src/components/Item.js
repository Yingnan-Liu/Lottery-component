import React from 'react';
import '../index.css';

const Item = ({ num, prize, active }) => {
	return (
		<div className={num === active ? 'item itemActivate' : 'item'}>
			{prize.name}
		</div>
	)
}

export default Item
