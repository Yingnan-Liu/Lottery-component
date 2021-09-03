import React from 'react'

const List = ({list}) => {
	return (
		<div>
			{list.map((item,index) =><li key={index} >{item.name}</li>)}
		</div>
	)
}

export default List
