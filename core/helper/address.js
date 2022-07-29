export function getProvinceName(id) {
    const provinces = JSON.parse(localStorage.getItem('PROVINCES'));
    if (provinces != null) {
        return provinces.find(item => item.ID == id).Title;
    } else {
        return null;
    }
}