const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
const showTasks = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
      const {
        data: { get_all_tasks },} = await axios.get('/api/v1/tasks')
      if (get_all_tasks.length < 1) {
        tasksDOM.innerHTML = '<h5 class="empty-list">No Agendas..</h5>'
        loadingDOM.style.visibility = 'hidden'
        return
      }
      const allTasks = get_all_tasks.map((get_all_task) => {
        const { completed, _id: taskID, name } = get_all_task 
                return `<div class="single-task ${completed?'task-completed':'' } ">
        <div class="task-links">
        <h5 class="task_name"><span style="margin: 8px;"><i class="${completed ?'far fa-check-circle':''}"></i></span>
        ${name}</h5>
        <!-- edit link -->
        <div>
        <a href="agenda.html?id=${taskID}"class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
        <!-- delete btn -->
        <button type="button" class="delete-btn" data-id="${taskID}">
        <i class="fas fa-trash"></i>
        </button>
       </div>
        </div>
        </div>`
      }).join('')
    tasksDOM.innerHTML = allTasks
    } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
  loadingDOM.style.visibility = 'hidden'
}
showTasks()


// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
      loadingDOM.style.visibility = 'visible'
      const id = el.parentElement.dataset.id
      console.log(id);
      try {
        await axios.delete(`/api/v1/tasks/${id}`)
        showTasks()
      } catch (error) {
        console.log(error)
      }
    }
    loadingDOM.style.visibility = 'hidden'
  })
  
  // form
  
  formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value
  
    try {
      await axios.post('/api/v1/tasks', { name })
      showTasks()
      taskInputDOM.value = ''
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = `${name.toUpperCase()}, added to the lineup`
      formAlertDOM.classList.add('text-success')
    } catch (error) {
      formAlertDOM.style.display = 'block'
      formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    },2000)
})