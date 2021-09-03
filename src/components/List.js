import React from 'react'

const List = ({list,n}) => {
	return (
		<div>
			{list.map(item =><li key={n} >{item.name}</li>)}
		</div>
	)
}

export default List
