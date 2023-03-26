$(function(){

    const WEEK_TRUE = {"background-color": "#ffe600", "border": "solid"}
    const WEEK_FALSE = {"background-color": "#f3f3f3","border": "solid"}

    const title_time ={"margin": "12px 0", "font-weight": "bold"}

    const LI_CSS_EVEN = {"border": "solid 3px #3A546F", "padding":"4px","background-color": "#FFF"}
    const LI_CSS_ODD = {"border": "solid 3px #3A546F", "padding":"4px", "background-color": "#d8d8d8"}

    const IM_BG = {"border": "solid 3px #ff0000", "padding":"4px", "background-color": "#ffbb77"}

    const TAB_BTN =[$(document).find(".week#monday"),
                    $(document).find(".week#tuesday"),
                    $(document).find(".week#wednesday"),
                    $(document).find(".week#thursday"),
                    $(document).find(".week#friday"),
                    $(document).find(".week#other"),
                    $(document).find(".week#all")]



    //準備



    TAB_BTN.forEach(function(e){
        e.css(WEEK_FALSE)
    });

    


    $(".week").on("click", function(){

        //曜日ボタンの色をリセットする
        TAB_BTN.forEach(function(e){
            e.css(WEEK_FALSE)
        })
        
        //選択曜日ボタンをハイライトする
        $(this).css(WEEK_TRUE)

        //内容をリセット
        $(".content").text("")


        var class_list = []

        
        //選択ボタンのID確認
        click_btn = $(this).attr("id")


        /*使用していないコード、リリース版では削除

        var click_btn_st = ""
        if(click_btn=="monday"){
            click_btn_st = "月"
        }
        if(click_btn=="tuesday"){
            click_btn_st = "火"
        }
        if(click_btn=="wednesday"){
            click_btn_st = "水"
        }
        if(click_btn=="thursday"){
            click_btn_st = "木"
        }
        if(click_btn=="friday"){
            click_btn_st = "金"
        }
        
        */


        chrome.storage.local.get("classes", function(get_data){
            
            console.log(get_data)
            

            get_data.classes.forEach(function(data){
                console.log(data)

                //取得授業に時間設定があるか判定（卒プロなど一部授業には時間設定がない）

                //その他ボタンに表示する授業をここで格納

                if( (typeof data.time ==="undefined")&&((click_btn=="other") || (click_btn=="all"))){
                    var class_data_other = {}
                    class_data_other.period = "8"
                    class_data_other.data = data
                    class_data_other.week = "other"
                    class_list.push(class_data_other)
                }

                else if(!(typeof data.time ==="undefined")){

                    //Stringsとintの混在データのため、データ処理
                    const regex = /[月火水木金]/g;
                    //曜日取得
                    const weeks = data.time.match(regex);
                    const regex_2 = /[0-9]/g;
                    //時限取得
                    const periods = data.time.match(regex_2);

                    weeks.forEach(function(e, index){

                        if(e == "月"){
                            time = "monday"
                        }
                        if(e == "火"){
                            time = "tuesday"
                        }
                        if(e == "水"){
                            time = "wednesday"
                        }
                        if(e == "木"){
                            time = "thursday"
                        }
                        if(e == "金"){
                            time = "friday"
                        }

                        //全てボタンに表示する授業をここで格納
                        if(click_btn == "all"){

                            var class_data_all = {}
                            class_data_all.period = periods[index]
                            class_data_all.data = data
                            class_data_all.week = time
                            class_list.push(class_data_all)
                        }
                        //曜日ボタンそれぞれに表示する授業をここで格納
                        else if(click_btn == time){
                            var class_data_week = {}
                            class_data_week.period = periods[index]
                            class_data_week.data = data
                            class_data_week.week = time
                            class_list.push(class_data_week)
                        }
                    })
                }

            
            })

            
            //順番入れ替え.時限でソートしているだけなので、別途検討が必要
            if(click_btn =="all"){


                var result_1 = class_list.sort(function(a, b){

                    return a.index - b.index

                })

                var result_2 = result_1.sort(function(a, b){

                    return a.period - b.period

                })

                var daysOrder = ['月', '火', '水', '木', '金', '曜日設定なし'];
                var result_data = result_2.sort((x, y) => {
                return daysOrder.indexOf(x.week) - daysOrder.indexOf(y.week);
                });

                


            }
            else{
                var result_data = class_list.sort(function(a, b){

                    return a.period - b.period

                })
            }

            console.log(result_data)

            //時限用特定用の変数.他にもっといい方法あっただろとは思う
            check_num = 0


            //result_dataには各ボタンで表示する授業のみが格納されている。そのためcheck_numで位置調整が可能。

            
            if(click_btn=="other"){
                $(".content").append("<div class=title_week id=other></div>")
                $("."+ "title_week#other").append("<div class=display_week  id=other>曜日設定なし</div>")
                $("."+ "title_week#other").append("<div class=title_time id=period_8></div>")
                $("."+ "title_week#other #period_8").append("<div class=class_none>空きコマ</div>")
                

            }


            else if(click_btn=="all"){

                $(".content").append("<div class=title_week id=all></div>")
                $("."+ "title_week#all").append("<div class=display_week id=all>ブックマーク一覧</div>")

                const weeks = ["monday","tuesday", "wednesday", "thursday", "friday"]

                weeks.forEach(function(e){

                    switch (e) {
                        case "monday":
                            $(".content").append("<div class=title_week id=" + e + "></div>")
                            $("."+ "title_week#" + e).append("<div class=display_week id=" + e + ">月曜日</div>")

                            break;
                        case "tuesday":
                            $(".content").append("<div class=title_week id=" + e + "></div>")
                            $("."+ "title_week#" + e).append("<div class=display_week id=" + e + ">火曜日</div>")
                            break;
                        case "wednesday":
                            $(".content").append("<div class=title_week id=" + e + "></div>")
                            $("."+ "title_week#" + e).append("<div class=display_week id=" + e + ">水曜日</div>")
                            break;
                        case "thursday":
                            $(".content").append("<div class=title_week id=" + e + "></div>")
                            $("."+ "title_week#" + e).append("<div class=display_week id=" + e + ">木曜日</div>")
                            break;
                        case "friday":
                            $(".content").append("<div class=title_week id=" + e + "></div>")
                            $("."+ "title_week#" + e).append("<div class=display_week id=" + e + ">金曜日</div>")
                            break;
                    }

                    
                    $("."+ "title_week#" + e).append("<div class=title_time id=period_1></div>")
                    $("."+ "title_week#" + e).append("<div class=title_time id=period_2></div>")
                    $("."+ "title_week#" + e).append("<div class=title_time id=period_3></div>")
                    $("."+ "title_week#" + e).append("<div class=title_time id=period_4></div>")
                    $("."+ "title_week#" + e).append("<div class=title_time id=period_5></div>")
                    $("."+ "title_week#" + e).append("<div class=title_time id=period_6></div>")
                    $("."+ "title_week#" + e).append("<div class=title_time id=period_7></div>")
                    
                    $("."+ "title_week#" + e + " #period_1").append("<div class=display_time>1限（9:25~10:55）</div>")
                    $("."+ "title_week#" + e + " #period_2").append("<div class=display_time>2限（11:10~12:40）</div>")
                    $("."+ "title_week#" + e + " #period_3").append("<div class=display_time>3限（13:00~14:30）</div>")
                    $("."+ "title_week#" + e + " #period_4").append("<div class=display_time>4限（14:45~16:15）</div>")
                    $("."+ "title_week#" + e + " #period_5").append("<div class=display_time>5限（16:30~18:00）</div>")
                    $("."+ "title_week#" + e + " #period_6").append("<div class=display_time>6限（18:10~19:40）</div>")
                    $("."+ "title_week#" + e + " #period_7").append("<div class=display_time>7限（19:50~21:20）</div>")
                


                    $("."+ "title_week#" + e + " #period_1").append("<div class=class_none>空きコマ</div>")
                    $("."+ "title_week#" + e + " #period_2").append("<div class=class_none>空きコマ</div>")
                    $("."+ "title_week#" + e + " #period_3").append("<div class=class_none>空きコマ</div>")
                    $("."+ "title_week#" + e + " #period_4").append("<div class=class_none>空きコマ</div>")
                    $("."+ "title_week#" + e + " #period_5").append("<div class=class_none>空きコマ</div>")
                    $("."+ "title_week#" + e + " #period_6").append("<div class=class_none>空きコマ</div>")
                    $("."+ "title_week#" + e + " #period_7").append("<div class=class_none>空きコマ</div>")

                });
                

                $(".content").append("<div class=title_week id=other></div>")
                $("."+ "title_week#other").append("<div class=display_week id=other>曜日設定なし</div>")
                $("."+ "title_week#other").append("<div class=title_time id=period_8></div>")
                $("."+ "title_week#other #period_8").append("<div class=class_none>空きコマ</div>")
            }

            else{
            
                switch (click_btn) {
                    case "monday":
                        $(".content").append("<div class=title_week id=" + click_btn + "></div>")
                        $("."+ "title_week#" + click_btn).append("<div class=display_week id =" + click_btn + ">月曜日</div>")

                        break;
                    case "tuesday":
                        $(".content").append("<div class=title_week id=" + click_btn + "></div>")
                        $("."+ "title_week#" + click_btn).append("<div class=display_week id =" + click_btn + ">火曜日</div>")
                        break;
                    case "wednesday":
                        $(".content").append("<div class=title_week id=" + click_btn + "></div>")
                        $("."+ "title_week#" + click_btn).append("<div class=display_week id =" + click_btn + ">水曜日</div>")
                        break;
                    case "thursday":
                        $(".content").append("<div class=title_week id=" + click_btn + "></div>")
                        $("."+ "title_week#" + click_btn).append("<div class=display_week id =" + click_btn + ">木曜日</div>")
                        break;
                    case "friday":
                        $(".content").append("<div class=title_week id=" + click_btn + "></div>")
                        $("."+ "title_week#" + click_btn).append("<div class=display_week id =" + click_btn + ">金曜日</div>")
                        break;
                }
                $("."+ "title_week#" + click_btn).append("<div class=title_time id=period_1></div>")
                $("."+ "title_week#" + click_btn).append("<div class=title_time id=period_2></div>")
                $("."+ "title_week#" + click_btn).append("<div class=title_time id=period_3></div>")
                $("."+ "title_week#" + click_btn).append("<div class=title_time id=period_4></div>")
                $("."+ "title_week#" + click_btn).append("<div class=title_time id=period_5></div>")
                $("."+ "title_week#" + click_btn).append("<div class=title_time id=period_6></div>")
                $("."+ "title_week#" + click_btn).append("<div class=title_time id=period_7></div>")

                $("."+ "title_week#" + click_btn + " #period_1").append("<div class=display_time>1限（9:25~10:55）</div>")
                $("."+ "title_week#" + click_btn + " #period_2").append("<div class=display_time>2限（11:10~12:40）</div>")
                $("."+ "title_week#" + click_btn + " #period_3").append("<div class=display_time>3限（13:00~14:30）</div>")
                $("."+ "title_week#" + click_btn + " #period_4").append("<div class=display_time>4限（14:45~16:15）</div>")
                $("."+ "title_week#" + click_btn + " #period_5").append("<div class=display_time>5限（16:30~18:00）</div>")
                $("."+ "title_week#" + click_btn + " #period_6").append("<div class=display_time>6限（18:10~19:40）</div>")
                $("."+ "title_week#" + click_btn + " #period_7").append("<div class=display_time>7限（19:50~21:20）</div>")

                $("."+ "title_week#" + click_btn + " #period_1").append("<div class=class_none>空きコマ</div>")
                $("."+ "title_week#" + click_btn + " #period_2").append("<div class=class_none>空きコマ</div>")
                $("."+ "title_week#" + click_btn + " #period_3").append("<div class=class_none>空きコマ</div>")
                $("."+ "title_week#" + click_btn + " #period_4").append("<div class=class_none>空きコマ</div>")
                $("."+ "title_week#" + click_btn + " #period_5").append("<div class=class_none>空きコマ</div>")
                $("."+ "title_week#" + click_btn + " #period_6").append("<div class=class_none>空きコマ</div>")
                $("."+ "title_week#" + click_btn + " #period_7").append("<div class=class_none>空きコマ</div>")                
            }



            console.log(result_data)
            result_data.forEach(function(e, index){


                target_id = "#period_" + String(e.period)
                
                //各授業の表示配置の位置決め.
                if((click_btn != "all") && (click_btn != "other")){
                    $("."+ "title_week#" + click_btn + " " + target_id + " .class_none").remove()
                    $("."+ "title_week#" + click_btn + " " + target_id).append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                }

                else if (click_btn == "other"){

                    $("."+ "title_week#" + click_btn + " " + "#period_8" + " .class_none").remove()
                    $("."+ "title_week#" + click_btn + " " + "").append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                }


                else if(click_btn == "all"){


                    switch(e.week){
                        case "monday":
                            $("."+ "title_week#" + "monday "+target_id +" .class_none").remove()
                            $("."+ "title_week#" + "monday "+target_id).append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                            break;
                        case "tuesday":
                            $("."+ "title_week#" + "tuesday "+target_id +" .class_none").remove()
                            $("."+ "title_week#" + "tuesday "+target_id).append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                            break;
                        case "wednesday":
                            $("."+ "title_week#" + "wednesday "+target_id +" .class_none").remove()
                            $("."+ "title_week#" + "wednesday "+target_id).append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                            break;
                        case "thursday":
                            $("."+ "title_week#" + "thursday "+target_id +" .class_none").remove()
                            $("."+ "title_week#" + "thursday "+target_id).append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                            break;
                        case "friday":
                            $("."+ "title_week#" + "friday "+target_id +" .class_none").remove()
                            $("."+ "title_week#" + "friday "+target_id).append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                            break;
                        case "other":
                            $("."+ "title_week#" + "other" + " " + "#period_8" + " .class_none").remove()
                            $("."+ "title_week#" + "other").append("<li class=" + e.data.index + "_" + index + " " + "id ="+ e.data.index + "></li>");
                            break;
                    }

                }
                
                /*var daysOrder = ['月', '火', '水', '木', '金', '曜日設定なし'];
                

                var bg_flag = false

                if(click_btn=="all"){
                    daysOrder.forEach(function(week, index){
                        if(e.week == week && index%2==1){
                            bg_flag =true
                        }
                    })
                }
                
                if(bg_flag==true){
                    $("li." + e.data.index + "_" + index).css(LI_CSS_ODD)
                }
                else{
                    $("li." + e.data.index + "_" + index).css(LI_CSS_EVEN)
                }*/

                $("li." + e.data.index + "_" + index).css(LI_CSS_EVEN)

                $("." + e.data.index + "_" + index).prepend("<span class=im_label></span>")

                if(e.data.important == true){
                    $("." + e.data.index + "_" + index).children(".im_label").text("★")
                    $("li." + e.data.index + "_" + index).css(IM_BG)
                }

                $("." + e.data.index + "_" + index).append("<div class = title id=" + e.data.index + ">" + e.data.title + "</div>")

                
                if(e.data.strike == true){
                    $("." + e.data.index + "_" + index).children(".title").css("text-decoration", "line-through");
                }

                $("." + e.data.index + "_" + index).append("<button class=del_btn id=" + e.data.index + ">削除</button>")
                $("." + e.data.index + "_" + index).append("<button class=im_btn id=" + e.data.index + ">重要</button>")
                $("." + e.data.index + "_" + index).append("<button class=st_btn id=" + e.data.index + ">取消線</button><br>")
                
                if(!(typeof e.data.url === "undefined")){
                    $("." + e.data.index + "_" + index).append("<a href=https://syllabus.sfc.keio.ac.jp" + e.data.url + " id=syllabus>授業詳細リンク</a><br>")

                }
                else{
                    $("." + e.data.index + "_" + index).append("授業詳細なし<br>")

                }


                $("." + e.data.index + "_" + index).append("<span>教員:[" + e.data.staff + "]</span><br>")
                if(!(typeof e.data.belongs === "undefined")){
                    $("." + e.data.index + "_" + index).append("<span>" + e.data.belongs + "</span><br>")
                }
                if(!(typeof e.data.field === "undefined")){
                    $("." + e.data.index + "_" + index).append("<span>" + e.data.field + "</span><br>")
                }

                var display_week
                switch(e.week){
                    case "monday":
                        display_week = "月曜"
                        break;
                    case "tuesday":
                        display_week = "火曜"
                        break;
                    case "wednesday":
                        display_week = "水曜"
                        break;
                    case "thursday":
                        display_week = "木曜"
                        break;
                    case "friday":
                        display_week = "金曜"
                        break;
                    case "other":
                        display_week = "曜日不明"
                        break;
                }


                if(e.week != "other"){
                    $("." + e.data.index + "_" + index).append("<span>" + display_week + e.period + "限</span><br>")
                }
                else if(e.week == "other"){
                    $("." + e.data.index + "_" + index).append("<span>" + display_week + "</span><br>")
                }
                if(!(typeof e.data.credit === "undefined")){
                    $("." + e.data.index + "_" + index).append("<span>" + e.data.credit + "単位</span><br>")
                }
                if(!(typeof e.data.location === "undefined")){
                    $("." + e.data.index + "_" + index).append("<span>" + e.data.location + "</span>")
                }
                if(!(typeof e.data.form === "undefined")){
                    $("." + e.data.index + "_" + index).append("<span>" + e.data.form + "</span><br>")
                }
                if(!(typeof e.data.language === "undefined")){
                    $("." + e.data.index + "_" + index).append("<span>" + e.data.language + "</span><br>")
                }
                $("." + e.data.index + "_" + index).append("<div class=memo><span class=title_memo>メモ欄</span><br></div>")
                $("." + e.data.index + "_" + index + " " + ".memo").append("<input type=text id=memo>")
                $("." + e.data.index + "_" + index + " " + ".memo").append("<button class=get_data_memo id=" + e.data.index + ">保存</button><br>")
                $("." + e.data.index + "_" + index + " " + ".memo").append("<div class=memo_text>" + e.data.memo + "</div>")
            })

        })

    });



    //保存ボタンの処理

    $(document).on('click', '.get_data_memo', function(){
        
        var btn_index = $(this).attr("id")

        const textbox = $(this).siblings("#memo");
        const inputValue = textbox.val();
        $(document).find("li" + "#" + btn_index).find(".memo_text").text(inputValue)



        var btn_index = $(this).parent().parent().attr("id")


        chrome.storage.local.get("classes", function(get_data){
            
    
            get_data.classes.forEach(function(data, i){
    
                if(btn_index == data.index){
                    get_data.classes[i].memo = inputValue
                }
            })
    
            chrome.storage.local.set({'classes': get_data.classes}, function () {});
        })
    })


    //削除ボタンの処理

    $(document).on('click', '.del_btn', function(){

        var btn_index = $(this).attr("id")
        $(document).find("li" + "#" + btn_index).remove()

        chrome.storage.local.get("classes", function(get_data){
            
            get_data.classes.forEach(function(data, i){
    
                if(btn_index == data.index){
                    get_data.classes.splice(i, 1)
                }
            })
    
            chrome.storage.local.set({'classes': get_data.classes}, function () {});
        })
    })

    $(document).on('click', '.im_btn', function(){

        var btn_index = $(this).parent().attr("id")

        chrome.storage.local.get("classes", function(get_data){
            
            get_data.classes.forEach(function(data, i){
    
                if(btn_index == data.index){
                    if(get_data.classes[i].important == true){
                        get_data.classes[i].important = false
                        $(document).find("li" + "#" + btn_index).children(".im_label").text("")
                        $(document).find("li" + "#" + btn_index).css(LI_CSS_EVEN)
                    }
                    else{
                        get_data.classes[i].important = true
                        $(document).find("li" + "#" + btn_index).children(".im_label").text("★")
                        $(document).find("li" + "#" + btn_index).css(IM_BG)
                    }
                }
            })
    
            chrome.storage.local.set({'classes': get_data.classes}, function () {});
        })
    })




    //取り消し線ボタンの処理
    $(document).on('click', '.st_btn', function(){
        var btn_index = $(this).parent().attr("id")

        chrome.storage.local.get("classes", function(get_data){
            
            get_data.classes.forEach(function(data, i){
    
                if(btn_index == data.index){
                    if(get_data.classes[i].strike == true){
                        get_data.classes[i].strike = false
                        $(document).find("li" + "#" + btn_index).children(".title").css("text-decoration", "none")
                    }
                    else{
                        get_data.classes[i].strike = true
                        $(document).find("li" + "#" + btn_index).children(".title").css("text-decoration", "line-through")
                    }
                }
            })
    
            chrome.storage.local.set({'classes': get_data.classes}, function () {});
        })
    })


})