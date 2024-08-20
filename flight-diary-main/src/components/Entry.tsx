import { DiaryEntry } from '../types';

interface dairyProps {
    diaryEntry: DiaryEntry;
}

  
const Entry = (props: dairyProps)  => {
    return (
        <>
            <h3>{props.diaryEntry.date}</h3>
            <p>
                <span style={{fontStyle: "normal"}}>weather: {props.diaryEntry.weather}</span><br />
                <span style={{fontStyle: "normal"}}>visibility: {props.diaryEntry.visibility}</span><br />
                <span style={{fontStyle: "normal"}}>comment: {props.diaryEntry.comment}</span><br />
            </p>
        </>
    );
}
  
export default Entry;