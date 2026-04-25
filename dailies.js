const sheetID = "" // change to your sheetID
// Hardcoded from url because the other ways of obtaining google sheetid is through creating or it being active
const taskListName = "" // change to the name of your google task list

function addRandomTask() {
  // categories
  // change what's in the arrays to change what tasks you get
  const workouts = [
    "200 situps",
    "100 situps",
    "20 russian twists",
    "40 russian twists",
    "100 russian twists",
    "100 squats",
    "50 squats",
    "40 pushups",
    "20 pushups",
    "Take a walk",
    "Do a 2-Minute Plank",
    "100 reverse situps",
    "50 reverse situps",
    "Do some light stretches",
    "50 situps",
    "10 pullups",
  ]
  const languageLearning = [
    "Study Japanese for 15 minutes",
    "Do a page of your Genki notebook",
    "Learn a new kanji",
    "Practice a new word",
    "Study a Japanese grammar point",
    "Study Japanese sentence structure",
    "Practice Japanese shadowing",
    "Watch a Japanese YouTube video with subtitles",
    "Practice kanji writing for 10 minutes",
    "Listen to a Japanese podcast or song",
    "Use a Japanese language learning app like Anki or Duolingo",
    "Have a short conversation in Japanese (even if it's to yourself)"
  ]
  const tech = [
    "Start or continue a Project",
    "Do a LeetCode problem",
    "Learn some of a coding language",
    "Write a small update to a project",
    "Review a coding project you've completed",
    "Learn about a new data structure",
    "Review a specific algorithm",
    "Study design patterns",
    "Plan to or participate in a coding challenge",
    "Explore a new framework or library",
    "Plan a side project",
    "Write a brief summary of a coding concept",
    "Build a mini game with code (like very mini)",
    "Make or work on a video",
    "Make or work on a video",
  ]
  const general = [
    "Take some photos (at least 3)",
    "Make or work on a video",
    "Do some light gaming",
    "Learn a new skill online",
    "Shave",
    "Organize a meeting with friends or colleagues",
    "Learn a productivity hack",
    "Take up a new logic puzzle",
    "Try to learn a party trick",
    "Listen to a TED Talk",
    "Listen to a podcast",
    "Watch a tutorial",
    "Plan tomorrow's outfit",
    "Do a Meditation",
    "Send a quick thank-you",
    "Reflect on the day",
    "Send a check-in message",
    "Plan something with friends",
    "Update your resume",
    "Research local workshops",
    "Attend a club",
    "Organize a game night",
    "Look at events going on campus for the week",
    "Plan a hangout",
    "Organize your paperwork",
    "Review assignments for the week",
    "Review your notes",
    "Update your budget",
    "Do a quick financial check-in",
    "Check your bank account",
    "Plan a DIY project",
    "Add to your shopping list",
    "Clean your room",
    "Clean out your bag",
    "Clean your glasses",
    "Clean your keyboard",
    "Back up files",
    "Clear your cache",
    "Read an article",
    "Listen to some new songs",
    "Watch an engineering video",
    "Do all the main NY Times games",
    "Research a quick fact or piece of trivia",
    "Take an online personality quiz",
    "Do some Pokedoku",
    "Plan something with friends",
    "Look at your crypto",
    "Play a puzzle game like Sudoku or crossword",
    "DAY OFF",
    "DAY OFF",
    "DAY OFF",
    "ALL IN",
  ]

  const taskLists = Tasks.Tasklists.list().items;
  let tasksAdded = [];
  // Replace with your actual task list ID
  let taskListId = "";
  taskLists.forEach(taskLists => {
    if(taskLists.title === taskListName){
      taskListId = taskLists.id;
    }}
  )

  // Get the current date and time
  const now = new Date();

  // Set the due date to be 1 day from now (example: you can adjust this as needed)
  const dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 11:59 in CST the -5 is added to change from orginal UTC 
  // Convert the due date to RFC3339 format
  const dueDateISO = dueDate.toISOString();
  let workoutTask = workouts[Math.floor(Math.random() * workouts.length)];
  let languageTask = languageLearning[Math.floor(Math.random() * languageLearning.length)];
  let generalTask = general[Math.floor(Math.random() * general.length)];
  let techTask = tech[Math.floor(Math.random() * tech.length)];
  
  
  //while(tasksAdded.includes(workoutTask)){
  //  workoutTask = workouts[Math.floor(Math.random() * workouts.length)];
  //}
  if(generalTask === "DAY OFF"){
    return;
  }
  if(techTask === 'Start or continue a Project'){
    Tasks.Tasks.insert(
      {
        title: techTask,
        due: dueDateISO
      },
      taskListId
    );
    return;
  }
  if(generalTask === "ALL IN"){
    while(generalTask === "ALL IN" || generalTask === "DAY OFF"){
      generalTask = general[Math.floor(Math.random() * general.length)];
    }
    tasksAdded.push(generalTask);
    while(generalTask === "ALL IN" || generalTask === "DAY OFF"){
      generalTask = general[Math.floor(Math.random() * general.length)];
    }
    tasksAdded.push(techTask);
    const tempTech = techTask;
    while(techTask === tempTech ||techTask === 'Start or continue a Project'){
      techTask = techTask[Math.random() * tech.length];
    } 
    tasksAdded.push(workoutTask);
    tasksAdded.push(languageTask);
    const tempWorkout = workoutTask;
    while(workoutTask === tempWorkout){
      workoutTask = workouts[Math.random() * workouts.length];
    }
    const tempLanguage = languageTask;
    while(languageTask === tempLanguage){
      languageTask = languageLearning[Math.random() * languageLearning.length];
    }

  }
  

  tasksAdded.push(techTask);
  tasksAdded.push(generalTask);
  tasksAdded.push(workoutTask);
  tasksAdded.push(languageTask);

  for(let i = 0; i < tasksAdded.length; i++){
    let task = tasksAdded[i];
    Tasks.Tasks.insert(
      {
        title: task,
        due: dueDateISO
      },
      taskListId
    );
  }
  createListOfTasks();
}


// Set up a trigger to run the function daily only need to run once, even if you later edit the other functions
// you never need to run it again
function createTimeDrivenTrigger() { 
  ScriptApp.newTrigger('addRandomTask')
    .timeBased()
    .everyDays(1)
    .atHour(0) // Set the hour of the day you want to run the script (0-23)
    .create();
  ScriptApp.newTrigger('addTasksToSheet')
  .timeBased()
  .everyDays(1)
  .atHour(0) // Set the hour of the day you want to run the script (0-23)
  .nearMinute(20)
  .create();
}
function listTaskLists() {
  // Fetch the list of task lists from Google Tasks API
  const taskLists = Tasks.Tasklists.list().items;

  if (taskLists.length === 0) {
    Logger.log('No task lists found.');
  } else {
    Logger.log('Task Lists:');
    taskLists.forEach(taskList => {
      Logger.log('Name: ' + taskList.title + ', ID: ' + taskList.id);
    });
  }
}
function createListOfTasks() {
  const taskLists = Tasks.Tasklists.list().items;
  let taskListId = "";
  taskLists.forEach(taskLists => {
    if(taskLists.title === taskListName){
      taskListId = taskLists.id;
    }}
  )
  let allTasks = [];
  let pageToken = null
  
  do {  
  let allData = Tasks.Tasks.list(
    taskListId,
    {
      showCompleted: false,
      showDeleted: false,
      showAssigned: true,
      showHidden: false,
      pageToken: pageToken
    }
  );
  pageToken = allData.nextPageToken;
  allData.items.forEach(item => {
    allTasks.push([item.title]);
  })
  
  } while(pageToken)
  range = "Current!A:A"; // if I ever have more than 1000 tasks to do I'm either dead or throwing
  Sheets.Spreadsheets.Values.clear({},sheetID, range); // clears only first row, did batch clear before, but there was no need
  //Logger.log(allTasks);
  if(allTasks.length < 1){ // no need to update it's already blank
    return;
  }
  Sheets.Spreadsheets.Values.update(
    {
      values: allTasks,
      majorDimension: "ROWS"
    },
    sheetID,
    range,
    {
      "valueInputOption": "RAW",
      "includeValuesInResponse": false,
      "responseValueRenderOption": "FORMATTED_VALUE",
    }
  )

}

function addTasksToSheet(){
    const taskLists = Tasks.Tasklists.list().items;
  let taskListId = "";
  taskLists.forEach(taskLists => {
    if(taskLists.title === taskListName){
      taskListId = taskLists.id;
    }}
  )
  const today = new Date();
  Logger.log(today)
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let completedTasks = [];
  let pageToken = null
  
  do {  
  let allData = Tasks.Tasks.list(
    taskListId,
    {
      showCompleted: true,
      showDeleted: false,
      showAssigned: false,
      showHidden: true,
      pageToken: pageToken
    }
  );
  pageToken = allData.nextPageToken;
  //Logger.log(allData.items)
  allData.items.forEach(item => {
    if (item.status != 'completed') return;

      const completedDate = new Date(item.completed); // item.completed is completed date in RFC 3399 timestamp 
      if (
        completedDate >= yesterday &&
        completedDate < today &&
        !item.assignmentInfo // very strange parameter only tasks assigned from docs or chat spaces, but it doesn't count appscript as an outside assignment
      ) {
        completedTasks.push([
          item.title || "",
          "",
          "",
          item.completed || "",
          "",
          item.due || ""
        ]);
      }
  })
  } while(pageToken)

  let range = "Sheet1!A:A";
  Logger.log(completedTasks);
  Logger.log(completedTasks.length)
  Sheets.Spreadsheets.Values.append(
    {
    values: completedTasks
    },
    sheetID,
    range,
    {
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      includeValuesInResponse: false,
      responseValueRenderOption:"UNFORMATTED_VALUE",
      values: completedTasks.titles
    }
  )
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName("Processed Data");
  let row = sheet.getLastRow() + 1;
  for(let i = 0; i < completedTasks.length; i++){
    addFunctionsToSheet(row)
    row++;
  }
}
function addFunctionsToSheet(sourceRow){
  let range = "Processed Data!A:A";
  const row = [
    `=TEXT(Sheet1!A${sourceRow}, "")`, // A
    "",                                // B
    "",                                // C
    `=IF(Sheet1!D${sourceRow}="","",TEXT(DATEVALUE(LEFT(Sheet1!D${sourceRow},10)) + TIMEVALUE(MID(Sheet1!D${sourceRow},12,8)) - TIME(5,0,0), "yyyy-mm-dd"))`, // D
    `=IF(Sheet1!F${sourceRow}="","",TEXT(DATEVALUE(LEFT(Sheet1!F${sourceRow},10)) + TIMEVALUE(MID(Sheet1!F${sourceRow},12,8)) - TIME(5,0,0), "yyyy-mm-dd"))`, // E
    "",                                // F
    `=IF(D${sourceRow}="","",COUNTIF($D$2:$D, D${sourceRow}))`, // G
    "",                                // H
    `=IF(Sheet1!D${sourceRow}="","",TEXT(DATEVALUE(LEFT(Sheet1!D${sourceRow},10)) + TIMEVALUE(MID(Sheet1!D${sourceRow},12,8)) - TIME(5,0,0), "hh AM/PM"))` // I
  ];

  Sheets.Spreadsheets.Values.append(
    {
      values: [row]
    },
    sheetID,
    range,
    {
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS"
    }
  );
  const row2 = [
    `=TEXT('Processed Data'!I${sourceRow},"hh AM/PM")`,
    `=IF(A2300="","",TIMEVALUE(A${sourceRow}))`
  ]
  range = "Sheet3!A:A"
  Sheets.Spreadsheets.Values.append(
    {
      values: [row2]
    },
    sheetID,
    range,
    {
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS"
    }
  );
}




























