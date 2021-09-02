import React from 'react'

const List = ({list}) => {
	return (
		<div>
			{list.map(item =><li>{item.name}</li>)}
		</div>
	)
}

export default List
