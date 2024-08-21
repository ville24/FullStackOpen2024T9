import Header from './components/Header';
import NewEntryForm from './components/NewEntryForm';
import Content from './components/Content';

import { DiaryEntry } from './types'

import { useState, useEffect } from "react";
import axios from "axios"

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const subHeader = "Diary entries";

  useEffect(() => {
    axios.get<DiaryEntry[]>('https://improved-palm-tree-556jgvjrq9ph7ppv-3000.app.github.dev/api/diaries').then(response => {
      setDiaryEntries(response.data);
    })
  }, [])

  const entryCreation = (newEntry: DiaryEntry): void => {
    axios.post<DiaryEntry>('https://improved-palm-tree-556jgvjrq9ph7ppv-3000.app.github.dev/api/diaries', newEntry)
    .then(response => {
      setDiaryEntries(diaryEntries.concat(response.data));
    })
  };

  const lastId: number = diaryEntries.length

  return (
    <div>
      <Header header={subHeader}></Header>
      <NewEntryForm lastId={lastId} handleForm={entryCreation}></NewEntryForm>
      <Content diaryEntries={diaryEntries}></Content>
    </div>
  );
};

export default App;