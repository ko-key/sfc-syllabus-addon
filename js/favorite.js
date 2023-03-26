
$(function(){

  //
  //FAV BTN STYLE
  const FAV_TEXT_FALSE = "ブックマーク登録する"
  const FAV_LABEL_FALSE = "<button class=favorite id = off>" + FAV_TEXT_FALSE + "</button>"
  const FAV_CSS_FALSE = {"background-color": "#0075c2", "color": "#FFFFFF", "width": "100%"}

  const FAV_TEXT_TRUE = "ブックマーク解除する"
  const FAV_LABEL_TRUE = "<button class=favorite id = on>" + FAV_TEXT_TRUE + "</button>"
  const FAV_CSS_TRUE = {"border-width":"thin", "background-color": "#ff8914", "color": "#ffffff", "width": "100%"}

  const SAVE_BTN = {
    "display":"inline-block",
    "margin": "0 3px 12px 0",
    "padding": "0 0",
    "font-size": "10px",
    "text-align": "center",
    "background-color": "#d3d3d3",
    "color": "#000",
    "border": "solid 1px #000"
  }
  const IM_BTN = {
    "display":"inline-block",
    "margin": "0 3px 12px 0",
    "padding": "0 0",
    "font-size": "10px",
    "text-align": "center",
    "background-color": "#e1faff",
    "color": "#000",
    "border": "solid 1px #000"
  }
  const ST_BTN = {
    "display":"inline-block",
    "margin": "0 3px 12px 0",
    "padding": "0 0",
    "font-size": "10px",
    "text-align": "center",
    "background-color": "#fdfdd5",
    "color": "#000",
    "border": "solid 1px #000"
  }

  //ddデータをdtの名前から取得。追加要素があった場合の回避。
  function get_dd(target) {
    var data_class = []
    console.log( $(target).closest("li").find("dt"))
    $(target).closest("li").find("dt").each(function(index, e){   
      if($(e).text() == "学部・研究科"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "登録番号"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "科目ソート"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "分野"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "単位"){
        var credit = 0
        if(!($(e).next("dd").text().trim()==null)){
          const regex = /[0-9]/g;
          credit = $(e).next("dd").text().trim().match(regex);
        }
        data_class.push(credit)
      }
      if($(e).text() == "K-Number"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "開講年度・学期"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "授業教員名"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "実施形態"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "授業形態"){
        data_class.push($(e).next("dd").text().trim())
      }
      if($(e).text() == "曜日・時限"){
        if($(e).next("dd").text().trim() !=""){
          data_class.push($(e).next("dd").text().trim())
        }
        else{
          data_class.push(undefined)
        }
      }
      if($(e).text() == "授業で使う言語"){
        data_class.push($(e).next("dd").text().trim())
      }
    })
    return data_class
  }

  function get_dd_recode(target){

    var data_class = []
    content_data = $(target).closest("li").find("dt")



    if($(content_data[6]).text() == "学部・研究科"){
      //政策メディアを含むシラバス内容

      //学部・研究科
      data_class.push($(content_data[0]).next("dd").text().trim())
      //登録番号
      data_class.push($(content_data[1]).next("dd").text().trim())
      //科目ソート
      data_class.push($(content_data[2]).next("dd").text().trim())
      //分野
      data_class.push($(content_data[3]).next("dd").text().trim())
      //単位
      data_class.push($(content_data[4]).next("dd").text().trim())
      //K-Number
      data_class.push($(content_data[5]).next("dd").text().trim())
      //開講年度
      data_class.push($(content_data[12]).next("dd").text().trim())
      //授業教員名
      data_class.push($(content_data[13]).next("dd").text().trim())
      //実施形態
      data_class.push($(content_data[14]).next("dd").text().trim())
      //授業形態
      data_class.push($(content_data[15]).next("dd").text().trim())
      
      //曜日・時限
      if($(content_data[16]).next("dd").text().trim() !=""){
        data_class.push($(content_data[16]).next("dd").text().trim())
      }
      else{
        data_class.push(undefined)
      }

      //言語
      data_class.push($(content_data[17]).next("dd").text().trim())


    }


    else if($(content_data[6]).text() == "開講年度・学期"){
      //政策メディアを含まないシラバス内容

      //学部・研究科
      data_class.push($(content_data[0]).next("dd").text().trim())
      //登録番号
      data_class.push($(content_data[1]).next("dd").text().trim())
      //科目ソート
      data_class.push($(content_data[2]).next("dd").text().trim())
      //分野
      data_class.push($(content_data[3]).next("dd").text().trim())
      //単位
      data_class.push($(content_data[4]).next("dd").text().trim())
      //K-Number
      data_class.push($(content_data[5]).next("dd").text().trim())
      //開講年度
      data_class.push($(content_data[6]).next("dd").text().trim())
      //授業教員名
      data_class.push($(content_data[7]).next("dd").text().trim())
      //実施形態
      data_class.push($(content_data[8]).next("dd").text().trim())
      //授業形態
      data_class.push($(content_data[9]).next("dd").text().trim())
      
      //曜日・時限
      if($(content_data[10]).next("dd").text().trim() !=""){
        data_class.push($(content_data[10]).next("dd").text().trim())
      }
      else{
        data_class.push(undefined)
      }

      //言語
      data_class.push($(content_data[11]).next("dd").text().trim())

    }


    return data_class

  }

  function get_number_term(target){
    //targetはli要素
    var data = {}

    $(target).find("dt").each(function(index, e_dt){
      if($(e_dt).text() == "登録番号"){
        data.number = $(e_dt).next("dd").text().trim()
      }
      if($(e_dt).text() == "開講年度・学期"){
        data.term = $(e_dt).next("dd").text().trim()
      }
    })
    return data
  }


  //data取得用
  const getStorage = (key = null) => new Promise(resolve => {
    chrome.storage.local.get(key, (data) => {resolve(data)});
  });



  (async () => {

    let save = await getStorage();

    //授業一つ一つに対し、お気に入りボタンを設置
    document.querySelectorAll(".result > ul> li").forEach((e, i) =>{
      btn_flag = false

      $(e).find("dt").each(function(index, e_dt){
        if($(e_dt).text() == "登録番号"){
          e_number = $(e_dt).next("dd").text().trim()
        }
        if($(e_dt).text() == "開講年度・学期"){
          e_term = $(e_dt).next("dd").text().trim()
        }
      })

      save.classes.forEach(function(data){

        if(e_number == data.number && e_term == data.term){
          btn_flag = true
          class_index = data.index
          data_memo = data.memo
          data_im = data.important
        }
      })


      $(e).children("h2").css("margin" , "5px 0px 3px 0px")
      $(e).prepend("<span class=im_label></span>")

      if (btn_flag == false){
        
        $(e).prepend(FAV_LABEL_FALSE)
        $(e).children(".favorite").css(FAV_CSS_FALSE)
      }
      else{
        
        if(data_im == true){
          $(e).children(".im_label").text("★")
        }
        $(e).prepend("<div class=memo_text id=" + class_index + ">" + data_memo + "</div>")
        $(e).prepend("<button class=memo_save id=" + class_index + ">保存</button><br class=br_add>")
        $(e).children(".memo_save").css(SAVE_BTN)
        $(e).prepend("<input type=text class=memo_box>")
        $(e).prepend("<div class=title_memo>メモ欄</div>")
        $(e).prepend(FAV_LABEL_TRUE)
        $(e).children(".favorite").css(FAV_CSS_TRUE)
        $(e).children("h2").after("<button class=st_btn id=" + class_index + ">取消</button>")
        $(e).children(".st_btn").css(ST_BTN)
        $(e).children("h2").after("<button class=im_btn id=" + class_index + ">重要</button>")
        $(e).children(".im_btn").css(IM_BTN)
      }
    });
    
    //クリック時の処理。非同期内に組み込んでいいのか謎だが動いてるから良いんじゃね。知らんけど。2022/03/02
    $(".result .favorite").on("click", function() {
      
      //登録するときの動作
      if($(this).attr("id") == "off"){
        $(this).attr("id", "on");
        $(this).text(FAV_TEXT_TRUE);
        $(this).css(FAV_CSS_TRUE)

        //$(this).parent().prepend("<button class=memo_save id=" + class_json.index + ">保存</button><br>")
        //$(this).parent().prepend("<input type=text class=memo_box>")
        

        //授業名
        class_name = $(this).closest("li").children("h2").text().trim()
        class_url = $(this).closest("li").find(".detail-btn").attr("href")
    
        //<dd>要素を一気に取り込み

        data_class = []
        data_class = get_dd_recode($(this));


        (async () => {
          let save_2 = await getStorage();


          var random = Math.floor( Math.random() * 1000000000001 );
 
          const length = Object.keys(save_2.classes).length

          console.log(data_class)

          

          class_json = 
          {
              index: "index" + String(length) + String(random),
              url: class_url,
              title: class_name,
              belongs: data_class[0],
              number: data_class[1],
              sort:data_class[2],
              field: data_class[3],
              credit: data_class[4],
              k_number: data_class[5],
              term: data_class[6],
              staff: data_class[7],
              location: data_class[8],
              form: data_class[9],
              time: data_class[10],
              language: data_class[11],
              memo: "N/A",
              strike: false,
              import: false
          }  

          
          
          $(this).after("<div class=memo_text id=" + class_json.index + ">" + class_json.memo + "</div>")
          $(this).after("<button class=memo_save id=" + class_json.index + ">保存</button><br class=br_add>")
          $(this).siblings(".memo_save").css(SAVE_BTN)
          $(this).after("<input type=text class=memo_box>")
          $(this).after("<div class=title_memo>メモ欄</div>")

          $(this).prepend("<span class=im_label></span>")

          
          $(this).siblings("h2").after("<button class=st_btn id=" + class_json.index + ">取消</button>")
          $(this).siblings(".st_btn").css(SAVE_BTN)
          $(this).siblings("h2").after("<button class=im_btn id=" + class_json.index + ">重要</button>")
          $(this).siblings(".im_btn").css(SAVE_BTN)

          

          save_2.classes.push(class_json)
    
          chrome.storage.local.set({'classes': save_2.classes}, function () {});
          
        })();



  

      }
       
      //登録解除するときの動作
      else if($(this).attr("id") == "on"){

        //スタイル変更
        
        $(this).attr("id", "off");
        $(this).text(FAV_TEXT_FALSE);
        $(this).css(FAV_CSS_FALSE)
        $(this).siblings(".title_memo").remove()
        $(this).siblings(".im_label").text("")

        $(this).siblings(".memo_save").remove();
        $(this).siblings(".memo_box").remove();
        $(this).siblings(".memo_text").remove();
        $(this).siblings(".br_add").remove();
        $(this).siblings(".st_btn").remove();
        $(this).siblings(".im_btn").remove();

        var data_class = []
        //<dd>要素を一気に取り込み
        data = get_number_term($(this).closest("li"))

        number = data.number;
        term = data.term;

        (async () => {
          let save_2 = await getStorage();

          save_2.classes.forEach(function(e, index){
            if(number == e.number && term == e.term){
              save_2.classes.splice(index, 1);
            }
          })

          chrome.storage.local.set({'classes': save_2.classes}, function () {});
          
        })();

      }

    });

    //メモ保存の処理
    $(document).on('click', '.memo_save', function(){
            
      const textbox = $(this).siblings(".memo_box");
      const inputValue = textbox.val();

      var btn_index = $(this).attr("id")
      $(this).siblings(".memo_text").text(inputValue)


      chrome.storage.local.get("classes", function(save){
  
          save.classes.forEach(function(data, i){
  
              if(btn_index == data.index){
                  save.classes[i].memo = inputValue
              }
          })
  
          chrome.storage.local.set({'classes': save.classes}, function () {});
      })
    })

    $(document).on('click', ".im_btn", function(){

      var btn_index = $(this).attr("id")
      
      chrome.storage.local.get("classes", function(save_2){
                
        save_2.classes.forEach(function(data, i){
        
          if(btn_index == data.index){
            if(save_2.classes[i].important == true){
              save_2.classes[i].important = false
              $(document).find(".st_btn#"+btn_index).siblings(".im_label").text("")
            }
            else{
              save_2.classes[i].important = true
              $(document).find(".st_btn#"+btn_index).siblings(".im_label").text("★")
            }
          }
        })
        chrome.storage.local.set({'classes': save_2.classes}, function () {});
      })
    })

    $(document).on('click', ".st_btn", function(){

      var btn_index = $(this).attr("id");


      (async () => {
        let save_2 = await getStorage();

        save_2.classes.forEach(function(data, i){
        
          if(btn_index == data.index){
            if(save_2.classes[i].strike == true){
              save_2.classes[i].strike = false
              $(document).find(".st_btn#"+btn_index).siblings("h2").css("text-decoration", "none")
            }
            else{
              save_2.classes[i].strike = true
              $(document).find(".st_btn#"+btn_index).siblings("h2").css("text-decoration", "line-through")
            }
          }
        })
        chrome.storage.local.set({'classes': save_2.classes}, function () {});
        
      })();
      
      
    })
  })();


});