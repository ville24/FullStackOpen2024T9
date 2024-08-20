import Entry from './Entry';
import { DiaryEntry } from '../types';

interface contentProps {
    diaryEntries: DiaryEntry[]
};

  
const Content = (props: contentProps)  => {
    return (
        <>
            {
                props.diaryEntries.map(diaryEntry => {
                    return (<Entry key={diaryEntry.id} diaryEntry={diaryEntry}></Entry>);
                })
            }
        </>
)   ;
};

export default Content;