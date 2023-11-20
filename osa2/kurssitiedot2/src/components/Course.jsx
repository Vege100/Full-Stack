

const Course = ({course}) => {
    return (
      <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    console.log(props)
    return (
          <h2>{props.course}</h2>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    return (
      <div>
        {props.parts.map((partt, i) => <Part key={partt.id} part={partt.name}  exercises={partt.exercises} />)}
      </div>
    )
  }
  
  const Total = (props) => {
    console.log(props)
    return (
      <div>
        <strong>Number of exercises {props.parts.reduce((total, part) => total + part.exercises, 0)}</strong>
      </div>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>{props.part} {props.exercises} </p>
      </div>
    )
  }

  export default Course