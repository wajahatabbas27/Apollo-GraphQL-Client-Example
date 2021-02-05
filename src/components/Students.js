import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';

const Students_Data = gql`
  query StudentsData {
    students{
      name
      id
      email
      age
    }
  }
`;

const ADD_STUDENT = gql`
  mutation AddStudent($email: String!,$id: Int!, $name: String!, $age: Int!) {
     addStudent(
       input: {name: $name, id: $id, email: $email, age: $age}) {
      id
      name
    }
  }
  `;

export const Students = () => {

  const { loading, error, data } = useQuery(Students_Data);
  const [addStd] = useMutation(ADD_STUDENT);

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <h1>Error ...</h1>;

  const { students } = data;
  console.log(students);

  return (
    <div>
      <h1>Students List </h1>
      <div>
        {students.map((student) => {
          return (
            <h1 key={student.id}>{student.id}-) {student.name} | {student.age} | {student.email}</h1>
          )
        })}
      </div>
      <button onClick={() => {
        addStd({
          variables: {
            name: "Askari Abbas", id: 65, email: "askari1@gmail.com", age: 19
          }
        })
      }}>Add Student</button>
    </div>
  )
} 
