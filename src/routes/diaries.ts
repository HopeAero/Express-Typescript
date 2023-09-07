import express from "express";
import * as diaryServices from "../services/diaryServices";
import toNewDiaryEntry from "../utils";

const router = express.Router();  

router.get("/", (_req, res) => {
  res.send(diaryServices.getEntriesWhitoutSensitiveInfo());
})

router.get("/:id", (req, res) => {
  const diary = diaryServices.findById(+req.params.id);
  if(diary){
    res.status(200).send(diary)
  } else {
    res.status(404).send("Diary not found");
  }
})

router.post("/", (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

  res.json(addedDiaryEntry)
  
  } catch (e) {
    res.status(400).send(e.message)
  }
  
})

export default router;
