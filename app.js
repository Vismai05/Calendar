let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover');
            day.addEventListener('click', () => {
                let monthLst = ["","January", "February", "March","April", "May", "June","July", "August", "September",
                "October", "November", "December"]
                let monthNo = monthLst.indexOf(curr_month)
                if (monthNo < 10){
                    monthNo = '0' + String(monthNo)
                }
                else{
                    monthNo = String(monthNo)
                }
                let newDay = day.innerText;
                if (day.innerText < 10){
                    newDay = '0' + day.innerText
                }
                setDate = (String(year)+'-'+monthNo+'-'+newDay);
                let flag = 0;
                let taskData = '';
                let data = JSON.parse(localStorage.getItem('tasks'));
                for (let i = 0; i < data.length; i++) {
                    if (setDate == data[i]['TaskDate']){
                        flag++;
                        taskData = data[i]['TaskName'];
                    }
                }
                if (flag==1){
                    // let allTask = document.getElementById('ShowTask').innerHTML;
                    allTask =  `<div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Task Date :</h5>
                      <h6 class="card-text">${newDay}/${monthNo}/${String(year)}</h6>
                      <h5 class="card-title">Task Details :</h5>
                      <p class="card-text">${taskData}</p>
                    </div>
                </div>`
                document.getElementById('ShowTask').innerHTML = allTask;
                }
                else{
                    document.getElementById('ShowTask').innerHTML = `<h5>No Task has been assigned to this date !</h5>`
                }
              });
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)

        // My Code
        let monthLst1 = ["","January", "February", "March","April", "May", "June","July", "August", "September",
                "October", "November", "December"]
        let monthNo1 = monthLst1.indexOf(curr_month)
        if (monthNo1 < 10){
            monthNo1 = '0' + String(monthNo1)
        }
        else{
            monthNo1 = String(monthNo1)
        }
        let newDay1 = day.innerText;
        if (day.innerText < 10){
            newDay1 = '0' + day.innerText
        }
        setDate1 = (String(year)+'-'+monthNo1+'-'+newDay1);
        let data1 = JSON.parse(localStorage.getItem('tasks'));
        for (let x = 0; x < data1.length; x++) {
            if (setDate1 == data1[x]['TaskDate']){
                day.style.border = '2px solid black';
            }
        }
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')

// dark_mode_toggle.onclick = () => {
//     document.querySelector('body').classList.toggle('light')
//     document.querySelector('body').classList.toggle('dark')
// }

// My Code

function myDate(){
    let data = localStorage.getItem('tasks');
    if (data == null) {
        newTaskLst = [];
    }
    else{
        newTaskLst = JSON.parse(data);
    }
    let newTask = {
        TaskName : document.getElementById('newTask').value,
        TaskDate : document.getElementById('newDate').value  
    }
    newTaskLst.push(newTask);
    localStorage.setItem('tasks',JSON.stringify(newTaskLst));
    window.location = '/';
}