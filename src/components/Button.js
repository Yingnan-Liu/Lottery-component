import React from 'react'

const Button = ({ handleLottery }) => {
	return (
		<div>
			<button onClick={handleLottery} className="lottery-btn">
			</button>
		</div>
	)
}

export default Button
