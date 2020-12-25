export const getCurrentDate = () => {
    let date = new Date().toLocaleDateString('en', 
                    { day: "numeric", 
                    month: "short", 
                    year: "numeric" }); 
    return date;
}