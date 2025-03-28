const BASE_URL = 'http://localhost:8000'



window.onload = async () => {
    await loadData()
}
const loadData = async () => {
console.log('on load')
    //1.load user ทั้งหมดออกมาจาก API
    const response = await axios.get(`${BASE_URL}/users`)
    console.log(response.data)

//2.นำ user ที่โหลดมาใส่กลับเข้าไปใน html
const userDOM = document.getElementById('user')
let htmlData = '<div>'
for (let i = 0 ; i< response.data.length; i++){
    let user = response.data[i]
    htmlData += `<div>
    ${user.id} ${user.firstname} ${user.lastname}
    <a href='index.html?id=${user.id}'><button>Edit</button></a>
    <button class='delete' data-id='${user.id}'>Delete</button>
    </div>`
}
htmlData += '</div>'
userDOM.innerHTML = htmlData
const deleteDOM = document.getElementsByClassName('delete')
for (let i = 0 ; i < deleteDOM.length; i++){
    deleteDOM[i].addEventListener('click', async (event) => {
        const id = event.target.dataset.id
        try {
            await axios.delete(`${BASE_URL}/users/${id}`)
            loadData()
        }catch (error){
            console.error(error)
        }
        
    })
}

}