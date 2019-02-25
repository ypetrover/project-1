var allTasks = [];

function init() {
    //אם הלוקל סטורג' ריק, שלא תתבצע שום פעולה
    if (localStorage.getItem('allTasks') == null) return;
    //שליפה מהלוקל סטורג' תוך כדי הפיכה למערך של אובייקטים
    allTasks = JSON.parse(localStorage.getItem('allTasks'))
    //במטרה להדפיס את כל המשימות בבת אחת על המסך אני מזין את כל המשימות לתוך משתנה
    var l = '';

    for (var i = 0; i < allTasks.length; i++) {
        var getLS = allTasks[i];
        //בדיקה שרק במקרה של בחירת תאריך ושעה, יוצג הקו
        var kav = (getLS.date != '' && getLS.time != '') ? ' | ' : '';
        l += `
        <div class="note">
        <div class="taskInNote">
        <p class="details">${getLS.task}</p>
        </div>
        <span class="spanDateTime">${getLS.date}${kav}${getLS.time}</span>
        <span onclick="erase(event)" class="closeIcon glyphicon glyphicon-remove"></span>
        <img class="pin" src="../images/pin.png">
        </div>`

        //הצגת המשימה במסך
        document.getElementById('all').innerHTML = l;
    }
}

function addTask() {
    var add = document.getElementById('myTask').value;
    var taskDate = document.getElementById('date').value;
    //החלפת סדר התאריך רק במקרה והוזן תאריך (מאפשר הכנסת משימה גם במקרה ואין חובה להזין תאריך)
    var tDate = taskDate !== '' ? taskDate.split('-').reverse().join('-') : '';
    //בדיקה אם הוזנה משימה ותאריך
    if (add === '') {
        document.getElementById('myTask').className = 'error';
        return;
    } else {
        document.getElementById('myTask').className = '';
    }
    if (tDate === '') {
        document.getElementById('date').className = 'error';
        return;
    } else {
        document.getElementById('date').className = '';
    }
    var taskTime = document.getElementById('time').value;
    //בניית האובייקט
    var taskObject = { task: add, date: tDate, time: taskTime };
    //הכנסה למערך
    allTasks.push(taskObject);
    //בדיקה שרק במקרה של בחירת תאריך ושעה, יוצג הקו
    var kav = (tDate != '' && taskTime != '') ? ' | ' : '';
    //יצירת דיב שיעטוף את המשימה
    var e = document.createElement('div')
    //הוספת הקלאסים המתאימים
    e.className = 'note animation';
    //בניית המשימה עצמה
    e.innerHTML = `
    <div class="taskInNote">
    <p class="details">${add}</p>
    </div>
    <span class="spanDateTime">${tDate}${kav}${taskTime}</span>
    <span onclick="erase(event)" class="closeIcon glyphicon glyphicon-remove"></span>
    <img class="pin" src="../images/pin.png">
    `;
    //הצגת המשימה במסך
    document.getElementById('all').appendChild(e);
    //הכנסת המערך ללוקל סטורג' תוך כדי דריסת הקיים, ולאחר הפיכתו לסטרינג
    localStorage.setItem('allTasks', JSON.stringify(allTasks));

    clearTask();
    document.getElementById('myTask').focus();
}

function clearError() {
    event.target.className = '';
}

function clearTask() {
    document.getElementById('myTask').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('myTask').focus();
}

function erase(event) {
    //בחירת הדיב האב של האיקס
    var delette = event.path[1];
    //הוספת קלאס בשביל האנימצית מחיקה
    delette.className = 'note delete';
    //מחיקת המשימה בסיום האנימציה
    setTimeout(function () {
        //בדיקה מה האינדקס של המשימה ברשימת האחים (שאר המשימות) בשביל לדעת מאיזה מיקום למחוק מהמערך
        var index = Array.prototype.indexOf.call(delette.parentNode.children, delette);
        //מחיקה מהמערך
        allTasks.splice(index, 1);
        //הכנסת המערך שוב ללוקל סטורג' תוך כדי דריסת המידע הקודם
        localStorage.setItem('allTasks', JSON.stringify(allTasks));
        //מחיקת הדיב עצמו
        delette.outerHTML = '';
    }, 1500);

}
