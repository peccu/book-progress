(()=>{
  if(!localStorage.getItem('v')){
    localStorage.setItem('v', VERSION_STR);
    return;
  }
  if(localStorage.getItem('v') < VERSION_STR){
    localStorage.setItem('v', VERSION_STR);
    location.reload();
  }
})()
