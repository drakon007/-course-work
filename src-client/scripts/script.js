async function allpc() {
    const res = await fetch(`http://localhost:5000/pc/getall`);
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

async function displayListHomePage() {
    authorizationCheck();
    const persCompAll = await allpc();
    const content = document.querySelector("#content");
    content.innerHTML ="";

    for (let pc of persCompAll) {
        let dt = new Date(pc.lasttime);
        const month = dt.getMonth();
        const year = dt.getFullYear();
        const day = dt.getDate();

        const addPc = 
        `
            <div class="cards rounded-xl bg-bgform max-w-card min-w-max p-2 break-all mt-6 mr-6">

    
            <div class="mt-2 ml-4 mb-1 flex justify-between"><button><img src="img/power-off.png" alt="картинка не прогрузилась" class="w-35 h-35"> <button><img src="img/menu.png" alt="картинка не прогрузилась" class="w-35 h-35"></button></div>
            <h1 class="text-white text-xl ml-6">${pc.name}</h1>
            <p class="ml-6 text-tgray">${pc.ip}</p>

            <div></div>
            <p class="ml-6 text-tgray mr-6 w-4/5">${" Был в сети: " + year + ":" + month + ":" + day}</p>

            </div>

        `;

        content.innerHTML += addPc;
    }
}

displayListHomePage();






