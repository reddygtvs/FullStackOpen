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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App;
