import React from 'react'

const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
  
  const Header = ({ name }) => {
    return <h1>{name}</h1>
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
  }
  
  const Total = ({ parts }) => {
    console.log(parts)
    return <p>Total of exercises {parts.reduce((s, p) => s + p.exercises, 0)}</p>
  }

  export default Course