import Header from './components/Header';
import NewEntryForm from './components/NewEntryForm';
import Content from './components/Content';
import Error from './components/Error';

import { DiaryEntry } from './types'

import { useState, useEffect } from "react";
import axios from "axios"

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const subHeader = "Diary entries";

  useEffect(() => {
    axios.get<DiaryEntry[]>('https://improved-palm-tree-556jgvjrq9ph7ppv-3000.app.github.dev/api/diaries').then(response => {
      setDiaryEntries(response.data);
    })
  }, [])

  const entryCreation = async (newEntry: DiaryEntry): Promise<void> => {
    setErrorMessage('')
    try {
      const response = await axios.post<DiaryEntry>('https://improved-palm-tree-556jgvjrq9ph7ppv-3000.app.github.dev/api/diaries', newEntry)
      setDiaryEntries(diaryEntries.concat(response.data));
    }
    catch(error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        if (error.response) {
          setErrorMessage(String(error.response.data))
        }
      } else {
        console.error(error);
      }
    }
  };

  const lastId: number = diaryEntries.length

  return (
    <div>
      <Header header={subHeader}></Header>
      <Error errorMessage={errorMessage}></Error>
      <NewEntryForm lastId={lastId} handleForm={entryCreation}></NewEntryForm>
      <Content diaryEntries={diaryEntries}></Content>
    </div>
  );
};

export default App;