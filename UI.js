function UI(health, jump){
    c.fillRect(5,5,10*health,10);
    if (!jump){
        c.beginPath();
        c.arc(10,25,5, 0,Math.PI*2);
        c.fill();
    }
}