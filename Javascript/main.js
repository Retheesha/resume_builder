if(!localStorage.getItem("users")){
    localStorage.setItem("users",JSON.stringify([]))
}
let user_details=JSON.parse(localStorage.getItem("users"))
function register(){
    let reg_name=document.getElementById("reg_name").value;
    let reg_email=document.getElementById("reg_email").value;
    let reg_password=document.getElementById("reg_pass").value;
    if(reg_password.length<5){
        document.getElementById("reg_pass").style.borderColor="red";
        let b=`<p>${"Password must be 6 characters"}</p>`
        document.getElementById("wrong").innerHTML=b;
    }
    else if(reg_email!="" && reg_password!=""){
        document.getElementById("reg_pass").style.borderColor=''
        document.getElementById("wrong").innerHTML=''
        if(user_details==""){
            let user_list_obj={
                name:reg_name,
                email:reg_email,
                password:reg_password
            }
            user_details.push(user_list_obj)
            localStorage.setItem("users",JSON.stringify(user_details))
            window.location.href='login.html'
        }
        else{
            let reg_value=false
            for(let n in user_details){
                if(reg_email==user_details[n].email){
                    reg_value=true;
                } 
             }
             if(reg_value==true){
                alert("You're already registered please login")
             } 
            else{
                let user_list_obj={
                    name:reg_name,
                    email:reg_email,
                    password:reg_password
                }
                user_details.push(user_list_obj)
                localStorage.setItem("users",JSON.stringify(user_details))
                alert("registration successfull")
                window.location.href='login.html'
            }    
        }     
    }      
    document.getElementById("reg_name").value="";
    document.getElementById("reg_email").value="";
    document.getElementById("reg_pass").value=""; 
}

let admin=localStorage.getItem("adminid")
function login(){
    let log_email=document.getElementById("log_email").value;
    let log_password=document.getElementById("log_pass").value;
    let loginvalue=false;
    for(let each in user_details){
        if(log_email==user_details[each].email && log_password==user_details[each].password){
            loginvalue=true;
        }
    }
    if(loginvalue==true){
        localStorage.setItem("adminid",log_email)
        alert("login sussessful")
        window.location.href="resume.html"
    }
    else if(loginvalue==false){
        alert("email and password is not valid")
    }
    document.getElementById("log_email").value="";
    document.getElementById("log_pass").value="";
}
    function logout(){
        localStorage.setItem("login",)
        let login=localStorage.getItem("login")
        if(login=="sucessful"){
            window.location.href="register.html"
        }
        else{
            window.location.href="login.html"
        }
        }
let resume={
    
    personal_details:{
        languages_known:[]
    },
    educational_qualification:[],
    skills:[],
    projects:[],
    work_experience:[]
}
resume.admin_id=admin;
function generateresume(change,key,p_key){
    if(p_key){
        resume[p_key][key]=change.value
    }
    else{
        resume[key]=change.value
    }      
}
function addList(id,key,p_key){
    let listEach=document.getElementById(id)
    if(p_key){
        resume[p_key][key].push(listEach.value)
    }
    else{
        resume[key].push(listEach.value)
    }
    listEach.value="";  
    addskill(key,p_key)
    
}
function addskill(keyname,p_keyname){
        let add="";
            if(p_keyname){
                for(let each in resume[p_keyname][keyname]){
                    if(resume[p_keyname][keyname][each]!=""){
                        add=add+` <div class="row mt-5 ">
                                    <div class="col-3"></div>
                                    <div class="col-5 p-1 bg-light rounded mx-4 text-center fs-5">${resume[p_keyname][keyname][each]}</div>
                                    <div class="col text-start"><button class="btn btn-outline-light" onclick="adddelete(${each},'${keyname}','${p_keyname}')">delete</button></div>
                                </div> `
                    }
                }
                document.getElementById("addlan").innerHTML=add;
            }
            else{
                for(let each in resume[keyname]){
                    if(resume[keyname][each]!=""){
                         add=add+`<div class="row mt-5 ">
                                    <div class="col-3"></div>
                                    <div class="col-5 p-1 bg-light rounded mx-4 text-center fs-5">${resume[keyname][each]}</div>
                                    <div class="col text-start"><button class="btn btn-outline-light" onclick="adddelete(${each},'${keyname}')">delete</button></div>
                                </div> `
            }
        }
            document.getElementById("additem").innerHTML=add;
            }
}
function adddelete(index,keychange,p_keychange){
    let listskill=[];
    if(p_keychange){
        for(let n in resume[p_keychange][keychange]){
            if(n!=index){
                listskill.push(resume[p_keychange][keychange][n])
            }
        }
        resume[p_keychange][keychange]=listskill;
    }else{
        for(let n in resume[keychange]){
            if(n!=index){
                listskill.push(resume[keychange][n])
            }
        }
    resume[keychange]=listskill;
    }
    addskill(keychange,p_keychange) 
}

function listSave(key,id,firstParam,secondParam,thirdParam,fourthParam,fifthParam){
    let first=document.getElementById(firstParam)
    let second=document.getElementById(secondParam)
    let third=document.getElementById(thirdParam)
    let fourth=document.getElementById(fourthParam)
    let fifth=document.getElementById(fifthParam)
    let details={}
    if(fifthParam){
        details[firstParam]=first.value
        details[secondParam]=second.value
        details[thirdParam]=third.value
        details[fourthParam]=fourth.value
        details[fifthParam]=fifth.value
        fifth.value="";
    }
    else{
        details[firstParam]=first.value
        details[secondParam]=second.value
        details[thirdParam]=third.value
        details[fourthParam]=fourth.value
    }
    
    resume[key].push(details)
    first.value="";
    second.value="";
    third.value=""; 
    fourth.value="";
    eduadd(key,id,firstParam,secondParam,thirdParam,fourthParam,fifthParam)
}

function eduadd(keyvalue,idname,firstin,secondin,thirdin,fourthin,fifthin){
    let edu=""
    if(fifthin){
        for(let each in resume[keyvalue]){
            if(resume[keyvalue][each][firstin]!=""){
                edu=edu+`<div class="row mt-3 text-center p-4">
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
    else{
        for(let each in resume[keyvalue]){
            if(resume[keyvalue][each][firstin]!="" && resume[keyvalue][each][secondin]!="" && resume[keyvalue][each][thirdin] && resume[keyvalue][each][fourthin]){
                edu=edu+`<div class="row mt-5 text-center p-4">
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
function deleteedu(index,edu,id,first,second,third,fourth,fifth){
    console.log(resume)
    let eduList=[];
    for(let n in resume[edu]){
        if(n!=index){
            eduList.push(resume[edu][n])
        }
    }
    resume[edu]=eduList
    
eduadd(edu,id,first,second,third,fourth,fifth)
}

if(!localStorage.getItem("resume_list")){
    localStorage.setItem("resume_list",JSON.stringify([]))
}
let user_resume=JSON.parse(localStorage.getItem("resume_list"))
function summit(){
    user_resume.push(resume)
    localStorage.setItem('resume_list',JSON.stringify(user_resume))
    window.location.href="list.html"
    display()
}

let userlist_resume=JSON.parse(localStorage.getItem("resume_list"));
function display(){
    let diplayadd=""
    for(let each in userlist_resume){
        if(userlist_resume[each].admin_id==admin){
            diplayadd=diplayadd+`<tr>
                <td>${userlist_resume[each].name}</td>
                <td>${userlist_resume[each].email}</td>
                <td>${userlist_resume[each].Contact_no}</td>
                <td><button onclick="deleteDisplay(${each})">Delete</button></td>
                <td><a href="view.html?index=${each}"><button>View</button></a></td>
            </tr>`
        }   
    }
    console.log(diplayadd)
    document.getElementById("displaylist").innerHTML=diplayadd;
}
function deleteDisplay(index){
    let balList=[];
    for(let n in userlist_resume){
        if(n!=index){
            balList.push(userlist_resume[n])
        }
    }
    userlist_resume=balList;
    localStorage.setItem('resume_list',JSON.stringify(balList))
    display()
}
let searchParams = new URLSearchParams(window.location.search);
let indexParam = searchParams.get('index');   
let ls_data = JSON.parse(localStorage.getItem('resume_list'))
function view(){
    document.getElementById("re_name").innerHTML=ls_data[indexParam].name;
    document.getElementById("re_mobile").innerHTML=ls_data[indexParam].Contact_no;
    document.getElementById("re_email").innerHTML=ls_data[indexParam].email;
    document.getElementById("re_address").innerHTML=ls_data[indexParam].address;
    document.getElementById("re_objective").innerHTML=ls_data[indexParam].objective; 
    document.getElementById("per_father").innerHTML=ls_data[indexParam].personal_details.fathername
    document.getElementById("per_age").innerHTML=ls_data[indexParam].personal_details.age;
    document.getElementById("per_dob").innerHTML=ls_data[indexParam].personal_details.dob;
    document.getElementById("per_marital").innerHTML=ls_data[indexParam].personal_details.marital_status;
    document.getElementById("per_gender").innerHTML=ls_data[indexParam].personal_details.gender;
    document.getElementById("per_nation").innerHTML=ls_data[indexParam].personal_details.nationality;
    document.getElementById("per_lan").innerHTML=ls_data[indexParam].personal_details.languages_known;
    eduview()
    skillview()
    projectview()
    workview()

}
function eduview(){
    let education=""
    for(let each in ls_data[indexParam].educational_qualification){
        education=education+`<tr>
                            <td>${ls_data[indexParam].educational_qualification[each].course}</td>
                            <td>${ls_data[indexParam].educational_qualification[each].institute}</td>
                            <td>${ls_data[indexParam].educational_qualification[each].year_of_passing}</td>
                            <td>${ls_data[indexParam].educational_qualification[each].percentage}</td>
                            </tr>`
    }  
    document.getElementById("re_education").innerHTML=education;
}
function skillview(){
    let skill="";
    for(let each in ls_data[indexParam].skills){
        skill+=`<li>${ls_data[indexParam].skills[each]}</li>`
    }
    document.getElementById("re_skill").innerHTML=skill
    console.log(skill)
}
function projectview(){
    let project="";
    for(let each in ls_data[indexParam].projects){
        project=project+`<div class="row">
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
    document.getElementById("projectview").innerHTML=project;  
}
function workview(){
    let work="";
    for(let each in ls_data[indexParam].work_experience){
        work=work+` <div class="row">
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
    document.getElementById("workview").innerHTML=work;  
}