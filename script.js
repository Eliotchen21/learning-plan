import { db, collection, addDoc, getDocs, query, orderBy } from "./firebase.js"

function getTime() {
    const now = new Date();
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0") 
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`
    return formattedDate
}

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("send-btn").addEventListener("click", async () => {
        const discordName = document.getElementById("send-input").value
        const content = document.getElementById("send-textarea").value
        if (!(discordName && content)) {
            alert("欄位不得為空。")
            return
        }
        if (discordName.length > 32) {
            alert("Discord名稱過長。（上限32字元）")
            return
        }
        if (content.length > 500) {
            alert("內容過長。（上限500字元）")
            return
        }
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                discordName,
                content,
                createdAt: getTime(),
            });
            alert("成功，資料已刊登。")
            window.location.reload()
        } catch (e) {
            alert("錯誤，送出失敗。")
        }
    })

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const newElement = document.createElement("div");
        newElement.classList.add("get-grid-element");
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("get-grid-element-content");
        contentDiv.textContent = data.content;
        const authorDiv = document.createElement("div");
        authorDiv.classList.add("get-grid-element-others");
        authorDiv.textContent = `由 ${data.discordName} 於 ${data.createdAt} 發起`;
        newElement.appendChild(contentDiv);
        newElement.appendChild(authorDiv);
        document.getElementById("get-grid").appendChild(newElement);
    });
})