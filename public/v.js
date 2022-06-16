(()=>{
  if(!localStorage.getItem('v')){
    localStorage.setItem('v', 1655397626);
    return;
  }
  if(localStorage.getItem('v') < 1655397626){
    localStorage.setItem('v', 1655397626);
    location.reload();
  }
})()
