import diagnoseData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const diagnosis: Diagnosis[] = diagnoseData;

const getEntries = (): Diagnosis[] => {
    return diagnosis;
};

/*const addDiary = () => {
  return null;
};*/

export default {
    getEntries,
    //addDiary
};