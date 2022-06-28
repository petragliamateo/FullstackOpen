const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p style={{fontWeight: 'bold'}}>Total of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} part={part} />)

export const Course = ({ course }) => {
  const sum = course.parts.reduce((previus, current) => {
    const currentValue = current.exercises;
    const previusValue = previus.exercises ? previus.exercises : previus;
    return previusValue + currentValue;
  })

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course;
