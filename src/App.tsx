import { useState } from 'react'
import SchemaForm from './schemaForm'
import Navbar from './navbar'
import About from './about'
import Configuration from './configuration'
import './App.css'

function App() {
  const [view, setView] = useState<'schema' | 'about' | 'configuration'>(
    'schema',
  )

  return (
    <>
      <Navbar
        onAboutClick={() => setView('about')}
        onSchemaClick={() => setView('schema')}
        onConfigurationClick={() => setView('configuration')}
      />
      <div className="container-schema-form">
        {view === 'about' && <About />}
        {view === 'schema' && <SchemaForm />}
        {view === 'configuration' && <Configuration />}
      </div>
    </>
  )
}

export default App
