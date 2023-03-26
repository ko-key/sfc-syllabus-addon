$(function () {
    $(document).on('click', (e) => {
        console.log(e.target.id);

        if(e.target.id =="syllabus"){
            chrome.tabs.create({url: $(e.target).attr('href')});
        }        
      });
  });