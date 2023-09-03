import { useState } from 'react'
import { useAddNotesMutation, useGetNotesQuery, useDeleteNoteMutation } from './API/notesApi'
import styled from 'styled-components'
import { note } from './API/notesApi'

const Flex = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #1E1E28;
  font-family: Montserrat-Bold, sans-serif;
  flex-direction: column;
`

const App: React.FC = () => {
  let { data, error , isLoading } = useGetNotesQuery()
  const [addNote] = useAddNotesMutation()
  const [delNote] = useDeleteNoteMutation()
  const [text, setText] = useState<string>('')
  const [height, setHeight] = useState<number>(50)
  if(error) return <h1>Something went wrong...</h1>
  if(isLoading) return <h1>Loading...</h1>
  function createHandle() {
    addNote({
      id: Math.random() * 1000,
      title: text
    })
    setText('')
  }
  function checkHeight(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(e.target.scrollTop > 0) setHeight(height+28)
  }
  return (
    <>
      <Flex>
        <div className='CreateNote'>
          <h1 className='CreateNote__header'>Add new note</h1>
          <textarea style={{height: `${height}px`}} onKeyUp={checkHeight} className='CreateNote__input' placeholder='New note' value={text} onChange={e=>setText(e.target.value)} />
          <button className='CreateNote__submit' onClick={createHandle}>Add</button>
        </div>
        <div className='Notes'>
          {
            data && [...data].reverse().map(el => 
              <li key={el.id} className='Note'> 
                <h1 className='Note__title'>&nbsp; { el.title } </h1>
                <button className='Note__delete' onClick={() => delNote(el)}>Delete</button>
              </li>)
          }
        </div>
      </Flex>
    </>
  )
}

export default App
