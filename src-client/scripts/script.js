async function allpc() {
    const res = await fetch(`http://localhost:5000/pc/getall`);
    return res.json();
}

async function pingall() {
    const res = await fetch(`http://localhost:5000/pc/pingall`);
    return res.json();
}

async function getIdPc(id) {
    const res = await fetch(`http://localhost:5000/pc/getone/${id}`);
    return res.json();
}

async function alluser() {
    const res = await fetch(`http://localhost:5000/user/getall`);
    return res.json();
}

function authorizationCheck() {
    let token = sessionStorage.getItem('token');

    if (!token) { 
        window.location.href = `login.html`;
    }
}

function openPage() {
    let url = decodeURI(window.location.href);
    let str = url.substring( url.lastIndexOf('/') + 1, url.length);
    return  str.split('?')[0];
}

function date(data) {
    arr = [];
    let dt = new Date(data);
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const day = dt.getDate();
    arr.push(year, month, day);
    return arr;
}

async function login(data, Errors) {

    const response = await fetch(`http://localhost:5000/auth/login`, {
        'method': "POST",
        'headers': {
            'Content-type': 'application/json',
        },
        'body': JSON.stringify(data)
    });

    const res = await response.json();
    if (res.token) {
        window.sessionStorage.setItem('token', res.token);
        window.location.href = `home.html`;
    } else {
        Errors.innerHTML = "Не верный пароль";
    }

}

async function pc(data, Errors) {

    const response = await fetch(`http://localhost:5000/pc/creatpc`, {
        'method': "POST",
        'headers': {
            'Content-type': 'application/json',
        },
        'body': JSON.stringify(data)
    });

    const res = await response.json();
    
    if (res.message) {
        window.location.href = `home.html`;
    } else {
        Errors.innerHTML = res.error;
    }

}

async function displayListHomePage() {
    authorizationCheck();
    const persCompAll = await allpc();
    const content = document.querySelector("#content");
    content.innerHTML ="";

    for (let pc of persCompAll) {
        
        let arr = date(pc.lasttime);

        const addPc = 
        `
            <div class="cards rounded-xl bg-bgform max-w-card min-w-max p-2 break-all mt-6 mr-6" id="${pc._id}">

    
            <div class="mt-2 ml-4 mb-1 flex justify-between"><button><img src="img/power-off.png" alt="картинка не прогрузилась" class="w-35 h-35"> <button><img src="img/menu.png" alt="картинка не прогрузилась" class="w-35 h-35"></button></div>
            <h1 class="text-white text-xl ml-6">${pc.name}</h1>
            <p class="ml-6 text-tgray">${pc.ip}</p>

            <div></div>
            <p class="ml-6 text-tgray mr-6 w-4/5">${" Был в сети: " + arr[0] + ":" + arr[1] + ":" + arr[2]}</p>

            </div>

        `;

        content.innerHTML += addPc;
    }
}

async function displayListHomePageLastPing() {
    const persCompAll = await pingall();
    const content = document.querySelector("#content");
    content.innerHTML ="";

    for (let pc of persCompAll) {
        
        let arr = date(pc.lasttime);
        let strBut
        if (pc.isAlive == true) {
           strBut = "power-on.png";
        } else {
           strBut = "power-off.png";
        }
         
        const addPc = 
        `
            <div class="cards rounded-xl bg-bgform max-w-card min-w-max p-2 break-all mt-6 mr-6" id="${pc._id}">

    
            <div class="mt-2 ml-4 mb-1 flex justify-between"><button><img src="img/${strBut}" alt="картинка не прогрузилась" class="w-35 h-35"> <button><img src="img/menu.png" alt="картинка не прогрузилась" class="w-35 h-35"></button></div>
            <h1 class="text-white text-xl ml-6">${pc.name}</h1>
            <p class="ml-6 text-tgray">${pc.ip}</p>

            <div></div>
            <p class="ml-6 text-tgray mr-6 w-4/5">${" Был в сети: " + arr[0] + ":" + arr[1] + ":" + arr[2]}</p>

            </div>

        `;

        content.innerHTML += addPc;
    }
}

switch (openPage()) {
    case 'home.html':
        displayListHomePage();
        setInterval(displayListHomePageLastPing, 4000);

        break;
    case 'login.html':
        const formlogin = document.querySelector("#authorization_form"),
            Errorslogin = document.querySelector("#errors");

            formlogin.addEventListener('submit', async (e) => {
                
                e.preventDefault();

                const users = await alluser();

                const username = document.forms['login'].username.value,
                    password = document.forms['login'].password.value;

                if (!username || !password) {
                    return Errorslogin.innerHTML = "заполните все поля";
                }

                for (let user of users) {
                   
                    if (user.name == username) {

                        const data = {
                            'name': username,
                            'password': password
                        };
                        login(data, Errorslogin);
                        window.sessionStorage.setItem('name', username);

                    }
                    else {
                        Errorslogin.innerHTML = "Такого пользователя не существует";
                    }
                   
                }
    
            })
            break;
    case 'addpc.html':
        const formadd = document.querySelector("#addpc_form"),
        Errorsadd = document.querySelector("#errors_addpc");
        
        formadd.addEventListener('submit', async (e) => {
                
            e.preventDefault();

            const namepc = document.forms['addpc'].namepc.value;
            console.log(namepc);
            if (!namepc ) {
                return Errorsadd.innerHTML = "Введите адрес или имя пк";
            } else {
                const data = {
                    'name': namepc,
                };
                pc(data, Errorsadd);
            }

        })
        break;


}








