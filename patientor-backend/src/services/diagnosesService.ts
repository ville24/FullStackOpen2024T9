import diagnoseData from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getEntries = (): DiagnoseEntry[] => {
    return diagnoses;
};

/*const addDiary = () => {
  return null;
};*/

export default {
    getEntries,
    //addDiary
};