
window.onload = () => {  //jaisy hi window load hu ! to user sy us ka name poocho 
    let user = prompt("Enter Your Name ");
    if (user === "") { // agr name enter nhi kiya user ny ! to alert krwa do ky phly name enter kro ! agr hum chahty hai ky jab tak name enter na hu tab tak ye prompt atta rhy to us ky liye do while loop lagaye gy! 
        alert("Enter The Name");
    }
    const name = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase(); //jo name user ny enter kiya us ka phla index uthao r usy upper case mai kr do ! r phr phla index chor kr baqi sb charactars ko lowercase mai kr do r print krwa do concatenate kr ky
    let p = document.getElementById("greetingMsg"); //is p tag mai print krwa do 
    p.innerHTML = `Assalam O Alaikum! ${name}`; // ye wala msg !

    showTodo(); //window ky load hny pr show todos kro !
};

setInterval(() => {
    document.getElementById("time").innerHTML = dayjs().format("dddd MM-DD-YYYY hh:mm:ss"); //dayjs ek librray hai ! jisy phly include krna prta hai html file mai ! ye date r time ky sath work krny k liye use hti hai ! 
}, 1000); //hr sec bdd time ko update krty jao ! is trha error chances time galat hny ky bht kam reh jaye gy !

let getInputValue = (id) => {
    return document.getElementById(id).value; //function for getting input value with id ! is function ko id milly gi r ye us id ko get kr ky is function ko return kr dy ga !
};

let setInputValue = (id, value) => { //Function for setting input value ! is function ko value r id pss hu gi r ye function value ko us jaga set krwa dy ga jis ki id pss ki jaye gi !
    document.getElementById(id).value = value;
}

const getRandomId = () => {
    return Math.random().toString(36).slice(2); //function for creating random ID . random ID function ko return hu jaye gi !
};

const showTasks = (output) => { //tasks ko output mai show krwany k liye ye function bnaya gya hai ! 
    document.querySelector(".output").innerHTML = output;
}

const emptyInputFields = () => { //function to empty all input feilds 
    document.getElementById("title").value = "";
    document.getElementById("location").value = "";
    document.getElementById("description").value = "";
};

// const scrollToTop = () => {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// };

function scrollToSection(sectionId) { //ye ek function hai ! jo ky ek sectionId argument leta hai ! r ye hmy us specific section ki id tak scroll kr ky ly jata hai jis ki id pss ki hu gi ! 
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}


function handleSubmit(event) { //ye function tab chly ga jab hum add your task pr click kry gy ! ye localstorage mai data set krwa dy ga ! 
    event.preventDefault(); //page ko brr brr refresh hny sy bchata hai !

    let title = getInputValue("title").trim(); //title feild sy value get kro  ! r us ky last r start sy empty spaces ko remove kro r title mai store krwa do !
    let location = getInputValue("location").trim(); //location feild sy value get kro  ! r us ky last r start sy empty spaces ko remove kro r location variable mai store krwa do !
    let description = getInputValue("description").trim();  //description feild sy value get kro  ! r us ky last r start sy empty spaces ko remove kro r description variable mai store krwa do !

    if (title.length === 0 || location.length === 0 || description.length === 0) { //agr to teeno ky ander jo iput aayi hai us ki length zero hai to alert krwa do msg !
        alert("Please Fill The Input Feilds");
        return;
    }
    if (title.length < 3) {
        alert("Please Enter Title Correctly");
        return;
    }
    if (location.length < 3) {
        alert("Please Enter Location Correctly");
        return;
    }
    if (description.length < 3) {
        alert("Please Enter Description Correctly");
        return;
    }

    const todo = { //agr all set hai to jaisy hi add your task pr click hu ! to jo data enter hua hai us ka ek object bna do ! object mai todo.title = title kr do . isi trha is todo object ki location location feild sy aany wali value ky brabr kr do r isi trha description bhi ! r phr is todo ki id random id sy a jaye gi ! r time bhi jo current time hu ga system ka wo a jaye ga ! todo ky time mai !
        title,
        location,
        description,
        id: getRandomId(),
        time: new Date().getTime(),
        // status: "active"
    };

    // ye teen lines aisy bahir bhi likh skty hai ! wo ek short hand method hai ! jo humny likha hua hai ! 

    //  -----------------------------------------------------------------------

    // us ka alternate method ye hai ! 

    //  const todo = {
    //     title: title,
    //     location: location,
    //     description: description,
    //     id: getRandomId(),
    //     time: new Date().toLocaleString(), // Gets the current date and time in a readable format
    //     // status: "active"
    // };

    // ----------------------------------------------------------------------------
    // todo.id = getRandomId();
    // todo.time = new Date().getTime();
    // todo.status = "active"

    let todos = localStorage.getItem("todos"); //localstorage sy todos ko get kro ! r todos variable mai store krwa do !
    if (todos) { //agr to todos available hai ! to ye kro
        todos = JSON.parse(todos); //un ko array form mai convert kr ky todos variable mai store krwa do !
    } else {
        todos = []; // r agr todos availble nhi hai ! to localstorgae mai ek todos name ki empty array bana do !
    }

    // ab jab phli bar click hu ga to phly ek empty array bny gi ! kyunky start mai to localstorage mai kch nhi para hu ga !

    todos.push(todo); // phr us empty array mai todo object jo hai wo push kr dya jaye ga ! yaini us array ky end pr add hu jaye ga todo object jis mai ek user ki value hu gi jo us ny enter ki hu gi !

    localStorage.setItem("todos", JSON.stringify(todos)); //ab wo array mai value a gyi hai ! jo ky object hai ! ab us ko local storage mai set kr do ! r set jab kro to us ko string mai convert kr ky set kr do !

    alert("A New Todo Has Been Added Successfully"); // jaisy hi wo local storage mai set hu ! to ye msg show krwa do !
    emptyInputFields(); //input feilds ko empty kr do
    showTodo(); //r jo todo enter hua hai usy show krwa do !
    scrollToSection("footer"); //r is section tak khd scroll kr ky ly jao ! 
    // showTasks();

    //Hum ny object ko array mai push krna hta hai ! is liye jab local storage sy get items kry to wo string mai hti hai ! is liye phly hum un ko json.parse k zariye array mai convert krty hai ! phr us mai object ko push krwa kr ! local storage.setItem k zariye dobara local storage mai set kr dety hai ! lekin set krny sy phly hum json.stringify ki madad sy usy string mai convert kr ky set krwa dety hai local storage mai !
};

document.querySelector(".submitButton").addEventListener("click", handleSubmit); // ye upr handleSubmit function ka sara kam tab kro jab submitButton wali class waly button pr click hu ! 

const showTodo = () => { //todo ko show krwany ka function !
    let todos = localStorage.getItem("todos"); //local storage sy items ko get kro !

    // console.log(todos);

    if (todos) { //agr to items hai ! to un ko array mai convert kr ky todos variable ko pss kr do !
        todos = JSON.parse(todos);
    }
    else {
        todos = []; // werna ek empty array bana do todos ko ! 
    }

    // const todos = JSON.parse(localStorage.getItem("todos")) || []; //ye upr jo likha hai if/else wala , us ka short hand method ye hai !

    if (todos.length === 0) { //agr to todos jo get huy hai local storage sy , un ki length zero hai ! to ye show krwa do !
        showTasks("<h4 class='text-center text-light' id='noTaskMsg'>No Tasks Available. Click the 'Add Task' button to add new tasks.</h4>");
        return; // r yhi sy return kr do
    }
    // r agr aisa nhi hai !
    let task = ""; // to task variable banano r us ko ek empty string pss kr do 
    for (let i = 0; i < todos.length; i++) { // ek loop chlao tab tak jab tk ky todos array ki length jitni bhi hai tab tk !
        let todo = todos[i]; // todos ky hr index sy object ko todo varibale mai pss krty jaoo ! 

        // us todo variable mai jo object aaye ga ! us ko is format mai print krwaty jao ! r sath hi mai task variable mai store krwaty jao ! 
        //+= is liye lgaya hai taky jo object ek brr print hu jaye ! phr jab doosra object print hu to wo pichly object ko replace na kry blky us ky sath hi concatenate hu kr nichy print hu jaye !
        //jo todo mai object aaye ga us object ka title , description , location , date print krwa do ! r sath mai us ky do btns laga do ! ek delete r ek edit ka !

        task += `<div class="container taskBox">
                <h3 class="text-center text-info">Your Task ${i + 1}</h3>
                <div class="task-detail">
                    <span class="task-title">Title </span>
                    <span class="task-info">${todo.title}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Description </span>
                    <span class="task-info">${todo.description}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Location </span>
                    <span class="task-info">${todo.location}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Time </span>
                    <span class="task-info">${new Date(todo.time).toLocaleString()}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Action </span>
                    <span class="task-info"><button id="dlt" onClick="deleteTodo(event)"  data-value="${todo.id}">Delete</button><button id="edit" onClick="editTodo(event)" data-value="${todo.id}">Edit</button></span>
                </div>
            </div>`

        //yaha hmny dlt r edit ko ek khd sy attribur dya hai jis ka name data-value rakha hai r us attribute ki value us specific todo ki id ky brabar kr di hai ! is ko hum aagy dlt r edit krwaty waqt use kry gy ! is attribute ko access kr ky is ki value yaini id ko uthaye gy ! 
    }

    const stickTask = task; // task chunky ek string hai r ab is mai value a gyi hai ! to ye apni values . object stickTask ko pss kry ga r phr showtasks ky function mai stick task ko pss krwa dy gy ky ab is jaga pr print krwa do is object ki value ko ! 
    showTasks(stickTask);
}

// document.addEventListener("DOMContentLoaded", () => {
//     showTodo();
// });

const deleteTodo = (event) => { // deleteing specific todo from task list
    let todoId = event.target.getAttribute("data-value"); //jis task ky delete btn pr click hu ga ! wo event.target mai a jaye ga ! phr us delete ki data-value ko uthao ! r todoId  mai store kr do 
    let todos = JSON.parse(localStorage.getItem("todos")); // todos mai pss kr do localstorage sy sb todos ko utha kr r array mai convert kr ky

    let todosAfterDelete = todos.filter((todo) => { // todos array pr filter ka method chalao ! r hr todo ki id ko todoId sy match kr ky dekho ! r return sirf unhi ko kro todoAfterDelete mai jin ki id todoId sy match nhi hu gi !
        return todo.id !== todoId;
    });

    localStorage.setItem("todos", JSON.stringify(todosAfterDelete)); //ab todoAfterDelete ko wapis todos key mai set kr do string mai convert kr ky
    alert("A Todo Has Been Deleted Successfully . "); //ye msg show krwa do
    showTodo(); //r show todo ka function call kr do ! ab jo todos show hu gy un mai wo wala todo nhi hu ga jis ki id match ki hu gi !
};


const editTodo = (event) => { // kisi bhi todo ki edit btn pr click hny pr ye kam hu ga ! ye function chly ga !
    let todos = JSON.parse(localStorage.getItem("todos")); // local storage sy todos ko get kro r array mai convert kro ! r todos mai store krwa do !
    let todoId = event.target.getAttribute("data-value"); // jis todo ky event btn pr click hua hu ga us ebent btn ky data value waly attribute ko get kro ! t todoId mai store krwa lo !

    let todo = todos.find((todo) => { //ab todos array pr ek find mai method chlao  ! jo ky find kry ga ! ky jo id pr click hua hai ! wo todos array mai jaha pr id match kr gyi todoId ky sath us object ko todo variable ko pss kr dy ga !
        return todo.id === todoId;
    });

    const title = todo.title; // us todo ky title ko title mai , location ko location mai store krwa do
    const location = todo.location;
    const description = todo.description;

    // const {title , location , description } = todo ; //Alternate of above three lines // ye method "DESTRUCTING" khlata hai . ye upr wali teen lines ka alternate hai ! 

    setInputValue("title", title); // ab jo title aya hai ! wo r sath mai jaha pr wo title likhna chahty hai us input feild ki id! ye do cheezein is function ko pss kr do ! ye function us id pr ja kr title ko likh dy ga r aisy hi baki sb ko !
    setInputValue("location", location);
    setInputValue("description", description);

    localStorage.setItem("todosForEdit", JSON.stringify(todo)); // r phr ek noe key bnao todosForEdit r us todo ko string mai convert kr ky TodosForEdit key mai store krwa do local storage mai !

    document.getElementById("addTaskBtn").style.display = "none"; // jaisy hi ye sb hu ! to add Your task waly btn ko display none r update task waly btn ko inline block kr do taky wo show hu jaye !
    document.getElementById("updateTaskBtn").style.display = "inline-block";

    scrollToSection("navbar"); // r hmy navbar ky section mai yaini upr ki trf ly jao !
}

const handleEdit = (event) => { // ye function tab chly ga ! jab update your task ky btn pr click hu ga !
    event.preventDefault();

    let todosForEdit = JSON.parse(localStorage.getItem("todosForEdit")); //local storage sy todosForEdit ko get kro ! r array mai convert kro !

    let updatedTitle = getInputValue("title"); // feild mai jo value dobara set ki hai us ko get kro r updatedTitle mai store krwa do ! r aisy hi baki sb ko !
    let updatedLocation = getInputValue("location");
    let updatedDescription = getInputValue("description");


    const updatedTodo = { // ye ... wala method "SPREADING" khlata hai ! is mai hum do arrays ya do object ki properties ko pss kry to ye un ko combine kr ky send kr dy ga ! r agr koi property dono mai same hai to us ko ek hi count kry ga ! agr do ilehda hui to un ko combine kr dy ga ! jo property bdd mai likhi jaye gi ! to agr wo ussy phly aayi hui hai ! to bdd mai aany wali ko pichli wali ky sath replace kr dy ga !
        ...todosForEdit, title: updatedTitle, location: updatedLocation, description: updatedDescription
    } // ab ye todosForEdit mai majood values ko r jo update hu gyi hai un ko combine kry ga ! r update hui value ko todoForEdit ki value sy replace kr dy ga ! r is new pdated todo ko updateTodo ky variable mai pss kr dy ga !

    updatedTodo.time = new Date().getTime(); //updatedTodo ka time bhi ab update kr do ! r current time jo ho us ky equal kr do !

    const todos = JSON.parse(localStorage.getItem("todos")); //  ab jo ek r key hai todos wali us sy sary todos ko get kro ! r array mai convert kr do ! 

    const updatedTodos = todos.map((todo) => { // ab jo todos aaye hai un pr map ka method chlao ! r dekho ky kaha pr kis todo ki id updatedTodo ki id sy match kr rhi hai !
        if (todo.id === updatedTodo.id) {
            return updatedTodo; //jaha pr wo match kr jaye waha pr updatedTodo return kr do !
        }
        return todo; // r agr na milly to simple todo ko return kr do ! jis bhi todo ky sath compare kiya ja rha hai ! 
        //yaini jaha match hu gya id ! waha updatedTodo jaye ga ! r jaha match nhi hua waha wo wala todo jis sy compare kr rhy wo jaye ga !
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos)); //r ab localStorage mai todos key mai updatedTodos ko string mai convert kr ky set kr do !

    alert("Todo Has Been Updated Successfully . ");

    document.getElementById("addTaskBtn").style.display = "inline-block";
    document.getElementById("updateTaskBtn").style.display = "none";

    emptyInputFields();
    showTodo();
    scrollToSection("outputTasks");

};

document.getElementById("updateTaskBtn").addEventListener("click", handleEdit); //jab update task pr click hu to ye function chlao !

const handleSearch = (event) => {
    event.preventDefault();

    const searchKey = getInputValue("search").trim().toLowerCase(); // lwercase mai conver kr do ! search mai enter hny  wali value ko ! 

    if (!searchKey) {
        alert("Eter A Search Term . ");
        return;
    }

    let todos = localStorage.getItem("todos");

    if (todos) {
        todos = JSON.parse(todos);
    }
    else {
        todos = [];
    }

    const filteredResults = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(searchKey); //agr to title mai serach kry jaisa lafz koi bhi include hai ! to usy return kr do ! r ab hum filtered results ko print krwaye gy !
    });

    if (filteredResults.length === 0) {
        showTasks("<h4 class='text-center text-light'>No Matching Tasks Found .</h4>");
    }
    else {
        let searchTask = `<h4 class='text-center text-light'>${filteredResults.length} Task(s) Found</h4>`;
        filteredResults.forEach((todo, i) => {
            searchTask +=
                `
                <div class="container taskBox">
                <h3 class="text-center text-info">Your Task ${i + 1}</h3>
                <div class="task-detail">
                    <span class="task-title">Title </span>
                    <span class="task-info">${todo.title}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Description </span>
                    <span class="task-info">${todo.description}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Location </span>
                    <span class="task-info">${todo.location}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Time </span>
                    <span class="task-info">${new Date(todo.time).toLocaleString()}</span>
                </div>
                <div class="task-detail">
                    <span class="task-title">Action </span>
                    <span class="task-info"><button id="dlt" onClick="deleteTodo(event)"  data-value="${todo.id}">Delete</button><button id="edit" onClick="editTodo(event)" data-value="${todo.id}">Edit</button></span>
                </div>
            </div>
            `
        });

        let searchResults = searchTask;

        showTasks(searchResults);

        scrollToSection("outputTasks");
    };
};

document.getElementById("searchBtn").addEventListener("click", handleSearch);


// Footer

let newYear = new Date().getFullYear();
document.querySelector(".year").innerHTML = newYear; // footer mai new Year ko print krwaye ga !





