import React from 'react'

const Button = ({text,handleLottery}) => {
	return (
		<div>
			<button onClick={handleLottery}>
				{text}
			</button>
		</div>
	)
}

export default Button
