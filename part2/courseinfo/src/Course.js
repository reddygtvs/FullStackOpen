import React from 'react';

const Header = ({ course }) => {
    console.log(course)
    return (
      <h2>{course}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, value) => {
      return (
        sum + value.exercises
      )
    }, 0)
    return(
      <h2>Number of exercises {sum}</h2>
    ) 
  }
  
  const Part = (props) => {
    const part = props.part
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(courseinfo =>
          <Part key={courseinfo.id} part={courseinfo} />
        )}
      </div>
    )
  }
  
  const Course = ({ courses }) => {
    return (
      <div>
        <h1>Web Development Curriculum</h1>
        {courses.map((course) => {
          // console.log(course)
          return (
            <div key={course.id}>
              <Header course={course.name} />
              <Content course={course} />
              <Total course={course} />
            </div>
          )
        })}
      </div>
    )
    
  }

  export default Course;