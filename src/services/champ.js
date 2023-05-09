async function getLOLData(){
        
    let res = await fetch('http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/champion.json');
    if(res.status != 200) {
        throw new Error("Something went wrong!");
    }
    return res.json();
}

export { getLOLData }