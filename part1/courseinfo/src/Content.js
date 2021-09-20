import React from 'react'
import Part from './Part'
const Content = (props) => {
    const array = props.array;
    return (
        <div>
            <Part names={array[0].name} numbers={array[0].exercises} />
            <Part names={array[1].name} numbers={array[1].exercises} />
            <Part names={array[2].name} numbers={array[2].exercises} />
        </div>
    )
}

export default Content;