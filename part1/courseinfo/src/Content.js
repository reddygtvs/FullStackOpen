import Part from './Part'
const Content = (index) => {
    index = index.parts.parts;
    return (
        <div>
            <Part name={index[0].name} number={index[0].exercises} />
            <Part name={index[1].name} number={index[1].exercises} />
            <Part name={index[2].name} number={index[2].exercises} />
        </div>
    )
}

export default Content;