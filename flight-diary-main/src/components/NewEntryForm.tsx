import { useState } from "react";
import { DiaryEntry } from '../types';

interface formProps {
    lastId: number,
    handleForm: (arg1: DiaryEntry) => void,
};

const NewEntryForm = (props: formProps)   => {
    const [newDate, setNewDate] = useState<DiaryEntry["date"]>('');
    const [newVisibility, setNewVisibility] = useState<DiaryEntry["visibility"] | string>('');
    const [newWeather, setNewWeather] = useState<DiaryEntry["weather"] | string>('');
    const [newComment, setNewComment] = useState<DiaryEntry["comment"]>('');

    const prepareSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const newEntry: DiaryEntry = {
            id: props.lastId + 1,
            date: String(newDate),
            visibility: newVisibility as DiaryEntry["visibility"],
            weather: newWeather as DiaryEntry["weather"],
            comment: String(newComment)     
        }
        props.handleForm(newEntry)
    }

    return (
        <form onSubmit={prepareSubmit}>
            Date
            <input 
                value={newDate}
                onChange={(event) => 
                    setNewDate(event.target.value)}
            />
            <br />
            Visibility
            <input 
                value={newVisibility}
                onChange={(event) => 
                    setNewVisibility(event.target.value as DiaryEntry["visibility"])}
            />
            <br />
            Weather
            <input 
                value={newWeather}
                onChange={(event) => 
                    setNewWeather(event.target.value as DiaryEntry["weather"])}
            />
            <br />
            Comment
            <input 
                value={newComment}
                onChange={(event) => 
                    setNewComment(event.target.value)}
            />
            <br />
            <button type='submit'>add</button>
        </form>
)   ;
};

export default NewEntryForm;