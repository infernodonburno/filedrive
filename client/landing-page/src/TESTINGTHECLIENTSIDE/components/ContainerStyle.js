import styled from 'styled-components'

const ContainerStyle = styled.table`
  .a {
    width: 250px;
    height: 25px;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`

export default ContainerStyle
