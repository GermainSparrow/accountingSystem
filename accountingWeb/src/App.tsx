
import './App.css'
import Container from './pages/container'
import TestNode from './pages/test'
function App() {


  return (
    <div className="App">
      <Container auth={[1]}>
        <TestNode/>
      </Container>
      <Container auth={[6]}>
        <button>按钮2</button>
      </Container>
    </div>
  )
}

export default App
