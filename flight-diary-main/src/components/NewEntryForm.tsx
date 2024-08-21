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

    const visibilitySelected = (value: string) => {
        setNewVisibility(value as DiaryEntry["visibility"])
    }

    const weatherSelected = (value: string) => {
        setNewWeather(value as DiaryEntry["weather"])
    }

    return (
        <form onSubmit={prepareSubmit}>
            Date
            <input
                type="date"
                value={newDate}
                onChange={(event) => 
                    setNewDate(event.target.value)}
            />
            <br />
            Visibility
            <div>
                great <input type="radio" name="visibility" onChange={() => visibilitySelected('great')} /><br />
                good <input type="radio" name="visibility" onChange={() => visibilitySelected('good')} /><br />
                ok <input type="radio" name="visibility" onChange={() => visibilitySelected('ok')} /><br />
                poor <input type="radio" name="visibility" onChange={() => visibilitySelected('poor')} /><br />
            </div>
            <br />
            Weather
            <div>
                sunny <input type="radio" name="weather" onChange={() => weatherSelected('sunny')} /><br />
                rainy <input type="radio" name="weather" onChange={() => weatherSelected('rainy')} /><br />
                cloudy <input type="radio" name="weather" onChange={() => weatherSelected('cloudy')} /><br />
                stormy <input type="radio" name="weather" onChange={() => weatherSelected('stormy')} /><br />
                windy <input type="radio" name="weather" onChange={() => weatherSelected('windy')} /><br />
            </div>
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