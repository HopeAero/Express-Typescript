import diaryData from "./diaries.json";
import { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry} from "../types";

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

export const getEntries = (): DiaryEntry[] => diaries;

export const getEntriesWhitoutSensitiveInfo = () : NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility
    }))
}     

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    if (entry) {
        const { comment, ...rest } = entry;
        return rest;
    }

    return entry;
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
    const newDiary = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...newDiaryEntry
    }

    diaries.push(newDiary);
    return newDiary;
}


