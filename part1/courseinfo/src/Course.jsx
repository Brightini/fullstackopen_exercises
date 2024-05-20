function Header(props) {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};

function Content(props) {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.key} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
}

function Total(props) {
  const exercises = props.parts.map((x) => x.exercises);
  const sum = exercises.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <b>
      <p>Number of exercises {sum}</p>
    </b>
  );
}

const Course = (props) => {
  return (
    <>
      {props.course.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
