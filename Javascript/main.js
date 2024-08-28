// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { addDoc, collection, getFirestore, getDocs, query, deleteDoc, doc,where } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0lSnkFexzqe05gIPoWlY5kTenWoIB2xQ",
    authDomain: "resume-builder-c0f10.firebaseapp.com",
    projectId: "resume-builder-c0f10",
    storageBucket: "resume-builder-c0f10.appspot.com",
    messagingSenderId: "955962361146",
    appId: "1:955962361146:web:39cad0941d426ab8e8bc03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let getRegisterData=[]
getDocs(query(collection(db, "register_data"))).then(doc => {
    doc.forEach((e, i) => {
        getRegisterData.push(e.data())
    })
})
console.log(getRegisterData)
async function registernew() {
    let reg_name = document.getElementById("reg_name").value;
    let reg_email = document.getElementById("reg_email").value;
    let reg_password = document.getElementById("reg_pass").value;
    if (reg_password.length < 5) {
        document.getElementById("reg_pass").style.borderColor = "red";
        let b = `<p>${"Password must be 6 characters"}</p>`
        document.getElementById("wrong").innerHTML = b;
    }
    else if (reg_email != "" && reg_password != "") {
        document.getElementById("reg_pass").style.borderColor = ''
        document.getElementById("wrong").innerHTML = ''
        if(getRegisterData==""){
            await addDoc(collection(db, "register_data"), {
                email: reg_email,
                name: reg_name,
                password: reg_password
            })
            window.location.href = 'index.html'
        }
        else {
            let reg_value = false
                for(let n in getRegisterData){
                    if(reg_email==getRegisterData[n].email){
                        console.log(getRegisterData[n].email)
                        reg_value=true;
                    } 
                 }
                if (reg_value==true) {
                    alert("You're already registered please login")
                }
                else {
                  await addDoc(collection(db, "register_data"), {
                        email: reg_email,
                        name: reg_name,
                        password: reg_password
                    })
                    alert("registration successfull")
                    window.location.href = 'index.html'
                }
        }
    }
    document.getElementById("reg_name").value = "";
    document.getElementById("reg_email").value ="";
    document.getElementById("reg_pass").value = "";
}

window.registernew = registernew
let admin = localStorage.getItem("admin_id")

async function login() {
    let log_email = document.getElementById("log_email").value;
    let log_password = document.getElementById("log_pass").value;
    let loginvalue = false;
    getDocs(query(collection(db, "register_data"))).then(doc => {
        doc.forEach((e, i) => {
            let getRegisterData = e.data()
            if (log_email == getRegisterData.email && log_password == getRegisterData.password) {
                loginvalue = true;
            }
        })
        if (loginvalue == true){
            localStorage.setItem("admin_id",log_email)
            alert("login sussessful")
            window.location.href = "resume.html"
            
        }
        else if (loginvalue == false){
            alert("email and password is not valid")
        }
    })
    document.getElementById("log_email").value = "";
    document.getElementById("log_pass").value = "";
}
window.login = login;
function logout() {
    localStorage.removeItem("isLogged")
    window.location = "index.html"
}
let resume = {

    personal_details: {
        languages_known: []
    },
    educational_qualification: [],
    skills: [],
    projects: [],
    work_experience: []
}
resume.adminId = admin;
function generateresume(change, key, p_key) {
    if (p_key) {
        resume[p_key][key] = change.value
    }
    else {
        resume[key] = change.value
    }
}
window.generateresume = generateresume;
function addList(id, key, p_key) {
    let listEach = document.getElementById(id)
    if (p_key) {
        resume[p_key][key].push(listEach.value)
    }
    else {
        resume[key].push(listEach.value)
    }
    listEach.value = "";
    addskill(key, p_key)

}
window.addList = addList
function addskill(keyname, p_keyname) {
    let add = "";
    if (p_keyname) {
        for (let each in resume[p_keyname][keyname]) {
            if (resume[p_keyname][keyname][each] != "") {
                add = add + ` <div class="row mt-5 ">
                                    <div class="col-3"></div>
                                    <div class="col-5 p-1 bg-light rounded mx-4 text-center fs-5">${resume[p_keyname][keyname][each]}</div>
                                    <div class="col text-start"><button class="btn btn-outline-light" onclick="adddelete(${each},'${keyname}','${p_keyname}')">delete</button></div>
                                </div> `
            }
        }
        document.getElementById("addlan").innerHTML = add;
    }
    else {
        for (let each in resume[keyname]) {
            if (resume[keyname][each] != "") {
                add = add + `<div class="row mt-5 ">
                                    <div class="col-3"></div>
                                    <div class="col-5 p-1 bg-light rounded mx-4 text-center fs-5">${resume[keyname][each]}</div>
                                    <div class="col text-start"><button class="btn btn-outline-light" onclick="adddelete(${each},'${keyname}')">delete</button></div>
                                </div> `
            }
        }
        document.getElementById("additem").innerHTML = add;
    }
}
window.addskill = addskill
function adddelete(index, keychange, p_keychange) {
    let listskill = [];
    if (p_keychange) {
        for (let n in resume[p_keychange][keychange]) {
            if (n != index) {
                listskill.push(resume[p_keychange][keychange][n])
            }
        }
        resume[p_keychange][keychange] = listskill;
    } else {
        for (let n in resume[keychange]) {
            if (n != index) {
                listskill.push(resume[keychange][n])
            }
        }
        resume[keychange] = listskill;
    }
    addskill(keychange, p_keychange)
}
window.adddelete = adddelete
function listSave(key, id, firstParam, secondParam, thirdParam, fourthParam, fifthParam) {
    let first = document.getElementById(firstParam)
    let second = document.getElementById(secondParam)
    let third = document.getElementById(thirdParam)
    let fourth = document.getElementById(fourthParam)
    let fifth = document.getElementById(fifthParam)
    let details = {}
    if (fifthParam) {
        details[firstParam] = first.value
        details[secondParam] = second.value
        details[thirdParam] = third.value
        details[fourthParam] = fourth.value
        details[fifthParam] = fifth.value
        fifth.value = "";
    }
    else {
        details[firstParam] = first.value
        details[secondParam] = second.value
        details[thirdParam] = third.value
        details[fourthParam] = fourth.value
    }

    resume[key].push(details)
    first.value = "";
    second.value = "";
    third.value = "";
    fourth.value = "";
    eduadd(key, id, firstParam, secondParam, thirdParam, fourthParam, fifthParam)
}
window.listSave = listSave
function eduadd(keyvalue, idname, firstin, secondin, thirdin, fourthin, fifthin) {
    let edu = ""
    if (fifthin) {
        for (let each in resume[keyvalue]) {
            if (resume[keyvalue][each][firstin] != "") {
                edu = edu + `<div class="row mt-3 text-center p-4">
                            <div class="col-2">
                                <div><p>${resume[keyvalue][each][firstin]}</p></div>
                            </div>
                            <div class="col-2">
                                <div><p>${resume[keyvalue][each][secondin]}</p></div>
                            </div>
                            <div class="col-2">
                                <div><p>${resume[keyvalue][each][thirdin]}</p></div>
                            </div>
                            <div class="col-2">
                                <div><p>${resume[keyvalue][each][fourthin]}</p></div>
                            </div>
                            <div class="col-3">
                                <div><p>${resume[keyvalue][each][fifthin]}</p></div>
                            </div>
                            <div class="col-1 text-start">
                                <div><button class="btn btn-outline-light" onclick="deleteedu(${each},'${keyvalue}','${idname}','${firstin}','${secondin}','${thirdin}','${fourthin}','${fifthin}')">delete</button></div>
                            </div>
                        </div>`
            }
        }
    }
    else {
        for (let each in resume[keyvalue]) {
            if (resume[keyvalue][each][firstin] != "" && resume[keyvalue][each][secondin] != "" && resume[keyvalue][each][thirdin] && resume[keyvalue][each][fourthin]) {
                edu = edu + `<div class="row mt-5 text-center p-4">
                            <div class="col">
                                <div><p>${resume[keyvalue][each][firstin]}</p></div>
                            </div>
                            <div class="col">
                                <div><p>${resume[keyvalue][each][secondin]}</p></div>
                            </div>
                            <div class="col">
                                <div><p>${resume[keyvalue][each][thirdin]}</p></div>
                            </div>
                            <div class="col">
                                <div><p>${resume[keyvalue][each][fourthin]}</p></div>
                            </div>
                            <div class="col text-start">
                                <div><button class="btn btn-outline-light" onclick="deleteedu(${each},'${keyvalue}','${idname}','${firstin}','${secondin}','${thirdin}','${fourthin}')">delete</button></div>
                            </div>
                        </div>`
            }
        }
    }
    document.getElementById(idname).innerHTML = edu;

}
window.eduadd = eduadd
function deleteedu(index, edu, id, first, second, third, fourth, fifth) {
    console.log(resume)
    let eduList = [];
    for (let n in resume[edu]) {
        if (n != index) {
            eduList.push(resume[edu][n])
        }
    }
    resume[edu] = eduList

    eduadd(edu, id, first, second, third, fourth, fifth)
}
window.deleteedu = deleteedu
async function summit() {
    try {
        let data = await addDoc(collection(db, "resume_list"), resume)
        window.location.href = "list.html"
        console.log(data)
        display()

    }
    catch (err) {
        console.log(err)
    }

}
window.summit = summit
// let userlist_resume = JSON.parse(localStorage.getItem("resume_list"));
// let getResume = []
function display() {
    let displayadd = "";
    getDocs(query(collection(db, "resume_list"),where(admin,'==',resume.adminId))).then(doc => {
        console.log(admin)
        doc.forEach((e, i) => {
            let getresume = e.data()
            displayadd = displayadd + `<tr>
                <td>${getresume.name}</td>
                <td>${getresume.email}</td>
                <td>${getresume.Contact_no}</td>
                <td><button onclick="deleteDisplay('${e.id}')">Delete</button></td>
                <td><a href="view.html?id=${e.id}"><button>View</button></a></td>
            </tr>`
            //  getResumedetails.push(e.data())

        })
        document.getElementById("displaylist").innerHTML = displayadd;
        // console.log(getResume)
        // let diplayadd = ""
        // for (let each in getResume) {

        //     diplayadd = diplayadd + `<tr>
        //         <td>${getResume[each].name}</td>
        //         <td>${getResume[each].email}</td>
        //         <td>${getResume[each].Contact_no}</td>
        //         <td><button onclick="deleteDisplay(${getResume[each].id})">Delete</button></td>
        //         <td><a href="view.html?index=${each}"><button>View</button></a></td>
        //     </tr>`
        // }
        // document.getElementById("displaylist").innerHTML = diplayadd;
    })

}

window.display = display
function deleteDisplay(id) {
    console.log(id)
    deleteDoc(doc(db, "resume_list", id))
    display()
}
let searchParams = new URLSearchParams(window.location.search);
let indexParam = searchParams.get('id');

console.log(indexParam)
// let ls_data = JSON.parse(localStorage.getItem('resume_list'))
window.deleteDisplay = deleteDisplay;
function view() {
    getDocs(query(collection(db, "resume_list"))).then(doc => {
        doc.forEach((e, i) => {
            let get_data = e.data()
            console.log(indexParam, get_data)
            document.getElementById("re_name").innerHTML = get_data.name;
            // document.getElementById("re_mobile").innerHTML = get_data[indexParam].Contact_no;
            // document.getElementById("re_email").innerHTML = ls_data[indexParam].email;
            // document.getElementById("re_address").innerHTML = ls_data[indexParam].address;
            // document.getElementById("re_objective").innerHTML = ls_data[indexParam].objective;
            // document.getElementById("per_father").innerHTML = ls_data[indexParam].personal_details.fathername
            // document.getElementById("per_age").innerHTML = ls_data[indexParam].personal_details.age;
            // document.getElementById("per_dob").innerHTML = ls_data[indexParam].personal_details.dob;
            // document.getElementById("per_marital").innerHTML = ls_data[indexParam].personal_details.marital_status;
            // document.getElementById("per_gender").innerHTML = ls_data[indexParam].personal_details.gender;
            // document.getElementById("per_nation").innerHTML = ls_data[indexParam].personal_details.nationality;
            // document.getElementById("per_lan").innerHTML = ls_data[indexParam].personal_details.languages_known;
            // eduview()
            // skillview()
            // projectview()
            // workview()
        })
    })
}
window.view = view
function eduview() {
    let education = ""
    for (let each in ls_data[indexParam].educational_qualification) {
        education = education + `<tr>
                            <td>${ls_data[indexParam].educational_qualification[each].course}</td>
                            <td>${ls_data[indexParam].educational_qualification[each].institute}</td>
                            <td>${ls_data[indexParam].educational_qualification[each].year_of_passing}</td>
                            <td>${ls_data[indexParam].educational_qualification[each].percentage}</td>
                            </tr>`
    }
    document.getElementById("re_education").innerHTML = education;
}
function skillview() {
    let skill = "";
    for (let each in ls_data[indexParam].skills) {
        skill += `<li>${ls_data[indexParam].skills[each]}</li>`
    }
    document.getElementById("re_skill").innerHTML = skill
    console.log(skill)
}
function projectview() {
    let project = "";
    for (let each in ls_data[indexParam].projects) {
        project = project + `<div class="row">
                            <div class="col-10 ">
                                <div class="h4 mt-3 mx-4"><p>${ls_data[indexParam].projects[each].title}</p></div>
                                <div class="mx-4"><p>${ls_data[indexParam].projects[each].role}</p></div>
                                <div class=" mx-4"><p>${ls_data[indexParam].projects[each].description}</p></div>
                            </div>
                            <div class="col-2">
                                <div class=" mx-4 mt-3"><p >${ls_data[indexParam].projects[each].date}</p></div>
                            </div>
                        </div>`
    }
    document.getElementById("projectview").innerHTML = project;
}
function workview() {
    let work = "";
    for (let each in ls_data[indexParam].work_experience) {
        work = work + ` <div class="row">
                    <div class="col-10">
                        <div class="h4 mt-3 mx-4">${ls_data[indexParam].work_experience[each].company}</div>
                        <div class="h5 mx-4 my-2">${ls_data[indexParam].work_experience[each].job_title}</div>
                    </div>
                    <div class="col-2">
                        <div class="h5 mt-3">${ls_data[indexParam].work_experience[each].year_of_experience}</div>
                    </div>
                    </div>
                    <div class="mx-4 my-2">${ls_data[indexParam].work_experience[each].learned_skill}</div>
                </div>`
    }
    document.getElementById("workview").innerHTML = work;
}