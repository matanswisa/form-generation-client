
import './App.css'
import { DynamicForm } from './components/DynamicForm'

import SubmissionsTable from './components/SubmissionTable';

function App() {


  return (
    <>
      <div style={{ padding: 20 }}>
        <h1>Submitted Forms</h1>
        <SubmissionsTable />
      </div>
      <DynamicForm />
    </>
  )
}

export default App
