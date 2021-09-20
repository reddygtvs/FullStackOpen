const Total = (number) => {
    return (
        <div>
            <p>
                Number of exercises {number[0].exercises + number[1].exercises + number[2].exercises}
            </p>
        </div>
    )
    
}
export default Total;