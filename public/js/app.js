const btn = document.querySelector('#btnEliminar')

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const id = btn.dataset.id
    fetch (`/users/${id}`, {method: 'delete'}).then(() => window.location.href = ("/"))
})