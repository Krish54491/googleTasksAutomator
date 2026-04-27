# googleTasksAutomator
Automate tasks being added to your google tasks list daily and randomize them just like game! Not only that, but get statistics on your habits and productivity automatically 


### Setup
First, Create a Google tasks account and create a list(if you already have one just make a list)
<br><br>
Second, Create a Google Sheet and get the Sheet ID
<img width="896" height="151" alt="Screenshot 2026-04-26 021335" src="https://github.com/user-attachments/assets/36593fa7-4207-4ed6-aee3-bd8b96a741b8" />
<br>
Should be in the url as depicted
<br><br>
Then create a Appscript file
<img width="650" height="596" alt="image" src="https://github.com/user-attachments/assets/fa1591a2-b8a6-4e69-bdd7-ce64816b4ee3" />
<br>
Copy and paste the code from dailies.js into the file
<br><br>
Then change "sheetID" and "taskListName" to your sheet ID and task list name respectively
<br><br>
In the Appscript file click on services and add the Google Tasks API and the Google Sheet API
<img width="1202" height="999" alt="image" src="https://github.com/user-attachments/assets/0799a042-ab75-42f9-b3ae-4a7404b53f9d" />
<br>
Also if you're in a different timezone than CST you'll have to change these lines to adjust for your timezone
<img width="1239" height="337" alt="Screenshot 2026-04-26 204953" src="https://github.com/user-attachments/assets/33214ccf-35da-4d4d-9eab-ec28f95019b2" />
<br>
Change the lines to be your time compared to UTC
<br>
Ex. UTC to UTC(+5:30) or Indian Standard Time 
```
  const row = [
    `=TEXT(Sheet1!A${sourceRow}, "")`, // A
    "",                                // B
    "",                                // C
    `=IF(Sheet1!D${sourceRow}="","",TEXT(DATEVALUE(LEFT(Sheet1!D${sourceRow},10)) + TIMEVALUE(MID(Sheet1!D${sourceRow},12,8)) + TIME(5,30,0), "yyyy-mm-dd"))`, // D
    `=IF(Sheet1!F${sourceRow}="","",TEXT(DATEVALUE(LEFT(Sheet1!F${sourceRow},10)) + TIMEVALUE(MID(Sheet1!F${sourceRow},12,8)) + TIME(5,30,0), "yyyy-mm-dd"))`, // E
    "",                                // F
    `=IF(D${sourceRow}="","",COUNTIF($D$2:$D, D${sourceRow}))`, // G
    "",                                // H
    `=IF(Sheet1!D${sourceRow}="","",TEXT(DATEVALUE(LEFT(Sheet1!D${sourceRow},10)) + TIMEVALUE(MID(Sheet1!D${sourceRow},12,8)) + TIME(5,30,0), "hh AM/PM"))` // I
  ];

```
<br><br>
Finally select createTimeDrivenTrigger and run the function once selected
<img width="701" height="358" alt="image" src="https://github.com/user-attachments/assets/d7b7c7cc-5547-4998-96c5-18cf83d952f1" />
<br>
If you ever want to add or remove tasks/categories just change the array called allPossibleTasks
<br>
You don't need to rerun createTimeDrivenTrigger after editing, just save and it will take affect
<br><br>
To add a category of tasks (1 more task per day) make a new array in the matrix, to add a possible task pick a category and just add a String with the task name
<br>
## That's it you're all good to go!
