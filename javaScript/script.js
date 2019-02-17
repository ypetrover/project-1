//חשוב להדגיש שהפונקציה דלהלן תעבוד רק אם אין בלוקל סטורג' שום מידע נוסף מלבד המשימות
function init() {
    //יצירת מערך של המפתחות בלוקל סטורג', מיון המערך לפי המספר בלבד
    var a = Object.keys(localStorage).sort(function (a, b) {
        //שליפת המספר בלבד
        var x = a.replace('taskN-', '');
        var y = b.replace('taskN-', '');
        //מיון לפי סדר המספרים
        return x - y;
    });
    //במטרה להדפיס את כל המשימות בבת אחת על המסך אני מזין את כל המשימות לתוך משתנה
    var l = '';
    //לולאה לפי אורך המפתחות בלוקל סטורג'
    for (var i = 0; i < localStorage.length; i++) {
        //חילוץ המשימה מסטרינג לאובייקט
        var getLS = JSON.parse(localStorage.getItem(a[i]));
        var tDate = '';
        //החלפת סדר התאריך בתנאי שיש תאריך
        if (getLS.date !== '') tDate = getLS.date.split('-').reverse().join('-');
        //בדיקה שרק במקרה של בחירת תאריך ושעה, יוצג הקו
        var kav = (tDate != '' && getLS.time != '') ? ' | ' : '';
        l += `
        <div class="note" id="${getLS.id}">
        <div class="taskInNote">
        <p class="details">${getLS.task}</p>
        </div>
        <span class="spanDateTime">${tDate}${kav}${getLS.time}</span>
        <span onclick="erase(event)" class="closeIcon glyphicon glyphicon-remove"></span>
        <img class="pin" src="../images/pin.png">
        </div>`
    }
    //הצגת המשימות למסך
    document.getElementById('all').innerHTML = l;
}

function addTask() {
    var add = document.getElementById('myTask').value;
    var taskDate = document.getElementById('date').value;
    //החלפת סדר התאריך רק במקרה והוזן תאריך
    var tDate = '';
    if (taskDate !== '') {
        tDate = taskDate.split('-').reverse().join('-');
    }
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

    var o = Object.keys(localStorage);
    o.sort(function (a, b) { return b.replace('taskN-', '') - a.replace('taskN-', '') });
    // if (o[0]) o[0].replace('taskN-', ''); else o = 0;
    o = o[0] || '0';
    o = o.replace('taskN-', '');
    //var o = (Object.keys(localStorage).sort(function (a, b) { return b.replace('taskN-', '') - a.replace('taskN-', '') })[0] || '').replace('taskN-', '') | 0;

    var taskObject = { id: 'taskN-' + (++o), task: add, date: taskDate, time: taskTime };

    localStorage.setItem('taskN-' + (o), JSON.stringify(taskObject));
    var kav = (tDate != '' && taskTime != '') ? ' | ' : '';
    var e = document.createElement('div')
    e.id = `taskN-${o}`;
    e.className = 'note animation';
    e.innerHTML = `
    <div class="taskInNote">
    <p class="details">${add}</p>
    </div>
    <span class="spanDateTime">${tDate}${kav}${taskTime}</span>
    <span onclick="erase(event)" class="closeIcon glyphicon glyphicon-remove"></span>
    <img class="pin" src="../images/pin.png">
    `;
    document.getElementById('all').appendChild(e);

    clearTask();
    document.getElementById('myTask').focus();
}

function clearTask() {
    document.getElementById('myTask').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
}

function erase(event) {
    //זיהוי המשימה לפי הID
    var localKey = event.path[1].id;
    //מחיקת המשימה מהלוקל סטורג'
    localStorage.removeItem(localKey);
    var delette = document.getElementById(localKey);
    //הוספת קלאס בשביל אנימצית המחיקה
    delette.className = 'note delete';
    //מחיקת המשימה בסיום האנימציה
    setTimeout(function () {
        delette.outerHTML = '';
    }, 1500);

}